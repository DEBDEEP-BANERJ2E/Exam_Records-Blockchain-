import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Web3 from "web3";
import "../styles/Verify.css";

// Smart contract ABI
const ABI = [
  {
    "inputs": [],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "string",
        "name": "studentId",
        "type": "string"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "examName",
        "type": "string"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "score",
        "type": "uint256"
      }
    ],
    "name": "RecordAdded",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "string",
        "name": "studentId",
        "type": "string"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "examName",
        "type": "string"
      }
    ],
    "name": "RecordVerified",
    "type": "event"
  },
  {
    "inputs": [],
    "name": "admin",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "_studentId",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_examName",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "_score",
        "type": "uint256"
      }
    ],
    "name": "addRecord",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "_studentId",
        "type": "string"
      }
    ],
    "name": "verifyRecord",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "_studentId",
        "type": "string"
      }
    ],
    "name": "getRecord",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      },
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "newAdmin",
        "type": "address"
      }
    ],
    "name": "changeAdmin",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
];

const Verify = () => {
  const location = useLocation();
  const { semester, courses } = location.state || {};
  const [blockchainData, setBlockchainData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBlockchainData = async () => {
      try {
        const web3 = new Web3(Web3.givenProvider || "http://localhost:7545");
        const contractAddress = "<Your_Contract_Address>"; // Replace with the deployed contract address
        const contract = new web3.eth.Contract(ABI, contractAddress);

        const records = await Promise.all(
          courses.map(async (course) => {
            const record = await contract.methods
              .getRecord(course.name) // Adjusted to match your contract
              .call();
            return { 
              ...course, 
              blockchainStatus: record[2] ? "Pass" : "Fail" // Assuming record[2] is boolean
            };
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

export default Verify;
