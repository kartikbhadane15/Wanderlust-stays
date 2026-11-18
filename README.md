# 🌍 Wanderlust Stays

[![Node.js](https://img.shields.io/badge/Node.js-v20+-green.svg?logo=node.js)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-v5-black.svg?logo=express)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-green.svg?logo=mongodb)](https://www.mongodb.com/)
[![Bootstrap](https://img.shields.io/badge/Bootstrap-v5.3-purple.svg?logo=bootstrap)](https://getbootstrap.com/)
[![MapLibre GL](https://img.shields.io/badge/MapLibre_GL-v3.6-blue.svg?logo=maplibre)](https://maplibre.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A full-stack, production-ready travel accommodation and home-sharing platform inspired by Airbnb. Built with modern web technologies, strict modular architecture, responsive design, and production security best practices.

---

## ✨ Features Overview

### 🏡 1. Property Listings & Showcase
- **Full CRUD Capabilities**: Create, view, edit, and delete travel listings with location geocoding and rich metadata.
- **Multiple Image Uploads**: Cloudinary integration for single or multi-photo uploads with automatic cloud asset optimization.
- **Photo Showcase**: Desktop mosaic photo grid, mobile swipeable carousel with photo counter, and fullscreen lightbox preview.
- **Badges & Ratings**: Average star ratings, review counts, and dynamic *"Guest Favorite"* badges for stays with $\ge$ 4.5 stars.

### 🔍 2. Advanced Search & Filtering
- **Destination Search**: Real-time keyword search across stay titles, locations, and countries.
- **Category Tabs**: Instant categorization (Trending, Iconic Cities, Mountains, Castles, Pools, Camping, Farms, Arctic, Beach, etc.).
- **Price Range Slider & Inputs**: Synchronized minimum/maximum price slider filtering stays per night.
- **Amenities Filter**: Multi-select filtering for Fast Wi-Fi, Pool, Air Conditioning, Free Parking, Kitchen, TV, Workspace, and Pet Friendly.
- **Sorting Options**: Sort by Recommended, Price: Low to High, Price: High to Low, and Top Rated.
- **Tax Display Toggle**: One-click switch toggling base night prices and total prices including 18% GST.

### 🗺️ 3. Split Map View ("Explore on Map")
- **Dual Layout Toggle**: Switch seamlessly between full 3-column stay grid and split-screen mode (stays on the left, sticky interactive map on the right).
- **Interactive Price Pins**: MapLibre GL & MapTiler powered pins displaying localized prices (e.g., `₹3,200`).
- **Preview Cards**: Clicking a pin opens a preview card with thumbnail, title, rating, and price.
- **Synchronized Hover**: Hovering a stay card highlights the corresponding pin on the map and vice versa.
- **Floating Map Pill**: Fixed bottom-center floating button inspired by Airbnb for quick map access on all screens.

### ❤️ 4. Wishlist / "Save to Favorites"
- **Instant AJAX Toggle**: Heart icon on stay cards and listing pages with optimistic UI updates and bounce animations.
- **Live Navbar Badge**: Unread saved stays count updating in real time across the entire application without page reloads.
- **Saved Stays Hub**: Dedicated Wishlist dashboard displaying all favorited properties with direct removal controls.

### 📅 5. Booking & Reservation Engine
- **Interactive Reservation Widget**: Live night counting and price breakdown with 18% GST calculation based on check-in and checkout selections.
- **Date Validation**: Automatic date restrictions preventing past dates and invalid checkout periods.
- **Reservation Receipts**: Generates unique reservation reference codes (e.g., `WL-ABC1-234D`), detailed receipts, and print-ready invoices.
- **Cancellation Policy**: Safe cancellation management for guests and hosts.

### 💳 6. Mock Payment Gateway & Animated Checkout
- **Multi-Method Checkout**: Realistic mock payment gateway supporting Credit/Debit Cards, UPI / QR, and Net Banking.
- **Card Formatting**: Automatic space formatting for 16-digit card numbers, MM/YY expiry formatting, and masked CVV inputs.
- **Fake Payment Gateway Animation**: Multi-stage processing simulation with connecting bank ring, 3D Secure network authorization, gateway approval, and animated checkmark bounce before receipt generation.

### 💬 7. Direct "Contact Host" Messaging & Inbox
- **Host Communication**: Guests can message property owners directly from any listing page or reservation widget.
- **Quick Inquiry Chips**: One-click prompt chips for instant questions (*"Is early check-in possible?"*, *"Fast Wi-Fi?"*, *"Parking available?"*).
- **Two-Column Inbox**: Conversation threads on the left with unread indicators and active chat stream on the right with outgoing and incoming speech bubbles.
- **Real-Time Unread Badges**: Navbar badge displaying unread messages for logged-in users.

### 👤 8. User Profile & Host Dashboard
- **Comprehensive Hub**: Consolidated dashboard displaying user statistics (total trips, properties owned, reviews written, and wishlist count).
- **Multi-Tab Interface**: Tabs for *"My Trips"*, *"My Properties"*, *"Guest Reservations"*, *"Reviews Written"*, and *"Saved Stays"*.
- **Host Management**: Allows hosts to track incoming reservations on their properties, guest headcounts, and total earnings.

### 📄 9. Pagination & Infinite Scroll ("Load More Stays")
- **Clean 3-Column Desktop Pagination**: Configured with 9 stays per page to maintain consistent grid alignment.
- **Numbered Page Navigation**: Previous, numbered page pills, and Next controls that preserve all active search queries and filters.
- **AJAX Load More**: Infinite scroll button dynamically appending subsequent stay pages without losing scroll position or refreshing.

### 🛡️ 10. Production Security & Spam Protection
- **Secure Headers (Helmet)**: Custom Content Security Policy (CSP) allowing MapLibre, MapTiler, Cloudinary, and Bootstrap CDN.
- **Rate Limiting**: Granular protection against brute-force logins, signups, review spam bursts, messaging floods, and rapid DOS scraping.
- **Anti-Spam Honeypot**: Hidden `_website_hp` field trapping automated bots silently.
- **NoSQL Injection Defense**: Recursive query sanitization stripping malicious MongoDB operators (`$`, `.`) and executable script tags.
- **Session Hardening**: Secure session storage via MongoDB Atlas with `httpOnly: true` and `sameSite: "lax"`.

---

## 🛠️ Tech Stack

| Layer | Technologies |
| :--- | :--- |
| **Backend** | Node.js, Express.js (v5) |
| **Database** | MongoDB Atlas, Mongoose (v9), Connect-Mongo |
| **Authentication** | Passport.js, Passport-Local, Passport-Local-Mongoose |
| **Templating** | EJS, EJS-Mate, Bootstrap 5.3, FontAwesome 7 |
| **Maps & Geospatial** | MapLibre GL, MapTiler Geocoding & Vector Tiles |
| **File Storage** | Cloudinary, Multer, Multer-Storage-Cloudinary |
| **Security** | Helmet (CSP), Express-Rate-Limit, Honeypot Filter, Joi Validation |

---

## 📂 Project Structure

```
wanderlust-stays/
├── controllers/          # Business logic & route handlers
│   ├── bookings.js       # Reservations, checkout & payment simulation
│   ├── listings.js       # Listing CRUD, filters & pagination
│   ├── messages.js       # Inbox & host communication
│   ├── reviews.js        # Review creation & deletion
│   └── users.js          # Auth, profile & wishlist
├── middleware/           # Express middleware & security
│   ├── security.js       # Rate limiters, honeypot & NoSQL sanitization
│   └── index.js          # Authentication & authorization checks
├── models/               # Mongoose data schemas
│   ├── booking.js        # Reservation & payment status schema
│   ├── listing.js        # Property listing & geometry schema
│   ├── message.js        # Messaging & thread schema
│   ├── review.js         # User review schema
│   └── user.js           # Passport user schema
├── public/               # Static client assets
│   ├── css/
│   │   ├── style.css     # Global master stylesheet (Zero inline <style> tags)
│   │   └── rating.css    # Starability rating styles
│   └── js/
│       ├── exploreMap.js # MapLibre split view & price pin controller
│       ├── map.js        # Single listing show map controller
│       └── script.js     # Bootstrap form validation
├── routes/               # Express REST routers
│   ├── booking.js        # Booking & payment routes
│   ├── listing.js        # Listings REST routes
│   ├── message.js        # Inbox & messaging routes
│   ├── review.js         # Nested reviews routes
│   └── user.js           # Auth & profile routes
├── views/                # EJS view templates
│   ├── bookings/         # Trips list, receipt & checkout views
│   ├── includes/         # Navbar, footer & flash partials
│   ├── layouts/          # Master boilerplate layout
│   ├── listings/         # Explore grid, new, edit & show views
│   └── users/            # Login, signup, profile & inbox views
├── utils/                # Async wrappers & error classes
├── app.js                # Express app initialization & server entrypoint
├── package.json          # Dependencies & scripts
└── .env                  # Environment configuration (ignored in git)
```

---

## ⚙️ Environment Variables

Create a `.env` file in the project root with the following configuration:

```env
# Cloudinary (Image Uploads)
CLOUD_NAME=your_cloudinary_cloud_name
CLOUD_API_KEY=your_cloudinary_api_key
CLOUD_API_SECRET=your_cloudinary_api_secret

# MapTiler (MapLibre Maps & Geocoding)
MAP_TOKEN=your_maptiler_api_key

# MongoDB Connection
ATLASDB_URL=mongodb+srv://<username>:<password>@cluster.mongodb.net/wanderlust?retryWrites=true&w=majority

# Session Security
SECRET_KEY=your_strong_session_secret_key
NODE_ENV=development
```

> [!NOTE]
> Never commit your `.env` file to version control. Keep your credentials secure.

---

## ▶️ Installation & Local Setup

### 1. Clone the repository
```bash
git clone https://github.com/kartikbhadane15/Wanderlust-stays.git
cd Wanderlust-stays
```

### 2. Install dependencies
```bash
npm install
```

### 3. Configure environment variables
Create a `.env` file in the root directory and populate it with your credentials as described above.

### 4. Seed the database (Optional)
To populate sample listings with geometry coordinates:
```bash
node init/index.js
```

### 5. Start the application
- **Development Mode (with auto-restart)**:
  ```bash
  npm run dev
  ```
- **Production Mode**:
  ```bash
  npm start
  ```

Open your browser and navigate to:
```
http://localhost:8080/listings
```

---

## 📜 Architectural Standards

- **Centralized CSS (`public/css/style.css`)**: All visual styling, animations, responsive media queries, and layout grids are located strictly within `public/css/style.css`. No `<style>` tags are used within `.ejs` view files.
- **RESTful Routing**: Clean URL routing following standard REST conventions for resources.
- **Zero Paid Dependencies**: The entire project operates on free-tier services (MapTiler, Cloudinary free tier, MongoDB Atlas free tier) with native simulations for payment gateways and in-app messaging.

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/kartikbhadane15/Wanderlust-stays/issues).

---

## 📄 License

This project is open-source and licensed under the [MIT License](LICENSE).

---

## 👨‍💻 Author

**Kartik Bhadane**
- GitHub: [@kartikbhadane15](https://github.com/kartikbhadane15)
- Repository: [Wanderlust-stays](https://github.com/kartikbhadane15/Wanderlust-stays)
