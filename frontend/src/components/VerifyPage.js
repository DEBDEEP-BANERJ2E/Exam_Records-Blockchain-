import React, { useState, useEffect } from 'react';
import '../styles/VerifyPage.css';
import examData from '../data/examRecords.json'; // Assuming the JSON file is in a `data` folder

const VerifyPage = () => {
  const [records, setRecords] = useState([]);
  const [filteredExamRecords, setFilteredExamRecords] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [verificationStatus, setVerificationStatus] = useState(null);
  const [mismatches, setMismatches] = useState([]);

  const API_URL = 'http://localhost:8080/api/records/semester1'; // Endpoint for records from the backend
  const storedPassword = sessionStorage.getItem('password'); // Assuming password is studentID

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(API_URL);

        if (!response.ok) {
          throw new Error('Failed to fetch records');
        }

        const data = await response.json();
        const filteredRecords = data.filter(
          (record) => record.studentID === storedPassword
        );

        setRecords(filteredRecords);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecords();
  }, [storedPassword]);

  useEffect(() => {
    const filteredData = examData.filter(
      (exam) => exam.studentID === storedPassword && exam.semester === "1"
    );
    setFilteredExamRecords(filteredData);
  }, [storedPassword]);

  const checkVerificationStatus = () => {
    if (records.length === filteredExamRecords.length) {
      // Check if all records match based on relevant fields
      const allMatch = records.every(record => {
        return filteredExamRecords.some(exam =>
          // Ensure matching studentID, examName, and score
          exam.studentID === record.studentID &&
          exam.examName === record.examName &&
          exam.score === String(record.score) && // Ensure score comparison as a string in filteredExamRecords
          exam.semester === '1' // Check semester value for filteredExamRecords (assuming it's '1' for all exams)
        );
      });
  
      if (allMatch) {
        setVerificationStatus('Verified');
        setMismatches([]); // Clear mismatches if everything matches
      } else {
        setVerificationStatus('Not Verified');
        // Collect mismatched records
        const mismatchedRecords = records.filter(record => {
          return !filteredExamRecords.some(exam =>
            exam.studentID === record.studentID &&
            exam.examName === record.examName &&
            exam.score === String(record.score) && // Ensure score comparison
            exam.semester === '1'
          );
        });
        setMismatches(mismatchedRecords);
      }
    } else {
      setVerificationStatus('Not Verified');
      // Collect mismatched records
      const mismatchedRecords = records.filter(record => {
        return !filteredExamRecords.some(exam =>
          exam.studentID === record.studentID &&
          exam.examName === record.examName &&
          exam.score === String(record.score) &&
          exam.semester === '1'
        );
      });
      setMismatches(mismatchedRecords);
    }
  };
  

  useEffect(() => {
    if (records.length > 0 && filteredExamRecords.length > 0) {
      checkVerificationStatus();
    }
  }, [records, filteredExamRecords]);

  // Debugging Logs for Data Checking
  console.log('Records:', records);
  console.log('Filtered Exam Records:', filteredExamRecords);

  return (
    <div className="verify-page">
      <h1>Verify Records</h1>
      <br>
      </br>
      <h2>Database Records</h2>

      {isLoading ? (
        <p>Loading records...</p>
      ) : error ? (
        <p className="error-message">Error: {error}</p>
      ) : records.length > 0 ? (
        <table className="records-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Student ID</th>
              <th>Exam Name</th>
              <th>Semester</th>
              <th>Score</th>
              <th>Pass/Fail</th>
            </tr>
          </thead>
          <tbody>
            {records.map((record) => (
              <tr key={record.id}>
                <td>{record.id}</td>
                <td>{record.studentID}</td>
                <td>{record.examName}</td>
                <td>{record.semester}</td>
                <td>{record.score}</td>
                <td>{record.pass_or_fail}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No records found for this student.</p>
      )}
      <br></br><br></br>
      <h2>Blockchain Records</h2>

      {filteredExamRecords.length > 0 ? (
        <table className="records-table">
          <thead>
            <tr>
              <th>Student ID</th>
              <th>Exam Name</th>
              <th>Semester</th>
              <th>Score</th>
              <th>Timestamp</th>
            </tr>
          </thead>
          <tbody>
            {filteredExamRecords.map((exam) => (
              <tr key={exam.timestamp}>
                <td>{exam.studentID}</td>
                <td>{exam.examName}</td>
                <td>{exam.semester}</td>
                <td>{exam.score}</td>
                <td>{new Date(exam.timestamp).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No records found for semester 1 exams for this student.</p>
      )}
      <br></br><br></br>
      {verificationStatus && (
        <div className="verification-status">
          <h3>{verificationStatus}</h3>
        </div>
      )}

      {verificationStatus === 'Not Verified' && mismatches.length > 0 && (
        <div className="mismatches">
          <h3>Not Verified Entries:</h3>
          <table className="records-table">
            <thead>
              <tr>
                <th>Student ID</th>
                <th>Exam Name</th>
                <th>Semester</th>
                <th>Score</th>
              </tr>
            </thead>
            <tbody>
              {mismatches.map((mismatch, index) => (
                <tr key={index}>
                  <td>{mismatch.studentID}</td>
                  <td>{mismatch.examName}</td>
                  <td>{mismatch.semester}</td>
                  <td>{mismatch.score}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default VerifyPage;
