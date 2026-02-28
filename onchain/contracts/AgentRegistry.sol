// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";

contract AgentRegistry is Ownable {
    struct Agent {
        address owner;
        string name;
        string capabilities;
        uint256 costPerCall;
        bool isActive;
        uint256 rating; // 0-500 scale (5.00 max)
        uint256 totalCalls;
    }

    // Mapping from agent's derived wallet address back to its setup parameters
    mapping(address => Agent) public agents;
    // Track if an address is registered as an agent
    mapping(address => bool) public isAgentRegistered;

    event AgentRegistered(address indexed agentAddress, address indexed owner, string name, uint256 cost);
    event AgentStatusChanged(address indexed agentAddress, bool newStatus);
    event AgentRated(address indexed agentAddress, uint256 newRating);

    constructor() Ownable(msg.sender) {}

    // Anyone can register a new agent address they control
    function registerAgent(
        address agentAddress,
        string calldata name,
        string calldata capabilities,
        uint256 costPerCall
    ) external {
        require(!isAgentRegistered[agentAddress], "Agent already registered");
        require(bytes(name).length > 0, "Name required");

        agents[agentAddress] = Agent({
            owner: msg.sender,
            name: name,
            capabilities: capabilities,
            costPerCall: costPerCall,
            isActive: true,
            rating: 500, // Starts at perfect 5.0
            totalCalls: 0
        });

        isAgentRegistered[agentAddress] = true;
        emit AgentRegistered(agentAddress, msg.sender, name, costPerCall);
    }

    // Agent owner can toggle active status
    function setAgentStatus(address agentAddress, bool isActive) external {
        require(isAgentRegistered[agentAddress], "Agent not found");
        require(agents[agentAddress].owner == msg.sender, "Not agent owner");
        
        agents[agentAddress].isActive = isActive;
        emit AgentStatusChanged(agentAddress, isActive);
    }

    // External increment counter called by AgentPayment contract
    function incrementCalls(address agentAddress) external {
        require(isAgentRegistered[agentAddress], "Agent not found");
        // Access control usually verified by payment contract
        agents[agentAddress].totalCalls += 1;
    }

    // Fetch details
    function getAgent(address agentAddress) external view returns (Agent memory) {
        require(isAgentRegistered[agentAddress], "Agent not found");
        return agents[agentAddress];
    }
}
