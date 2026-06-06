const passport = require("passport");

const express = require("express");

const { isLoggedIn } = require("@middleware/middleware");

const { login, logout } = require("@controller/auth");

const router = express.Router();

router.post("/login", login);

router.get("/logout", isLoggedIn, logout);

module.exports = router;
