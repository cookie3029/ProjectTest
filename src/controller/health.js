const logger = require("@lib/logger");

exports.healthCheck = (req, res) => {
  logger.info("Container HealthChecked");

  res.status(200).json({ status: "success" });
};
