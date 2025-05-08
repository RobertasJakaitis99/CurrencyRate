const Conversion = require("../models/ConversionHistoryModel");
const Log = require("../models/logModels"); // PATAISYTA: buvę "LogModel" → "logModels"

// Naujo įrašo sukūrimas
exports.createConversion = async (req, res) => {
  const { fromCurrency, toCurrency, amount, result, rate } = req.body;

  try {
    const conversion = await Conversion.create({
      user: req.user.id,
      fromCurrency,
      toCurrency,
      amount,
      result,
      rate,
    });

    await Log.create({
      user: req.user.id,
      action: "CREATE_CONVERSION",
      target: conversion._id,
    });

    res.status(201).json(conversion);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Klaida kuriant konversiją", error: err.message });
  }
};

// Vartotojo istorijos gavimas
exports.getUserConversions = async (req, res) => {
  try {
    const conversions = await Conversion.find({ user: req.user.id }).sort({
      date: -1,
    });
    res.json(conversions);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Klaida gaunant istoriją", error: err.message });
  }
};

// Vieno įrašo atnaujinimas
exports.updateConversion = async (req, res) => {
  try {
    const conversion = await Conversion.findById(req.params.id);

    if (!conversion)
      return res.status(404).json({ message: "Įrašas nerastas" });
    if (
      conversion.user.toString() !== req.user.id &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({ message: "Neturi teisės keisti" });
    }

    Object.assign(conversion, req.body);
    await conversion.save();

    await Log.create({
      user: req.user.id,
      action: "UPDATE_CONVERSION",
      target: conversion._id,
    });

    res.json(conversion);
  } catch (err) {
    res.status(500).json({ message: "Klaida atnaujinant", error: err.message });
  }
};

// Įrašo trynimas
exports.deleteConversion = async (req, res) => {
  try {
    const conversion = await Conversion.findById(req.params.id);
    if (!conversion)
      return res.status(404).json({ message: "Įrašas nerastas" });

    if (
      conversion.user.toString() !== req.user.id &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({ message: "Neturi teisės trinti" });
    }

    await conversion.remove();

    await Log.create({
      user: req.user.id,
      action: "DELETE_CONVERSION",
      target: conversion._id,
    });

    res.json({ message: "Įrašas ištrintas" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Klaida trynimo metu", error: err.message });
  }
};
