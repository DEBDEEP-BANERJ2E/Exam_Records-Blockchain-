const express = require('express');
const { addExamRecord } = require('../controllers/adminController');

const router = express.Router();

// Route to add an exam record
router.post('/add-record', addExamRecord);

module.exports = router;
