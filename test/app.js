const contractAddress = "0x8db2AE486BE23067F8db3C664E19aF1216C0CdfF"; // Replace with your deployed contract address
const contractABI = [
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "studentID",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "examName",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "studentName",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "score",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "metadataURI",
				"type": "string"
			}
		],
		"name": "addOrUpdateRecord",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "institution",
				"type": "address"
			}
		],
		"name": "authorizeInstitution",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "institution",
				"type": "address"
			}
		],
		"name": "InstitutionAuthorized",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "institution",
				"type": "address"
			}
		],
		"name": "InstitutionRevoked",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "string",
				"name": "studentID",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "examName",
				"type": "string"
			}
		],
		"name": "RecordAdded",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "institution",
				"type": "address"
			}
		],
		"name": "revokeInstitution",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "authorizedInstitutions",
		"outputs": [
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
				"internalType": "string",
				"name": "studentID",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "examName",
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
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
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
				"name": "studentID",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "examName",
				"type": "string"
			}
		],
		"name": "verifyRecord",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];

let web3;
let contract;

window.onload = async () => {
  if (window.ethereum) {
    web3 = new Web3(window.ethereum);
    await window.ethereum.request({ method: "eth_requestAccounts" });
    contract = new web3.eth.Contract(contractABI, contractAddress);

    // Check if the current account is authorized
    const accounts = await web3.eth.getAccounts();
    const isAuthorized = await contract.methods.authorizedInstitutions(accounts[0]).call();
    document.getElementById("authStatus").innerText = isAuthorized
      ? "You are authorized to access detailed records."
      : "You are not authorized to access detailed records.";
  } else {
    alert("Please install MetaMask to use this dApp.");
  }
};

// Verify if a record exists
document.getElementById("verifyRecordForm").addEventListener("submit", async (event) => {
  event.preventDefault();

  const studentID = document.getElementById("verifyStudentID").value;
  const examName = document.getElementById("verifyExamName").value;

  try {
    const exists = await contract.methods.verifyRecord(studentID, examName).call();
    document.getElementById("verifyResult").innerText = exists
      ? "Record exists."
      : "Record does not exist.";
  } catch (error) {
    console.error("Error verifying record:", error);
    alert("Failed to verify record.");
  }
});

// Fetch record details
document.getElementById("fetchRecordForm").addEventListener("submit", async (event) => {
  event.preventDefault();

  const studentID = document.getElementById("fetchStudentID").value;
  const examName = document.getElementById("fetchExamName").value;

  try {
    const record = await contract.methods.getRecord(studentID, examName).call();
    document.getElementById("fetchResult").innerHTML = `
      <p>Student Name: ${record[0]}</p>
      <p>Score: ${record[1]}</p>
      <p>Metadata URI: <a href="${record[2]}" target="_blank">${record[2]}</a></p>
    `;
  } catch (error) {
    console.error("Error fetching record:", error);
    alert("Failed to fetch record. You may not be authorized.");
  }
});
