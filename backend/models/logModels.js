// models/LogModel.js

const mongoose = require("mongoose");

// Veiksmų žurnalas (log'ai)
const logSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  action: { type: String, required: true },
  target: { type: String },
  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Log", logSchema);
