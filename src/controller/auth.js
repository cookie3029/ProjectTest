const passport = require("passport");
const superagent = require("superagent");

const logger = require("@lib/logger");

const authService = require("@service/authService");
const adminService = require("@service/adminService");

const adminDao = require("@dao/adminDao");

const { handleValidationError } = require("@lib/helper/mvcHelper");

const LoginRequestDTO = require("@loginRequestDTO/loginRequestDTO");

const AdminReadRequestDTO = require("@adminRequestDTO/adminReadRequestDTO");
const AdminCreateRequestDTO = require("@adminRequestDTO/adminCreateRequestDTO");

exports.login = async (req, res) => {
  try {
    const loginRequestDTO = new LoginRequestDTO(req.body);

    logger.info(
      `router/auth.js ${JSON.stringify({ reqParams: { ...loginRequestDTO } })}`,
    );

    handleValidationError(loginRequestDTO);

    const responseDTO = await authService.login(loginRequestDTO);

    logger.info(`router/auth.js.result: ${JSON.stringify(responseDTO)}`);

    res.status(200).json(responseDTO);
  } catch (err) {
    logger.error(`router/auth.js.error: ${err.message.toString()}`);

    res.status(500).json({ err: err.message.toString() });
  }
};

exports.logout = async (req, res) => {
  try {
    req.tokenUser = null;
    req.newAccessToken && (req.newAccessToken = null);
    req.newRefreshToken && (req.newRefreshToken = null);

    logger.info(`router/auth.js.logout : ${{ isSuccess: true }}`);

    res.status(200).json({ isSuccess: true });
  } catch (err) {
    logger.error(`router/auth.js.error: ${err.message.toString()}`);

    res.status(500).json({ err: err.message.toString() });
  }
};
