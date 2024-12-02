const fs = require('fs');
const path = require('path');

// Paths to the new folders where the records will be saved
const recordsFolderPath1 = path.join(__dirname, '../../blockchain/scripts/data');
const recordsFolderPath2 = path.join(__dirname, '../../frontend/src/data');

// Ensure the folders exist
if (!fs.existsSync(recordsFolderPath1)) {
  fs.mkdirSync(recordsFolderPath1, { recursive: true });
}
if (!fs.existsSync(recordsFolderPath2)) {
  fs.mkdirSync(recordsFolderPath2, { recursive: true });
}

// Path to the examRecords.json file and the second file (backupExamRecords.json)
const jsonFilePath = path.join(recordsFolderPath1, 'examRecords.json');
const backupFilePath = path.join(recordsFolderPath2, 'backupExamRecords.json');

// Function to save a record to both 'examRecords.json' and 'backupExamRecords.json'
const saveRecordToFile = async (record) => {
  try {
    // Read the existing data from the 'examRecords.json' file
    let existingData = [];
    if (fs.existsSync(jsonFilePath)) {
      const fileData = await fs.promises.readFile(jsonFilePath, 'utf-8');
      try {
        existingData = JSON.parse(fileData); // Try parsing the JSON data
      } catch (parseError) {
        console.error('Failed to parse existing JSON data:', parseError);
        // If parsing fails, start with an empty array
        existingData = [];
      }
    }

    // Add the new record to the existing data
    existingData.push(record);

    // Prepare the data to be written (pretty print JSON)
    const data = JSON.stringify(existingData, null, 2);

    // Write the updated data back to both files
    await fs.promises.writeFile(jsonFilePath, data); // Write to examRecords.json
    await fs.promises.writeFile(backupFilePath, data); // Write to backupExamRecords.json
    
    console.log(`Record saved to: ${jsonFilePath} and ${backupFilePath}`);
  } catch (error) {
    console.error('Error saving record:', error);
    throw new Error('Failed to save record to file');
  }
};

module.exports = { saveRecordToFile };
