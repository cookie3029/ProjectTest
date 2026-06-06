const logger = require("@lib/logger");

const articleDao = require("@dao/articleDao");

const articleService = {
  reg: async (requestDTO) => {
    let responseDTO = null;

    try {
      responseDTO = await articleDao.insert(requestDTO);

      logger.debug(`articleService.reg : ${JSON.stringify(responseDTO)}`);
    } catch (err) {
      logger.error(`articleService.reg : ${err}`);

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
      responseDTO = await articleDao.selectInfo(requestDTO);

      logger.debug(`articleService.info : ${JSON.stringify(responseDTO)}`);

      return responseDTO;
    } catch (err) {
      logger.debug(`articleService.info : ${err.message.toString()}`);
    }
  },
  selectAritcle: async (requestDTO) => {
    let responseDTO = null;

    try {
      responseDTO = await articleDao.selectAritcle(requestDTO);

      logger.debug(
        `articleService.selectAritcle: ${JSON.stringify(responseDTO)}`,
      );
    } catch (err) {
      logger.error(`articleService.selectAritcle: ${err.message.toString()}`);

      return new Promise((resolve, reject) => {
        reject(err);
      });
    }

    return new Promise((resolve) => {
      resolve(responseDTO);
    });
  },
  getAllAritcleInfo: async () => {
    let responseDTO = null;

    try {
      responseDTO = await articleDao.getAllAritcleInfo();

      logger.debug(
        `articleService.getAllAritcleInfo: ${JSON.stringify(responseDTO)}`,
      );
    } catch (err) {
      logger.error(
        `articleService.getAllAritcleInfo: ${err.message.toString()}`,
      );

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
      responseDTO = await articleDao.update(req.responseTokenDTO, requestDTO);

      logger.debug(`articleService.edit: ${JSON.stringify(responseDTO)}`);
    } catch (err) {
      logger.error(`articleService.edit: ${err.message.toString()}`);

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
      responseDTO = await articleDao.delete(req.responseTokenDTO, requestDTO);

      logger.debug(`articleService.delete : ${JSON.stringify(responseDTO)}`);
    } catch (err) {
      logger.debug(`articleService.delete : ${err.message.toString()}`);

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
      responseDTO = await articleDao.deleteForce(
        req.responseTokenDTO,
        requestDTO,
      );

      logger.debug(`articleService.delete : ${JSON.stringify(responseDTO)}`);

      return responseDTO;
    } catch (err) {
      logger.debug(`articleService.delete : ${err.message.toString()}`);

      return new Promise((resolve, reject) => {
        reject(err);
      });
    }
  },
};

module.exports = articleService;
