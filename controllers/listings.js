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

    // Handle multiple or single image uploads
    const files = (req.files && req.files["listing[images]"]) || 
                  (req.files && req.files["listing[image][url]"]) || 
                  (req.file ? [req.file] : []);

    if (files.length > 0) {
      const uploadedImages = files.map(f => ({ url: f.path, filename: f.filename }));
      listing.images = uploadedImages;
      listing.image = uploadedImages[0];
    } else {
      req.flash("error", "At least one image is required!");
      return res.redirect("/listings/new");
    }

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

  const images = (listing.images && listing.images.length > 0)
    ? listing.images
    : (listing.image && listing.image.url ? [listing.image] : []);

  const originalImageUrl = listing.image && listing.image.url
    ? listing.image.url.replace("/upload", "/upload/w_250")
    : "";

  res.render("listings/edit.ejs", { listing, images, originalImageUrl });
};

/* ================= UPDATE ================= */
module.exports.updateListing = async (req, res, next) => {
  try {
    const { id } = req.params;
    const newLocation = req.body.listing ? req.body.listing.location : null;

    const listing = await Listing.findById(id);
    if (!listing) {
      req.flash("error", "Listing not found!");
      return res.redirect("/listings");
    }

    if (req.body.listing) {
      Object.assign(listing, req.body.listing);
    }

    // ✅ If location changed → update geometry
    if (newLocation && newLocation !== listing.location) {
      const geoRes = await axios.get(
        `https://api.maptiler.com/geocoding/${encodeURIComponent(
          newLocation
        )}.json?key=${MAP_TOKEN}`
      );

      if (geoRes.data.features && geoRes.data.features.length) {
        listing.geometry = {
          type: "Point",
          coordinates: geoRes.data.features[0].geometry.coordinates,
        };
      }
    }

    // Handle new uploaded images
    const files = (req.files && req.files["listing[images]"]) || 
                  (req.files && req.files["listing[image][url]"]) || 
                  (req.file ? [req.file] : []);

    if (files.length > 0) {
      const newImages = files.map(f => ({ url: f.path, filename: f.filename }));
      if (!listing.images || listing.images.length === 0) {
        listing.images = (listing.image && listing.image.url) ? [listing.image, ...newImages] : newImages;
      } else {
        listing.images.push(...newImages);
      }
    }

    // Handle deleting selected images
    if (req.body.deleteImages) {
      const toDelete = Array.isArray(req.body.deleteImages)
        ? req.body.deleteImages
        : [req.body.deleteImages];

      const { cloudinary } = require("../cloudConfig");
      for (let filename of toDelete) {
        if (filename) {
          cloudinary.uploader.destroy(filename).catch(() => {});
        }
      }

      listing.images = listing.images.filter(img => !toDelete.includes(img.filename));
    }

    // Ensure cover image matches primary photo
    if (listing.images && listing.images.length > 0) {
      listing.image = listing.images[0];
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
