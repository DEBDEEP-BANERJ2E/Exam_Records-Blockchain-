const express = require('express');
const { getRecords } = require('../controllers/recordController');  // Correctly import getRecords
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', protect, getRecords);  // Use the getRecords function

module.exports = router;
