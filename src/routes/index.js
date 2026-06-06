var express = require("express");
var router = express.Router();

const healthRouter = require("@routes/health");
const authRouter = require("@routes/auth");
const adminRouter = require("@routes/admin");
const memberRouter = require("@routes/member");
const visitorRouter = require("@routes/visitor");
const aboutRouter = require("@routes/about");
const articleRouter = require("@routes/article");
const inquiryPostRouter = require("@routes/inquiryPost");
const inquiryCategoryRouter = require("@routes/inquiryCategory");
const articleCategoryRouter = require("@routes/articleCategory");

router.use("/health", healthRouter);
router.use("/auth", authRouter);
router.use("/admin", adminRouter);
router.use("/admin", adminRouter);
router.use("/member", memberRouter);
router.use("/visitor", visitorRouter);
router.use("/about", aboutRouter);
router.use("/article", articleRouter);
router.use("/inquiryPost", inquiryPostRouter);
router.use("/inquiryCategory", inquiryCategoryRouter);
router.use("/articleCategory", articleCategoryRouter);

module.exports = router;
