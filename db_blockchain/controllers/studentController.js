const db = require('../utils/db');

// Fetch all records from `exam_records`
const getAllStudents = (req, res) => {
  const query = 'SELECT * FROM exam_records';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching records:', err);
      return res.status(500).json({ error: 'Failed to fetch exam records' });
    }
    res.status(200).json(results);
  });
};

// Add a new record to `exam_records`
const addStudent = (req, res) => {
  const { studentID, examName, studentName, score, metadataURI, semester, pass_or_fail } = req.body;

  // Validate required fields
  if (!studentID || !examName || !studentName || !score || !metadataURI || !semester || !pass_or_fail) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  const query = `
    INSERT INTO exam_records (studentID, examName, studentName, score, metadataURI, semester, pass_or_fail)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;
  db.query(
    query,
    [studentID, examName, studentName, score, metadataURI, semester, pass_or_fail],
    (err, results) => {
      if (err) {
        console.error('Error inserting record:', err);
        return res.status(500).json({ error: 'Failed to add exam record' });
      }
      res.status(201).json({
        id: results.insertId,
        studentID,
        examName,
        studentName,
        score,
        metadataURI,
        semester,
        pass_or_fail,
      });
    }
  );
};

module.exports = {
  getAllStudents,
  addStudent,
};
