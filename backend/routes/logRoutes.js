// routes/logRoutes.js

const express = require("express");
const router = express.Router();
const { getAllLogs } = require("../controllers/logController");
const { isAuth, isAdmin } = require("../middleware/authMiddleware");

router.get("/", isAuth, isAdmin, getAllLogs);

module.exports = router;
