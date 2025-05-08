// models/CurrencyModel.js

const mongoose = require("mongoose");

// Palaikomų valiutų schema
const currencySchema = new mongoose.Schema({
  code: { type: String, required: true }, // Pvz. "USD"
  name: { type: String, required: true }, // Pvz. "US Dollar"
  symbol: { type: String },
});

module.exports = mongoose.model("Currency", currencySchema);
