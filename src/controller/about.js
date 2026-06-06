const logger = require("@lib/logger");

const aboutService = require("@service/aboutService");

const AboutCreateRequestDTO = require("@aboutRequestDTO/aboutCreateRequestDTO");
const AboutReadRequestDTO = require("@aboutRequestDTO/aboutReadRequestDTO");
const AboutUpdateRequestDTO = require("@aboutRequestDTO/aboutUpdateRequestDTO");
const AboutDeleteRequestDTO = require("@aboutRequestDTO/aboutDeleteRequestDTO");

const { handleValidationError } = require("@helper/mvcHelper");

exports.createAbout = async (req, res) => {
  try {
    const requestDTO = new AboutCreateRequestDTO(req.body);

    logger.info(`router/about.js.reg.params: ${JSON.stringify(requestDTO)}}`);

    handleValidationError(requestDTO);

    const responseDTO = await aboutService.reg(requestDTO);

    res.status(200).json(responseDTO);
  } catch (err) {
    logger.error(`router/about.js.reg.error: ${err.message.toString()}`);
    res.status(500).json({ err: err.message.toString() });
  }
};
exports.getAboutInfo = async (req, res) => {
  try {
    logger.info(`router/about.js.info.params: ${JSON.stringify(requestDTO)}`);

    const responseDTO = await aboutService.info();

    logger.info(`router/about.js.info.result: ${JSON.stringify(responseDTO)}`);

    res.status(200).json(responseDTO);
  } catch (err) {
    logger.error(`router/about.js.info.error: ${err.message.toString()}`);
    res.status(500).json({ err: err.message.toString() });
  }
};
exports.getAllAboutInfo = async (req, res) => {
  try {
    const requestDTO = new AboutReadRequestDTO(req.params);

    logger.info(`router/about.js.info.params: ${JSON.stringify(requestDTO)}`);

    const responseDTO = await aboutService.getAllAboutInfo(requestDTO);

    logger.info(
      `router/about.js.getAllAboutInfo.result: ${JSON.stringify(responseDTO)}`,
    );

    res.status(200).json(responseDTO);
  } catch (err) {
    logger.error(
      `router/about.js.getAllAboutInfo.error: ${err.message.toString()}`,
    );
    res.status(500).json({ err: err.message.toString() });
  }
};
exports.modifyAbout = async (req, res) => {
  try {
    const requestDTO = new AboutUpdateRequestDTO(req.body);

    logger.info(`router/about.js.update.params: ${JSON.stringify(requestDTO)}`);

    const responseDTO = await aboutService.update(req, requestDTO);

    logger.info(
      `router/about.js.update.result: ${JSON.stringify(responseDTO)}`,
    );

    res.status(200).json(responseDTO);
  } catch (err) {
    logger.error(`router/about.js.update.error: ${err.message.toString()}`);

    res.status(500).json({ err: err.message.toString() });
  }
};
exports.deleteAbout = async (req, res) => {
  try {
    const requestDTO = new AboutDeleteRequestDTO(req.body);

    logger.info(`router/about.js.delete.params: ${JSON.stringify(requestDTO)}`);

    const responseDTO = await aboutService.delete(req, requestDTO);

    logger.info(
      `router/about.js.delete.result: ${JSON.stringify(responseDTO)}`,
    );

    res.status(200).json(responseDTO);
  } catch (err) {
    res.status(500).json({ err: err.message.toString() });
  }
};
exports.deleteAboutForce = async (req, res) => {
  try {
    const requestDTO = new AboutDeleteRequestDTO(req.body);

    logger.info(`router/about.js.delete.params) ${JSON.stringify(requestDTO)}`);

    const responseDTO = await aboutService.deleteForce(req, requestDTO);

    logger.info(`router/about.js.delete.result ${JSON.stringify(responseDTO)}`);

    res.status(200).json(responseDTO);
  } catch (err) {
    res.status(500).json({ err: err.message.toString() });
  }
};
