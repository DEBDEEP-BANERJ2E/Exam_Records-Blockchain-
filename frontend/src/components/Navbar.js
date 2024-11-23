import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/Navbar.module.css';

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <Link to="/" className={styles.logoLink}>
          Blockchain Records
        </Link>
      </div>
      <ul className={styles.navLinks}>
        <li>
          <Link to="/dashboard" className={styles.navItem}>
            Dashboard
          </Link>
        </li>
        <li>
          <Link to="/login" className={styles.navItem}>
            Log In
          </Link>
        </li>
        <li>
          <Link to="/register" className={styles.navItem}>
            Register
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
