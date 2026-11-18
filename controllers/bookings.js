const Booking = require("../models/booking");
const Listing = require("../models/listing");

module.exports.createBooking = async (req, res) => {
  const { id } = req.params;
  const listing = await Listing.findById(id);

  if (!listing) {
    req.flash("error", "Listing not found!");
    return res.redirect("/listings");
  }

  // Prevent host from booking their own listing
  if (listing.owner && listing.owner.equals(req.user._id)) {
    req.flash("error", "You cannot book your own property!");
    return res.redirect(`/listings/${listing._id}`);
  }

  const { checkIn, checkOut, guests, specialRequests } = req.body.booking || req.body;

  const inDate = new Date(checkIn);
  const outDate = new Date(checkOut);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  if (isNaN(inDate.getTime()) || isNaN(outDate.getTime())) {
    req.flash("error", "Please provide valid check-in and check-out dates!");
    return res.redirect(`/listings/${listing._id}`);
  }

  if (inDate < today) {
    req.flash("error", "Check-in date cannot be in the past!");
    return res.redirect(`/listings/${listing._id}`);
  }

  const diffTime = outDate.getTime() - inDate.getTime();
  const totalNights = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (totalNights <= 0) {
    req.flash("error", "Check-out date must be after check-in date!");
    return res.redirect(`/listings/${listing._id}`);
  }

  const guestCount = Math.max(1, parseInt(guests, 10) || 1);
  const pricePerNight = listing.price || 0;
  const basePrice = pricePerNight * totalNights;
  const gst = Math.round(basePrice * 0.18);
  const totalPrice = basePrice + gst;

  const randomSuffix = Math.random().toString(36).substring(2, 7).toUpperCase();
  const bookingCode = `WL-${Date.now().toString(36).slice(-4).toUpperCase()}-${randomSuffix}`;

  const newBooking = new Booking({
    listing: listing._id,
    user: req.user._id,
    checkIn: inDate,
    checkOut: outDate,
    totalNights,
    guests: guestCount,
    pricePerNight,
    basePrice,
    gst,
    totalPrice,
    status: "confirmed",
    bookingCode,
    specialRequests: specialRequests ? specialRequests.trim() : "",
  });

  await newBooking.save();

  req.flash("success", `Reservation confirmed! Booking Reference: ${bookingCode}`);
  res.redirect(`/bookings/${newBooking._id}`);
};

module.exports.renderBooking = async (req, res) => {
  const { id } = req.params;
  const booking = await Booking.findById(id)
    .populate({
      path: "listing",
      populate: {
        path: "owner",
      },
    })
    .populate("user");

  if (!booking) {
    req.flash("error", "Reservation not found!");
    return res.redirect("/listings");
  }

  const isGuest = booking.user._id.equals(req.user._id);
  const isHost =
    booking.listing &&
    booking.listing.owner &&
    booking.listing.owner._id.equals(req.user._id);

  if (!isGuest && !isHost) {
    req.flash("error", "You do not have permission to view this reservation!");
    return res.redirect("/listings");
  }

  res.render("bookings/show.ejs", { booking, isGuest, isHost });
};

module.exports.renderUserBookings = async (req, res) => {
  const myBookings = await Booking.find({ user: req.user._id })
    .populate("listing")
    .sort({ createdAt: -1 });

  // Also fetch bookings where the user is the host
  const myListings = await Listing.find({ owner: req.user._id }).select("_id");
  const myListingIds = myListings.map((l) => l._id);

  const hostBookings = await Booking.find({ listing: { $in: myListingIds } })
    .populate("listing")
    .populate("user")
    .sort({ createdAt: -1 });

  res.render("bookings/index.ejs", { myBookings, hostBookings });
};

module.exports.cancelBooking = async (req, res) => {
  const { id } = req.params;
  const booking = await Booking.findById(id).populate("listing");

  if (!booking) {
    req.flash("error", "Reservation not found!");
    return res.redirect("/bookings");
  }

  const isGuest = booking.user.equals(req.user._id);
  const isHost =
    booking.listing &&
    booking.listing.owner &&
    booking.listing.owner.equals(req.user._id);

  if (!isGuest && !isHost) {
    req.flash("error", "You do not have permission to cancel this reservation!");
    return res.redirect("/bookings");
  }

  if (booking.status === "cancelled") {
    req.flash("error", "This reservation has already been cancelled.");
    return res.redirect(`/bookings/${booking._id}`);
  }

  booking.status = "cancelled";
  await booking.save();

  req.flash("success", `Reservation ${booking.bookingCode} has been cancelled.`);
  res.redirect(`/bookings/${booking._id}`);
};
