var express = require("express");

const {
  createAdmin,
  getAdminInfo,
  deActivateAdmin,
  getAdminsByName,
  getAllAdminInfo,
  modifyAdminPw,
} = require("@controller/admin");
const { isLoggedIn } = require("@middleware/middleware");

const router = express.Router();

router.get("/:id", getAdminInfo);

router.get("/", getAllAdminInfo);

router.get("/getAdmins/name", getAdminsByName);

router.post("/", createAdmin);

router.put("/updatePw", isLoggedIn, modifyAdminPw);

router.delete("/deactivate", deActivateAdmin);

module.exports = router;
