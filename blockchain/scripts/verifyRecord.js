const ExamRecords = artifacts.require("ExamRecords");

module.exports = async function (callback) {
  const instance = await ExamRecords.deployed();
  await instance.verifyRecord("123", { from: web3.eth.accounts[0] });
  console.log("Record verified.");
  callback();
};
