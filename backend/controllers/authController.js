// controllers/authController.js

const User = require("../models/UserModel");
const Settings = require("../models/SettingsModel");
const jwt = require("jsonwebtoken");

// JWT kūrimas
const generateToken = (user) => {
  return jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

// Registracija
exports.register = async (req, res) => {
  const { name, surname, country, phone, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "El. paštas jau naudojamas" });

    const newUser = await User.create({
      name,
      surname,
      country,
      phone,
      email,
      password,
    });

    await Settings.create({ user: newUser._id }); // Nustatymai iškart

    const token = generateToken(newUser);
    res.status(201).json({ user: newUser, token });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Klaida registruojant", error: err.message });
  }
};

// Prisijungimas
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: "Neteisingi duomenys" });
    }

    const token = generateToken(user);
    res.status(200).json({ user, token });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Prisijungimo klaida", error: err.message });
  }
};
