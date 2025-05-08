// config/db.js

const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB prijungtas");
  } catch (err) {
    console.error("Klaida jungiantis prie DB:", err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
