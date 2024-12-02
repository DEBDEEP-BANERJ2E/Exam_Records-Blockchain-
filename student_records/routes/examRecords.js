const express = require('express');
const router = express.Router();
const db = require('../db/config'); // Ensure the path to the db is correct

// Get all records for Semester 1 only
router.get('/semester1', async (req, res) => {
  try {
    // Query to fetch only Semester 1 records
    const query = 'SELECT * FROM exam_records WHERE semester = 1';
    const [rows] = await db.query(query);

    if (rows.length === 0) {
      return res.status(404).json({ error: 'No records found for Semester 1' });
    }

    res.json(rows);
  } catch (error) {
    console.error('Error fetching records for Semester 1:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
