const superagent = require("superagent");

const logger = require("@lib/logger");
const envProvider = require("@lib/provider/envProvider");

const inquiryPostService = require("@service/inquiryPostService");

const { handleValidationError } = require("@helper/mvcHelper");

const InquiryPostCreateRequestDTO = require("@inquiryPostRequestDTO/inquiryPostCreateRequestDTO");
const InquiryPostReadRequestDTO = require("@inquiryPostRequestDTO/inquiryPostReadRequestDTO");
const InquiryPostDeleteRequestDTO = require("@inquiryPostRequestDTO/inquiryPostDeleteRequestDTO");

const VisitorCreateRequestDTO = require("@visitorRequestDTO/visitorCreateRequestDTO");

const { File } = require("@models/index");

exports.createInquiryPost = async (req, res) => {
  try {
    const visitorCreateRequestDTO = new VisitorCreateRequestDTO({
      ...req.body,
      broadExpStory: "",
      isAvailableCondition: false,
    });

    const visitorCreateResponseDTO = await superagent
      .post(
        `http://${envProvider.common.endPoint}:${envProvider.common.port}/api/visitor`,
      )
      .send(visitorCreateRequestDTO);

    const requestDTO = new InquiryPostCreateRequestDTO({
      ...req.body,
      visitorId: JSON.parse(visitorCreateResponseDTO.text).id,
    });

    console.log(JSON.stringify(requestDTO));

    logger.info(
      `router/inquiryPost.js.reg.params: ${JSON.stringify(requestDTO)}}`,
    );

    handleValidationError(requestDTO);

    const responseDTO = await inquiryPostService.reg(requestDTO);

    res.status(200).json(responseDTO);
  } catch (err) {
    logger.error(`router/inquiryPost.js.reg.error: ${err.message.toString()}`);
    res.status(500).json({ err: err.message.toString() });
  }
};
exports.getInquiryPostInfo = async (req, res) => {
  try {
    const requestDTO = new InquiryPostReadRequestDTO({ id: req.params.id });

    logger.info(
      `router/inquiryPost.js.info.params: ${JSON.stringify(requestDTO)}`,
    );

    const responseDTO = await inquiryPostService.info(requestDTO);

    logger.info(
      `router/inquiryPost.js.info.result: ${JSON.stringify(responseDTO)}`,
    );

    res.status(200).json(responseDTO);
  } catch (err) {
    logger.error(`router/inquiryPost.js.info.error: ${err.message.toString()}`);
    res.status(500).json({ err: err.message.toString() });
  }
};
exports.getAllInquiryPostInfo = async (req, res) => {
  try {
    const requestDTO = new InquiryPostReadRequestDTO(req.params);

    logger.info(
      `router/inquiryPost.js.info.params: ${JSON.stringify(requestDTO)}`,
    );

    const responseDTO =
      await inquiryPostService.getAllInquiryPostInfo(requestDTO);

    logger.info(
      `router/inquiryPost.js.getAllinquiryPostInfo.result: ${JSON.stringify(responseDTO)}`,
    );

    res.status(200).json(responseDTO);
  } catch (err) {
    logger.error(
      `router/inquiryPost.js.getAllinquiryPostInfo.error: ${err.message.toString()}`,
    );
    res.status(500).json({ err: err.message.toString() });
  }
};
exports.deleteInquiryPost = async (req, res) => {
  try {
    const requestDTO = new InquiryPostDeleteRequestDTO(req.body);

    logger.info(
      `router/inquiryPost.js.delete.params: ${JSON.stringify(requestDTO)}`,
    );

    const responseDTO = await inquiryPostService.delete(req, requestDTO);

    logger.info(
      `router/inquiryPost.js.delete.result: ${JSON.stringify(responseDTO)}`,
    );

    res.status(200).json(responseDTO);
  } catch (err) {
    res.status(500).json({ err: err.message.toString() });
  }
};
exports.deleteInquiryPostForce = async (req, res) => {
  try {
    const requestDTO = new InquiryPostDeleteRequestDTO(req.body);

    logger.info(
      `router/inquiryPost.js.delete.params) ${JSON.stringify(requestDTO)}`,
    );

    const responseDTO = await inquiryPostService.deleteForce(req, requestDTO);

    logger.info(
      `router/inquiryPost.js.delete.result ${JSON.stringify(responseDTO)}`,
    );

    res.status(200).json(responseDTO);
  } catch (err) {
    res.status(500).json({ err: err.message.toString() });
  }
};
exports.fileUpload = async (req, res) => {
  try {
    const { inquiryPostId } = req.params;

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: "업로드된 파일이 없습니다." });
    }

    // 💡 업로드된 파일들을 돌면서 오라클 클라우드가 준 다운로드 URL 주소를 추출합니다.
    const fileRecords = req.files.map((file) => {
      return {
        inquiryPostId: inquiryPostId,
        filePath: file.location, // 🔥 오라클 클라우드에 업로드된 전체 URL 주소
      };
    });

    // Sequelize의 bulkCreate로 한 번에 DB에 대량 Insert
    const savedFiles = await File.bulkCreate(fileRecords);

    return res.status(201).json({
      success: true,
      message: `${savedFiles.length}개의 첨부파일이 성공적으로 업로드 및 DB에 저장되었습니다.`,
      data: savedFiles,
    });
  } catch (error) {
    console.error("파일 업로드 에러:", error);
    return res.status(500).json({ message: "서버 에러가 발생했습니다." });
  }
};
