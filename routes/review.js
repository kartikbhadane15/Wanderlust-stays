const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync");
const ExpressError = require("../utils/ExpressError");
const Listing = require("../models/listing");
const Review = require("../models/review");
const { validateReview, isLoggedIn, isReviewAuthor } = require("../middleware");
const { reviewLimiter, filterSpamContent, checkHoneypot } = require("../middleware/security");
const reviewsController = require("../controllers/reviews");

// CREATE REVIEW
router.post(
  "/",
  isLoggedIn,
  reviewLimiter,
  checkHoneypot,
  filterSpamContent,
  validateReview,
  wrapAsync(reviewsController.creteReview)
);
router.delete("/:reviewId",isLoggedIn,isReviewAuthor, wrapAsync(reviewsController.deleteReview));

module.exports = router;
