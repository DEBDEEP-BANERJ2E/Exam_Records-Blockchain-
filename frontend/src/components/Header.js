// src/components/Header.js

import React from "react";
import { Link } from "react-router-dom";
import "../styles/Header.css";
import Image from "../images/img.jpg"; // Use .png or another format

const Header = () => {
  return (
    <header className="header">
      <div className="logo">
      <Link to="/"><img src={Image} alt="Logo" className="logo-img" /></Link>
        <Link to="/" className="logo-text">AcademicLedger</Link>
      </div>
      <nav className="nav-links">
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/login" className="nav-link">Sign up</Link>
        <Link to="/admin-dashboard" className="nav-link">Admin Dashboard</Link>
      </nav>
    </header>
  );
};

export default Header;
