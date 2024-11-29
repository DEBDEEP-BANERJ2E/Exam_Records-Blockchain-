const ExamRecords = artifacts.require("ExamRecords");

module.exports = async function (callback) {
  try {
    const instance = await ExamRecords.deployed();
    
    // Get the admin address (the account that deployed the contract)
    const accounts = await web3.eth.getAccounts();
    const adminAddress = accounts[0];  // Make sure this is the admin account
    
    // Verify record
    const tx = await instance.verifyRecord("123", { from: adminAddress });
    
    console.log("Record verified for student ID 123.");
    console.log("Transaction hash:", tx.tx);
    console.log("Gas used:", tx.receipt.gasUsed);
    
    // Log event details
    console.log("Record verified with details:", tx.logs[0].args);
    
    callback();
  } catch (error) {
    console.error("Error verifying record:", error);
    callback();
  }
};
