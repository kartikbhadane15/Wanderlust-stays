const User = require("../models/user");
const Listing = require("../models/listing");
const Review = require("../models/review");

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

module.exports.renderWishlist = async (req, res) => {
    const user = await User.findById(req.user._id).populate("wishlist");
    res.render("users/wishlist.ejs", { wishlist: user.wishlist || [] });
};

module.exports.renderProfile = async (req, res) => {
    const user = await User.findById(req.user._id).populate("wishlist");
    const myListings = await Listing.find({ owner: req.user._id }).populate("reviews");
    const myReviews = await Review.find({ author: req.user._id });

    const reviewIds = myReviews.map(r => r._id);
    const myReviewedListings = await Listing.find({ reviews: { $in: reviewIds } });

    const myReviewsWithListings = myReviews.map(review => {
        const parentListing = myReviewedListings.find(l => 
            l.reviews.some(r => r.toString() === review._id.toString())
        );
        return {
            review,
            listing: parentListing
        };
    });

    const memberSince = (user.createdAt || user._id.getTimestamp()).toLocaleDateString("en-US", {
        month: "long",
        year: "numeric"
    });

    res.render("users/profile.ejs", {
        user,
        myListings,
        myReviews: myReviewsWithListings,
        memberSince
    });
};