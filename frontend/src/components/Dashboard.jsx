import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "./config/axios";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const response = await axios.get("/auth/profile");
      setUserData(response.data.user);
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch user data");
      setLoading(false);
      if (err.response?.status === 401) {
        handleLogout();
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  if (loading) {
    return (
      <div className="dashboard-loading">
        <h2>Loading...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className="dashboard-error">
        <h2>Error</h2>
        <p>{error}</p>
        <button onClick={handleLogout}>Return to Login</button>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <nav className="dashboard-nav">
        <h1>Dashboard</h1>
        <button onClick={handleLogout} className="logout-btn">
          Logout
        </button>
      </nav>

      <div className="dashboard-content">
        <div className="user-info">
          <h2>Welcome, {userData?.username}!</h2>
          <div className="user-details">
            <p>
              Account created:{" "}
              {new Date(userData?.createdAt).toLocaleDateString()}
            </p>
            <p>
              Last updated: {new Date(userData?.updatedAt).toLocaleDateString()}
            </p>
          </div>
        </div>

        <div className="dashboard-cards">
          <div className="card">
            <h3>Profile Status</h3>
            <p>Active</p>
          </div>
          <Link to="/courses">
            <button>Register Courses</button>
          </Link>
          <div className="card">
            <h3>Last Login</h3>
            <p>{new Date().toLocaleDateString()}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
