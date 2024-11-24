import React, { useState } from 'react';
import './VerifyPage.css';

const VerifyPage = () => {
  const [isVerified, setIsVerified] = useState(false);

  const handleVerify = () => {
    setIsVerified(true);
  };

  return (
    <div className="verify-page">
      <h1>Verify Exam Record</h1>
      <button onClick={handleVerify} className="verify-btn">
        Verify
      </button>
      {isVerified && <p className="verify-success">Record verified successfully!</p>}
    </div>
  );
};

export default VerifyPage;
