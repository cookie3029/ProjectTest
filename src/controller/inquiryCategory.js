const logger = require("@lib/logger");

const inquiryCategoryService = require("@service/inquiryCategoryService");

const { handleValidationError } = require("@helper/mvcHelper");

const InquiryCategoryCreateRequestDTO = require("@inquiryCategoryRequestDTO/inquiryCategoryCreateRequestDTO");
const InquiryCategoryReadRequestDTO = require("@inquiryCategoryRequestDTO/inquiryCategoryReadRequestDTO");
const InquiryCategoryUpdateRequestDTO = require("@inquiryCategoryRequestDTO/inquiryCategoryUpdateRequestDTO");
const InquiryCategoryDeleteRequestDTO = require("@inquiryCategoryRequestDTO/inquiryCategoryDeleteRequestDTO");

exports.createInquiryCategory = async (req, res) => {
  try {
    let adminId = req.tokenUser.id;

    const requestDTO = new InquiryCategoryCreateRequestDTO({
      ...req.body,
      adminId,
    });

    console.log(JSON.stringify(requestDTO));

    logger.info(
      `router/inquiryCategory.js.reg.params: ${JSON.stringify(requestDTO)}}`,
    );

    handleValidationError(requestDTO);

    const responseDTO = await inquiryCategoryService.reg(requestDTO);

    res.status(200).json(responseDTO);
  } catch (err) {
    logger.error(
      `router/inquiryCategory.js.reg.error: ${err.message.toString()}`,
    );
    res.status(500).json({ err: err.message.toString() });
  }
};
exports.getInquiryCategoryInfo = async (req, res) => {
  try {
    const requestDTO = new InquiryCategoryReadRequestDTO(req.body);

    logger.info(
      `router/inquiryCategory.js.info.params: ${JSON.stringify(requestDTO)}`,
    );

    const responseDTO = await inquiryCategoryService.info(requestDTO);

    logger.info(
      `router/inquiryCategory.js.info.result: ${JSON.stringify(responseDTO)}`,
    );

    res.status(200).json(responseDTO);
  } catch (err) {
    logger.error(
      `router/inquiryCategory.js.info.error: ${err.message.toString()}`,
    );
    res.status(500).json({ err: err.message.toString() });
  }
};
exports.getAllInquiryCategoryInfo = async (req, res) => {
  try {
    const requestDTO = new InquiryCategoryReadRequestDTO(req.params);

    logger.info(
      `router/inquiryCategory.js.info.params: ${JSON.stringify(requestDTO)}`,
    );

    const responseDTO =
      await inquiryCategoryService.getAllinquiryCategoryInfo(requestDTO);

    logger.info(
      `router/inquiryCategory.js.getAllinquiryCategoryInfo.result: ${JSON.stringify(responseDTO)}`,
    );

    res.status(200).json(responseDTO);
  } catch (err) {
    logger.error(
      `router/inquiryCategory.js.getAllinquiryCategoryInfo.error: ${err.message.toString()}`,
    );
    res.status(500).json({ err: err.message.toString() });
  }
};
exports.modifyInquiryCategory = async (req, res) => {
  try {
    const requestDTO = new InquiryCategoryUpdateRequestDTO(req.body);

    logger.info(
      `router/inquiryCategory.js.update.params: ${JSON.stringify(requestDTO)}`,
    );

    const responseDTO = await inquiryCategoryService.update(req, requestDTO);

    logger.info(
      `router/inquiryCategory.js.update.result: ${JSON.stringify(responseDTO)}`,
    );

    res.status(200).json(responseDTO);
  } catch (err) {
    logger.error(
      `router/inquiryCategory.js.update.error: ${err.message.toString()}`,
    );

    res.status(500).json({ err: err.message.toString() });
  }
};
exports.deleteInquiryCategory = async (req, res) => {
  try {
    const requestDTO = new InquiryCategoryDeleteRequestDTO(req.body);

    logger.info(
      `router/inquiryCategory.js.delete.params: ${JSON.stringify(requestDTO)}`,
    );

    const responseDTO = await inquiryCategoryService.delete(req, requestDTO);

    logger.info(
      `router/inquiryCategory.js.delete.result: ${JSON.stringify(responseDTO)}`,
    );

    res.status(200).json(responseDTO);
  } catch (err) {
    res.status(500).json({ err: err.message.toString() });
  }
};
exports.deleteInquiryCategoryForce = async (req, res) => {
  try {
    const requestDTO = new InquiryCategoryDeleteRequestDTO(req.body);

    logger.info(
      `router/inquiryCategory.js.delete.params) ${JSON.stringify(requestDTO)}`,
    );

    const responseDTO = await inquiryCategoryService.deleteForce(
      req,
      requestDTO,
    );

    logger.info(
      `router/inquiryCategory.js.delete.result ${JSON.stringify(responseDTO)}`,
    );

    res.status(200).json(responseDTO);
  } catch (err) {
    res.status(500).json({ err: err.message.toString() });
  }
};
