const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync.js");
const passport = require("passport");
const { savedRedirectUrl } = require("../middleware.js");
const usersController = require("../controllers/users.js");



router.get("/signup", usersController.renderSignupForm);

router.post("/signup", wrapAsync(usersController.signup));

router.get("/login", usersController.renderLoginForm);

router.post("/login",savedRedirectUrl,passport.authenticate("local", {
    failureFlash: true,
    failureRedirect: "/login",
}), usersController.login);

router.get("/logout",usersController.logout);

module.exports = router;