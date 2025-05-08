// routes/conversionRoutes.js

const express = require("express");
const router = express.Router();
const {
  createConversion,
  getUserConversions,
  updateConversion,
  deleteConversion,
} = require("../controllers/conversionController");
const { isAuth } = require("../middleware/authMiddleware");

router.post("/", isAuth, createConversion);
router.get("/", isAuth, getUserConversions);
router.put("/:id", isAuth, updateConversion);
router.delete("/:id", isAuth, deleteConversion);

module.exports = router;
