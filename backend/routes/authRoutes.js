const express = require("express");
const router = express.Router();
const {
  register,
  login,
  getProfile,
} = require("../controllers/authController");

const { protect } = require("../middleware/authMiddleware");

router.use((req, res, next) => {
  console.log(`Auth Route accessed: ${req.method} ${req.url}`);
  next();
});

router.post("/register", register);
router.post("/login", login);
router.get("/profile", protect, getProfile);

module.exports = router;
