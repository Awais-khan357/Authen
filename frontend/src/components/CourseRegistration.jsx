import React, { useState } from "react";
import axios from "./config/axios";
import { useNavigate } from "react-router-dom";

const CourseRegistration = () => {
  const [formData, setFormData] = useState({
    stdName: "",
    semester: "",
    rollno: "",
    courses: [],
  });
  const navigate = useNavigate();

  const availableCourses = [
    "Mathematics",
    "Physics",
    "Computer Science",
    "Literature",
    "History",
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Sending data:", formData);
      const response = await axios.post("/courses/course", formData);
      console.log("Response:", response.data);
      alert("Registration successful!");
      navigate("/dashboard");
    } catch (error) {
      console.error("Error details:", error.response?.data);
      alert(
        `Registration failed: ${error.response?.data?.message || error.message}`
      );
    }
  };

  const handleCheckboxChange = (course) => {
    setFormData((prev) => ({
      ...prev,
      courses: prev.courses.includes(course)
        ? prev.courses.filter((c) => c !== course)
        : [...prev.courses, course],
    }));
  };

  return (
    <div className="container">
      <h2>Course Registration</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Student Name:</label>
          <input
            type="text"
            value={formData.stdName}
            onChange={(e) =>
              setFormData({ ...formData, stdName: e.target.value })
            }
            required
          />
        </div>
        <div>
          <label>Semester:</label>
          <input
            type="text"
            value={formData.semester}
            onChange={(e) =>
              setFormData({ ...formData, semester: e.target.value })
            }
            required
          />
        </div>
        <div>
          <label>Roll Number:</label>
          <input
            type="text"
            value={formData.rollno}
            onChange={(e) =>
              setFormData({ ...formData, rollno: e.target.value })
            }
            required
          />
        </div>
        <div>
          <label>Select Courses:</label>
          {availableCourses.map((course) => {
            return (
              <div key={course}>
                <input
                  type="checkbox"
                  id={course}
                  value={course}
                  checked={formData.courses.includes(course)}
                  onChange={() => handleCheckboxChange(course)}
                />
                <label htmlFor={course}>{course}</label>
              </div>
            );
          })}
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default CourseRegistration;
