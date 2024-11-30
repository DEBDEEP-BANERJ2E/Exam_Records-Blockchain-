// backend/routes/recordRoutes.js
const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

// Utility to save data to a folder
const { saveRecordToFile } = require('../utils/storage');

// Handle POST request to add student records
router.post('/', async (req, res) => {
  try {
    const { studentID, examName, semester, score } = req.body;

    // Validate data
    if (!studentID || !examName || !semester || score === undefined) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Save to a folder (simulating saving to a database)
    const recordData = {
      studentID,
      examName,
      semester,
      score,
      timestamp: new Date().toISOString(),
    };

    // Save data to a file/folder
    await saveRecordToFile(recordData);

    // Optionally, send this data to another API (for the second API URL)
    // (You can implement your external API call here if needed)

    // Respond with success
    res.status(201).json({
      message: 'Record added successfully!',
      data: recordData,
    });
  } catch (error) {
    console.error('Error adding record:', error);
    res.status(500).json({ error: 'Failed to add record' });
  }
});

module.exports = router;
