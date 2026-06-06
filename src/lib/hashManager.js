const crypto = require("crypto");

const logger = require("@lib/logger");
const hashHelper = require("@helper/hashHelper");

const hashManager = {
  makePasswordHash: (password) => {
    const salt = crypto.randomBytes(64).toString("base64");

    if (!password) throw new Error("패스워드를 입력하지 않았습니다.");

    return hashHelper.encryptPassword(password, salt);
  },
  checkPasswordHash: (password, encryptPassword) => {
    const parsedData = hashHelper.parsePassword(encryptPassword);

    try {
      if (!password || !encryptPassword) {
        throw new Error("패스워드나 암호화된 hash값이 없습니다.");
      }

      return hashHelper.comparePassword(
        parsedData.hash,
        parsedData.salt,
        password,
      );
    } catch (err) {
      throw new Error(err);
    }
  },
};

module.exports = hashManager;
