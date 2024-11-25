import React from 'react';
import '../styles/AdminPage.css';

const AdminPage = () => {
  return (
    <div className="admin-page">
      <h1>Admin Dashboard</h1>
      <p>Manage student records and verification requests here.</p>
      <button className="admin-btn">Add New Record</button>
    </div>
  );
};

export default AdminPage;
