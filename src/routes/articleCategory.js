var express = require("express");

const {
  createArticleCategory,
  getArticleCategoryInfo,
  modifyArticleCategory,
  deleteArticleCategory,
  deleteArticleCategoryForce,
  getAllArticleCategoryInfo,
} = require("@controller/articleCategory");

const { isLoggedIn } = require("@middleware/middleware");

const router = express.Router();

router.get("/:id", getArticleCategoryInfo);

router.get("/", getAllArticleCategoryInfo);

router.post("/", isLoggedIn, createArticleCategory);

router.put("/updateArticleCategory", isLoggedIn, modifyArticleCategory);

router.delete("/delete", isLoggedIn, deleteArticleCategory);

router.delete("/deleteForce", isLoggedIn, deleteArticleCategoryForce);

module.exports = router;
