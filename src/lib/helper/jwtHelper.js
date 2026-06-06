const jwt = require("jsonwebtoken");

const envProvider = require("@provider/envProvider");

const jwtHelper = {
  makePayload: (admin) => ({
    id: admin.id,
    email: admin.email,
    name: admin.name,
    phone: admin.phone,
  }),
  getTokens: (payload) => {
    const accessToken = jwtHelper.getToken(payload, "access");
    const refreshToken = jwtHelper.getToken(payload, "refresh");

    return { accessToken, refreshToken };
  },
  getToken: (payload, flag) =>
    jwt.sign(
      payload,
      flag === "access"
        ? envProvider.jwt.secretKey.accessKey
        : envProvider.jwt.secretKey.refreshKey,
      flag === "access"
        ? envProvider.jwt.options.accessTokenOptions
        : envProvider.jwt.options.refreshTokenOptions,
    ),
};

module.exports = jwtHelper;
