'use client';

import { ConnectWallet } from '@thirdweb-dev/react';

export default function Navbar() {
    return (
        <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center justify-end border-b border-slate-800 bg-slate-900/80 px-6 backdrop-blur">
            <div className="flex items-center gap-4">
                <ConnectWallet
                    theme="dark"
                    btnTitle="Connect Wallet"
                    modalTitle="Login to AgentPay"
                    className="!bg-emerald-600 !text-white hover:!bg-emerald-500 !border-none !rounded-lg !px-6"
                />
            </div>
        </div>
    );
}
