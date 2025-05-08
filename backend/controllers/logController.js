const Log = require("../models/logModels"); // PATAISYTA: LogModels → logModels

// Tik admin gali matyti visus log'us
exports.getAllLogs = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Tik admin gali matyti logus" });
    }

    const logs = await Log.find()
      .populate("user", "email")
      .sort({ timestamp: -1 });

    res.json(logs);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Klaida gaunant logus", error: err.message });
  }
};
