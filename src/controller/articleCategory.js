const logger = require("@lib/logger");

const articleCategoryService = require("@service/articleCategoryService");

const { handleValidationError } = require("@helper/mvcHelper");

const ArticleCategoryCreateRequestDTO = require("@articleCategoryRequestDTO/articleCategoryCreateRequestDTO");
const ArticleCategoryReadRequestDTO = require("@articleCategoryRequestDTO/articleCategoryReadRequestDTO");
const ArticleCategoryUpdateRequestDTO = require("@articleCategoryRequestDTO/articleCategoryUpdateRequestDTO");
const ArticleCategoryDeleteRequestDTO = require("@articleCategoryRequestDTO/articleCategoryDeleteRequestDTO");

exports.createArticleCategory = async (req, res) => {
  try {
    let adminId = req.tokenUser.id;

    const requestDTO = new ArticleCategoryCreateRequestDTO({
      ...req.body,
      adminId,
    });

    logger.info(
      `router/articleCategory.js.reg.params: ${JSON.stringify(requestDTO)}}`,
    );

    handleValidationError(requestDTO);

    const responseDTO = await articleCategoryService.reg(requestDTO);

    res.status(200).json(responseDTO);
  } catch (err) {
    logger.error(
      `router/articleCategory.js.reg.error: ${err.message.toString()}`,
    );
    res.status(500).json({ err: err.message.toString() });
  }
};
exports.getArticleCategoryInfo = async (req, res) => {
  try {
    const requestDTO = new ArticleCategoryReadRequestDTO(req.body);

    logger.info(
      `router/articleCategory.js.info.params: ${JSON.stringify(requestDTO)}`,
    );

    const responseDTO = await articleCategoryService.info(requestDTO);

    logger.info(
      `router/articleCategory.js.info.result: ${JSON.stringify(responseDTO)}`,
    );

    res.status(200).json(responseDTO);
  } catch (err) {
    logger.error(
      `router/articleCategory.js.info.error: ${err.message.toString()}`,
    );
    res.status(500).json({ err: err.message.toString() });
  }
};
exports.getAllArticleCategoryInfo = async (req, res) => {
  try {
    const requestDTO = new ArticleCategoryReadRequestDTO(req.params);

    logger.info(
      `router/articleCategory.js.info.params: ${JSON.stringify(requestDTO)}`,
    );

    const responseDTO =
      await articleCategoryService.getAllAritcleCategoryInfo(requestDTO);

    logger.info(
      `router/articleCategory.js.getAllarticleCategoryInfo.result: ${JSON.stringify(responseDTO)}`,
    );

    res.status(200).json(responseDTO);
  } catch (err) {
    logger.error(
      `router/articleCategory.js.getAllarticleCategoryInfo.error: ${err.message.toString()}`,
    );
    res.status(500).json({ err: err.message.toString() });
  }
};
exports.modifyArticleCategory = async (req, res) => {
  try {
    const requestDTO = new ArticleCategoryUpdateRequestDTO(req.body);

    logger.info(
      `router/articleCategory.js.update.params: ${JSON.stringify(requestDTO)}`,
    );

    const responseDTO = await articleCategoryService.update(req, requestDTO);

    logger.info(
      `router/articleCategory.js.update.result: ${JSON.stringify(responseDTO)}`,
    );

    res.status(200).json(responseDTO);
  } catch (err) {
    logger.error(
      `router/articleCategory.js.update.error: ${err.message.toString()}`,
    );

    res.status(500).json({ err: err.message.toString() });
  }
};
exports.deleteArticleCategory = async (req, res) => {
  try {
    const requestDTO = new ArticleCategoryDeleteRequestDTO(req.body);

    logger.info(
      `router/articleCategory.js.delete.params: ${JSON.stringify(requestDTO)}`,
    );

    const responseDTO = await articleCategoryService.delete(req, requestDTO);

    logger.info(
      `router/articleCategory.js.delete.result: ${JSON.stringify(responseDTO)}`,
    );

    res.status(200).json(responseDTO);
  } catch (err) {
    res.status(500).json({ err: err.message.toString() });
  }
};
exports.deleteArticleCategoryForce = async (req, res) => {
  try {
    const requestDTO = new ArticleCategoryDeleteRequestDTO(req.body);

    logger.info(
      `router/articleCategory.js.delete.params) ${JSON.stringify(requestDTO)}`,
    );

    const responseDTO = await articleCategoryService.deleteForce(
      req,
      requestDTO,
    );

    logger.info(
      `router/articleCategory.js.delete.result ${JSON.stringify(responseDTO)}`,
    );

    res.status(200).json(responseDTO);
  } catch (err) {
    res.status(500).json({ err: err.message.toString() });
  }
};
