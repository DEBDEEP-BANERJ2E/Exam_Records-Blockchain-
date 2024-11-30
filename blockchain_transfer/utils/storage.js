const fs = require('fs');
const path = require('path');

// Path to the new folder where the records will be saved (inside the 'scripts' folder of 'blockchain' folder)
const recordsFolderPath = path.join(__dirname, '../../blockchain/scripts/data');

// Ensure the folder exists
if (!fs.existsSync(recordsFolderPath)) {
  fs.mkdirSync(recordsFolderPath, { recursive: true });
}

// Path to the examRecords.json file
const jsonFilePath = path.join(recordsFolderPath, 'examRecords.json');

// Function to save a record to the 'examRecords.json' file
const saveRecordToFile = async (record) => {
  try {
    // Read the existing data from the JSON file
    let existingData = [];
    if (fs.existsSync(jsonFilePath)) {
      const fileData = await fs.promises.readFile(jsonFilePath, 'utf-8');
      existingData = JSON.parse(fileData);
    }

    // Add the new record to the existing data
    existingData.push(record);

    // Write the updated data back to the JSON file
    const data = JSON.stringify(existingData, null, 2); // Pretty print the JSON
    await fs.promises.writeFile(jsonFilePath, data); // Write the data to the file
    console.log(`Record saved to: ${jsonFilePath}`);
  } catch (error) {
    console.error('Error saving record:', error);
    throw new Error('Failed to save record to file');
  }
};

module.exports = { saveRecordToFile };
