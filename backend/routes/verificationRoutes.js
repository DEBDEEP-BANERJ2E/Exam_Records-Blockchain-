const express = require('express');
const { verifyRecord } = require('../controllers/verificationController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/verify', protect, verifyRecord);

module.exports = router;
