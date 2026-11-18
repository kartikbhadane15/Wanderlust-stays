const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const { isLoggedIn } = require("../middleware.js");
const messageController = require("../controllers/messages.js");

// Send direct message to host from listing page
router.post(
  "/listings/:id/contact",
  isLoggedIn,
  wrapAsync(messageController.sendMessageToHost)
);

// User messaging inbox
router.get(
  "/inbox",
  isLoggedIn,
  wrapAsync(messageController.renderInbox)
);

// Reply to active conversation thread
router.post(
  "/inbox/:listingId/:partnerId",
  isLoggedIn,
  wrapAsync(messageController.replyToThread)
);

module.exports = router;
