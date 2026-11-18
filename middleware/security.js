const rateLimit = require("express-rate-limit");
const ExpressError = require("../utils/ExpressError.js");

/* ----------------------------------------------------
   1. RATE LIMITERS
   ---------------------------------------------------- */

// Auth rate limiter (protects against brute-force password guessing & spam signups)
module.exports.authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 12, // max 12 attempts per IP
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res) => {
    req.flash("error", "Too many login/signup attempts from this IP. Please try again after 15 minutes.");
    res.redirect("/login");
  },
});

// Review submission limiter (prevents spam review bursts)
module.exports.reviewLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 15, // max 15 reviews per hour
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res) => {
    req.flash("error", "You have submitted too many reviews in a short time. Please wait a bit before reviewing again.");
    res.redirect(req.originalUrl.split("/reviews")[0] || "/listings");
  },
});

// Direct contact host message limiter (prevents messaging flood)
module.exports.messageLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 15, // max 15 messages per 15 minutes
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res) => {
    req.flash("error", "You are sending messages too quickly. Please pause for a few minutes.");
    res.redirect(req.get("Referer") || "/inbox");
  },
});

// General application rate limiter (protects against rapid DOS scraping)
module.exports.generalLimiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 400, // max 400 requests per 10 minutes
  standardHeaders: true,
  legacyHeaders: false,
});

/* ----------------------------------------------------
   2. SPAM KEYWORD & LINK-STUFFING FILTER
   ---------------------------------------------------- */
const SPAM_KEYWORDS = [
  "crypto profit",
  "bitcoin doubler",
  "casino online",
  "buy followers",
  "telegram @",
  "whatsapp +",
  "viagra",
  "cialis",
  "earn $",
  "free money",
  "investment guaranteed",
];

module.exports.filterSpamContent = (req, res, next) => {
  const content = (req.body.text || (req.body.review && req.body.review.comment) || req.body.comment || "").toLowerCase();

  if (!content) return next();

  // 1. Check for spam keywords
  for (const keyword of SPAM_KEYWORDS) {
    if (content.includes(keyword)) {
      req.flash("error", "Your submission was blocked as it contains flagged promotional or spam content.");
      return res.redirect(req.get("Referer") || "/listings");
    }
  }

  // 2. Check for link-stuffing (more than 2 URLs in a single user message or review)
  const urlRegex = /(https?:\/\/[^\s]+|www\.[^\s]+)/gi;
  const urlMatches = content.match(urlRegex);
  if (urlMatches && urlMatches.length > 2) {
    req.flash("error", "For security reasons, submissions cannot contain multiple external links.");
    return res.redirect(req.get("Referer") || "/listings");
  }

  next();
};

/* ----------------------------------------------------
   3. HONEYPOT BOT CHECK
   ---------------------------------------------------- */
module.exports.checkHoneypot = (req, res, next) => {
  // If the hidden honeypot input is filled, it is an automated bot
  if (req.body._website_hp && req.body._website_hp.trim() !== "") {
    console.warn(`[SPAM DETECTED] Honeypot triggered from IP: ${req.ip}`);
    // Silently redirect bot back without processing
    return res.redirect(req.get("Referer") || "/listings");
  }
  next();
};

/* ----------------------------------------------------
   4. NOSQL INJECTION & PAYLOAD SANITIZER
   ---------------------------------------------------- */
function cleanPayload(data) {
  if (!data || typeof data !== "object") return data;

  if (Array.isArray(data)) {
    return data.map(cleanPayload);
  }

  const cleaned = {};
  for (const key of Object.keys(data)) {
    // Strip keys starting with '$' or containing '.' which are MongoDB injection operators
    if (key.startsWith("$") || key.includes(".")) {
      continue;
    }
    const val = data[key];
    if (typeof val === "string") {
      // Strip dangerous executable script tags
      cleaned[key] = val.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "");
    } else if (typeof val === "object" && val !== null) {
      cleaned[key] = cleanPayload(val);
    } else {
      cleaned[key] = val;
    }
  }
  return cleaned;
}

module.exports.sanitizeInputs = (req, res, next) => {
  if (req.body) req.body = cleanPayload(req.body);
  if (req.params) req.params = cleanPayload(req.params);
  next();
};
