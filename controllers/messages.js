const Message = require("../models/message.js");
const Listing = require("../models/listing.js");
const User = require("../models/user.js");

/* Send initial message to host from listing page */
module.exports.sendMessageToHost = async (req, res) => {
  const { id } = req.params;
  const listing = await Listing.findById(id).populate("owner");

  if (!listing) {
    req.flash("error", "Listing not found.");
    return res.redirect("/listings");
  }

  if (listing.owner._id.equals(req.user._id)) {
    req.flash("error", "You cannot send a message to yourself.");
    return res.redirect(`/listings/${id}`);
  }

  const { text } = req.body;
  if (!text || !text.trim()) {
    req.flash("error", "Message cannot be empty.");
    return res.redirect(`/listings/${id}`);
  }

  const newMsg = new Message({
    listing: listing._id,
    sender: req.user._id,
    recipient: listing.owner._id,
    text: text.trim(),
  });

  await newMsg.save();
  req.flash("success", `Message sent to host @${listing.owner.username}!`);
  res.redirect(`/inbox?listing=${listing._id}&user=${listing.owner._id}`);
};

/* View User Inbox / Conversation Threads */
module.exports.renderInbox = async (req, res) => {
  const currentUserId = req.user._id;

  // Retrieve all messages involving the current user
  const allMessages = await Message.find({
    $or: [{ sender: currentUserId }, { recipient: currentUserId }],
  })
    .sort({ createdAt: 1 })
    .populate("listing")
    .populate("sender", "username email")
    .populate("recipient", "username email");

  // Group messages into distinct conversation threads by listing + partner
  const threadsMap = new Map();

  allMessages.forEach((msg) => {
    if (!msg.listing) return; // skip if listing was deleted

    const partner = msg.sender._id.equals(currentUserId) ? msg.recipient : msg.sender;
    if (!partner) return;

    const threadKey = `${msg.listing._id}_${partner._id}`;

    if (!threadsMap.has(threadKey)) {
      threadsMap.set(threadKey, {
        threadKey,
        listing: msg.listing,
        partner: partner,
        lastMessage: msg,
        unreadCount: 0,
        messages: [],
      });
    }

    const thread = threadsMap.get(threadKey);
    thread.messages.push(msg);
    thread.lastMessage = msg;

    if (msg.recipient._id.equals(currentUserId) && !msg.read) {
      thread.unreadCount++;
    }
  });

  // Convert map to array sorted by latest message
  const threads = Array.from(threadsMap.values()).sort(
    (a, b) => new Date(b.lastMessage.createdAt) - new Date(a.lastMessage.createdAt)
  );

  // Determine active thread
  let activeThread = null;
  const reqListingId = req.query.listing;
  const reqPartnerId = req.query.user;

  if (reqListingId && reqPartnerId) {
    const key = `${reqListingId}_${reqPartnerId}`;
    activeThread = threadsMap.get(key) || null;
  }

  if (!activeThread && threads.length > 0) {
    activeThread = threads[0];
  }

  // Mark all incoming messages in the active thread as read
  if (activeThread) {
    await Message.updateMany(
      {
        listing: activeThread.listing._id,
        sender: activeThread.partner._id,
        recipient: currentUserId,
        read: false,
      },
      { read: true }
    );
    activeThread.unreadCount = 0;
  }

  res.render("users/inbox.ejs", {
    threads,
    activeThread,
  });
};

/* Reply to a Conversation Thread */
module.exports.replyToThread = async (req, res) => {
  const { listingId, partnerId } = req.params;
  const { text } = req.body;

  if (!text || !text.trim()) {
    req.flash("error", "Message cannot be empty.");
    return res.redirect(`/inbox?listing=${listingId}&user=${partnerId}`);
  }

  const listing = await Listing.findById(listingId);
  const recipient = await User.findById(partnerId);

  if (!listing || !recipient) {
    req.flash("error", "Unable to send message: conversation context is missing.");
    return res.redirect("/inbox");
  }

  const replyMsg = new Message({
    listing: listing._id,
    sender: req.user._id,
    recipient: recipient._id,
    text: text.trim(),
  });

  await replyMsg.save();
  res.redirect(`/inbox?listing=${listingId}&user=${partnerId}`);
};
