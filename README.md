# 🌍 Wanderlust Stays

Wanderlust Stays is a full-stack web application for browsing, listing, reviewing, and managing travel stays with interactive maps and authentication.

## 🔗 Live Website:
👉 https://wanderlust-stays-cde4.onrender.com/listings

## 🚀 Features
- User signup & login (Passport.js)
- Create, edit, delete listings with image upload (Cloudinary)
- Reviews and ratings (only authenticated users)
- Owner-only edit/delete authorization
- Interactive maps (MapLibre / MapTiler)
- Flash messages for feedback

## 🛠️ Tech Stack
- Node.js, Express
- MongoDB, Mongoose
- EJS templates, Bootstrap
- Passport.js (local strategy)
- MapLibre + MapTiler
- Cloudinary for image storage

## 📂 Project Structure
```
wanderlust-stays/
├── controllers/
├── models/
├── routes/
├── views/
│   ├── layouts/
│   ├── listings/
│   └── includes/
├── public/
├── utils/
├── app.js
├── package.json
└── .env
```

## ⚙️ Environment Variables
Create a `.env` file in the project root with these variables (example values omitted):

- CLOUD_NAME=
- CLOUD_API_KEY=
- CLOUD_API_SECRET=
- MAP_TOKEN=
- ATLASDB_URL=        # MongoDB connection string
- SECRET_KEY=         # session secret

Do not commit `.env` to version control.

## ▶️ Installation & Run
1. Clone
   git clone <repo-url>
   cd wanderlust-stays

2. Install
   npm install

3. Add `.env` with required variables (see above).

4. Start
   - Development: nodemon app.js
   - Production / simple run: node app.js

Open: http://localhost:8080

## Notes & Troubleshooting
- Ensure your Atlas cluster allows connections (IP whitelist).
- If map tiles fail, verify MAP_TOKEN and include MapLibre CSS/JS in layout.
- If Cloudinary upload fails, confirm cloud credentials in `.env`.

## 📸 Screenshots
![alt text](<Screenshot 2026-01-10 at 3.04.27 PM.png>)
![alt text](<Screenshot 2026-01-10 at 3.06.39 PM.png>)

## 🔮 Future Improvements
- Booking system
- Payment integration
- Wishlist feature
- Advanced search & filters
- User profile pages
- Admin dashboard

## 🤝 Contributing
Contributions are welcome!
Feel free to fork this repository and submit a pull request.

## 📜 License
MIT

## 👨‍💻 Author
Kartik Bhadane