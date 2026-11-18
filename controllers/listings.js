const Listing = require("../models/listing");
const User = require("../models/user");
const axios = require("axios");

const MAP_TOKEN = process.env.MAP_TOKEN;

/* ================= INDEX ================= */
module.exports.index = async (req, res) => {
  const { q, category } = req.query;
  const filter = {};

  if (category && category.trim() !== "" && category.toLowerCase() !== "all") {
    filter.category = category.trim().toLowerCase();
  }

  if (q && q.trim() !== "") {
    const searchRegex = { $regex: q.trim(), $options: "i" };
    filter.$or = [
      { title: searchRegex },
      { location: searchRegex },
      { country: searchRegex },
    ];
  }

  const allListings = await Listing.find(filter);

  res.render("listings/index.ejs", {
    allListings,
    q: q || "",
    category: category || "",
  });
};


/* ================= NEW ================= */
module.exports.renderNewForm = (req, res) => {
  res.render("listings/new.ejs");
};

/* ================= SHOW ================= */
module.exports.showListing = async (req, res) => {
  const listing = await Listing.findById(req.params.id)
    .populate({ path: "reviews", populate: { path: "author" } })
    .populate("owner");

  if (!listing) {
    req.flash("error", "Listing not found");
    return res.redirect("/listings");
  }

  res.render("listings/show.ejs", { listing });
};

/* ================= CREATE ================= */
module.exports.createListing = async (req, res, next) => {
  try {
    const location = req.body.listing.location;

    if (!location) {
      req.flash("error", "Location is required");
      return res.redirect("/listings/new");
    }

    // 🌍 MapTiler Geocoding (using MAP_TOKEN)
    const geoRes = await axios.get(
      `https://api.maptiler.com/geocoding/${encodeURIComponent(
        location
      )}.json?key=${MAP_TOKEN}`
    );

    if (!geoRes.data.features.length) {
      req.flash("error", "Invalid location");
      return res.redirect("/listings/new");
    }

    const listing = new Listing(req.body.listing);
    listing.owner = req.user._id;
    listing.image = {
      url: req.file.path,
      filename: req.file.filename
    };

    listing.geometry = {
      type: "Point",
      coordinates: geoRes.data.features[0].geometry.coordinates
    };

    await listing.save();

    req.flash("success", "New Listing Created!");
    res.redirect(`/listings/`);
  } catch (err) {
    next(err);
  }
};

/* ================= EDIT ================= */
module.exports.renderEditForm = async (req, res) => {
  const listing = await Listing.findById(req.params.id);

  if (!listing) {
    req.flash("error", "Listing does not exist!");
    return res.redirect("/listings");
  }

  const originalImageUrl = listing.image.url.replace(
    "/upload",
    "/upload/w_250"
  );

  res.render("listings/edit.ejs", { listing, originalImageUrl });
};

/* ================= UPDATE ================= */
module.exports.updateListing = async (req, res, next) => {
  try {
    const { id } = req.params;
    const newLocation = req.body.listing.location;

    const listing = await Listing.findByIdAndUpdate(
      id,
      { ...req.body.listing },
      { new: true }
    );

    // ✅ If location changed → update geometry
    if (newLocation) {
      const geoRes = await axios.get(
        `https://api.maptiler.com/geocoding/${encodeURIComponent(
          newLocation
        )}.json?key=${MAP_TOKEN}`
      );

      if (!geoRes.data.features.length) {
        req.flash("error", "Invalid location");
        return res.redirect(`/listings/${id}/edit`);
      }

      listing.geometry = {
        type: "Point",
        coordinates: geoRes.data.features[0].geometry.coordinates,
      };
    }

    if (req.file) {
      listing.image = {
        url: req.file.path,
        filename: req.file.filename,
      };
    }

    await listing.save();

    req.flash("success", "Listing Updated!");
    res.redirect(`/listings/${id}`);
  } catch (err) {
    next(err);
  }
};


/* ================= DELETE ================= */
module.exports.deleteListing = async (req, res) => {
  await Listing.findByIdAndDelete(req.params.id);
  req.flash("success", "Listing Deleted!");
  res.redirect("/listings");
};

/* ================= TOGGLE WISHLIST ================= */
module.exports.toggleWishlist = async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(req.user._id);

  if (!user.wishlist) {
    user.wishlist = [];
  }

  const listingIndex = user.wishlist.findIndex(
    (listingId) => listingId.toString() === id.toString()
  );
  let isSaved = false;

  if (listingIndex === -1) {
    user.wishlist.push(id);
    isSaved = true;
  } else {
    user.wishlist.splice(listingIndex, 1);
    isSaved = false;
  }

  await user.save();

  if (
    req.xhr ||
    req.headers["content-type"] === "application/json" ||
    req.headers.accept?.includes("json")
  ) {
    return res.json({
      success: true,
      isSaved,
      count: user.wishlist.length,
      message: isSaved ? "Added to wishlist!" : "Removed from wishlist!",
    });
  }

  req.flash("success", isSaved ? "Added to wishlist!" : "Removed from wishlist!");
  res.redirect("back");
};
