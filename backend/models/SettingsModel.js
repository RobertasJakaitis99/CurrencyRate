// models/SettingsModel.js

const mongoose = require("mongoose");

// Naudotojo nustatymai
const settingsSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true,
  },
  language: { type: String, enum: ["lt", "en"], default: "en" },
  theme: { type: String, enum: ["light", "dark"], default: "light" },
});

module.exports = mongoose.model("Settings", settingsSchema);
