import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Login.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [userRole, setUserRole] = useState("student");
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // For show/hide password

  const navigate = useNavigate();

  const handleUsernameChange = (e) => setUsername(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handleRoleChange = (e) => setUserRole(e.target.value);
  const togglePasswordVisibility = () => setShowPassword(!showPassword); // Toggle password visibility

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!username || !password) {
      setMessage("Both fields are required!");
      setIsError(true);
      return;
    }
  
    try {
      const response = await axios.post("http://localhost:5001/api/auth/login", {
        username,
        password,
        role: userRole,
      });
  
      if (response.status === 200) {
        setMessage("Login successful!");
        setIsError(false);
  
        // Store username and password in localStorage/sessionStorage
        sessionStorage.setItem("username", username);
        sessionStorage.setItem("password", password);
  
        // Delay the navigation for 2 seconds
        setTimeout(() => {
          if (userRole === "student") {
            navigate("/student-dashboard", { state: { username, password } });
          } else if (userRole === "admin") {
            navigate("/admin-dashboard", { state: { username, password } });
          } else {
            // Navigate to /verify route for verification
            navigate("/verify");
          }
        }, 1000);
      } else {
        setMessage("Login failed. Please check your credentials.");
        setIsError(true);
      }
    } catch (error) {
      console.error("Error logging in:", error);
      setMessage(error.response?.data?.message || "Login failed. Please try again.");
      setIsError(true);
    }
  };
  

  return (
    <div className="login-container">
      <h2>Login</h2>
      <div>
        <label htmlFor="role">Role:</label>
        <select id="role" value={userRole} onChange={handleRoleChange}>
          <option value="student">Student</option>
          <option value="admin">Admin</option>
        </select>
      </div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={handleUsernameChange}
            required
          />
        </div>

        <div>
          <label htmlFor="password">Password:</label>
          <div className="password-container">
            <input
              type={showPassword ? "text" : "password"} // Show or hide password
              id="password"
              value={password}
              onChange={handlePasswordChange}
              required
            />
            <span
              className="show-hide-text"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? "Hide" : "Show"}
            </span>
          </div>
        </div>

        <button type="submit">Login</button>
      </form>
      {message && <p className={isError ? "error" : "success"}>{message}</p>}
      <p className="register-link">
        New user? <Link to="/register">Register here</Link>
      </p>
    </div>
  );
};

export default Login;
