// controllers/userController.js

const User = require("../models/UserModel");

// Vartotojo duomenų gavimas
exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Nepavyko gauti vartotojo", error: err.message });
  }
};

// Vartotojo duomenų atnaujinimas
exports.updateUser = async (req, res) => {
  const { name, surname, country, phone } = req.body;

  try {
    const updated = await User.findByIdAndUpdate(
      req.user.id,
      { name, surname, country, phone },
      { new: true }
    ).select("-password");
    res.json(updated);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Nepavyko atnaujinti", error: err.message });
  }
};

// Slaptažodžio pakeitimas
exports.changePassword = async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  try {
    const user = await User.findById(req.user.id);
    if (!(await user.comparePassword(currentPassword))) {
      return res
        .status(401)
        .json({ message: "Neteisingas esamas slaptažodis" });
    }

    user.password = newPassword;
    await user.save();

    res.json({ message: "Slaptažodis pakeistas" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Klaida keičiant slaptažodį", error: err.message });
  }
};
