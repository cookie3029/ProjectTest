const logger = require("@lib/logger");

const aboutDao = require("@dao/aboutDao");

const aboutService = {
  reg: async (requestDTO) => {
    let responseDTO = null;

    try {
      responseDTO = await aboutDao.insert(requestDTO);

      logger.debug(`aboutService.reg : ${JSON.stringify(responseDTO)}`);
    } catch (err) {
      logger.error(`aboutService.reg : ${err}`);

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
      responseDTO = await aboutDao.selectInfo(requestDTO);

      logger.debug(`aboutService.info : ${JSON.stringify(responseDTO)}`);

      return responseDTO;
    } catch (err) {
      logger.debug(`aboutService.info : ${err.message.toString()}`);
    }
  },
  selectAbout: async (requestDTO) => {
    let responseDTO = null;

    try {
      responseDTO = await aboutDao.selectAbout(requestDTO);

      logger.debug(`aboutService.selectAbout: ${JSON.stringify(responseDTO)}`);
    } catch (err) {
      logger.error(`aboutService.selectAbout: ${err.message.toString()}`);

      return new Promise((resolve, reject) => {
        reject(err);
      });
    }

    return new Promise((resolve) => {
      resolve(responseDTO);
    });
  },
  getAllAboutInfo: async () => {
    let responseDTO = null;

    try {
      responseDTO = await aboutDao.getAllAboutInfo();

      logger.debug(
        `aboutService.getAllAboutInfo: ${JSON.stringify(responseDTO)}`,
      );
    } catch (err) {
      logger.error(`aboutService.getAllAboutInfo: ${err.message.toString()}`);

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
      responseDTO = await aboutDao.update(req.responseTokenDTO, requestDTO);

      logger.debug(`aboutService.edit: ${JSON.stringify(responseDTO)}`);
    } catch (err) {
      logger.error(`aboutService.edit: ${err.message.toString()}`);

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
      responseDTO = await aboutDao.delete(req.responseTokenDTO, requestDTO);

      logger.debug(`aboutService.delete : ${JSON.stringify(responseDTO)}`);
    } catch (err) {
      logger.debug(`aboutService.delete : ${err.message.toString()}`);

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
      responseDTO = await aboutDao.deleteForce(
        req.responseTokenDTO,
        requestDTO,
      );

      logger.debug(`aboutService.delete : ${JSON.stringify(responseDTO)}`);

      return responseDTO;
    } catch (err) {
      logger.debug(`aboutService.delete : ${err.message.toString()}`);

      return new Promise((resolve, reject) => {
        reject(err);
      });
    }
  },
};

module.exports = aboutService;
