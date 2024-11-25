// src/components/Footer.js

import React from "react";
import "../styles/Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>&copy; 2024 Blockchain Exam Records. TechFest Hackathon</p>
        {/*<div className="social-links">
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-link">Twitter</a>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-link">Facebook</a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-link">LinkedIn</a>
        </div>*/}
      </div>
    </footer>
  );
};

export default Footer;
