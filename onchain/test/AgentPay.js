import { expect } from "chai";
import hardhat from "hardhat";
const { ethers } = hardhat;

describe("AgentPay Protocol", function () {
    let registry;
    let payment;
    let owner;
    let agent1Owner;
    let agent2Owner;
    let agent1Wallet;
    let agent2Wallet;

    beforeEach(async function () {
        [owner, agent1Owner, agent2Owner, agent1Wallet, agent2Wallet] = await ethers.getSigners();

        // Deploy Registry
        const Registry = await ethers.getContractFactory("AgentRegistry");
        registry = await Registry.deploy();

        // Deploy Payment
        const Payment = await ethers.getContractFactory("AgentPayment");
        payment = await Payment.deploy(await registry.getAddress());
    });

    it("Should register an agent and map the owner", async function () {
        const cost = ethers.parseEther("0.05"); // 0.05 MON

        // agent1Owner registers agent1Wallet
        await registry.connect(agent1Owner).registerAgent(
            agent1Wallet.address,
            "DataScraper-X",
            "API Parsing",
            cost
        );

        const agent = await registry.getAgent(agent1Wallet.address);
        expect(agent.name).to.equal("DataScraper-X");
        expect(agent.owner).to.equal(agent1Owner.address);
        expect(agent.costPerCall).to.equal(cost);
    });

    it("Should allow funding, paying another agent, and withdrawing", async function () {
        const cost = ethers.parseEther("0.1"); // 0.1 MON

        // Register Agents
        await registry.connect(agent1Owner).registerAgent(
            agent1Wallet.address, "PayerAgent", "Trading", cost
        );
        await registry.connect(agent2Owner).registerAgent(
            agent2Wallet.address, "PayeeAgent", "Data", cost
        );

        // Fund Payer Agent
        const fundAmount = ethers.parseEther("1.0");
        await payment.connect(agent1Owner).fundAgent(agent1Wallet.address, { value: fundAmount });

        let payerBalance = await payment.agentBalances(agent1Wallet.address);
        expect(payerBalance).to.equal(fundAmount);

        // Payer Agent pays Payee Agent
        await payment.connect(agent1Wallet).payAgent(
            agent1Wallet.address,
            agent2Wallet.address,
            "REQ-999"
        );

        payerBalance = await payment.agentBalances(agent1Wallet.address);
        let payeeBalance = await payment.agentBalances(agent2Wallet.address);

        expect(payerBalance).to.equal(ethers.parseEther("0.9")); // 1.0 - 0.1
        expect(payeeBalance).to.equal(ethers.parseEther("0.1")); // 0 + 0.1

        // Payee Owner Withdraws Funds
        await expect(() => payment.connect(agent2Owner).withdrawFunds(agent2Wallet.address, cost))
            .to.changeEtherBalance(agent2Owner, cost);
    });
});
