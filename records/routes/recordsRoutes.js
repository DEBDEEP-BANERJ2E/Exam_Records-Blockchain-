const express = require('express');
const router = express.Router();
const recordsController = require('../controllers/recordsController');

// Define the route for fetching student records by studentID
router.get('/student-records/:studentName', recordsController.getStudentRecords);
module.exports = router;
