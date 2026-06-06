var express = require("express");

const {
  createInquiryPost,
  getInquiryPostInfo,
  deleteInquiryPost,
  deleteInquiryPostForce,
  getAllInquiryPostInfo,
  fileUpload,
} = require("@controller/inquiryPost");

const {
  isLoggedIn,
  inquiryPostFileUploadTarget,
} = require("@middleware/middleware");

const upload = require("@config/uploader");

const router = express.Router();

router.get("/:id", getInquiryPostInfo);

router.get("/", getAllInquiryPostInfo);

router.post("/", createInquiryPost);

router.post(
  "/:inquiryPost/file",
  inquiryPostFileUploadTarget,
  upload.array("files", 5),
  fileUpload,
);

router.delete("/delete", isLoggedIn, deleteInquiryPost);

router.delete("/deleteForce", isLoggedIn, deleteInquiryPostForce);

module.exports = router;
