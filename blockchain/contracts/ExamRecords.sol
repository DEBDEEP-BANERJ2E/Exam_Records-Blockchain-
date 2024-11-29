// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ExamRecords {
    struct Record {
        string studentId;
        string courseName;
        uint256 semester;
        uint256 score;
        bool verified;
        bool exists;
    }

    address public admin;
    mapping(bytes32 => Record) private records;

    event RecordAdded(string studentId, string courseName, uint256 semester, uint256 score);
    event RecordVerified(string studentId, string courseName, uint256 semester);

    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin can perform this action");
        _;
    }

    constructor() {
        admin = msg.sender;
        require(admin != address(0), "Admin address cannot be zero");
    }

    function addRecord(
        string memory _studentId,
        string memory _courseName,
        uint256 _semester,
        uint256 _score
    ) public onlyAdmin {
        // Create a unique key based on studentId, semester, and courseName
        bytes32 recordKey = keccak256(abi.encodePacked(_studentId, _semester, _courseName));
        
        // Ensure the record does not already exist
        require(!records[recordKey].exists, "Record for this student, course, and semester already exists");

        // Add the new record
        records[recordKey] = Record({
            studentId: _studentId,
            courseName: _courseName,
            semester: _semester,
            score: _score,
            verified: false,
            exists: true
        });

        emit RecordAdded(_studentId, _courseName, _semester, _score);
    }

    function verifyRecord(
        string memory _studentId,
        string memory _courseName,
        uint256 _semester
    ) public onlyAdmin {
        // Generate the key based on studentId, courseName, and semester
        bytes32 recordKey = keccak256(abi.encodePacked(_studentId, _semester, _courseName));
        
        // Check if the record exists and hasn't been verified
        require(records[recordKey].exists, "Record does not exist");
        require(!records[recordKey].verified, "Record already verified");

        // Mark the record as verified
        records[recordKey].verified = true;

        emit RecordVerified(_studentId, _courseName, _semester);
    }

    function getRecord(
        string memory _studentId,
        string memory _courseName,
        uint256 _semester
    )
        public
        view
        returns (string memory, uint256, uint256, bool)
    {
        // Generate the key for the requested record
        bytes32 recordKey = keccak256(abi.encodePacked(_studentId, _semester, _courseName));
        
        require(records[recordKey].exists, "Record does not exist");

        // Return the record details
        Record memory record = records[recordKey];
        return (
            record.courseName,
            record.semester,
            record.score,
            record.verified
        );
    }

    function changeAdmin(address newAdmin) public onlyAdmin {
        require(newAdmin != address(0), "New admin cannot be zero address");
        admin = newAdmin;
    }
}
