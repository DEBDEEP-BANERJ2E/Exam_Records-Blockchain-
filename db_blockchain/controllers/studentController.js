const { fetchFromBlockchain } = require('../utils/blockchain');
const { getExamRecordFromDatabase } = require('../models/examRecordModel');

exports.verifyExamRecord = async (req, res) => {
    const { studentID, examName } = req.body;

    try {
        // Fetch data from database
        const dbRecord = await getExamRecordFromDatabase(studentID, examName);

        if (!dbRecord) {
            return res.status(404).json({ message: 'Record not found in the database' });
        }

        // Fetch data from blockchain
        const blockchainRecord = await fetchFromBlockchain(studentID, examName);

        // Compare records
        const isVerified =
            dbRecord.studentName === blockchainRecord.studentName &&
            dbRecord.score === blockchainRecord.score;

        res.status(200).json({ verified: isVerified });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to verify record' });
    }
};
