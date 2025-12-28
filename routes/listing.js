const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync");
const ExpressError = require("../utils/ExpressError");
const Listing = require("../models/listing");
const { isLoggedIn, isOwner,validateListing } = require("../middleware");

const listingsController = require("../controllers/listings");

// INDEX
router.get("/", wrapAsync(listingsController.index));

// NEW
router.get("/new", isLoggedIn, listingsController.renderNewForm);

// SHOW
router.get("/:id", wrapAsync(listingsController.showListing));

// CREATE
router.post("/", isLoggedIn, validateListing, wrapAsync(listingsController.createListing));

// EDIT
router.get("/:id/edit", isLoggedIn,isOwner, wrapAsync(listingsController.renderEditForm));

// UPDATE
router.put("/:id",  isLoggedIn,isOwner, validateListing, wrapAsync(listingsController.updateListing));

// DELETE
router.delete("/:id", isLoggedIn,isOwner, wrapAsync(listingsController.deleteListing));

module.exports = router;
