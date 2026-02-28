import "@nomicfoundation/hardhat-toolbox";
import dotenv from "dotenv";
dotenv.config({ path: '../.env.local' });

/** @type import('hardhat/config').HardhatUserConfig */
const config = {
    solidity: "0.8.20",
    networks: {
        monadTestnet: {
            url: "https://testnet-rpc.monad.xyz",
            accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
            chainId: 10143
        }
    },
    etherscan: {
        apiKey: {
            monadTestnet: "empty"
        },
        customChains: [
            {
                network: "monadTestnet",
                chainId: 10143,
                urls: {
                    apiURL: "https://testnet-explorer.monad.xyz/api",
                    browserURL: "https://testnet-explorer.monad.xyz"
                }
            }
        ]
    }
};

export default config;
