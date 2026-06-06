var express = require("express");

const {
  createMember,
  getMemberInfo,
  getAllMemberInfo,
  modifyMember,
  deleteMember,
  deleteMemberForce,
  imageUpload,
} = require("@controller/member");

const {
  isLoggedIn,
  memberImageUploadTarget,
} = require("@middleware/middleware");

const upload = require("@config/uploader");
const { ImageUpload } = require("@service/memberService");

const router = express.Router();

router.get("/:id", getMemberInfo);

router.get("/", getAllMemberInfo);

router.post("/", isLoggedIn, createMember);

router.post(
  "/:memberId/image",
  memberImageUploadTarget,
  upload.array("images", 10),
  imageUpload,
);

router.put("/updateMember", isLoggedIn, modifyMember);

router.delete("/delete", isLoggedIn, deleteMember);

router.delete("/deleteForce", isLoggedIn, deleteMemberForce);

module.exports = router;
