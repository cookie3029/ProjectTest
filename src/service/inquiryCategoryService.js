const logger = require("@lib/logger");

const inquiryCategoryDao = require("@dao/inquiryCategoryDao");

const inquiryCategoryService = {
  reg: async (requestDTO) => {
    let responseDTO = null;

    try {
      responseDTO = await inquiryCategoryDao.insert(requestDTO);

      logger.debug(
        `inquiryCategoryService.reg : ${JSON.stringify(responseDTO)}`,
      );
    } catch (err) {
      logger.error(`inquiryCategoryService.reg : ${err}`);

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
      responseDTO = await inquiryCategoryDao.selectInfo(requestDTO);

      logger.debug(
        `inquiryCategoryService.info : ${JSON.stringify(responseDTO)}`,
      );

      return responseDTO;
    } catch (err) {
      logger.debug(`inquiryCategoryService.info : ${err.message.toString()}`);
    }
  },
  selectInquiryCategory: async (requestDTO) => {
    let responseDTO = null;

    try {
      responseDTO = await inquiryCategoryDao.selectInquiryCategory(requestDTO);

      logger.debug(
        `inquiryCategoryService.selectInquiryCategory: ${JSON.stringify(responseDTO)}`,
      );
    } catch (err) {
      logger.error(
        `inquiryCategoryService.selectInquiryCategory: ${err.message.toString()}`,
      );

      return new Promise((resolve, reject) => {
        reject(err);
      });
    }

    return new Promise((resolve) => {
      resolve(responseDTO);
    });
  },
  getAllInquiryCategoryInfo: async () => {
    let responseDTO = null;

    try {
      responseDTO = await inquiryCategoryDao.getAllInquiryCategoryInfo();

      logger.debug(
        `inquiryCategoryService.getAllInquiryCaegoryInfo: ${JSON.stringify(responseDTO)}`,
      );
    } catch (err) {
      logger.error(
        `inquiryCategoryService.getAllInquiryCaegoryInfo: ${err.message.toString()}`,
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
      responseDTO = await inquiryCategoryDao.update(
        req.responseTokenDTO,
        requestDTO,
      );

      logger.debug(
        `inquiryCategoryService.edit: ${JSON.stringify(responseDTO)}`,
      );
    } catch (err) {
      logger.error(`inquiryCategoryService.edit: ${err.message.toString()}`);

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
      responseDTO = await inquiryCategoryDao.delete(
        req.responseTokenDTO,
        requestDTO,
      );

      logger.debug(
        `inquiryCategoryService.delete : ${JSON.stringify(responseDTO)}`,
      );
    } catch (err) {
      logger.debug(`inquiryCategoryService.delete : ${err.message.toString()}`);

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
      responseDTO = await inquiryCategoryDao.deleteForce(
        req.responseTokenDTO,
        requestDTO,
      );

      logger.debug(
        `inquiryCategoryService.delete : ${JSON.stringify(responseDTO)}`,
      );

      return responseDTO;
    } catch (err) {
      logger.debug(`inquiryCategoryService.delete : ${err.message.toString()}`);

      return new Promise((resolve, reject) => {
        reject(err);
      });
    }
  },
};

module.exports = inquiryCategoryService;
