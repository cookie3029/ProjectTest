var express = require("express");

const {
  createVisitor,
  getVisitorInfo,
  deleteVisitor,
  deleteVisitorForce,
  getAllVisitorInfo,
} = require("@controller/visitor");

const { isLoggedIn } = require("@middleware/middleware");

const router = express.Router();

router.get("/:id", getVisitorInfo);

router.get("/", getAllVisitorInfo);

router.post("/", createVisitor);

router.delete("/delete", isLoggedIn, deleteVisitor);

router.delete("/deleteForce", isLoggedIn, deleteVisitorForce);

module.exports = router;
