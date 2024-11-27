// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ExamRecords {
    struct Record {
        string studentId;
        string examName;
        uint256 score;
        bool verified;
    }

    address public admin;
    mapping(bytes32 => Record) private records; // Maps hashed studentId to their record

    event RecordAdded(string studentId, string examName, uint256 score);
    event RecordVerified(string studentId, string examName);

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
        string memory _examName,
        uint256 _score
    ) public onlyAdmin {
        bytes32 recordKey = keccak256(abi.encodePacked(_studentId));
        require(bytes(records[recordKey].studentId).length == 0, "Record already exists");
        records[recordKey] = Record(_studentId, _examName, _score, false);
        emit RecordAdded(_studentId, _examName, _score);
    }

    function verifyRecord(string memory _studentId) public onlyAdmin {
        bytes32 recordKey = keccak256(abi.encodePacked(_studentId));
        require(bytes(records[recordKey].studentId).length != 0, "Record does not exist");
        require(!records[recordKey].verified, "Record already verified");
        records[recordKey].verified = true;
        emit RecordVerified(_studentId, records[recordKey].examName);
    }

    function getRecord(
        string memory _studentId
    )
        public
        view
        returns (string memory, string memory, uint256, bool)
    {
        bytes32 recordKey = keccak256(abi.encodePacked(_studentId));
        require(bytes(records[recordKey].studentId).length != 0, "Record does not exist");
        Record memory record = records[recordKey];
        return (
            record.studentId,
            record.examName,
            record.score,
            record.verified
        );
    }
}
