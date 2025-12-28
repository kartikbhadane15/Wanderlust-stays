const User = require("../models/user");

module.exports.renderSignupForm = (req, res) => {
  res.render("users/signup.ejs");
};

module.exports.signup = async (req, res) => {
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
};

module.exports.renderLoginForm = (req, res) => {
  res.render("users/login.ejs");
};

module.exports.login =  async (req, res) => {
    req.flash("success", "Welcome back to Wanderlust Stays!");
    // const redirectUrl = req.session.returnTo || "/listings";
    // delete req.session.returnTo;
    // res.redirect(redirectUrl);
    res.redirect(res.locals.redirectUrl || "/listings");
};

module.exports.logout =  (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        req.flash("success", "Logged out successfully!");
        res.redirect("/listings");
    });
};