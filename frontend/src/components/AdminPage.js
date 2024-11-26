import React, { useState, useEffect } from 'react';
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

  const [studentRecords, setStudentRecords] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_URL = 'http://localhost:8080/api/students';

  // Fetch records from the database
  useEffect(() => {
    const fetchRecords = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(API_URL); // Use explicit API URL
        if (!response.ok) {
          throw new Error('Failed to fetch student records');
        }
        const data = await response.json();
        setStudentRecords(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecords();
  }, [API_URL]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to add record');
      }

      const newRecord = await response.json();
      setStudentRecords((prevRecords) => [...prevRecords, newRecord]);
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
    } catch (error) {
      console.error('Error adding record:', error);
      alert('Failed to add record');
    }
  };

  return (
    <div className="admin-page">
      <h1>Admin Dashboard</h1>
      <p>Manage student records and verification requests here.</p>

      {/* Add Record Form */}
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

      {/* Display Existing Records */}
      <div className="records-container">
        <h2>Student Records</h2>
        {isLoading ? (
          <p>Loading records...</p>
        ) : error ? (
          <p className="error-message">Error: {error}</p>
        ) : studentRecords.length > 0 ? (
          <div className="table-container">
            <table className="records-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Student ID</th>
                  <th>Student Name</th>
                  <th>Exam Name</th>
                  <th>Semester</th>
                  <th>Score</th>
                  <th>Metadata URI</th>
                  <th>Pass/Fail</th>
                  <th>Created At</th>
                </tr>
              </thead>
              <tbody>
                {studentRecords.map((record) => (
                  <tr key={record.id}>
                    <td>{record.id}</td>
                    <td>{record.studentID}</td>
                    <td>{record.studentName}</td>
                    <td>{record.examName}</td>
                    <td>{record.semester}</td>
                    <td>{record.score}</td>
                    <td>
                      <a href={record.metadataURI} target="_blank" rel="noopener noreferrer">
                        View Metadata
                      </a>
                    </td>
                    <td>{record.passFail}</td>
                    <td>{new Date(record.created_at).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p>No student records found.</p>
        )}
      </div>
    </div>
  );
};

export default AdminPage;
