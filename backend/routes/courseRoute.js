const express = require("express");
const router = express.Router();
const {
  registerCourse,
  getRegistrations,
} = require("../controllers/courseController");
const { protect } = require("../middleware/authMiddleware");

router.post("/course", protect, registerCourse);
router.get("/registrations", protect, getRegistrations);

module.exports = router;
