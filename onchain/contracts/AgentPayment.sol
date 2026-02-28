// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./AgentRegistry.sol";

contract AgentPayment is Ownable {
    AgentRegistry public registry;

    struct PaymentReceipt {
        address from;
        address to;
        uint256 amount;
        string serviceId;
        uint256 timestamp;
    }

    event PaymentSent(
        address indexed fromAgent,
        address indexed toAgent,
        uint256 amount,
        string serviceId
    );
    event FundsDeposited(address indexed owner, address indexed agent, uint256 amount);
    event FundsWithdrawn(address indexed owner, address indexed agent, uint256 amount);

    // Track ETH/MON balances for each agent address
    mapping(address => uint256) public agentBalances;
    // Map of transaction history
    PaymentReceipt[] public transactionHistory;

    constructor(address _registryAddress) Ownable(msg.sender) {
        registry = AgentRegistry(_registryAddress);
    }

    // Agent owner deposits ETH/MON to fund their agent
    function fundAgent(address agentAddress) external payable {
        require(msg.value > 0, "Must send MON to fund");
        AgentRegistry.Agent memory agent = registry.getAgent(agentAddress);
        require(agent.owner != address(0), "Agent not registered");
        
        agentBalances[agentAddress] += msg.value;
        emit FundsDeposited(msg.sender, agentAddress, msg.value);
    }

    // An agent (or its owner key) pays another agent
    function payAgent(
        address fromAgent,
        address toAgent,
        string calldata serviceId
    ) external {
        AgentRegistry.Agent memory target = registry.getAgent(toAgent);
        require(target.isActive, "Target agent is inactive");
        
        uint256 cost = target.costPerCall;
        require(agentBalances[fromAgent] >= cost, "Insufficient funds in payer agent");

        // The caller must be the agent itself or its owner
        AgentRegistry.Agent memory payer = registry.getAgent(fromAgent);
        require(
            msg.sender == fromAgent || msg.sender == payer.owner,
            "Not authorized to spend from this agent"
        );

        // Execute payment
        agentBalances[fromAgent] -= cost;
        agentBalances[toAgent] += cost;

        // Record on-chain history
        transactionHistory.push(PaymentReceipt({
            from: fromAgent,
            to: toAgent,
            amount: cost,
            serviceId: serviceId,
            timestamp: block.timestamp
        }));

        // Bump the calls counter on the registry
        registry.incrementCalls(toAgent);

        emit PaymentSent(fromAgent, toAgent, cost, serviceId);
    }

    // Agent owner withdraws earnings
    function withdrawFunds(address agentAddress, uint256 amount) external {
        AgentRegistry.Agent memory agent = registry.getAgent(agentAddress);
        require(agent.owner == msg.sender, "Only agent owner can withdraw");
        require(agentBalances[agentAddress] >= amount, "Insufficient balance");

        agentBalances[agentAddress] -= amount;
        
        (bool success, ) = payable(msg.sender).call{value: amount}("");
        require(success, "Transfer failed");

        emit FundsWithdrawn(msg.sender, agentAddress, amount);
    }

    // Helper to get total number of recorded transactions
    function getTransactionCount() external view returns (uint256) {
        return transactionHistory.length;
    }
}
