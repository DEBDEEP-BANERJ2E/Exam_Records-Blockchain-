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
      ? "You are authorized to manage records."
      : "You are not authorized to manage records. Contact the contract owner for access.";
  } else {
    alert("Please install MetaMask to use this dApp.");
  }
};
window.onload = async () => {
    if (window.ethereum) {
      web3 = new Web3(window.ethereum);
      await window.ethereum.request({ method: "eth_requestAccounts" });
      const accounts = await web3.eth.getAccounts();
      const isAuthorized = await contract.methods.authorizedInstitutions(accounts[0]).call();
  
      if (!isAuthorized) {
        alert("You are not authorized to access this page.");
        window.location.href = "index.html"; // Redirect to the home page
      } else {
        document.getElementById("authStatus").innerText = "You are authorized.";
      }
    } else {
      alert("Please install MetaMask to use this dApp.");
      window.location.href = "index.html"; // Redirect to the home page
    }
  };
  

// Add or update a record
document.getElementById("addRecordForm").addEventListener("submit", async (event) => {
  event.preventDefault();

  const studentID = document.getElementById("studentID").value;
  const examName = document.getElementById("examName").value;
  const studentName = document.getElementById("studentName").value;
  const score = parseInt(document.getElementById("score").value);
  const metadataURI = document.getElementById("metadataURI").value;

  try {
    const accounts = await web3.eth.getAccounts();
    await contract.methods
      .addOrUpdateRecord(studentID, examName, studentName, score, metadataURI)
      .send({ from: accounts[0] });

    document.getElementById("addRecordResult").innerText = "Record added/updated successfully!";
  } catch (error) {
    console.error("Error adding/updating record:", error);
    alert("Failed to add/update record. Ensure you are authorized.");
  }
});

// Authorize an institution
document.getElementById("authorizeForm").addEventListener("submit", async (event) => {
  event.preventDefault();

  const institutionAddress = document.getElementById("authorizeAddress").value;

  try {
    const accounts = await web3.eth.getAccounts();
    await contract.methods.authorizeInstitution(institutionAddress).send({ from: accounts[0] });

    document.getElementById("authorizeResult").innerText = "Institution authorized successfully!";
  } catch (error) {
    console.error("Error authorizing institution:", error);
    alert("Failed to authorize institution. Only the owner can perform this action.");
  }
});

// Revoke institution authorization
document.getElementById("revokeForm").addEventListener("submit", async (event) => {
  event.preventDefault();

  const institutionAddress = document.getElementById("revokeAddress").value;

  try {
    const accounts = await web3.eth.getAccounts();
    await contract.methods.revokeInstitution(institutionAddress).send({ from: accounts[0] });

    document.getElementById("revokeResult").innerText = "Institution authorization revoked successfully!";
  } catch (error) {
    console.error("Error revoking institution authorization:", error);
    alert("Failed to revoke institution. Only the owner can perform this action.");
  }
});
