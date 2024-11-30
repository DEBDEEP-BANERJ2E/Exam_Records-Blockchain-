// backend/controllers/recordController.js
const fs = require('fs');
const path = require('path');

// Path to the file where records will be saved
const recordsFilePath = path.join(__dirname, '../data/records.json');

module.exports.addRecord = async (req, res) => {
  try {
    const { studentID, courseName, semester } = req.body;

    // Read the existing records from the file
    let records = [];
    if (fs.existsSync(recordsFilePath)) {
      const fileData = fs.readFileSync(recordsFilePath);
      records = JSON.parse(fileData);
    }

    // Add the new record to the array
    const newRecord = { studentID, courseName, semester };
    records.push(newRecord);

    // Save the updated records back to the file
    fs.writeFileSync(recordsFilePath, JSON.stringify(records, null, 2));

    res.status(200).json({
      message: 'Record added successfully.',
      newRecord,
    });
  } catch (error) {
    console.error('Error adding record:', error);
    res.status(500).json({ error: 'Failed to add record' });
  }
};
