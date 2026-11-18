# Wanderlust: Complete 55-Commit Codebase Study Guide & Execution Plan

This guide walks through **all 55 commits** of the `Wanderlust-stays` repository in exact chronological order (from Commit #1 to Commit #55).

Use this document as your step-by-step workbook to understand how every feature, route, schema, middleware, and external service was built.

---

## Quick Reference Commands

### 1. Start from Commit #1

```bash
git checkout 7333b5a
```

### 2. See what changed in your current commit

```bash
git show --stat
# Or to see the full code diff:
git show
```

### 3. Return to the latest version anytime

```bash
git checkout main
```

---

## Quick Jump Index (All 55 Commits)


- [Commit #1: `7333b5a` - Initial commit](#commit-1-7333b5a)
- [Commit #2: `9b6f54c` - some message](#commit-2-9b6f54c)
- [Commit #3: `5b71f7d` - install dependencies and create app.js file](#commit-3-5b71f7d)
- [Commit #4: `9def688` - created init folder that contain data.js & index.js file and updated app.js](#commit-4-9def688)
- [Commit #5: `77ece60` - created models folder with listing.js file](#commit-5-77ece60)
- [Commit #6: `493b269` - added edit.js, index.js, new.ejs, show.ejs file](#commit-6-493b269)
- [Commit #7: `ea89e86` - install method-override & updated listings.js from models](#commit-7-ea89e86)
- [Commit #8: `8c40ed0` - install ejs-mate and adde navbar.ejs and boilerplate.ejs with style style.scc](#commit-8-8c40ed0)
- [Commit #9: `1b5dc2f` - added footer with style](#commit-9-1b5dc2f)
- [Commit #10: `818d028` - style index , new and edit.ejs](#commit-10-818d028)
- [Commit #11: `307e866` - style show.ejs](#commit-11-307e866)
- [Commit #12: `ec33ebe` - added client-side validation(form)](#commit-12-ec33ebe)
- [Commit #13: `a0b3bef` - added succes & falilure text](#commit-13-a0b3bef)
- [Commit #14: `4def54e` - added server side validation](#commit-14-4def54e)
- [Commit #15: `3b612a8` - validation of schema , with middleware](#commit-15-3b612a8)
- [Commit #16: `68f7750` - Created review model](#commit-16-68f7750)
- [Commit #17: `86adfa7` - Createtion of reviews](#commit-17-86adfa7)
- [Commit #18: `0bcf059` - validation for review](#commit-18-0bcf059)
- [Commit #19: `826b45b` - styling, deleting , handling reviews](#commit-19-826b45b)
- [Commit #20: `1e520eb` - restructure listings routes](#commit-20-1e520eb)
- [Commit #21: `2ae9509` - restructure reviews roter](#commit-21-2ae9509)
- [Commit #22: `ce24476` - implemented express-session and cookie](#commit-22-ce24476)
- [Commit #23: `40cd700` - reset error](#commit-23-40cd700)
- [Commit #24: `400fe69` - implemented flash](#commit-24-400fe69)
- [Commit #25: `760ca23` - flashh success included](#commit-25-760ca23)
- [Commit #26: `1929f82` - error flash included](#commit-26-1929f82)
- [Commit #27: `8c0932e` - installed passport , passport-local, passport-local-mongoose](#commit-27-8c0932e)
- [Commit #28: `af6f229` - created demo user](#commit-28-af6f229)
- [Commit #29: `b5fa64d` - added signUp and login pages](#commit-29-b5fa64d)
- [Commit #30: `7365bb8` - added sign out user](#commit-30-7365bb8)
- [Commit #31: `a19c82a` - added login after signup & post login page functionality](#commit-31-a19c82a)
- [Commit #32: `c606ba6` - added listing owner](#commit-32-c606ba6)
- [Commit #33: `22111ff` - authorization for  /listings](#commit-33-22111ff)
- [Commit #34: `e88681f` - added authorization for reviews](#commit-34-e88681f)
- [Commit #35: `4e14f8c` - added MVC model for Listings](#commit-35-4e14f8c)
- [Commit #36: `3212679` - added MVC model for reviews](#commit-36-3212679)
- [Commit #37: `250e39c` - added MVC model for users](#commit-37-250e39c)
- [Commit #38: `3bd71aa` - added router.route](#commit-38-3bd71aa)
- [Commit #39: `98aebdf` - Re-style ratings](#commit-39-98aebdf)
- [Commit #40: `778d706` - install multer for manupulating form for upload images](#commit-40-778d706)
- [Commit #41: `bbb61eb` - install npm dotenv](#commit-41-bbb61eb)
- [Commit #42: `c2035df` - added cloudinary storage and stored file](#commit-42-c2035df)
- [Commit #43: `f0a9093` - save link in mongo](#commit-43-f0a9093)
- [Commit #44: `1a5fd18` - image preview for listing image](#commit-44-1a5fd18)
- [Commit #45: `0ce2cc6` - Added  MapTiler + MapLibre geocoding](#commit-45-0ce2cc6)
- [Commit #46: `9d14c36` - updated updatelistin controller and improve navbar style](#commit-46-9d14c36)
- [Commit #47: `bd7d7b7` - added UI for filters and tax switch](#commit-47-bd7d7b7)
- [Commit #48: `a227509` - added Ui for search](#commit-48-a227509)
- [Commit #49: `b8a4c4b` - added search input based on title and location](#commit-49-b8a4c4b)
- [Commit #50: `6e4d8fd` - connect to mongose-atlas](#commit-50-6e4d8fd)
- [Commit #51: `25470ba` - added mongo session store using npm connect-mongo](#commit-51-25470ba)
- [Commit #52: `e9c0529` - added .env secret](#commit-52-e9c0529)
- [Commit #53: `7b7d0f8` - improve file structure](#commit-53-7b7d0f8)
- [Commit #54: `a89aaa9` - update README.md with project description, features, tech stack, and installation instructions](#commit-54-a89aaa9)
- [Commit #55: `43a816b` - Updated readme file](#commit-55-43a816b)

---


## Commit #1: `7333b5a`

### Message: **Initial commit**


**Key Files Involved:**

- `README.md`


**What was built & why:**

Initial commit generated by GitHub initializing the repository with the project name.


**Terminal Commands for this commit:**

```bash
git checkout 7333b5a
git show 7333b5a
```

---

## Commit #2: `9b6f54c`

### Message: **some message**


**Key Files Involved:**

- `README.md`


**What was built & why:**

Testing the git connection between local repository and remote GitHub origin.


**Terminal Commands for this commit:**

```bash
git checkout 9b6f54c
git show 9b6f54c
```

---

## Commit #3: `5b71f7d`

### Message: **install dependencies and create app.js file**


**Key Files Involved:**

- `package.json`
- `package-lock.json`
- `app.js`


**What was built & why:**

Installed `express` (web server), `mongoose` (MongoDB ODM), `ejs` (templating engine). Created `app.js` as the server entry point.


**Terminal Commands for this commit:**

```bash
git checkout 5b71f7d
git show 5b71f7d --stat
```

---

## Commit #4: `9def688`

### Message: **created init folder that contain data.js & index.js file and updated app.js**


**Key Files Involved:**

- `app.js`
- `init/data.js`
- `init/index.js`


**What was built & why:**

Added 30 sample listings in `init/data.js`. Added `init/index.js` to clear DB and insert seed data. In `app.js`, implemented all 7 RESTful routes for listings (Index, New, Show, Create, Edit, Update, Delete) and connected to local MongoDB.


**Terminal Commands for this commit:**

```bash
git checkout 9def688
git show 9def688 --stat
git show 9def688:app.js
```

---

## Commit #5: `77ece60`

### Message: **created models folder with listing.js file**


**Key Files Involved:**

- `models/listing.js`


**What was built & why:**

Created `listingSchema` with `title` (String, required), `description`, `image` (with default fallback URL and custom setter for empty strings), `price`, `location`, and `country`. Exported `Listing` model.


**Terminal Commands for this commit:**

```bash
git checkout 77ece60
git show 77ece60:models/listing.js
```

---

## Commit #6: `493b269`

### Message: **added edit.js, index.js, new.ejs, show.ejs file**


**Key Files Involved:**

- `views/listings/index.ejs`
- `views/listings/show.ejs`
- `views/listings/new.ejs`
- `views/listings/edit.ejs`


**What was built & why:**

Created `index.ejs` (list all listings as links), `show.ejs` (display single listing details with Edit/Delete buttons), `new.ejs` (form to create a listing), `edit.ejs` (form prefilled with existing listing data).


**Terminal Commands for this commit:**

```bash
git checkout 493b269
git show 493b269 --stat
```

---

## Commit #7: `ea89e86`

### Message: **install method-override & updated listings.js from models**


**Key Files Involved:**

- `models/listing.js`
- `package.json`


**What was built & why:**

Browsers natively only support GET and POST forms. `method-override` allows HTML forms to send `?_method=PUT` and `?_method=DELETE`. Updated default image setter in `models/listing.js`.


**Terminal Commands for this commit:**

```bash
git checkout ea89e86
git show ea89e86 models/listing.js
```

---

## Commit #8: `8c40ed0`

### Message: **install ejs-mate and adde navbar.ejs and boilerplate.ejs with style style.scc**


**Key Files Involved:**

- `app.js`
- `views/layouts/boilerplate.ejs`
- `views/includes/navbar.ejs`
- `public/css/style.css`


**What was built & why:**

Installed `ejs-mate` as layout engine (`app.engine('ejs', ejsMate)`). Created `boilerplate.ejs` layout with Bootstrap 5 CSS/JS and FontAwesome. Created `navbar.ejs` partial and custom CSS in `public/css/style.css`.


**Terminal Commands for this commit:**

```bash
git checkout 8c40ed0
git show 8c40ed0 views/layouts/boilerplate.ejs
```

---

## Commit #9: `1b5dc2f`

### Message: **added footer with style**


**Key Files Involved:**

- `views/includes/footer.ejs`
- `views/layouts/boilerplate.ejs`
- `public/css/style.css`


**What was built & why:**

Created `footer.ejs` partial included at the bottom of `boilerplate.ejs`. Added sticky footer flexbox styling and social media icons.


**Terminal Commands for this commit:**

```bash
git checkout 1b5dc2f
git show 1b5dc2f views/includes/footer.ejs
```

---

## Commit #10: `818d028`

### Message: **style index , new and edit.ejs**


**Key Files Involved:**

- `views/listings/index.ejs`
- `views/listings/new.ejs`
- `views/listings/edit.ejs`
- `public/css/style.css`


**What was built & why:**

Styled `index.ejs` using Bootstrap responsive cards (`col-lg-4 col-md-6 col-sm-12`). Styled forms in `new.ejs` and `edit.ejs` with Bootstrap form-controls and card layouts.


**Terminal Commands for this commit:**

```bash
git checkout 818d028
git show 818d028 views/listings/index.ejs
```

---

## Commit #11: `307e866`

### Message: **style show.ejs**


**Key Files Involved:**

- `views/listings/show.ejs`
- `public/css/style.css`


**What was built & why:**

Centered listing details inside an offset card with image banner, description, formatted INR price (`toLocaleString('en-IN')`), location, and action buttons.


**Terminal Commands for this commit:**

```bash
git checkout 307e866
git show 307e866 views/listings/show.ejs
```

---

## Commit #12: `ec33ebe`

### Message: **added client-side validation(form)**


**Key Files Involved:**

- `public/js/script.js`
- `views/layouts/boilerplate.ejs`
- `views/listings/new.ejs`


**What was built & why:**

Added `needs-validation` class to HTML forms and created `public/js/script.js` to intercept form submissions (`event.preventDefault()`) when inputs are invalid using Bootstrap HTML5 validity APIs.


**Terminal Commands for this commit:**

```bash
git checkout ec33ebe
git show ec33ebe public/js/script.js
```

---

## Commit #13: `a0b3bef`

### Message: **added succes & falilure text**


**Key Files Involved:**

- `views/listings/new.ejs`
- `views/listings/edit.ejs`


**What was built & why:**

Added feedback hints under form inputs (e.g., 'Please enter a title', 'Price should be valid') displayed automatically when validation passes or fails.


**Terminal Commands for this commit:**

```bash
git checkout a0b3bef
git show a0b3bef views/listings/new.ejs
```

---

## Commit #14: `4def54e`

### Message: **added server side validation**


**Key Files Involved:**

- `utils/ExpressError.js`
- `utils/wrapAsync.js`
- `views/error.ejs`
- `app.js`


**What was built & why:**

Created `ExpressError` class extending `Error` (with `statusCode` and `message`). Created `wrapAsync` helper function to catch rejected promises in async route handlers and pass them to Express error middleware (`next(err)`). Added global error handling middleware and `error.ejs` template.


**Terminal Commands for this commit:**

```bash
git checkout 4def54e
git show 4def54e utils/wrapAsync.js
```

---

## Commit #15: `3b612a8`

### Message: **validation of schema , with middleware**


**Key Files Involved:**

- `schema.js`
- `app.js`
- `package.json`


**What was built & why:**

Installed `joi`. Created `schema.js` defining strict validation rules for `listingSchema` (required strings, positive numbers). Created `validateListing` middleware function in `app.js` that intercepts requests before reaching database handlers.


**Terminal Commands for this commit:**

```bash
git checkout 3b612a8
git show 3b612a8 schema.js
```

---

## Commit #16: `68f7750`

### Message: **Created review model**


**Key Files Involved:**

- `models/review.js`
- `models/listing.js`
- `views/listings/show.ejs`
- `app.js`


**What was built & why:**

Created `models/review.js` with `comment` (String), `rating` (Number 1-5), and `createdAt` (Date). Updated `models/listing.js` with `reviews: [{ type: Schema.Types.ObjectId, ref: 'Review' }]`.


**Terminal Commands for this commit:**

```bash
git checkout 68f7750
git show 68f7750 models/review.js
```

---

## Commit #17: `86adfa7`

### Message: **Createtion of reviews**


**Key Files Involved:**

- `app.js`
- `views/listings/show.ejs`
- `models/listing.js`


**What was built & why:**

Added `POST /listings/:id/reviews` route in `app.js`. When a review is posted, it creates a new Review document, pushes the review ID into `listing.reviews`, and saves both.


**Terminal Commands for this commit:**

```bash
git checkout 86adfa7
git show 86adfa7 app.js
```

---

## Commit #18: `0bcf059`

### Message: **validation for review**


**Key Files Involved:**

- `schema.js`
- `app.js`
- `views/listings/show.ejs`


**What was built & why:**

Added `reviewSchema` to `schema.js` (requiring `review.rating` between 1 and 5, and `review.comment` non-empty). Added `validateReview` middleware in `app.js`.


**Terminal Commands for this commit:**

```bash
git checkout 0bcf059
git show 0bcf059 schema.js
```

---

## Commit #19: `826b45b`

### Message: **styling, deleting , handling reviews**


**Key Files Involved:**

- `app.js`
- `models/listing.js`
- `views/listings/show.ejs`
- `public/css/style.css`


**What was built & why:**

Added `DELETE /listings/:id/reviews/:reviewId` route using `$pull` operator to remove review ID from `listing.reviews` and `Review.findByIdAndDelete()`. Added Mongoose `post('findOneAndDelete')` middleware in `models/listing.js` to delete all associated reviews when a listing is deleted. Styled reviews as Bootstrap cards.


**Terminal Commands for this commit:**

```bash
git checkout 826b45b
git show 826b45b models/listing.js
```

---

## Commit #20: `1e520eb`

### Message: **restructure listings routes**


**Key Files Involved:**

- `routes/listing.js`
- `app.js`


**What was built & why:**

Extracted all `/listings` routes from `app.js` into `routes/listing.js` using `express.Router()`. Cleaned up `app.js` using `app.use('/listings', listings)`.


**Terminal Commands for this commit:**

```bash
git checkout 1e520eb
git show 1e520eb routes/listing.js
```

---

## Commit #21: `2ae9509`

### Message: **restructure reviews roter**


**Key Files Involved:**

- `routes/review.js`
- `app.js`
- `routes/listing.js`


**What was built & why:**

Extracted review routes into `routes/review.js`. Used `express.Router({ mergeParams: true })` so review routes can access `:id` from parent `/listings/:id/reviews` route prefix.


**Terminal Commands for this commit:**

```bash
git checkout 2ae9509
git show 2ae9509 routes/review.js
```

---

## Commit #22: `ce24476`

### Message: **implemented express-session and cookie**


**Key Files Involved:**

- `app.js`
- `package.json`


**What was built & why:**

Installed `express-session`. Configured `session({ secret, resave: false, saveUninitialized: true, cookie: { expires, maxAge, httpOnly: true } })` to maintain state across HTTP requests.


**Terminal Commands for this commit:**

```bash
git checkout ce24476
git show ce24476 app.js
```

---

## Commit #23: `40cd700`

### Message: **reset error**


**Key Files Involved:**

- None (repository cleanup/tag)



**What was built & why:**

Repository cleanup commit.


**Terminal Commands for this commit:**

```bash
git checkout 40cd700
git show 40cd700
```

---

## Commit #24: `400fe69`

### Message: **implemented flash**


**Key Files Involved:**

- `app.js`
- `views/includes/flash.ejs`
- `routes/listing.js`
- `package.json`


**What was built & why:**

Installed `connect-flash`. In `app.js`, set up middleware passing `req.flash('success')` to `res.locals.success`. Created `views/includes/flash.ejs` dismissible alert component.


**Terminal Commands for this commit:**

```bash
git checkout 400fe69
git show 400fe69 views/includes/flash.ejs
```

---

## Commit #25: `760ca23`

### Message: **flashh success included**


**Key Files Involved:**

- `routes/listing.js`
- `routes/review.js`


**What was built & why:**

Added `req.flash('success', 'New Listing Created!')`, 'Listing Updated!', 'Listing Deleted!', 'New Review Created!', and 'Review Deleted!'.


**Terminal Commands for this commit:**

```bash
git checkout 760ca23
git show 760ca23 routes/listing.js
```

---

## Commit #26: `1929f82`

### Message: **error flash included**


**Key Files Involved:**

- `app.js`
- `routes/listing.js`
- `views/includes/flash.ejs`


**What was built & why:**

When a requested listing does not exist (`!listing`), flash error `Listing you requested for does not exist!` and redirect to `/listings` instead of throwing an unhandled crash.


**Terminal Commands for this commit:**

```bash
git checkout 1929f82
git show 1929f82 routes/listing.js
```

---

## Commit #27: `8c0932e`

### Message: **installed passport , passport-local, passport-local-mongoose**


**Key Files Involved:**

- `models/user.js`
- `app.js`
- `package.json`


**What was built & why:**

Installed `passport`, `passport-local`, and `passport-local-mongoose`. Created `models/user.js` with `email` and plugged in `passportLocalMongoose` (which automatically handles hashing, salting, and username/password fields). Configured passport in `app.js`.


**Terminal Commands for this commit:**

```bash
git checkout 8c0932e
git show 8c0932e models/user.js
```

---

## Commit #28: `af6f229`

### Message: **created demo user**


**Key Files Involved:**

- `app.js`
- `models/user.js`


**What was built & why:**

Added a demo test route `/demouser` in `app.js` using `User.register(fakeUser, password)` to verify password hashing with PBKDF2/crypto.


**Terminal Commands for this commit:**

```bash
git checkout af6f229
git show af6f229 app.js
```

---

## Commit #29: `b5fa64d`

### Message: **added signUp and login pages**


**Key Files Involved:**

- `views/users/signup.ejs`
- `views/users/login.ejs`
- `routes/user.js`
- `app.js`


**What was built & why:**

Created `routes/user.js` with GET/POST `/signup` and GET/POST `/login` (using `passport.authenticate('local')`). Created user auth forms in `views/users/`.


**Terminal Commands for this commit:**

```bash
git checkout b5fa64d
git show b5fa64d routes/user.js
```

---

## Commit #30: `7365bb8`

### Message: **added sign out user**


**Key Files Involved:**

- `middleware.js`
- `routes/user.js`
- `routes/listing.js`
- `views/includes/navbar.ejs`


**What was built & why:**

Added `GET /logout` with `req.logout()`. Created `isLoggedIn` middleware in `middleware.js` to protect routes like `/listings/new`. Updated `navbar.ejs` to conditionally show Login/Signup or Logout based on `currUser` (`req.user`).


**Terminal Commands for this commit:**

```bash
git checkout 7365bb8
git show 7365bb8 middleware.js
```

---

## Commit #31: `a19c82a`

### Message: **added login after signup & post login page functionality**


**Key Files Involved:**

- `middleware.js`
- `routes/user.js`
- `app.js`


**What was built & why:**

Used `req.login()` right after user registration so newly registered users are logged in immediately. Saved `req.session.redirectUrl` in `isLoggedIn` so users return to the exact page they intended to visit before logging in.


**Terminal Commands for this commit:**

```bash
git checkout a19c82a
git show a19c82a routes/user.js
```

---

## Commit #32: `c606ba6`

### Message: **added listing owner**


**Key Files Involved:**

- `models/listing.js`
- `routes/listing.js`
- `init/index.js`
- `views/listings/show.ejs`


**What was built & why:**

Added `owner: { type: Schema.Types.ObjectId, ref: 'User' }` to `listingSchema`. Updated `init/index.js` to assign all sample listings an owner. When creating a listing, set `newListing.owner = req.user._id`. Displayed owner username on `show.ejs`.


**Terminal Commands for this commit:**

```bash
git checkout c606ba6
git show c606ba6 models/listing.js
```

---

## Commit #33: `22111ff`

### Message: **authorization for  /listings**


**Key Files Involved:**

- `middleware.js`
- `routes/listing.js`
- `views/listings/show.ejs`


**What was built & why:**

Created `isOwner` middleware checking `listing.owner.equals(res.locals.currUser._id)`. Hide Edit and Delete buttons on `show.ejs` if `currUser` is not the owner.


**Terminal Commands for this commit:**

```bash
git checkout 22111ff
git show 22111ff middleware.js
```

---

## Commit #34: `e88681f`

### Message: **added authorization for reviews**


**Key Files Involved:**

- `models/review.js`
- `middleware.js`
- `routes/review.js`
- `views/listings/show.ejs`


**What was built & why:**

Added `author: { type: Schema.Types.ObjectId, ref: 'User' }` to `models/review.js`. Created `isReviewAuthor` middleware. Restrict review delete button on `show.ejs` to the author only.


**Terminal Commands for this commit:**

```bash
git checkout e88681f
git show e88681f middleware.js
```

---

## Commit #35: `4e14f8c`

### Message: **added MVC model for Listings**


**Key Files Involved:**

- `controllers/listings.js`
- `routes/listing.js`


**What was built & why:**

Created `controllers/listings.js` containing functions: `index`, `renderNewForm`, `showListing`, `createListing`, `renderEditForm`, `updateListing`, `destroyListing`. Route files now only define HTTP paths and attach controllers.


**Terminal Commands for this commit:**

```bash
git checkout 4e14f8c
git show 4e14f8c controllers/listings.js
```

---

## Commit #36: `3212679`

### Message: **added MVC model for reviews**


**Key Files Involved:**

- `controllers/reviews.js`
- `routes/review.js`


**What was built & why:**

Created `controllers/reviews.js` with `createReview` and `destroyReview`. `routes/review.js` streamlined.


**Terminal Commands for this commit:**

```bash
git checkout 3212679
git show 3212679 controllers/reviews.js
```

---

## Commit #37: `250e39c`

### Message: **added MVC model for users**


**Key Files Involved:**

- `controllers/users.js`
- `routes/user.js`


**What was built & why:**

Created `controllers/users.js` with `renderSignupForm`, `signup`, `renderLoginForm`, `login`, and `logout`.


**Terminal Commands for this commit:**

```bash
git checkout 250e39c
git show 250e39c controllers/users.js
```

---

## Commit #38: `3bd71aa`

### Message: **added router.route**


**Key Files Involved:**

- `routes/listing.js`
- `routes/user.js`


**What was built & why:**

Refactored `routes/listing.js` and `routes/user.js` using `router.route('/')` to group `.get()` and `.post()` on the same path, reducing boilerplate and improving clarity.


**Terminal Commands for this commit:**

```bash
git checkout 3bd71aa
git show 3bd71aa routes/listing.js
```

---

## Commit #39: `98aebdf`

### Message: **Re-style ratings**


**Key Files Involved:**

- `public/css/rating.css`
- `views/listings/show.ejs`
- `views/layouts/boilerplate.ejs`


**What was built & why:**

Added `public/css/rating.css` (Starability slot animation). Replaced plain number inputs with interactive clickable 5-star ratings in review forms and review cards.


**Terminal Commands for this commit:**

```bash
git checkout 98aebdf
git show 98aebdf views/listings/show.ejs
```

---

## Commit #40: `778d706`

### Message: **install multer for manupulating form for upload images**


**Key Files Involved:**

- `routes/listing.js`
- `views/listings/new.ejs`
- `package.json`


**What was built & why:**

Installed `multer`. Updated `new.ejs` form with `enctype='multipart/form-data'`. Added `upload.single('listing[image]')` middleware in route.


**Terminal Commands for this commit:**

```bash
git checkout 778d706
git show 778d706 routes/listing.js
```

---

## Commit #41: `bbb61eb`

### Message: **install npm dotenv**


**Key Files Involved:**

- `app.js`
- `package.json`


**What was built & why:**

Installed `dotenv`. Added `if (process.env.NODE_ENV != 'production') { require('dotenv').config(); }` at top of `app.js` to securely load API credentials.


**Terminal Commands for this commit:**

```bash
git checkout bbb61eb
git show bbb61eb app.js
```

---

## Commit #42: `c2035df`

### Message: **added cloudinary storage and stored file**


**Key Files Involved:**

- `cloudConfig.js`
- `routes/listing.js`
- `package.json`


**What was built & why:**

Installed `cloudinary` and `multer-storage-cloudinary`. Created `cloudConfig.js` to configure Cloudinary credentials and CloudinaryStorage engine with folder `wanderlust_DEV`.


**Terminal Commands for this commit:**

```bash
git checkout c2035df
git show c2035df cloudConfig.js
```

---

## Commit #43: `f0a9093`

### Message: **save link in mongo**


**Key Files Involved:**

- `models/listing.js`
- `controllers/listings.js`
- `routes/listing.js`


**What was built & why:**

Refactored `image` schema from String to an object: `{ url: String, filename: String }`. In `controllers/listings.js`, saved `req.file.path` as `url` and `req.file.filename` as `filename`.


**Terminal Commands for this commit:**

```bash
git checkout f0a9093
git show f0a9093 models/listing.js
```

---

## Commit #44: `1a5fd18`

### Message: **image preview for listing image**


**Key Files Involved:**

- `controllers/listings.js`
- `views/listings/edit.ejs`


**What was built & why:**

In `controllers/listings.js`, used Cloudinary URL manipulation: `listing.image.url.replace('/upload', '/upload/w_250')` to render a 250px thumbnail preview of the existing image on `edit.ejs`.


**Terminal Commands for this commit:**

```bash
git checkout 1a5fd18
git show 1a5fd18 views/listings/edit.ejs
```

---

## Commit #45: `0ce2cc6`

### Message: **Added  MapTiler + MapLibre geocoding**


**Key Files Involved:**

- `.gitignore`
- `models/listing.js`
- `controllers/listings.js`
- `package.json`


**What was built & why:**

Added `geometry: { type: { type: String, enum: ['Point'], required: true }, coordinates: { type: [Number], required: true } }` to `listingSchema`. Used geocoding SDK in `controllers/listings.js` to turn `listing.location` into longitude & latitude and render interactive maps on `show.ejs`.


**Terminal Commands for this commit:**

```bash
git checkout 0ce2cc6
git show 0ce2cc6 models/listing.js
```

---

## Commit #46: `9d14c36`

### Message: **updated updatelistin controller and improve navbar style**


**Key Files Involved:**

- `controllers/listings.js`
- `views/includes/navbar.ejs`
- `views/listings/show.ejs`


**What was built & why:**

In `updateListing` controller, checked if `req.file` exists before replacing image (preserving existing image if user didn't upload a new one). Polished map container styling.


**Terminal Commands for this commit:**

```bash
git checkout 9d14c36
git show 9d14c36 controllers/listings.js
```

---

## Commit #47: `bd7d7b7`

### Message: **added UI for filters and tax switch**


**Key Files Involved:**

- `views/listings/index.ejs`
- `models/listing.js`


**What was built & why:**

Added scrollable icon bar on `index.ejs` (Trending, Rooms, Iconic Cities, Mountains, Castles, Amazing Pools, Camping, Farms, Arctic). Added interactive JavaScript switch to toggle `+18% GST` price display.


**Terminal Commands for this commit:**

```bash
git checkout bd7d7b7
git show bd7d7b7 views/listings/index.ejs
```

---

## Commit #48: `a227509`

### Message: **added Ui for search**


**Key Files Involved:**

- `views/includes/navbar.ejs`


**What was built & why:**

Added search input form with search icon in `navbar.ejs` submitting `GET /listings/search`.


**Terminal Commands for this commit:**

```bash
git checkout a227509
git show a227509 views/includes/navbar.ejs
```

---

## Commit #49: `b8a4c4b`

### Message: **added search input based on title and location**


**Key Files Involved:**

- `controllers/listings.js`
- `views/includes/navbar.ejs`


**What was built & why:**

Implemented search handler using MongoDB `$regex` (case-insensitive query matching `title`, `location`, or `country`).


**Terminal Commands for this commit:**

```bash
git checkout b8a4c4b
git show b8a4c4b controllers/listings.js
```

---

## Commit #50: `6e4d8fd`

### Message: **connect to mongose-atlas**


**Key Files Involved:**

- `app.js`
- `package.json`


**What was built & why:**

Added `const dbUrl = process.env.ATLASDB_URL` in `app.js` with fallback to local MongoDB URL, allowing production database hosting.


**Terminal Commands for this commit:**

```bash
git checkout 6e4d8fd
git show 6e4d8fd app.js
```

---

## Commit #51: `25470ba`

### Message: **added mongo session store using npm connect-mongo**


**Key Files Involved:**

- `app.js`
- `package.json`


**What was built & why:**

Installed `connect-mongo`. Configured `MongoStore.create({ mongoUrl: dbUrl, crypto: { secret }, touchAfter: 24 * 3600 })` so user login sessions persist in MongoDB Atlas across server restarts.


**Terminal Commands for this commit:**

```bash
git checkout 25470ba
git show 25470ba app.js
```

---

## Commit #52: `e9c0529`

### Message: **added .env secret**


**Key Files Involved:**

- `app.js`
- `package.json`


**What was built & why:**

Replaced hardcoded session secret string with `process.env.SECRET`.


**Terminal Commands for this commit:**

```bash
git checkout e9c0529
git show e9c0529 app.js
```

---

## Commit #53: `7b7d0f8`

### Message: **improve file structure**


**Key Files Involved:**

- `app.js`
- `middleware.js`
- `schema.js`
- `views/error.ejs`
- `public/css/style.css`


**What was built & why:**

Cleaned up import statements, refactored validation helper middleware in `middleware.js`, and finalized CSS styles.


**Terminal Commands for this commit:**

```bash
git checkout 7b7d0f8
git show 7b7d0f8 --stat
```

---

## Commit #54: `a89aaa9`

### Message: **update README.md with project description, features, tech stack, and installation instructions**


**Key Files Involved:**

- `README.md`


**What was built & why:**

Documented tech stack (Node.js, Express, MongoDB, EJS, Bootstrap, Cloudinary, MapTiler), feature list, and step-by-step setup instructions (`npm install`, `.env`, `node init/index.js`, `nodemon app.js`).


**Terminal Commands for this commit:**

```bash
git checkout a89aaa9
git show a89aaa9
```

---

## Commit #55: `43a816b`

### Message: **Updated readme file**


**Key Files Involved:**

- `README.md`
- `screenshots`


**What was built & why:**

Attached application screenshots showing listing explore page and detail page directly in the README.


**Terminal Commands for this commit:**

```bash
git checkout 43a816b
git show 43a816b
```

---
