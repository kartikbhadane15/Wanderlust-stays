const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync");
const ExpressError = require("../utils/ExpressError");
const Listing = require("../models/listing");
const { isLoggedIn, isOwner,validateListing } = require("../middleware");
const listingsController = require("../controllers/listings");
const multer = require("multer");
const { storage } = require("../cloudConfig");
const upload = multer({ storage });
const uploadListingImages = upload.fields([
  { name: "listing[images]", maxCount: 10 },
  { name: "listing[image][url]", maxCount: 1 },
]);

router.route("/")
  .get(wrapAsync(listingsController.index))
  .post(isLoggedIn, uploadListingImages, wrapAsync(listingsController.createListing));

// NEW (must come before dynamic routes like "/:id")
router.get("/new", isLoggedIn, listingsController.renderNewForm);

// EDIT (specific route before dynamic "/:id")
router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(listingsController.renderEditForm));

router.route("/:id")
  .get(wrapAsync(listingsController.showListing))
  .put(isLoggedIn, isOwner, uploadListingImages, validateListing, wrapAsync(listingsController.updateListing))
  .delete(isLoggedIn, isOwner, wrapAsync(listingsController.deleteListing));

// WISHLIST TOGGLE
router.post("/:id/wishlist", isLoggedIn, wrapAsync(listingsController.toggleWishlist));

module.exports = router;