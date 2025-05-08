// controllers/settingsController.js

const Settings = require("../models/SettingsModel");

exports.getSettings = async (req, res) => {
  try {
    const settings = await Settings.findOne({ user: req.user.id });
    res.json(settings);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Nepavyko gauti nustatymų", error: err.message });
  }
};

exports.updateSettings = async (req, res) => {
  const { language, theme } = req.body;

  try {
    const updated = await Settings.findOneAndUpdate(
      { user: req.user.id },
      { language, theme },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Nepavyko atnaujinti nustatymų", error: err.message });
  }
};
