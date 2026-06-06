var express = require("express");

const {
  createInquiryCategory,
  getInquiryCategoryInfo,
  modifyInquiryCategory,
  deleteInquiryCategory,
  deleteInquiryCategoryForce,
  getAllInquiryCategoryInfo,
} = require("@controller/inquiryCategory");

const { isLoggedIn } = require("@middleware/middleware");

const router = express.Router();

router.get("/:id", getInquiryCategoryInfo);

router.get("/", getAllInquiryCategoryInfo);

router.post("/", isLoggedIn, createInquiryCategory);

router.put("/updateInquiryCategory", isLoggedIn, modifyInquiryCategory);

router.delete("/delete", isLoggedIn, deleteInquiryCategory);

router.delete("/deleteForce", isLoggedIn, deleteInquiryCategoryForce);

module.exports = router;
