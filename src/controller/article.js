const logger = require("@lib/logger");

const articleService = require("@service/articleService");

const { handleValidationError } = require("@helper/mvcHelper");

const ArticleCreateRequestDTO = require("@articleRequestDTO/articleCreateRequestDTO");
const ArticleReadRequestDTO = require("@articleRequestDTO/articleReadRequestDTO");
const ArticleUpdateRequestDTO = require("@articleRequestDTO/articleUpdateRequestDTO");
const ArticleDeleteRequestDTO = require("@articleRequestDTO/articleDeleteRequestDTO");
const { ArticleImage } = require("@models/index");

exports.createArticle = async (req, res) => {
  try {
    let adminId = req.tokenUser.id;

    const requestDTO = new ArticleCreateRequestDTO({
      ...req.body,
      adminId,
    });

    console.log(JSON.stringify(requestDTO));

    logger.info(`router/article.js.reg.params: ${JSON.stringify(requestDTO)}}`);

    handleValidationError(requestDTO);

    const responseDTO = await articleService.reg(requestDTO);

    res.status(200).json(responseDTO);
  } catch (err) {
    logger.error(`router/article.js.reg.error: ${err.message.toString()}`);
    res.status(500).json({ err: err.message.toString() });
  }
};
exports.getArticleInfo = async (req, res) => {
  try {
    const requestDTO = new ArticleReadRequestDTO(req.body);

    logger.info(`router/article.js.info.params: ${JSON.stringify(requestDTO)}`);

    const responseDTO = await articleService.info(requestDTO);

    logger.info(
      `router/article.js.info.result: ${JSON.stringify(responseDTO)}`,
    );

    res.status(200).json(responseDTO);
  } catch (err) {
    logger.error(`router/article.js.info.error: ${err.message.toString()}`);
    res.status(500).json({ err: err.message.toString() });
  }
};
exports.getAllArticleInfo = async (req, res) => {
  try {
    const requestDTO = new ArticleReadRequestDTO(req.params);

    logger.info(`router/article.js.info.params: ${JSON.stringify(requestDTO)}`);

    const responseDTO = await articleService.getAllAritcleInfo(requestDTO);

    logger.info(
      `router/article.js.getAllarticleInfo.result: ${JSON.stringify(responseDTO)}`,
    );

    res.status(200).json(responseDTO);
  } catch (err) {
    logger.error(
      `router/article.js.getAllarticleInfo.error: ${err.message.toString()}`,
    );
    res.status(500).json({ err: err.message.toString() });
  }
};
exports.modifyArticle = async (req, res) => {
  try {
    const requestDTO = new ArticleUpdateRequestDTO(req.body);

    logger.info(
      `router/article.js.update.params: ${JSON.stringify(requestDTO)}`,
    );

    const responseDTO = await articleService.update(req, requestDTO);

    logger.info(
      `router/article.js.update.result: ${JSON.stringify(responseDTO)}`,
    );

    res.status(200).json(responseDTO);
  } catch (err) {
    logger.error(`router/article.js.update.error: ${err.message.toString()}`);

    res.status(500).json({ err: err.message.toString() });
  }
};
exports.deleteArticle = async (req, res) => {
  try {
    const requestDTO = new ArticleDeleteRequestDTO(req.body);

    logger.info(
      `router/article.js.delete.params: ${JSON.stringify(requestDTO)}`,
    );

    const responseDTO = await articleService.delete(req, requestDTO);

    logger.info(
      `router/article.js.delete.result: ${JSON.stringify(responseDTO)}`,
    );

    res.status(200).json(responseDTO);
  } catch (err) {
    res.status(500).json({ err: err.message.toString() });
  }
};
exports.deleteArticleForce = async (req, res) => {
  try {
    const requestDTO = new ArticleDeleteRequestDTO(req.body);

    logger.info(
      `router/article.js.delete.params) ${JSON.stringify(requestDTO)}`,
    );

    const responseDTO = await articleService.deleteForce(req, requestDTO);

    logger.info(
      `router/article.js.delete.result ${JSON.stringify(responseDTO)}`,
    );

    res.status(200).json(responseDTO);
  } catch (err) {
    res.status(500).json({ err: err.message.toString() });
  }
};
exports.ImageUpload = async (req, res) => {
  try {
    const { articleId } = req.params;

    // 다수 파일 업로드는 req.file이 아니라 [req.files] 배열로 들어옵니다!
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: "업로드된 파일이 없습니다." });
    }

    // 💡 req.files 배열을 돌면서 오라클 클라우드가 준 URL(location)들을 쏙쏙 뽑아냅니다.
    const imageRecords = req.files.map((file) => {
      return {
        articleId: articleId,
        imageUrl: file.location, // 🔥 오라클 클라우드가 새로 생성해 준 전체 URL 주소!
      };
    });

    // Sequelize의 bulkCreate로 레코드들을 배열째로 한 번에 DB에 대량 Insert 합니다.
    const savedImages = await ArticleImage.bulkCreate(imageRecords);

    return res.status(201).json({
      success: true,
      message: `${savedImages.length}개의 이미지가 성공적으로 업로드 및 DB에 저장되었습니다.`,
      data: savedImages,
    });
  } catch (error) {
    console.error("다중 업로드 에러:", error);
    return res.status(500).json({ message: "서버 에러가 발생했습니다." });
  }
};
