const ExamRecords = artifacts.require("ExamRecords");

module.exports = async function (callback) {
  try {
    const instance = await ExamRecords.deployed();
    
    // Get the admin address (the account that deployed the contract)
    const accounts = await web3.eth.getAccounts();
    const adminAddress = accounts[0];  // Make sure this is the admin account
    
    // Retrieve record (with student ID, course name, and semester)
    const studentId = "123";  // You can change this based on the student ID you want to query
    const courseName = "Biology";  // The course name
    const semester = 1;  // The semester value
    
    // Fetch the record for the student
    const record = await instance.getRecord(studentId, courseName, semester);
    
    // Convert BigNumber to regular number (for display)
    const course = record[0];  // courseName
    const sem = record[1].toString();  // Convert BN to string
    const score = record[2].toString();  // Convert BN to string
    const verified = record[3];  // Boolean value (false or true)
    
    // Display the retrieved record details
    console.log(`Record for student ID ${studentId}:`);
    console.log(`Course Name: ${course}`);
    console.log(`Semester: ${sem}`);
    console.log(`Score: ${score}`);
    console.log(`Verified: ${verified ? "true" : "false"}`);
    
    callback();
  } catch (error) {
    console.error("Error retrieving record:", error);
    callback();
  }
};
