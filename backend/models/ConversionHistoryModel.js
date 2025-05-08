// models/ConversionHistoryModel.js

const mongoose = require("mongoose");

// Valiutos konversijų istorija
const historySchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  fromCurrency: { type: String, required: true },
  toCurrency: { type: String, required: true },
  amount: { type: Number, required: true },
  result: { type: Number, required: true },
  rate: { type: Number, required: true },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("ConversionHistory", historySchema);
