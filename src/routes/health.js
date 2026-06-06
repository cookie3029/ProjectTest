var express = require("express");

const { healthCheck } = require("@controller/health");

const router = express.Router();

router.get("/", healthCheck);

module.exports = router;
