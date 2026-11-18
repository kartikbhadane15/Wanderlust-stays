const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync");
const { isLoggedIn } = require("../middleware");
const bookingController = require("../controllers/bookings");

// Create booking for a listing
router.post(
  "/listings/:id/bookings",
  isLoggedIn,
  wrapAsync(bookingController.createBooking)
);

// View all user bookings ("My Trips")
router.get("/bookings", isLoggedIn, wrapAsync(bookingController.renderUserBookings));

// View single reservation confirmation / receipt
router.get("/bookings/:id", isLoggedIn, wrapAsync(bookingController.renderBooking));

// Checkout payment page
router.get("/bookings/:id/checkout", isLoggedIn, wrapAsync(bookingController.renderCheckout));

// Process mock payment
router.post("/bookings/:id/pay", isLoggedIn, wrapAsync(bookingController.processPayment));

// Cancel a reservation
router.post(
  "/bookings/:id/cancel",
  isLoggedIn,
  wrapAsync(bookingController.cancelBooking)
);

module.exports = router;
