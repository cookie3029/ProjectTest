const logger = require("@lib/logger");

const visitorDao = require("@dao/visitorDao");

const visitorService = {
  reg: async (requestDTO) => {
    let responseDTO = null;

    try {
      responseDTO = await visitorDao.insert(requestDTO);

      logger.debug(`visitorService.reg : ${JSON.stringify(responseDTO)}`);
    } catch (err) {
      logger.error(`visitorService.reg : ${err}`);

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
      responseDTO = await visitorDao.delete(req.responseTokenDTO, requestDTO);

      logger.debug(`visitorService.delete : ${JSON.stringify(responseDTO)}`);
    } catch (err) {
      logger.debug(`visitorService.delete : ${err.message.toString()}`);

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
      responseDTO = await visitorDao.deleteForce(
        req.responseTokenDTO,
        requestDTO,
      );

      logger.debug(`visitorService.delete : ${JSON.stringify(responseDTO)}`);

      return responseDTO;
    } catch (err) {
      logger.debug(`visitorService.delete : ${err.message.toString()}`);

      return new Promise((resolve, reject) => {
        reject(err);
      });
    }
  },
};

module.exports = visitorService;
