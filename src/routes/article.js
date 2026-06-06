var express = require("express");

const {
  createArticle,
  getArticleInfo,
  ImageUpload,
  modifyArticle,
  deleteArticle,
  deleteArticleForce,
  getAllArticleInfo,
} = require("@controller/article");

const {
  isLoggedIn,
  articleImageUploadTarget,
} = require("@middleware/middleware");

const upload = require("@config/uploader");

const router = express.Router();

router.get("/:id", getArticleInfo);

router.get("/", getAllArticleInfo);

router.post("/", isLoggedIn, createArticle);

router.post(
  "/:articleId/image",
  articleImageUploadTarget,
  upload.array("images", 10),
  ImageUpload,
);

router.put("/updateArticle", isLoggedIn, modifyArticle);

router.delete("/delete", isLoggedIn, deleteArticle);

router.delete("/deleteForce", isLoggedIn, deleteArticleForce);

module.exports = router;
