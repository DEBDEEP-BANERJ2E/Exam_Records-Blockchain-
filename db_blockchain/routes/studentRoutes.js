const express = require('express');
const { verifyExamRecord } = require('../controllers/studentController');

const router = express.Router();

// Route to verify an exam record
router.post('/verify-record', verifyExamRecord);

module.exports = router;
