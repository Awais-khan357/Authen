import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import CourseRegistration from "./components/CourseRegistration";
import Dashboard from "./components/Dashboard";
import ViewRegistration from "./components/ViewRegistration";

function App() {
  const isAuthenticated = !!localStorage.getItem("token");

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/dashboard"
          element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />}
        />
        <Route
          path="/courses"
          element={
            isAuthenticated ? <CourseRegistration /> : <Navigate to="/login" />
          }
        />
        <Route
          path="/view"
          element={
            isAuthenticated ? <ViewRegistration /> : <Navigate to="/login" />
          }
        />
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
