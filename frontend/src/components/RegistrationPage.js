import React from 'react';
import styles from '../styles/RegistrationPage.module.css';

const RegistrationPage = () => {
  return (
    <div className={styles.container}>
      <form className={styles.form}>
        <h2 className={styles.title}>Register</h2>
        <input
          type="text"
          className={styles.input}
          placeholder="Full Name"
        />
        <input
          type="email"
          className={styles.input}
          placeholder="Email Address"
        />
        <input
          type="password"
          className={styles.input}
          placeholder="Password"
        />
        <input
          type="password"
          className={styles.input}
          placeholder="Confirm Password"
        />
        <button className={styles.button} type="submit">
          Register
        </button>
      </form>
    </div>
  );
};

export default RegistrationPage;
