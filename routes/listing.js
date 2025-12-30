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


router.route("/")
  .get(wrapAsync(listingsController.index))
  .post(isLoggedIn, upload.single("listing[image][url]"), wrapAsync(listingsController.createListing));

// NEW (must come before dynamic routes like "/:id")
router.get("/new", isLoggedIn, listingsController.renderNewForm);

// EDIT (specific route before dynamic "/:id")
router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(listingsController.renderEditForm));

router.route("/:id")
  .get(wrapAsync(listingsController.showListing))
  .put(isLoggedIn, isOwner, validateListing,upload.single("listing[image][url]"), wrapAsync(listingsController.updateListing))
  .delete(isLoggedIn, isOwner, wrapAsync(listingsController.deleteListing));

module.exports = router;