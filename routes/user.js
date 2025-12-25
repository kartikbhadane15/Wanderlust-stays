const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync.js");
const passport = require("passport");
const { savedRedirectUrl } = require("../middleware.js");


router.get("/signup", (req, res) => {
  res.render("users/signup.ejs");
});

router.post("/signup", wrapAsync(async (req, res) => {
    try {
           let { username, email, password } = req.body;
           const newUser = new User({ username, email });
          const registeredUser = await User.register(newUser, password);
          req.login(registeredUser, err => {
              if (err) {
                return next(err);
              }
                  req.flash("success", "Successfully signed up! Welcome to Wanderlust Stays!");
                  res.redirect("/listings");
          });
      
    } catch (e) {
          req.flash("error", e.message);
          res.redirect("/signup");
    }
}));

router.get("/login", (req, res) => {
  res.render("users/login.ejs");
});

router.post("/login",savedRedirectUrl,passport.authenticate("local", {
    failureFlash: true,
    failureRedirect: "/login",
}), async (req, res) => {
    req.flash("success", "Welcome back to Wanderlust Stays!");
    // const redirectUrl = req.session.returnTo || "/listings";
    // delete req.session.returnTo;
    // res.redirect(redirectUrl);
    res.redirect(res.locals.redirectUrl || "/listings");
});

router.get("/logout", (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        req.flash("success", "Logged out successfully!");
        res.redirect("/listings");
    });
});

module.exports = router;