// src/components/HomePage.js
import React from 'react';
//import { Link } from 'react-router-dom';
import styles from '../styles/LandingPage.module.css';

const LandingPage = () => {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Welcome to Blockchain Exam Records</h1>
        <p className={styles.subtitle}>
          Secure, tamper-proof exam records for students, institutions, and employers.
        </p>
        <div className={styles.buttons}>
          <button className={styles.button} onClick={() => alert('Sign Up')}>
            Sign Up
          </button>
          <button className={styles.button} onClick={() => alert('Log In')}>
            Log In
          </button>
        </div>
      </header>
    </div>
  );
};

export default LandingPage;
