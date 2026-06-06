const logger = require("@lib/logger");
const hashManager = require("@lib/hashManager");
const tokenManager = require("@lib/tokenManager");

const adminDao = require("@dao/adminDao");
const LoginResponseDTO = require("@loginResponseDTO/loginResponseDTO");

const authService = {
  login: async (requestDTO) => {
    let tokenResponse = null;

    let selectedAdminInfo = null;

    try {
      selectedAdminInfo = await adminDao.selectAdmin(requestDTO);

      if (!selectedAdminInfo.id) {
        throw new Error(
          `authService.login: 일치하는 유저정보가 없습니다 (email: ${JSON.stringify(requestDTO.email)})`,
        );
      }

      if (!selectedAdminInfo.isActivated) {
        throw new Error(`authService.login: 비활성화된 계정입니다.`);
      }

      const checkPassword = await hashManager.checkPasswordHash(
        requestDTO.password,
        selectedAdminInfo.password,
      );

      if (checkPassword === false) {
        throw new Error("패스워드가 일치하지 않습니다.");
      }

      const loginResult = await tokenManager.makeTokens(selectedAdminInfo);

      tokenResponse = new LoginResponseDTO(loginResult);
    } catch (err) {
      logger.error(`authService.login: ${err.message.toString()}`);

      return new Promise((resolve, reject) => {
        reject(err);
      });
    }

    return new Promise((resolve) => {
      resolve(tokenResponse);
    });
  },
};

module.exports = authService;
