const { db } = require('../utils/db');

exports.addExamRecordToDatabase = async (studentID, examName, studentName, score, metadataURI) => {
    const query = 'INSERT INTO exam_records (studentID, examName, studentName, score, metadataURI) VALUES (?, ?, ?, ?, ?)';
    await db.execute(query, [studentID, examName, studentName, score, metadataURI]);
};

exports.getExamRecordFromDatabase = async (studentID, examName) => {
    const query = 'SELECT * FROM exam_records WHERE studentID = ? AND examName = ?';
    const [rows] = await db.execute(query, [studentID, examName]);
    return rows[0];
};
