import React from 'react';
import styles from '../styles/Dashboard.module.css';
import Navbar from './Navbar';

const Dashboard = () => {
  return (
    <div className={styles.container}>
      <Navbar />
      <div className={styles.content}>
        <h2 className={styles.heading}>Welcome to Your Dashboard</h2>
        <p className={styles.description}>
          Manage your exam records, verify credentials, and more.
        </p>
      </div>
    </div>
  );
};

export default Dashboard;
