const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookingSchema = new Schema(
  {
    listing: {
      type: Schema.Types.ObjectId,
      ref: "Listing",
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    checkIn: {
      type: Date,
      required: true,
    },
    checkOut: {
      type: Date,
      required: true,
    },
    totalNights: {
      type: Number,
      required: true,
      min: 1,
    },
    guests: {
      type: Number,
      required: true,
      default: 1,
      min: 1,
    },
    pricePerNight: {
      type: Number,
      required: true,
    },
    basePrice: {
      type: Number,
      required: true,
    },
    gst: {
      type: Number,
      required: true,
    },
    totalPrice: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["confirmed", "cancelled", "completed", "pending"],
      default: "confirmed",
    },
    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "refunded"],
      default: "paid",
    },
    paymentMethod: {
      type: String,
      default: "Credit/Debit Card",
    },
    transactionId: {
      type: String,
      default: "",
    },
    paidAt: {
      type: Date,
      default: Date.now,
    },
    bookingCode: {
      type: String,
      required: true,
      unique: true,
    },
    specialRequests: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Booking", bookingSchema);
