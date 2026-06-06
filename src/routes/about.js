var express = require("express");

const {
  createAbout,
  getAboutInfo,
  modifyAbout,
  deleteAbout,
  deleteAboutForce,
  getAllAboutInfo,
} = require("@controller/about");

const { isLoggedIn } = require("@middleware/middleware");

const router = express.Router();

router.get("/:id", getAboutInfo);

router.get("/", getAllAboutInfo);

router.post("/", isLoggedIn, createAbout);

router.put("/updateAbout", isLoggedIn, modifyAbout);

router.delete("/delete", isLoggedIn, deleteAbout);

router.delete("/deleteForce", isLoggedIn, deleteAboutForce);

module.exports = router;
