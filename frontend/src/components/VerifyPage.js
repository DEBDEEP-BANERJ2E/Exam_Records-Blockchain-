import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Web3 from "web3"; // Web3 for blockchain interaction
import ExamRecordContract from "../contracts/ExamRecord.json"; // Import contract ABI
import "../styles/VerifyPage.css";

const VerifyPage = () => {
  const location = useLocation();
  const { semester, courses } = location.state || {};
  const [blockchainData, setBlockchainData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBlockchainData = async () => {
      try {
        const web3 = new Web3(Web3.givenProvider || "http://localhost:7545");
        const networkId = await web3.eth.net.getId();
        const deployedNetwork = ExamRecordContract.networks[networkId];
        const contract = new web3.eth.Contract(
          ExamRecordContract.abi,
          deployedNetwork && deployedNetwork.address
        );

        const records = await Promise.all(
          courses.map(async (course) => {
            const record = await contract.methods
              .getExamRecord(course.name, semester)
              .call();
            return { ...course, blockchainStatus: record.passFail };
          })
        );

        setBlockchainData(records);
      } catch (error) {
        console.error("Error fetching blockchain data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBlockchainData();
  }, [semester, courses]);

  if (isLoading) {
    return <div>Loading blockchain data...</div>;
  }

  return (
    <div className="verify-page">
      <h1>Verification Page</h1>
      <h2>Semester: {semester}</h2>
      <table className="verify-table">
        <thead>
          <tr>
            <th>Course</th>
            <th>Marks</th>
            <th>Pass/Fail (Database)</th>
            <th>Pass/Fail (Blockchain)</th>
            <th>Verification Status</th>
          </tr>
        </thead>
        <tbody>
          {blockchainData.map((course, idx) => (
            <tr key={idx}>
              <td>{course.name}</td>
              <td>{course.marks}</td>
              <td>{course.status}</td>
              <td>{course.blockchainStatus}</td>
              <td>
                {course.status === course.blockchainStatus
                  ? "Verified"
                  : "Mismatch"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default VerifyPage;
