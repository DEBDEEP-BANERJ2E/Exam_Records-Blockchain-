// src/components/ExamRecordCard.js

import React from "react";
import "../styles/ExamRecordCard.css";

const ExamRecordCard = ({ exam }) => {
  return (
    <div className="exam-card">
      <div className="exam-card-content">
        <h3 className="exam-name">{exam.name}</h3>
        <p className="exam-date">Date: {exam.date}</p>
        <p className="exam-status">Status: {exam.status}</p>
        <div className="exam-actions">
          <button className="verify-btn">Verify Record</button>
        </div>
      </div>
    </div>
  );
};

export default ExamRecordCard;
