const logger = require("@lib/logger");

const inquiryPostDao = require("@dao/inquiryPostDao");

const inquiryPostService = {
  reg: async (requestDTO) => {
    let responseDTO = null;

    try {
      responseDTO = await inquiryPostDao.insert(requestDTO);

      logger.debug(`inquiryPostService.reg : ${JSON.stringify(responseDTO)}`);
    } catch (err) {
      logger.error(`inquiryPostService.reg : ${err}`);

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
      responseDTO = await inquiryPostDao.selectInfo(requestDTO);

      logger.debug(`inquiryPostService.info : ${JSON.stringify(responseDTO)}`);

      return responseDTO;
    } catch (err) {
      logger.debug(`inquiryPostService.info : ${err.message.toString()}`);
    }
  },
  selectInquiryPost: async (requestDTO) => {
    let responseDTO = null;

    try {
      responseDTO = await inquiryPostDao.selectInquiryPost(requestDTO);

      logger.debug(
        `inquiryPostService.selectInquiryPost: ${JSON.stringify(responseDTO)}`,
      );
    } catch (err) {
      logger.error(
        `inquiryPostService.selectInquiryPost: ${err.message.toString()}`,
      );

      return new Promise((resolve, reject) => {
        reject(err);
      });
    }

    return new Promise((resolve) => {
      resolve(responseDTO);
    });
  },
  getAllInquiryPostInfo: async () => {
    let responseDTO = null;

    try {
      responseDTO = await inquiryPostDao.getAllInquiryPostInfo();

      logger.debug(
        `inquiryPostService.getAllInquiryPostInfo: ${JSON.stringify(responseDTO)}`,
      );
    } catch (err) {
      logger.error(
        `inquiryPostService.getAllInquiryPostInfo: ${err.message.toString()}`,
      );

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
      responseDTO = await inquiryPostDao.delete(
        req.responseTokenDTO,
        requestDTO,
      );

      logger.debug(
        `inquiryPostService.delete : ${JSON.stringify(responseDTO)}`,
      );
    } catch (err) {
      logger.debug(`inquiryPostService.delete : ${err.message.toString()}`);

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
      responseDTO = await inquiryPostDao.deleteForce(
        req.responseTokenDTO,
        requestDTO,
      );

      logger.debug(
        `inquiryPostService.delete : ${JSON.stringify(responseDTO)}`,
      );

      return responseDTO;
    } catch (err) {
      logger.debug(`inquiryPostService.delete : ${err.message.toString()}`);

      return new Promise((resolve, reject) => {
        reject(err);
      });
    }
  },
};

module.exports = inquiryPostService;
