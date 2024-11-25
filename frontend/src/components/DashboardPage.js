import React from 'react';
import ExamRecordCard from './ExamRecordCard';
import '../styles/DashboardPage.css';

const DashboardPage = () => {
  const examRecords = [
    { name: 'Math Exam', date: '2024-06-12', status: 'Passed' },
    { name: 'Physics Exam', date: '2024-06-15', status: 'Failed' },
    { name: 'Chemistry Exam', date: '2024-06-18', status: 'Pending' },
  ];

  return (
    <div className="dashboard-page">
      <h1>Student Dashboard</h1>
      <div className="exam-records">
        {examRecords.map((exam, index) => (
          <ExamRecordCard key={index} exam={exam} />
        ))}
      </div>
    </div>
  );
};

export default DashboardPage;
