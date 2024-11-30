const ExamRecords = artifacts.require("ExamRecords");
const examRecords = require("./data/examRecords.json");  // Import the JSON data

module.exports = async function (callback) {
  try {
    const instance = await ExamRecords.deployed();
    
    // Get the admin address (the account that deployed the contract)
    const accounts = await web3.eth.getAccounts();
    const adminAddress = accounts[0];  // Make sure this is the admin account
    
    // Loop through the records in the JSON file (since it's an array)
    for (let i = 0; i < examRecords.length; i++) {
      const { studentID, examName, semester, score, timestamp } = examRecords[i];
      
      // Convert BN values to strings or numbers for proper use
      const semesterValue = web3.utils.toBN(semester).toNumber();  // Convert to number
      const scoreValue = web3.utils.toBN(score).toNumber();        // Convert to number

      // Add record (with extracted data from the JSON)
      const tx = await instance.addRecord(studentID, examName, semesterValue, scoreValue, { from: adminAddress });
      
      console.log(`Record added successfully for student ${studentID}`);
      console.log("Transaction hash:", tx.tx);
      console.log("Gas used:", tx.receipt.gasUsed);
      
      // Log event details
      console.log("Record added with details:", tx.logs[0].args);
    }
    
    callback();
  } catch (error) {
    console.error("Error adding record:", error);
    callback();
  }
};
