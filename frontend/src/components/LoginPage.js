import React from 'react';
import styles from '../styles/LoginPage.module.css';

const LoginPage = () => {
  return (
    <div className={styles.container}>
      <form className={styles.form}>
        <h2 className={styles.title}>Log In</h2>
        <input
          type="email"
          className={styles.input}
          placeholder="Enter your email"
        />
        <input
          type="password"
          className={styles.input}
          placeholder="Enter your password"
        />
        <button className={styles.button} type="submit">
          Log In
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
