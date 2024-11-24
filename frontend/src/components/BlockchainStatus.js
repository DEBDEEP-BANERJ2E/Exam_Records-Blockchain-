import React, { useEffect, useState } from 'react';
import './BlockchainStatus.css';

const BlockchainStatus = () => {
  const [status, setStatus] = useState('Connecting...');

  useEffect(() => {
    setTimeout(() => {
      setStatus('Connected to Blockchain');
    }, 3000);
  }, []);

  return (
    <div className="blockchain-status">
      <h2>Blockchain Status</h2>
      <p className="status-message">{status}</p>
    </div>
  );
};

export default BlockchainStatus;
