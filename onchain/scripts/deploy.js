import hardhat from "hardhat";
const { ethers } = hardhat;

async function main() {
    const [deployer] = await ethers.getSigners();
    console.log("Deploying contracts with the account:", deployer.address);

    // Deploy Registry
    const Registry = await ethers.getContractFactory("AgentRegistry");
    const registry = await Registry.deploy();
    await registry.waitForDeployment();
    const registryAddress = await registry.getAddress();
    console.log("AgentRegistry deployed to:", registryAddress);

    // Deploy Payment Contract linked to Registry
    const Payment = await ethers.getContractFactory("AgentPayment");
    const payment = await Payment.deploy(registryAddress);
    await payment.waitForDeployment();
    const paymentAddress = await payment.getAddress();
    console.log("AgentPayment deployed to:", paymentAddress);

    console.log("Verification Instructions:");
    console.log(`npx hardhat verify --network monadTestnet ${registryAddress}`);
    console.log(`npx hardhat verify --network monadTestnet ${paymentAddress} ${registryAddress}`);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
