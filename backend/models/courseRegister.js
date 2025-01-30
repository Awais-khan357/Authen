const mongoose = require("mongoose");

const courseRegisterSchema = new mongoose.Schema(
  {
    stdName: {
      type: String,
      required: [true, "Student Name is required"],
      trim: true,
    },
    semester: {
      type: String,
      required: [true, "Semester is required"],
      trim: true,
    },
    rollno: {
      type: String,
      required: [true, "Roll number is required"],
      unique: true,
    },
    courses: {
      type: [String],
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("CourseRegister", courseRegisterSchema);
