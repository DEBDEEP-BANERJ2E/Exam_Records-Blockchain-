import { Link } from 'react-router-dom'; // Ensure 'react-router-dom' is installed and correctly imported
import '../styles/LandingPage.css'; // Ensure the CSS file path is correct

const LandingPage = () => {
  console.log('Rendering LandingPage');
  return (
    <div className="landing-page">
      <div className="landing-header">
        <h1>Welcome to Blockchain Exam Records</h1>
        <p>Your exams, securely stored and verified on the blockchain.</p>
      </div>
      
      <div className="landing-body">
        <h2>Why Blockchain for Exam Records?</h2>
        <p>
          Traditional exam record systems are prone to tampering, data manipulation, and fraud. By leveraging blockchain technology, we ensure that your exam records are:
        </p>
        <ul>
          <li><strong>Secure:</strong> Blockchain's cryptographic techniques make exam records immutable, ensuring no tampering can occur.</li>
          <li><strong>Transparent:</strong> Both students and institutions can access records, ensuring full transparency in exam results.</li>
          <li><strong>Tamper-Proof:</strong> Once stored on the blockchain, exam records cannot be altered, providing trust and credibility to the system.</li>
          <li><strong>Decentralized:</strong> The blockchain network is decentralized, making it more robust and resistant to attacks or failures.</li>
        </ul>
      </div>

      <div className="landing-footer">
        <Link to="/login">
          <button className="start-btn">
            Get Started (Login)
          </button>
        </Link>
        <Link to="/register">
          <button className="start-btn">
            Get Started (Register)
          </button>
        </Link>
      </div>
    </div>
  );
};

export default LandingPage;
