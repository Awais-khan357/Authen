const courseRegister = require("../models/courseRegister");

const registerCourse = async (req, res) => {
  try {
    const { stdName, semester, rollno, courses } = req.body;

    const existingRegistration = await courseRegister.findOne({ rollno });
    if (existingRegistration) {
      return res.status(400).json({
        success: false,
        message: "Registration already exists for this roll number",
      });
    }

    const registration = await courseRegister.create({
      stdName,
      semester,
      rollno,
      courses,
      user: req.user.userId,
    });
    res.status(201).json({
      success: true,
      message: "Course registration successful",
      registration,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Registration failed",
      error: error.message,
    });
  }
};

const getRegistrations = async (req, res) => {
  try {
    const registrations = await courseRegister
      .find({ user: req.user.userId })
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      registrations,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch registrations",
      error: error.message,
    });
  }
};

module.exports = { registerCourse, getRegistrations };
