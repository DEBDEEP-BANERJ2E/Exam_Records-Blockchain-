// src/components/Header.js

import React from "react";
import { Link } from "react-router-dom";  // Or use 'next/link' if you're using Next.js
import "../styles/Header.css";

const Header = () => {
  return (
    <header className="header">
      <div className="logo">
        <img src="/images/logo.png" alt="Logo" className="logo-img" />
        <span className="logo-text">Blockchain Exam Records</span>
      </div>
      <nav className="nav-links">
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/login" className="nav-link">Login</Link>
        <Link to="/register" className="nav-link">Register</Link>
        <Link to="/dashboard" className="nav-link">Dashboard</Link>
      </nav>
    </header>
  );
};

export default Header;
