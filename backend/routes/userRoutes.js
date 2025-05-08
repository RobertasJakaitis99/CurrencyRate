// routes/userRoutes.js

const express = require("express");
const router = express.Router();
const {
  getUser,
  updateUser,
  changePassword,
} = require("../controllers/userController");
const { isAuth } = require("../middleware/authMiddleware");

router.get("/me", isAuth, getUser);
router.put("/me", isAuth, updateUser);
router.put("/change-password", isAuth, changePassword);

module.exports = router;
