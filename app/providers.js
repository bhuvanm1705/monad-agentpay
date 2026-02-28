'use client';

import {
  ThirdwebProvider,
  coinbaseWallet,
  localWallet,
  metamaskWallet,
  phantomWallet,
  rainbowWallet,
  trustWallet,
  walletConnect,
  zerionWallet,
} from '@thirdweb-dev/react';

// Custom Monad Network configuration based on User provided RPCs
const monadNetwork = {
  chainId: 143,
  rpc: ["https://rpc.monad.xyz", "https://rpc1.monad.xyz"],
  nativeCurrency: {
    decimals: 18,
    name: "Monad",
    symbol: "MON",
  },
  shortName: "monad",
  slug: "monad",
  testnet: false,
  chain: "Monad",
  name: "Monad Mainnet",
};

export default function Providers({ children }) {
  console.log("AgentPay Debug - ClientID Loaded:", process.env.NEXT_PUBLIC_TEMPLATE_CLIENT_ID);

  return (
    <ThirdwebProvider
      activeChain={monadNetwork}
      clientId={process.env.NEXT_PUBLIC_TEMPLATE_CLIENT_ID}
      supportedWallets={[
        metamaskWallet(),
        coinbaseWallet(),
        walletConnect(),
        rainbowWallet(),
        zerionWallet(),
        trustWallet(),
        phantomWallet(),
        localWallet(),
      ]}
    >
      {children}
    </ThirdwebProvider>
  );
}
