// routes/settingsRoutes.js

const express = require("express");
const router = express.Router();
const {
  getSettings,
  updateSettings,
} = require("../controllers/settingsController");
const { isAuth } = require("../middleware/authMiddleware");

router.get("/", isAuth, getSettings);
router.put("/", isAuth, updateSettings);

module.exports = router;
