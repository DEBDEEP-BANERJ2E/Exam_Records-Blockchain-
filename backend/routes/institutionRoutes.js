const express = require('express');
const { createRecord } = require('../controllers/institutionController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/create-record', protect, createRecord);

module.exports = router;

// This line below is redundant and should be removed
// const { createRecord } = require('../controllers/institutionController');
// console.log('Imported createRecord:', createRecord);
