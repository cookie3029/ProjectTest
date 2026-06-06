const logger = require("@lib/logger");
const adminService = require("@service/adminService");

const AdminCreateRequestDTO = require("@adminRequestDTO/adminCreateRequestDTO");
const AdminReadRequestDTO = require("@adminRequestDTO/adminReadRequestDTO");
const AdminUpdateRequestDTO = require("@adminRequestDTO/adminUpdateRequestDTO");
const AdminDeleteRequestDTO = require("@adminRequestDTO/adminDeleteRequestDTO");

const { handleValidationError } = require("@lib/helper/mvcHelper");
const { selectAdmin, update } = require("@dao/adminDao");

exports.createAdmin = async (req, res) => {
  try {
    const requestDTO = new AdminCreateRequestDTO(req.body);

    logger.info(`router/admin.js.reg.params : ${JSON.stringify(requestDTO)}`);

    requestDTO.isActivated = true;

    handleValidationError(requestDTO);

    const adminInfoResponseDTO = await adminService.getEmailAdmin(requestDTO);

    if (adminInfoResponseDTO.email)
      throw new Error("이미 가입된 이메일입니다.");

    const responseDTO = await adminService.reg(requestDTO);

    logger.info(`router/admin.js.reg.result: ${JSON.stringify(responseDTO)}`);

    res.status(200).json(responseDTO);
  } catch (err) {
    logger.error(`router/admin.js.reg.error : ${err.message.toString()}`);
    res.status(500).json({ err: err.message.toString() });
  }
};

exports.getAdminInfo = async (req, res) => {
  try {
    const requestDTO = new AdminReadRequestDTO(req.params);

    logger.info(`router/admin.js.info.params: ${JSON.stringify(requestDTO)}`);

    const responseDTO = await adminService.info(requestDTO);

    logger.info(`router/admin.js.info.result: ${JSON.stringify(responseDTO)}`);

    res.status(200).json(responseDTO);
  } catch (err) {
    logger.error(`router/admin.js.info.error: ${err.message.toString()}`);
    res.status(500).json({ err: err.message.toString() });
  }
};
exports.getAdminsByName = async (req, res) => {
  try {
    console.log(req.query);

    const requestDTO = new AdminReadRequestDTO({ name: req.query.keyword });

    logger.info(`router/admin.js.info.params: ${JSON.stringify(requestDTO)}`);

    const responseDTO = await adminService.infosByName(requestDTO);

    res.status(200).json(responseDTO);
  } catch (err) {
    logger.error(`router/admin.js.info.error: ${err.message.toString()}`);
    res.status(500).json({ err: err.message.toString() });
  }
};
exports.getAllAdminInfo = async (req, res) => {
  try {
    const requestDTO = new AdminReadRequestDTO(req.params);

    logger.info(`router/admin.js.info.params: ${JSON.stringify(requestDTO)}`);

    const responseDTO = await adminService.getAllAdminInfo(requestDTO);

    logger.info(
      `router/admin.js.getAllAdminInfo.result: ${JSON.stringify(responseDTO)}`,
    );

    res.status(200).json(responseDTO);
  } catch (err) {
    logger.error(
      `router/admin.js.getAllAdminInfo.error: ${err.message.toString()}`,
    );
    res.status(500).json({ err: err.message.toString() });
  }
};
exports.modifyAdminPw = async (req, res) => {
  try {
    const requestDTO = new AdminUpdateRequestDTO({
      ...req.body,
      id: req.tokenUser.id,
    });

    logger.info(`router/admin.js.update.params: ${JSON.stringify(requestDTO)}`);

    const responseDTO = await adminService.editPassword(req, requestDTO);

    logger.info(
      `router/admin.js.update.result: ${JSON.stringify(responseDTO)}`,
    );

    res.status(200).json(responseDTO);
  } catch (err) {
    logger.error(`router/admin.js.update.error: ${err.message.toString()}`);

    res.status(500).json({ err: err.message.toString() });
  }
};
exports.checkEmail = async (req, res) => {
  try {
    const requestDTO = new AdminReadRequestDTO({ ...req.body });

    logger.info(
      `router/admin.js.checkEmail.params: ${JSON.stringify(requestDTO)}`,
    );

    const responseDTO = (await adminService.getEmailAdmin(requestDTO)).id
      ? { isHasEmail: true }
      : { isHasEmail: false };

    logger.info(
      `router/admin.js.checkEmail.result: ${JSON.stringify(responseDTO)}`,
    );

    res.status(200).json(responseDTO);
  } catch (err) {
    logger.error(`router/admin.js.checkEmail.error: ${err.message.toString()}`);

    res.status(500).json({ err: err.message.toString() });
  }
};

exports.deActivateAdmin = async (req, res) => {
  try {
    const requestDTO = new AdminReadRequestDTO({ ...req.body });

    const adminResponseDTO = await selectAdmin(requestDTO);

    if (adminResponseDTO.isActivated === false) {
      throw new Error("이미 비활성화된 계정입니다.");
    }

    const adminDeleteRequestDTO = new AdminDeleteRequestDTO({
      ...adminResponseDTO,
      isActivated: false,
    });

    await update(null, adminDeleteRequestDTO);

    res.status(200).json({ success: true });
  } catch (err) {
    logger.error(
      `router/admin.js.deActivateAdmin.error: ${err.message.toString()}`,
    );

    res.status(500).json({ err: err.message.toString() });
  }
};
