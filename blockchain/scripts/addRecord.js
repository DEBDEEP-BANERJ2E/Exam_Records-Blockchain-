const ExamRecords = artifacts.require("ExamRecords");

module.exports = async function (callback) {
  try {
    const instance = await ExamRecords.deployed();
    
    // Get the admin address (the account that deployed the contract)
    const accounts = await web3.eth.getAccounts();
    const adminAddress = accounts[0];  // Make sure this is the admin account
    
    // Add record (with course name and semester)
    const tx = await instance.addRecord("123", "Biology", 1, 85, { from: adminAddress });
    
    console.log("Record added successfully.");
    console.log("Transaction hash:", tx.tx);
    console.log("Gas used:", tx.receipt.gasUsed);
    
    // Log event details
    console.log("Record added with details:", tx.logs[0].args);
    
    callback();
  } catch (error) {
    console.error("Error adding record:", error);
    callback();
  }
};
