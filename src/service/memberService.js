const logger = require("@lib/logger");

const hashManager = require("@lib/hashManager");
const tokenManager = require("@lib/tokenManager");
const envProvider = require("@provider/envProvider");

const memberDao = require("@dao/memberDao");

const memberService = {
  reg: async (requestDTO) => {
    let responseDTO = null;

    try {
      responseDTO = await memberDao.insert(requestDTO);

      logger.debug(`memberService.reg : ${JSON.stringify(responseDTO)}`);
    } catch (err) {
      logger.error(`memberService.reg : ${err}`);

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
      responseDTO = await memberDao.selectInfo(requestDTO);

      logger.debug(`memberService.info : ${JSON.stringify(responseDTO)}`);

      return responseDTO;
    } catch (err) {
      logger.debug(`memberService.info : ${err.message.toString()}`);
    }
  },
  selectMember: async (requestDTO) => {
    let responseDTO = null;

    try {
      responseDTO = await memberDao.selectMember(requestDTO);

      logger.debug(
        `memberService.selectMember: ${JSON.stringify(responseDTO)}`,
      );
    } catch (err) {
      logger.error(`memberService.selectMember: ${err.message.toString()}`);

      return new Promise((resolve, reject) => {
        reject(err);
      });
    }

    return new Promise((resolve) => {
      resolve(responseDTO);
    });
  },
  getAllMemberInfo: async () => {
    let responseDTO = null;

    try {
      responseDTO = await memberDao.getAllMemberInfo();

      logger.debug(
        `memberService.getAllMemberInfo: ${JSON.stringify(responseDTO)}`,
      );
    } catch (err) {
      logger.error(`memberService.getAllMemberInfo: ${err.message.toString()}`);

      return new Promise((resolve, reject) => {
        reject(err);
      });
    }
    return new Promise((resolve) => {
      resolve(responseDTO);
    });
  },
  update: async (req, requestDTO) => {
    let responseDTO = null;

    try {
      responseDTO = await memberDao.update(req.responseTokenDTO, requestDTO);

      logger.debug(`memberService.edit: ${JSON.stringify(responseDTO)}`);
    } catch (err) {
      logger.error(`memberService.edit: ${err.message.toString()}`);

      return new Promise((resolve, reject) => {
        reject(err);
      });
    }

    return new Promise((resolve) => {
      resolve(responseDTO);
    });
  },
  delete: async (req, requestDTO) => {
    let responseDTO = null;

    try {
      responseDTO = await memberDao.delete(req.responseTokenDTO, requestDTO);

      logger.debug(`memberService.delete : ${JSON.stringify(responseDTO)}`);
    } catch (err) {
      logger.debug(`memberService.delete : ${err.message.toString()}`);

      return new Promise((resolve, reject) => {
        reject(err);
      });
    }

    return new Promise((resolve) => {
      resolve(responseDTO);
    });
  },
  deleteForce: async (req, requestDTO) => {
    let responseDTO = null;

    try {
      responseDTO = await memberDao.deleteForce(
        req.responseTokenDTO,
        requestDTO,
      );

      logger.debug(`memberService.delete : ${JSON.stringify(responseDTO)}`);

      return responseDTO;
    } catch (err) {
      logger.debug(`memberService.delete : ${err.message.toString()}`);

      return new Promise((resolve, reject) => {
        reject(err);
      });
    }
  },
};

module.exports = memberService;
