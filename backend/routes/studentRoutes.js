const express = require('express');
const { getStudentRecords } = require('../controllers/studentController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/records', protect, getStudentRecords);

module.exports = router;
