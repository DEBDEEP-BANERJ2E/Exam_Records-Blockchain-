const ExamRecords = artifacts.require("ExamRecords");

module.exports = async function (deployer) {
  try {
    await deployer.deploy(ExamRecords);
    const instance = await ExamRecords.deployed();
    console.log("ExamRecords deployed at address:", instance.address);
  } catch (error) {
    console.error("Deployment failed:", error.message);
  }
};
