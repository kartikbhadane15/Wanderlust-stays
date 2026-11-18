const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review.js");

const listingSchema = new Schema(
  {
    title: { type: String, required: true },
    description: String,

    image: {
      url: String,
      filename: String,
    },

    images: [
      {
        url: String,
        filename: String,
      },
    ],

    price: Number,
    location: String,
    country: String,

    geometry: {
      type: {
        type: String,
        enum: ["Point"],
        required: true,
      },
      coordinates: {
        type: [Number], // [lng, lat]
        required: true,
      },
    },

    category: {
      type: String,
      enum: [
        "trending",
        "iconic",
        "mountains",
        "castles",
        "pools",
        "camping",
        "farms",
        "arctic",
        "jungle",
        "beach",
      ],
    },

    reviews: [
      {
        type: Schema.Types.ObjectId,
        ref: "Review",
      },
    ],

    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

listingSchema.virtual("allImages").get(function () {
  if (this.images && this.images.length > 0) {
    return this.images;
  }
  if (this.image && this.image.url) {
    return [this.image];
  }
  return [];
});

listingSchema.virtual("avgRating").get(function () {
  if (!this.reviews || this.reviews.length === 0) return 0;
  let sum = 0;
  let count = 0;
  for (let r of this.reviews) {
    const val = (r && typeof r.rating === "number") ? r.rating : (typeof r === "number" ? r : null);
    if (val !== null) {
      sum += val;
      count++;
    }
  }
  if (count === 0) return 0;
  return Number((sum / count).toFixed(1));
});

listingSchema.virtual("isGuestFavorite").get(function () {
  return this.avgRating >= 4.5 && this.reviews && this.reviews.length >= 2;
});

listingSchema.post("findOneAndDelete", async function (listing) {
  if (listing) {
    await Review.deleteMany({ _id: { $in: listing.reviews } });
  }
});

module.exports = mongoose.model("Listing", listingSchema);
