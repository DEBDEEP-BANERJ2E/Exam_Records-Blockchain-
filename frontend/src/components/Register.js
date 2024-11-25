import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../styles/Register.css';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [userRole, setUserRole] = useState('student');
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false); // State for password visibility

  // Handle input changes
  const handleUsernameChange = (e) => setUsername(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handleRoleChange = (e) => setUserRole(e.target.value);

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setPasswordVisible((prevVisible) => !prevVisible);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username || !password || !email) {
      setMessage('All fields are required!');
      setIsError(true);
      return;
    }

    console.log('Registering with:', { username, password, email, userRole });

    try {
      const response = await axios.post('http://localhost:5001/api/auth/register', {
        username,
        password,
        email,
        role: userRole,
      });

      if (response.status === 201) {
        setMessage('Registration successful! You can now log in.');
        setIsError(false);
        setTimeout(() => {
          window.location.href = '/login';
        }, 2000);
      }
    } catch (error) {
      console.error('Error registering:', error);
      setMessage(
        error.response?.data?.message || 'Registration failed. Please try again.'
      );
      setIsError(true);
    }
  };

  return (
    <div className="register-container">
      <h2>Register</h2>
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
              type={passwordVisible ? 'text' : 'password'}
              id="password"
              value={password}
              onChange={handlePasswordChange}
              required
            />
            <span
              className="password-toggle-text"
              onClick={togglePasswordVisibility}
            >
              {passwordVisible ? 'Hide' : 'Show'}
            </span>
          </div>
        </div>

        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={handleEmailChange}
            required
          />
        </div>

        <button type="submit">Register</button>
      </form>
      {message && (
        <p className={isError ? 'error' : 'success'}>{message}</p>
      )}
      <p className="login-link">
        Already have an account? <Link to="/login">Login here</Link>
      </p>
    </div>
  );
};

export default Register;
