const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync");
const ExpressError = require("../utils/ExpressError");
const Listing = require("../models/listing");
const { isLoggedIn, isOwner,validateListing } = require("../middleware");

// INDEX
router.get("/", wrapAsync(async (req, res) => {
  const allListings = await Listing.find({});
  res.render("listings/index.ejs", { allListings });
}));

// NEW
router.get("/new", isLoggedIn, (req, res) => {
  res.render("listings/new.ejs");
});

// SHOW
router.get("/:id", wrapAsync(async (req, res) => {
  const listing = await Listing.findById(req.params.id).populate("reviews").populate("owner");
  if (!listing) {
    req.flash("error", "Listing not found");
    return res.redirect("/listings");
  };
  res.render("listings/show.ejs", { listing });
}));

// CREATE
router.post("/", isLoggedIn, validateListing, wrapAsync(async (req, res) => {
  const listing = new Listing(req.body.listing);
  listing.owner = req.user._id;
  await listing.save();
  req.flash("success", "New Listing Created!");
  res.redirect("/listings");
}));

// EDIT
router.get("/:id/edit", isLoggedIn,isOwner, wrapAsync(async (req, res) => {
  const listing = await Listing.findById(req.params.id);
  if (!listing) throw new ExpressError(404, "Listing not found");
  res.render("listings/edit.ejs", { listing });
}));

// UPDATE
router.put("/:id",  isLoggedIn,isOwner, validateListing, wrapAsync(async (req, res) => {
  let { id } = req.params;
  await Listing.findByIdAndUpdate(id, {...req.body.listing});
  req.flash("success", "Listing Updated!");
  res.redirect(`/listings/${req.params.id}`);
}));

// DELETE
router.delete("/:id", isLoggedIn,isOwner, wrapAsync(async (req, res) => {
  await Listing.findByIdAndDelete(req.params.id);
  req.flash("success", "Listing Deleted!");
  res.redirect("/listings");
}));

module.exports = router;
