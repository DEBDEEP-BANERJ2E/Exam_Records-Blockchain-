// SPDX-License-Identifier: MIT
pragma solidity ^0.8.21;

contract ExamRecords {
    // Struct to store exam record details
    struct Record {
        string studentName;
        string examName;
        uint256 score;
        string metadataURI; // Off-chain data location
        bool exists;
    }

    // Mapping of studentID -> examName -> Record
    mapping(string => mapping(string => Record)) private records;

    // Mapping of authorized institutions
    mapping(address => bool) public authorizedInstitutions;

    // Contract owner
    address public owner;

    // Events
    event RecordAdded(string indexed studentID, string examName);
    event InstitutionAuthorized(address indexed institution);
    event InstitutionRevoked(address indexed institution);

    // Modifier to restrict access to the owner
    modifier onlyOwner() {
        require(msg.sender == owner, "Only the contract owner can perform this action");
        _;
    }

    // Modifier to restrict access to authorized institutions
    modifier onlyAuthorized() {
        require(authorizedInstitutions[msg.sender], "Not an authorized institution");
        _;
    }

    // Constructor
    constructor() {
        owner = msg.sender;
    }

    // Function to authorize an institution
    function authorizeInstitution(address institution) external onlyOwner {
        authorizedInstitutions[institution] = true;
        emit InstitutionAuthorized(institution);
    }

    // Function to revoke institution authorization
    function revokeInstitution(address institution) external onlyOwner {
        authorizedInstitutions[institution] = false;
        emit InstitutionRevoked(institution);
    }

    // Function to add or update a record
    function addOrUpdateRecord(
        string calldata studentID,
        string calldata examName,
        string calldata studentName,
        uint256 score,
        string calldata metadataURI
    ) external onlyAuthorized {
        records[studentID][examName] = Record({
            studentName: studentName,
            examName: examName,
            score: score,
            metadataURI: metadataURI,
            exists: true
        });

        emit RecordAdded(studentID, examName);
    }

    // Function to fetch a record (restricted to authorized institutions)
    function getRecord(
        string calldata studentID,
        string calldata examName
    )
        external
        view
        onlyAuthorized
        returns (string memory, uint256, string memory)
    {
        require(records[studentID][examName].exists, "Record does not exist");
        Record memory record = records[studentID][examName];
        return (record.studentName, record.score, record.metadataURI);
    }

    // Function to verify if a record exists (open to all)
    function verifyRecord(
        string calldata studentID,
        string calldata examName
    ) external view returns (bool) {
        return records[studentID][examName].exists;
    }
}
