const logger = require("@lib/logger");

const articleCategoryDao = require("@dao/articleCategoryDao");

const articleCategoryService = {
  reg: async (requestDTO) => {
    let responseDTO = null;

    try {
      responseDTO = await articleCategoryDao.insert(requestDTO);

      logger.debug(
        `articleCategoryService.reg : ${JSON.stringify(responseDTO)}`,
      );
    } catch (err) {
      logger.error(`articleCategoryService.reg : ${err}`);

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
      responseDTO = await articleCategoryDao.selectInfo(requestDTO);

      logger.debug(
        `articleCategoryService.info : ${JSON.stringify(responseDTO)}`,
      );

      return responseDTO;
    } catch (err) {
      logger.debug(`articleCategoryService.info : ${err.message.toString()}`);
    }
  },
  selectAritcleCategory: async (requestDTO) => {
    let responseDTO = null;

    try {
      responseDTO = await articleCategoryDao.selectAritcleCategory(requestDTO);

      logger.debug(
        `articleCategoryService.selectAritcleCategory: ${JSON.stringify(responseDTO)}`,
      );
    } catch (err) {
      logger.error(
        `articleCategoryService.selectAritcleCategory: ${err.message.toString()}`,
      );

      return new Promise((resolve, reject) => {
        reject(err);
      });
    }

    return new Promise((resolve) => {
      resolve(responseDTO);
    });
  },
  getAllAritcleCategoryInfo: async () => {
    let responseDTO = null;

    try {
      responseDTO = await articleCategoryDao.getAllAritcleCategoryInfo();

      logger.debug(
        `articleCategoryService.getAllAritcleCategoryInfo: ${JSON.stringify(responseDTO)}`,
      );
    } catch (err) {
      logger.error(
        `articleCategoryService.getAllAritcleCategoryInfo: ${err.message.toString()}`,
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
      responseDTO = await articleCategoryDao.update(
        req.responseTokenDTO,
        requestDTO,
      );

      logger.debug(
        `articleCategoryService.edit: ${JSON.stringify(responseDTO)}`,
      );
    } catch (err) {
      logger.error(`articleCategoryService.edit: ${err.message.toString()}`);

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
      responseDTO = await articleCategoryDao.delete(
        req.responseTokenDTO,
        requestDTO,
      );

      logger.debug(
        `articleCategoryService.delete : ${JSON.stringify(responseDTO)}`,
      );
    } catch (err) {
      logger.debug(`articleCategoryService.delete : ${err.message.toString()}`);

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
      responseDTO = await articleCategoryDao.deleteForce(
        req.responseTokenDTO,
        requestDTO,
      );

      logger.debug(
        `articleCategoryService.delete : ${JSON.stringify(responseDTO)}`,
      );

      return responseDTO;
    } catch (err) {
      logger.debug(`articleCategoryService.delete : ${err.message.toString()}`);

      return new Promise((resolve, reject) => {
        reject(err);
      });
    }
  },
};

module.exports = articleCategoryService;
