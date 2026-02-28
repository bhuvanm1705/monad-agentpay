# 🧠 The Ultimate Guide to AgentPay

Welcome to the project! Since you're joining midway, this guide explains **exactly what we are building, why it exists, and the tools we are using.**

---

## 🚀 1. What is AgentPay?

**AgentPay** is a "Decentralized Payment infrastructure for AI Agents."

Imagine tomorrow: you have an AI coding assistant, and you tell it, "Hey, go buy me some server space and deploy this app." How does the AI *actually* pay for the server space? It doesn't have a credit card or a bank account.

**The Solution:** AI Agents use crypto wallets.
AgentPay provides the smart contracts (the backend rules) and the dashboard (the frontend interface) that allows AI agents to exchange money (crypto) instantly, automatically, and without human permission for services.

## 🛠️ 2. The Technologies We Have Installed

If you look at the codebase, you will see a lot of complex-sounding tools. Here is what they actually mean:

### **Blockchain: Monad Testnet**
A blockchain is essentially a public, hack-proof database. **Monad** is a specific type of high-speed blockchain that is compatible with Ethereum code. We are deploying our code to the **Monad Testnet** (a fake-money practice version of the Monad network) for this Hackathon.

### **Backend (Smart Contracts): Solidity & Hardhat**
- **Solidity:** The programming language used to write "Smart Contracts". A Smart Contract is just an application that lives on the blockchain. Once you upload it, it runs forever exactly as programmed.
- **Hardhat:** A developer tool that acts like a mini, private blockchain on your laptop. We use it to compile, test, and deploy our Solidity code before putting it on the real Monad network.

### **Frontend: Next.js, Tailwind CSS & Thirdweb**
- **Next.js:** A framework for building modern React websites. It powers our UI.
- **Tailwind CSS:** A specific way to write styling (colors, layout) quickly in code. We used it to make the "corporate dark mode" futuristic look.
- **Thirdweb / Wagmi:** Libraries that connect our Next.js website to a user's crypto wallet (like MetaMask).

---

## ✅ 3. What Have We Completed So Far? (Steps 1-4)

Yes, **we have successfully completed the first 4 stages of our plan!** Here is exactly what is done:

### Step 1: Ideation (Done)
We finalized the concept of an AI-to-AI payment dashboard built on Monad. We chose the dark-mode aesthetic and the "Agent Registry" smart contract concepts.

### Step 2: UI/UX Design (Done)
You can run `npm run dev` and see the sleek interface. We built:
1. **Dashboard** (`/`): Shows global stats like volume, active agents, and live mock transactions.
2. **Agents** (`/agents`): A directory of registered AI agents and their cost per request.
3. **Transactions** (`/transactions`): A history feed showing money hopping between different agents.
4. **Settings** (`/settings`): A page to enforce max daily spending limits on your agents.

### Step 3: Scaffolding (Done)
We set up the Next.js project folder, heavily modified the Thirdweb Wallet connection template, installed Tailwind CSS and Lucide Icons, and built the mock **x402 protocol** API endpoint (a protocol where the server rejects requests with an HTTP 402 Error until crypto is paid).

### Step 4: Smart Contracts (Done)
Instead of risking the Scaffold-ETH dependency errors, we used the exact same "Monorepo" philosophy: we isolated our blockchain work into the `onchain/` folder.
Inside `onchain/`, we built:
- `AgentRegistry.sol`: Stores your AI Agent's name and cost on the blockchain.
- `AgentPayment.sol`: The escrow contract holding the funds that agents use to pay each other.
- **Tests Passed:** We ran `npx hardhat test` and proved the contracts compile and work perfectly!

---

## 🔜 4. What is Next? (Step 5: Integration)

Right now, the UI looks beautiful, but the buttons are "dumb". Clicking "Deploy Agent" on the frontend doesn't actually trigger the `AgentRegistry.sol` contract we built in Step 4.

**Step 5 is Integration:**
We will use Web3 Hooks (`useContractRead`, `useContractWrite` from Thirdweb/Wagmi) to link the frontend to the blockchain. When a user creates an Agent in the UI, MetaMask will pop up, asking them to sign the transaction on the Monad network!
