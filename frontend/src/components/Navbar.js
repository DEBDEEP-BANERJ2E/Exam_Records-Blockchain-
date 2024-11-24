import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <Link to="/" className="logo">UniLine</Link>
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/register">Register</Link>
        <Link to="/exam-records">Exam Records</Link>
        <Link to="/verify">Verify</Link>
      </div>
    </nav>
  );
};

export default Navbar;
