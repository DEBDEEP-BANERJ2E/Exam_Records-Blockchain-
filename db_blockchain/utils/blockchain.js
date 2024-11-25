const { ethers } = require('ethers');
const ExamRecordsABI = require('../abis/ExamRecords.json');

const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
const contract = new ethers.Contract(process.env.CONTRACT_ADDRESS, ExamRecordsABI, wallet);

exports.writeToBlockchain = async (studentID, examName, studentName, score, metadataURI) => {
    const tx = await contract.addOrUpdateRecord(studentID, examName, studentName, score, metadataURI);
    await tx.wait();
};

exports.fetchFromBlockchain = async (studentID, examName) => {
    const record = await contract.getRecord(studentID, examName);
    return {
        studentName: record[0],
        score: record[1],
        metadataURI: record[2],
    };
};
