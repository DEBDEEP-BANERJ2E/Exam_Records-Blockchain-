const express = require('express');
const { getAllStudents, addStudent } = require('../controllers/studentController');

const router = express.Router();

// Route to fetch all student records
router.get('/', getAllStudents);

// Route to add a new student record
router.post('/', addStudent);

module.exports = router;
