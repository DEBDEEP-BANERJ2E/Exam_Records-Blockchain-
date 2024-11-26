const db = require('../models/db'); // Import the DB connection

// Function to fetch records for a given studentName
const getStudentRecords = (req, res) => {
  const studentName = req.params.studentName; // Change to studentName instead of studentID
  console.log("Fetching records for student: ", studentName); // Debugging line

  const query = `
    SELECT * FROM exam_records 
    WHERE studentName = ? 
    ORDER BY semester, examName;
  `;

  db.query(query, [studentName], (err, results) => {
    if (err) {
      console.error("Error fetching records: " + err.stack);
      return res.status(500).json({ message: "Internal server error" });
    }

    console.log("Query Results: ", results); // Log the fetched results

    if (results.length === 0) {
      return res.status(404).json({ message: "Student not found" });
    }

    // Group records by semester
    const semesters = results.reduce((acc, record) => {
      const semester = `Semester ${record.semester}`;
      if (!acc[semester]) {
        acc[semester] = [];
      }
      acc[semester].push({
        examName: record.examName,
        score: record.score,
        passOrFail: record.pass_or_fail,
        metadataURI: record.metadataURI,
      });
      return acc;
    }, {});

    // Add missing semesters and courses with NULL values for marks and "Not Known" for status
    const allSemesters = ['Semester 1', 'Semester 2', 'Semester 3', 'Semester 4', 'Semester 5', 'Semester 6', 'Semester 7', 'Semester 8'];

    allSemesters.forEach(semester => {
      if (!semesters[semester]) {
        semesters[semester] = [{ 
          examName: 'No records found', 
          score: null, 
          passOrFail: 'Not Known',
          metadataURI: null
        }];
      }
    });

    const response = Object.keys(semesters).map((semester) => ({
      semester,
      courses: semesters[semester].map(course => ({
        name: course.examName,
        marks: course.score === null ? 'NULL' : course.score,
        status: course.passOrFail || 'Not Known',
        metadataURI: course.metadataURI || null,
      })),
    }));

    res.json(response);
  });
};

module.exports = { getStudentRecords };
