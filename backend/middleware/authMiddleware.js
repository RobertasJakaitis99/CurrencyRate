// middleware/authMiddleware.js

const jwt = require("jsonwebtoken");
const User = require("../models/UserModel");

// Patikrina ar prisijungęs (autentifikacija)
exports.isAuth = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]; // "Bearer TOKEN"

  if (!token) return res.status(401).json({ message: "Nepateiktas tokenas" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // { id, role }
    next();
  } catch (err) {
    res.status(401).json({ message: "Neleistinas tokenas" });
  }
};

// Tik admin
exports.isAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res
      .status(403)
      .json({ message: "Reikalinga administratoriaus prieiga" });
  }
  next();
};

// Tik duomenų savininkas arba admin
exports.isOwner = (model) => {
  return async (req, res, next) => {
    try {
      const doc = await model.findById(req.params.id);
      if (!doc) return res.status(404).json({ message: "Įrašas nerastas" });

      if (doc.user.toString() !== req.user.id && req.user.role !== "admin") {
        return res.status(403).json({ message: "Neturi teisės" });
      }

      next();
    } catch (err) {
      res
        .status(500)
        .json({ message: "Klaida tikrinant nuosavybę", error: err.message });
    }
  };
};
