// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Voting {
    struct Candidate {
        string name;
        string position;
        uint256 grade; 
        uint256 voteCount;
    }

    Candidate[] public candidates;
    address public owner;
    mapping(address => bool) public voters;
    uint256 public votingStart;
    uint256 public votingEnd;

    constructor(Candidate[] memory _candidates, uint256 _durationInMinutes) {
        require(_candidates.length > 0, "No candidates provided.");

        for (uint256 i = 0; i < _candidates.length; i++) {
            require(bytes(_candidates[i].name).length > 0, "Candidate name cannot be empty.");
            require(bytes(_candidates[i].position).length > 0, "Candidate position cannot be empty.");

            candidates.push(Candidate({
                name: _candidates[i].name,
                position: _candidates[i].position,
                grade: _candidates[i].grade,
                voteCount: _candidates[i].voteCount
            }));
        }
        owner = msg.sender;
        votingStart = block.timestamp;
        votingEnd = block.timestamp + (_durationInMinutes * 1 minutes);
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can call this function.");
        _;
    }

    function addCandidate(string memory _name, string memory _position, uint256 _grade) public onlyOwner {
        candidates.push(Candidate({
            name: _name,
            position: _position,
            grade: _grade,
            voteCount: 0
        }));
    }

    function vote(string[] memory names) public {
        require(!voters[msg.sender], "You have already voted.");
        require(getVotingStatus(), "Time has run out");

        for (uint256 j = 0; j < names.length; j+=2) {
            for (uint256 i = 0; i < candidates.length; i++) {
                if (compareStrings(candidates[i].name, names[j]) &&
                    compareStrings(candidates[i].position, names[j+1])) {
                    candidates[i].voteCount++;
                }
            }
        }
        voters[msg.sender] = true;
    }

    function compareStrings(string memory a, string memory b) internal pure returns (bool) {
        return keccak256(abi.encodePacked(a)) == keccak256(abi.encodePacked(b));
    }

    function getAllVotesOfCandidates() public view returns (Candidate[] memory) {
        return candidates;
    }

    function getVotingStatus() public view returns (bool) {
        return (block.timestamp >= votingStart && block.timestamp < votingEnd);
    }

    function getRemainingTime() public view returns (uint256) {
        require(block.timestamp >= votingStart, "Voting has not started yet.");

        if (block.timestamp >= votingEnd) {
            return 0;
        }

        return votingEnd - block.timestamp;
    }
}
