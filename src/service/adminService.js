const logger = require("@lib/logger");

const hashManager = require("@lib/hashManager");
const tokenManager = require("@lib/tokenManager");
const envProvider = require("@provider/envProvider");

const adminDao = require("@dao/adminDao");

const adminService = {
  reg: async (requestDTO) => {
    let responseDTO = null;
    let hashPassword = null;

    try {
      hashPassword = await hashManager.makePasswordHash(requestDTO.password);

      logger.debug(
        `adminService.reg - password: ${JSON.stringify(requestDTO.password)}`,
      );
      logger.debug(
        `adminService.reg - hashPassword: ${JSON.stringify(hashPassword)}`,
      );

      requestDTO.password = hashPassword;

      responseDTO = await adminDao.insert(requestDTO);

      logger.debug(`adminService.reg : ${JSON.stringify(responseDTO)}`);
    } catch (err) {
      logger.error(`adminService.reg : ${err}`);

      return new Promise((resolve, reject) => {
        reject(err);
      });
    }

    return new Promise((resolve) => {
      resolve(responseDTO);
    });
  },
  info: async (requestDTO) => {
    let responseDTO = null;

    try {
      responseDTO = await adminDao.selectInfo(requestDTO);

      logger.debug(`adminService.info: ${JSON.stringify(responseDTO)}`);

      return responseDTO;
    } catch (err) {
      logger.debug(`adminService.info: ${err.message.toString()}`);
    }
  },
  infosByName: async (requestDTO) => {
    let responseDTO = null;

    try {
      responseDTO = await adminDao.selectInfosByNames(requestDTO);

      logger.debug(`amdinService.info: ${JSON.stringify(responseDTO)}`);
    } catch (err) {
      logger.error(`amdinService.info: ${err.message.toString()}`);

      return new Promise((resolve, reject) => {
        reject(err);
      });
    }

    return new Promise((resolve) => {
      resolve(responseDTO);
    });
  },
  getEmailAdmin: async (requestDTO) => {
    let responseDTO = null;

    try {
      responseDTO = await adminDao.selectAdmin(requestDTO);

      logger.debug(
        `adminService.getEmailAdmin: ${JSON.stringify(responseDTO)}`,
      );
    } catch (err) {
      logger.error(`adminService.getEmailAdmin: ${err.message.toString()}`);

      return new Promise((resolve, reject) => {
        reject(err);
      });
    }

    return new Promise((resolve) => {
      resolve(responseDTO);
    });
  },
  getAllAdminInfo: async () => {
    let responseDTO = null;

    try {
      responseDTO = await adminDao.getAllAdminInfo();

      logger.debug(
        `adminService.getAllAdminInfo: ${JSON.stringify(responseDTO)}`,
      );
    } catch (err) {
      logger.error(`adminService.getAllAdminInfo: ${err.message.toString()}`);

      return new Promise((resolve, reject) => {
        reject(err);
      });
    }

    return new Promise((resolve) => {
      resolve(responseDTO);
    });
  },
  editPassword: async (req, requestDTO) => {
    let responseDTO = null;
    let hashPassword = null;

    try {
      hashPassword = await hashManager.makePasswordHash(requestDTO.password);

      logger.debug(
        `adminService.edit.password : ${JSON.stringify(requestDTO.password)}`,
      );
      logger.debug(
        `adminService.edit.hashPassword : ${JSON.stringify(hashPassword)}`,
      );

      requestDTO.password = hashPassword;

      responseDTO = await adminDao.update(req.responseTokenDTO, requestDTO);

      logger.debug(`adminService.edit : ${JSON.stringify(responseDTO)}`);
    } catch (err) {
      logger.error(`adminService.edit : ${err.message.toString()}`);

      return new Promise((resolve, reject) => {
        reject(err);
      });
    }

    return new Promise((resolve) => {
      resolve(responseDTO);
    });
  },
};

module.exports = adminService;
