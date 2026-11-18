if (process.env.NODE_ENV !== "production") {
  require("dotenv").config({ path: __dirname + "/../.env" });
}

const mongoose = require("mongoose");
const Listing = require("../models/listing.js");

const dbUrl = process.env.ATLASDB_URL || "mongodb://127.0.0.1:27017/wanderlust";

const categoryKeywords = {
  beach: ["beach", "ocean", "coastal", "sea", "bungalow", "island", "malibu", "cancun", "bali", "greece", "hawaii"],
  mountains: ["mountain", "mount", "aspen", "banff", "ski", "chalet", "lake", "tahoe", "switzerland"],
  iconic: ["loft", "downtown", "city", "new york", "tokyo", "amsterdam", "boston", "miami", "urban"],
  castles: ["castle", "scotland", "palace", "fort", "historic"],
  pools: ["pool", "villa", "oasis", "dubai", "phuket", "maldives"],
  camping: ["camp", "tent", "cabin", "treehouse", "montana"],
  farms: ["farm", "countryside", "earth house", "provence"],
  arctic: ["arctic", "snow", "ski", "ice"],
  jungle: ["jungle", "forest", "safari", "serengeti", "eco-lodge", "rainforest"],
  trending: ["tuscany", "florence", "cotswolds", "retreat", "luxury"]
};

function detectCategory(title, desc) {
  const text = ((title || "") + " " + (desc || "")).toLowerCase();
  for (const [cat, keywords] of Object.entries(categoryKeywords)) {
    for (const kw of keywords) {
      if (text.includes(kw)) return cat;
    }
  }
  return "trending";
}

async function runBackfill() {
  await mongoose.connect(dbUrl);
  console.log("Connected to MongoDB...");

  const listings = await Listing.find({
    $or: [{ category: { $exists: false } }, { category: null }, { category: "" }]
  });

  console.log(`Found ${listings.length} listings missing category.`);

  for (let item of listings) {
    item.category = detectCategory(item.title, item.description);
    await item.save();
    console.log(`Updated: "${item.title}" -> ${item.category}`);
  }

  console.log("All categories backfilled successfully!");
  await mongoose.disconnect();
}

runBackfill().catch(console.error);
