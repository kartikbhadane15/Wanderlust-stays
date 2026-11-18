if(process.env.NODE_ENV !== "production"){
  require("dotenv").config();
}

const express = require("express");
const app = express();

// Trust reverse proxy (required for Render, Cloudflare, and cloud load balancers)
app.set("trust proxy", 1);
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/ExpressError.js");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const flash = require("connect-flash");
const helmet = require("helmet");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");
const Message = require("./models/message.js");
const { sanitizeInputs, generalLimiter } = require("./middleware/security.js");

const listingRouter = require("./routes/listing.js");
const reviewRouter = require("./routes/review.js");
const userRouter = require("./routes/user.js");
const bookingRouter = require("./routes/booking.js");
const messageRouter = require("./routes/message.js");

const dbUrl = process.env.ATLASDB_URL ;

main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(dbUrl);
}

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "/public")));

// Production Security Headers with Content Security Policy (CSP)
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        connectSrc: ["'self'", "https://api.maptiler.com", "https://unpkg.com", "https://cdn.jsdelivr.net"],
        scriptSrc: [
          "'self'",
          "'unsafe-inline'",
          "'unsafe-eval'",
          "https://cdn.jsdelivr.net",
          "https://unpkg.com",
          "https://cdnjs.cloudflare.com",
        ],
        styleSrc: [
          "'self'",
          "'unsafe-inline'",
          "https://cdn.jsdelivr.net",
          "https://fonts.googleapis.com",
          "https://cdnjs.cloudflare.com",
          "https://unpkg.com",
        ],
        fontSrc: ["'self'", "https://fonts.gstatic.com", "https://cdnjs.cloudflare.com"],
        imgSrc: [
          "'self'",
          "data:",
          "blob:",
          "https://res.cloudinary.com",
          "https://images.unsplash.com",
          "https://api.maptiler.com",
        ],
        workerSrc: ["'self'", "blob:"],
        childSrc: ["'self'", "blob:"],
        objectSrc: ["'none'"],
      },
    },
    crossOriginEmbedderPolicy: false,
  })
);

// Payload & Parameter Sanitization (NoSQL injection defense)
app.use(sanitizeInputs);

// General DOS rate limiter
app.use(generalLimiter);

const store = MongoStore.create({
  mongoUrl: dbUrl,
  secret: process.env.SECRET_KEY,
  touchAfter: 24 * 60 * 60,
});

store.on("error", (err) => {
  console.log("SESSION STORE ERROR", err);
});

const sessionOptions = {
  store: store,
  secret: process.env.SECRET_KEY,
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    sameSite: "lax",
    expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
    maxAge: 7 * 24 * 60 * 60 * 1000,
  },
};

app.use(session(sessionOptions));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(async (req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.currentUser = req.user;
  res.locals.mapToken = process.env.MAP_TOKEN;
  if (req.user) {
    try {
      res.locals.unreadMessagesCount = await Message.countDocuments({
        recipient: req.user._id,
        read: false,
      });
    } catch (e) {
      res.locals.unreadMessagesCount = 0;
    }
  } else {
    res.locals.unreadMessagesCount = 0;
  }
  next();
});

app.use("/listings", listingRouter);
app.use("/listings/:id/reviews", reviewRouter);
app.use("/", userRouter);
app.use("/", bookingRouter);
app.use("/", messageRouter);

app.use((req, res, next) => {
  next(new ExpressError(404, "Page Not Found!"));
});

// Error-handling middleware
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Something went wrong!";
  res.status(statusCode).render("error.ejs", { err });
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
