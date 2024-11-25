const blockchain = require('../utils/blockchain');
const db = require('../utils/db'); // Assuming a database configuration module

exports.addStudentRecord = async (req, res) => {
    const {
        studentID,
        examName,
        studentName,
        score,
        metadataURI,
        semester,
    } = req.body;

    // Determine pass/fail
    const passOrFail = score >= 40 ? 'Pass' : 'Fail';

    try {
        // Write to blockchain
        const blockchainData = await blockchain.writeToBlockchain(
            studentID,
            examName,
            studentName,
            score,
            metadataURI,
            semester,
            passOrFail
        );

        // Insert into database
        await db.query(
            `INSERT INTO exam_records (studentID, examName, studentName, score, metadataURI, created_at, semester, pass_or_fail)
             VALUES (?, ?, ?, ?, ?, NOW(), ?, ?)`,
            [
                blockchainData.studentID,
                blockchainData.examName,
                blockchainData.studentName,
                blockchainData.score,
                blockchainData.metadataURI,
                blockchainData.semester,
                blockchainData.passOrFail,
            ]
        );

        res.status(201).json({ message: "Record added successfully!" });
    } catch (error) {
        console.error("Error adding record:", error);
        res.status(500).json({ error: "Failed to add record" });
    }
};
