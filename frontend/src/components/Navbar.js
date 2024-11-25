import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';

const Navbar = () => {
  const [isMobile, setIsMobile] = useState(false);

  const toggleMenu = () => {
    setIsMobile(!isMobile);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="logo">AcademicLedger</Link>
        <div className={`nav-links ${isMobile ? 'mobile' : ''}`}>
          <Link to="/" onClick={() => setIsMobile(false)}>Home</Link>
          <Link to="/register" onClick={() => setIsMobile(false)}>Register</Link>
          <Link to="/exam-records" onClick={() => setIsMobile(false)}>Exam Records</Link>
          <Link to="/verify" onClick={() => setIsMobile(false)}>Verify</Link>
        </div>
        <button className="hamburger" onClick={toggleMenu}>
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
