import React, { useState } from 'react';
import '../styles/AdminPage.css';

const AdminPage = () => {
  const [formData, setFormData] = useState({
    studentID: '',
    studentName: '',
    examName: '',
    semester: '',
    score: '',
    metadataURI: '',
    passFail: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Connect this function to your backend to send formData.
    console.log('New record added:', formData);
    alert('Record added successfully!');
    setFormData({
      studentID: '',
      studentName: '',
      examName: '',
      semester: '',
      score: '',
      metadataURI: '',
      passFail: '',
    });
  };

  return (
    <div className="admin-page">
      <h1>Admin Dashboard</h1>
      <p>Manage student records and verification requests here.</p>
      <div className="admin-form-container">
        <h2>Add New Record</h2>
        <form className="admin-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="studentID"
            placeholder="Student ID"
            value={formData.studentID}
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            name="studentName"
            placeholder="Student Name"
            value={formData.studentName}
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            name="examName"
            placeholder="Exam Name"
            value={formData.examName}
            onChange={handleInputChange}
            required
          />
          <input
            type="number"
            name="semester"
            placeholder="Semester"
            value={formData.semester}
            onChange={handleInputChange}
            min="1"
            max="8"
            required
          />
          <input
            type="number"
            name="score"
            placeholder="Score"
            value={formData.score}
            onChange={handleInputChange}
            min="0"
            max="100"
            required
          />
          <input
            type="text"
            name="metadataURI"
            placeholder="Metadata URI"
            value={formData.metadataURI}
            onChange={handleInputChange}
            required
          />
          <select
            name="passFail"
            value={formData.passFail}
            onChange={handleInputChange}
            required
          >
            <option value="">Pass/Fail</option>
            <option value="Pass">Pass</option>
            <option value="Fail">Fail</option>
          </select>
          <button type="submit" className="admin-btn">
            Add Record
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminPage;
