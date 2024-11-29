// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ExamRecords {
    struct Record {
        string examName;
        uint256 score;
        bool verified;
        bool exists; // Ensures record existence is explicitly tracked
    }

    address public admin;
    mapping(bytes32 => Record) private records;

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
        require(!records[recordKey].exists, "Record already exists");

        records[recordKey] = Record({
            examName: _examName,
            score: _score,
            verified: false,
            exists: true
        });

        emit RecordAdded(_studentId, _examName, _score);
    }

    function verifyRecord(string memory _studentId) public onlyAdmin {
        bytes32 recordKey = keccak256(abi.encodePacked(_studentId));
        require(records[recordKey].exists, "Record does not exist");
        require(!records[recordKey].verified, "Record already verified");

        records[recordKey].verified = true;

        emit RecordVerified(_studentId, records[recordKey].examName);
    }

    function getRecord(
        string memory _studentId
    )
        public
        view
        returns (string memory, uint256, bool)
    {
        bytes32 recordKey = keccak256(abi.encodePacked(_studentId));
        require(records[recordKey].exists, "Record does not exist");

        Record memory record = records[recordKey];
        return (
            record.examName,
            record.score,
            record.verified
        );
    }

    function changeAdmin(address newAdmin) public onlyAdmin {
        require(newAdmin != address(0), "New admin cannot be zero address");
        admin = newAdmin;
    }
}
