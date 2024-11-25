// src/components/Login.js

import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Import Link for navigation
import '../styles/Login.css'; // Corrected import for CSS

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [userRole, setUserRole] = useState('student'); // Default role is 'student'
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);

  // Handle input changes
  const handleUsernameChange = (e) => setUsername(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handleRoleChange = (e) => setUserRole(e.target.value);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      setMessage('Both fields are required!');
      setIsError(true);
      return;
    }

    console.log('Logging in with:', { username, password, userRole });

    try {
      // Send a POST request to the backend API with role
      const response = await axios.post('http://localhost:5001/api/auth/login', {
        username,
        password,
        role: userRole, // Include the role in the request
      });

      if (response.status === 200) {
        setMessage('Login successful!');
        setIsError(false);

        // Redirect based on user role
        if (userRole === 'student') {
          window.location.href = '/student-dashboard';
        } else if (userRole === 'admin') {
          window.location.href = '/admin-dashboard';
        }
      } else {
        setMessage('Login failed. Please check your credentials.');
        setIsError(true);
      }
    } catch (error) {
      console.error('Error logging in:', error);
      setMessage(
        error.response?.data?.message || 'Login failed. Please try again.'
      );
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
          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
        </div>

        <button type="submit">Login</button>
      </form>
      {message && (
        <p className={isError ? 'error' : 'success'}>{message}</p>
      )}
      {/* New User Registration Link */}
      <p className="register-link">
        New user? <Link to="/register">Register here</Link>
      </p>
    </div>
  );
};

export default Login;
