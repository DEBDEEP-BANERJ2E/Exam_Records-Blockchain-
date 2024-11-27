const ExamRecords = artifacts.require("ExamRecords");

module.exports = async function (callback) {
  const instance = await ExamRecords.deployed();
  await instance.addRecord("123", "Physics", 85, { from: web3.eth.accounts[0] });
  console.log("Record added.");
  callback();
};
