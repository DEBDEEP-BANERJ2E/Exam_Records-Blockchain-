const express = require('express');
const { requestVerification } = require('../controllers/employerController');  // Ensure the function is properly exported
const { protect } = require('../middleware/authMiddleware');  // Ensure the protect middleware is correctly imported

const router = express.Router();

// Define the POST route for /verify, using the protect middleware and requestVerification function
router.post('/verify', protect, requestVerification);

module.exports = router;
