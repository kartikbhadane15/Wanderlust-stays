const Listing = require("../models/listing");
const axios = require("axios");

const MAP_TOKEN = process.env.MAP_TOKEN;

/* ================= INDEX ================= */
module.exports.index = async (req, res) => {
  const allListings = await Listing.find({});
  res.render("listings/index.ejs", { allListings });
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
