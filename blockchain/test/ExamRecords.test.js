const ExamRecords = artifacts.require("ExamRecords");

contract("ExamRecords", (accounts) => {
  const admin = accounts[0];

  it("should allow admin to add a record", async () => {
    const instance = await ExamRecords.deployed();
    await instance.addRecord("123", "Math", 95, { from: admin });

    const record = await instance.getRecord("123");
    assert.equal(record[0], "123", "Student ID should match");
    assert.equal(record[1], "Math", "Exam name should match");
    assert.equal(record[2].toNumber(), 95, "Score should match");
    assert.equal(record[3], false, "Record should not be verified yet");
  });

  it("should allow admin to verify a record", async () => {
    const instance = await ExamRecords.deployed();
    await instance.verifyRecord("123", { from: admin });

    const record = await instance.getRecord("123");
    assert.equal(record[3], true, "Record should be verified");
  });
});
