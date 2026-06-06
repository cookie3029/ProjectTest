const logger = require("@lib/logger");

const visitorService = require("@service/visitor");

const { handleValidationError } = require("@helper/mvcHelper");

const VisitorCreateRequestDTO = require("@visitorRequestDTO/visitorCreateRequestDTO");
const VisitorReadRequestDTO = require("@visitorRequestDTO/visitorReadRequestDTO");
const VisitorUpdateRequestDTO = require("@visitorRequestDTO/visitorUpdateRequestDTO");
const VisitorDeleteRequestDTO = require("@visitorRequestDTO/visitorDeleteRequestDTO");

exports.createVisitor = async (req, res) => {
  try {
    const requestDTO = new VisitorCreateRequestDTO({
      ...req.body,
    });

    logger.info(`router/visitor.js.reg.params: ${JSON.stringify(requestDTO)}}`);

    handleValidationError(requestDTO);

    const responseDTO = await visitorService.reg(requestDTO);

    res.status(200).json(responseDTO);
  } catch (err) {
    logger.error(`router/visitor.js.reg.error: ${err.message.toString()}`);
    res.status(500).json({ err: err.message.toString() });
  }
};
exports.getVisitorInfo = async (req, res) => {
  try {
    const requestDTO = new VisitorReadRequestDTO(req.body);

    logger.info(`router/visitor.js.info.params: ${JSON.stringify(requestDTO)}`);

    const responseDTO = await visitorService.info(requestDTO);

    logger.info(
      `router/visitor.js.info.result: ${JSON.stringify(responseDTO)}`,
    );

    res.status(200).json(responseDTO);
  } catch (err) {
    logger.error(`router/visitor.js.info.error: ${err.message.toString()}`);
    res.status(500).json({ err: err.message.toString() });
  }
};
exports.getAllVisitorInfo = async (req, res) => {
  try {
    const requestDTO = new VisitorReadRequestDTO(req.params);

    logger.info(`router/visitor.js.info.params: ${JSON.stringify(requestDTO)}`);

    const responseDTO = await visitorService.getAllAritcleInfo(requestDTO);

    logger.info(
      `router/visitor.js.getAllvisitorInfo.result: ${JSON.stringify(responseDTO)}`,
    );

    res.status(200).json(responseDTO);
  } catch (err) {
    logger.error(
      `router/visitor.js.getAllvisitorInfo.error: ${err.message.toString()}`,
    );
    res.status(500).json({ err: err.message.toString() });
  }
};
exports.modifyVisitor = async (req, res) => {
  try {
    const requestDTO = new VisitorUpdateRequestDTO(req.body);

    logger.info(
      `router/visitor.js.update.params: ${JSON.stringify(requestDTO)}`,
    );

    const responseDTO = await visitorService.update(req, requestDTO);

    logger.info(
      `router/visitor.js.update.result: ${JSON.stringify(responseDTO)}`,
    );

    res.status(200).json(responseDTO);
  } catch (err) {
    logger.error(`router/visitor.js.update.error: ${err.message.toString()}`);

    res.status(500).json({ err: err.message.toString() });
  }
};
exports.deleteVisitor = async (req, res) => {
  try {
    const requestDTO = new VisitorDeleteRequestDTO(req.body);

    logger.info(
      `router/visitor.js.delete.params: ${JSON.stringify(requestDTO)}`,
    );

    const responseDTO = await visitorService.delete(req, requestDTO);

    logger.info(
      `router/visitor.js.delete.result: ${JSON.stringify(responseDTO)}`,
    );

    res.status(200).json(responseDTO);
  } catch (err) {
    res.status(500).json({ err: err.message.toString() });
  }
};
exports.deleteVisitorForce = async (req, res) => {
  try {
    const requestDTO = new VisitorDeleteRequestDTO(req.body);

    logger.info(
      `router/visitor.js.delete.params) ${JSON.stringify(requestDTO)}`,
    );

    const responseDTO = await visitorService.deleteForce(req, requestDTO);

    logger.info(
      `router/visitor.js.delete.result ${JSON.stringify(responseDTO)}`,
    );

    res.status(200).json(responseDTO);
  } catch (err) {
    res.status(500).json({ err: err.message.toString() });
  }
};
