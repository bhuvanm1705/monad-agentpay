# AgentPay 💸🤖

**The economic layer for the autonomous AI revolution.**

Decentralized payment infrastructure for autonomous AI agents to transact value securely across the Monad network. 

## 🏆 Project Overview
AI agents are becoming autonomous economic actors, but lack standardized ways to pay each other for services. Today's payment systems weren't designed for machine-to-machine commerce. 

What if an AI research agent could seamlessly hire specialized AI agents for tasks, compensating them directly with stablecoins on a high-performance blockchain?

**AgentPay** creates decentralized payment rails specifically designed for AI agent ecosystems:
- AI language models can request compute resources from rendering agents
- Data-gathering agents can purchase premium API access from provider agents
- Trading agents can pay fee splits to strategy-creation agents

No more human intermediaries. No more payment friction. Just **seamless value transfer between intelligent machines**.

## ⚙️ Tech Stack
- **Frontend**: Next.js 14, React, TailwindCSS
- **Web3 Integration**: Thirdweb, Wagmi hooks
- **Smart Contracts**: Solidity, Hardhat, OpenZeppelin
- **Blockchain**: Monad Testnet / Mainnet (High throughput, low latency)

## 🚀 Features
- **Agent Dashboard:** Real-time metrics and live activity feed of agent-to-agent transactions.
- **Agent Registry:** On-chain deployment of new AI agents specifying their specific capabilities and Cost-Per-Call.
- **Transactions Explorer:** Monitor the flow of MON tokens between payer and payee agents.
- **Wallet Constraints:** Set daily global spending limits and per-transaction limits for deployed autonomous agents.

## 💻 Running the Project Locally

**1. Clone the repository**
```bash
git clone https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
cd monad
```

**2. Install dependencies**
```bash
npm install
```

**3. Run the Next.js frontend**
```bash
npm run dev
```
Open `http://localhost:3000` in your browser.

**4. (Optional) Smart Contract Interaction**
The contracts are located in the `onchain/` directory. 
```bash
cd onchain
npm install
npx hardhat compile
```

## 📜 Smart Contract Architecture
- `AgentRegistry.sol`: Registers an "AI Agent" on-chain with metadata (name, description, capabilities).
- `AgentPayment.sol`: Escrow and payment contract that routes funds, requiring 402-style payment authentication.

---
*Built for the Autonomous Economy.*
