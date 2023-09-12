//SPDX-License-Identifier: UNLICENSED

pragma solidity 0.8.19;

contract VotingMachine {
    address owner;

    address[] public CandidatesPoll;

    uint totalVotes;

    //  bool voteStarting;
    bool startVoting;
    //  bool voteStarting;
    bool endVoting;

    //
    bool isVotingStarted;

    //keeps track of votes per candidate
    mapping(address => uint8) private voteCount;

    //keeps track of a user voting status
    mapping(address => bool) private voted;

    event PollStarted(bool status);
    event PollEnded(bool status);
    event Voted(address indexed voter, address indexed choice_candidate);

    uint constant MINIMUM_CONTENDERS = 2;

    mapping(address => bool) isCandidate;

    error InvalidContendersNumber(uint number);
    error InvalidAddress(uint position);
    error duplicate(address _addr);

    constructor(address[] memory _candidates) {
        owner = msg.sender;
        if (_candidates.length < MINIMUM_CONTENDERS) {
            revert InvalidContendersNumber(MINIMUM_CONTENDERS);
        }
        for (uint i = 0; i < _candidates.length; i++) {
            if (_candidates[i] == address(0)) {
                revert InvalidAddress(i + 1);
            }
            if (isCandidate[_candidates[i]]) {
                revert duplicate(_candidates[i]);
            }

            isCandidate[_candidates[i]] = true;
        }
        CandidatesPoll = _candidates;
    }

    modifier onlyOwner() {
        msg.sender == owner;
        _;
    }

    function displayCandidate(uint position) public view returns (address) {
        return CandidatesPoll[position - 1];
    }

    function beginVote() public onlyOwner {
        require(!startVoting, "Voting Began Already");
        startVoting = true;
        isVotingStarted = true;
        emit PollStarted(true);
    }

    function endVote() public onlyOwner {
        require(!endVoting, "Voting Ended Already");
        endVoting = true;
        emit PollEnded(true);
    }

    function VoteCandidate(address _candidate) public {
        require(_candidate != address(0), "Zero Address");
        require(isCandidate[_candidate], "Invalid Candidate");
        require(isVotingStarted, "Voting has not started");
        require((!endVoting && isVotingStarted), "Voting has ended");
        require(voted[msg.sender] == false, "Already voted");

        voteCount[_candidate] += 1;
        totalVotes++;

        voted[msg.sender] = true;

        emit Voted(msg.sender, _candidate);
    }

    function candidateTotalVote(address candidate) public view returns (uint) {
        require(isCandidate[candidate], "Invalid Candidate");
        require(isVotingStarted == false, "Still Voting");
        return voteCount[candidate];
    }

    function getTotalVotes() public view returns (uint) {
        require(isVotingStarted == false, "Still Voting");
        return totalVotes;
    }

    //incase someone sends ether
    function _withdraw() public onlyOwner {
        payable(owner).transfer(address(this).balance);
    }

    receive() external payable {}

    fallback() external payable {}
}
