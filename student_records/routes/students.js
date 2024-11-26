const express = require('express');
const router = express.Router();
const db = require('../db/config');

// Get all student records
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM exam_records');
    res.json(rows);
  } catch (error) {
    console.error('Error fetching records:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Add a new student record
router.post('/', async (req, res) => {
  const { studentID, studentName, examName, semester, score, metadataURI, passFail } = req.body;
  try {
    const query = `
      INSERT INTO exam_records (studentID, studentName, examName, semester, score, metadataURI, pass_or_fail)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
    const [result] = await db.execute(query, [studentID, studentName, examName, semester, score, metadataURI, passFail]);
    res.status(201).json({ id: result.insertId, ...req.body });
  } catch (error) {
    console.error('Error adding record:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
