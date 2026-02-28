'use client';

import { Bot, Zap, Search, Plus, X } from 'lucide-react';
import { useState } from 'react';
import { useContract, useContractWrite, useAddress } from '@thirdweb-dev/react';

const mockAgents = [
    { id: 1, name: 'DataScraper-X', type: 'Data Collection', cost: '0.05 MON/req', status: 'Active', calls: 1432 },
    { id: 2, name: 'LLM-Formatter', type: 'Processing', cost: '0.02 MON/req', status: 'Active', calls: 890 },
    { id: 3, name: 'ArbitrageBot-V2', type: 'Trading', cost: '1.5 MON/req', status: 'Active', calls: 45 },
    { id: 4, name: 'AlphaSignalNet', type: 'Analysis', cost: '5.0 MON/req', status: 'Offline', calls: 312 },
    { id: 5, name: 'ContentGen-AI', type: 'Content Creation', cost: '0.15 MON/req', status: 'Active', calls: 5670 },
    { id: 6, name: 'Midjourney-API-Wrapper', type: 'Image Generation', cost: '0.5 MON/req', status: 'Active', calls: 120 },
];

export default function Agents() {
    const address = useAddress();
    const [isDeployModalOpen, setIsDeployModalOpen] = useState(false);
    const [formData, setFormData] = useState({ name: '', type: '', cost: '' });

    // Mock Contract Address - To be updated after actual deployment
    const REGISTRY_CONTRACT_ADDRESS = "0x0000000000000000000000000000000000000000";

    // Web3 Hooks for Smart Contract Interaction
    const { contract } = useContract(REGISTRY_CONTRACT_ADDRESS);
    const { mutateAsync: registerAgent, isLoading: isRegistering } = useContractWrite(contract, "registerAgent");

    const handleDeploy = async (e) => {
        e.preventDefault();
        if (!address) {
            alert("Please connect your wallet first!");
            return;
        }

        try {
            // Note: cost should be parsed to Wei using ethers.js in a real scenario
            // Passing address as the agent wallet address for simplicity here
            await registerAgent({ args: [address, formData.name, formData.type, formData.cost] });
            alert("Agent Deployment transaction submitted successfully!");
            setIsDeployModalOpen(false);
        } catch (error) {
            console.error("Contract call failure", error);
            // Don't alert if they simply rejected the transaction
            if (!error.message?.includes("user rejected")) {
                alert("Failed to deploy agent. See console for details.");
            }
        }
    };

    return (
        <div className="space-y-6 animate-in fade-in duration-500 relative">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-white">Agent Directory</h1>
                    <p className="text-slate-400">Discover and transact with autonomous intelligence.</p>
                </div>

                <button
                    onClick={() => setIsDeployModalOpen(true)}
                    className="inline-flex items-center justify-center rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
                >
                    <Plus className="mr-2 h-4 w-4" />
                    Deploy New Agent
                </button>
            </div>

            {/* Deploy Agent Modal Flow */}
            {isDeployModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
                    <div className="w-full max-w-md rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-2xl">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-bold text-white">Deploy AI Agent</h2>
                            <button onClick={() => setIsDeployModalOpen(false)} className="text-slate-400 hover:text-white transition-colors">
                                <X className="h-5 w-5" />
                            </button>
                        </div>

                        <form onSubmit={handleDeploy} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-1">Agent Name</label>
                                <input
                                    required
                                    type="text"
                                    className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-2 text-white placeholder-slate-500 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                                    placeholder="e.g. DeFi-Trader-Bot"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-1">Agent Capability / Type</label>
                                <input
                                    required
                                    type="text"
                                    className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-2 text-white placeholder-slate-500 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                                    placeholder="e.g. Onchain Forensics"
                                    value={formData.type}
                                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-1">Cost Per Call (MON)</label>
                                <input
                                    required
                                    type="number"
                                    step="0.001"
                                    className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-2 text-white placeholder-slate-500 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                                    placeholder="0.05"
                                    value={formData.cost}
                                    onChange={(e) => setFormData({ ...formData, cost: e.target.value })}
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={isRegistering}
                                className="w-full mt-6 rounded-lg bg-emerald-600 px-4 py-3 text-sm font-bold text-white transition-colors hover:bg-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isRegistering ? "Confirming on Monad..." : "Sign Transaction to Deploy"}
                            </button>
                        </form>
                    </div>
                </div>
            )}

            <div className="flex items-center gap-2 rounded-lg border border-slate-800 bg-slate-900/50 px-4 py-2 focus-within:ring-1 focus-within:ring-emerald-500">
                <Search className="h-5 w-5 text-slate-400" />
                <input
                    type="text"
                    placeholder="Search by agent name, type, or contract address..."
                    className="flex-1 bg-transparent px-2 py-1 text-sm text-white focus:outline-none"
                />
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {mockAgents.map((agent) => (
                    <div key={agent.id} className="group relative overflow-hidden rounded-xl border border-slate-800 bg-slate-900/50 transition-all hover:border-emerald-500/50 hover:shadow-lg hover:shadow-emerald-500/10">
                        <div className="p-6">
                            <div className="flex items-start justify-between">
                                <div className="rounded-xl bg-slate-800 p-3 group-hover:bg-emerald-500/10 transition-colors">
                                    <Bot className="h-6 w-6 text-slate-300 group-hover:text-emerald-400" />
                                </div>
                                <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${agent.status === 'Active'
                                    ? 'bg-emerald-500/10 text-emerald-400'
                                    : 'bg-slate-800 text-slate-400'
                                    }`}>
                                    {agent.status}
                                </span>
                            </div>

                            <div className="mt-4">
                                <h3 className="text-lg font-semibold text-white">{agent.name}</h3>
                                <p className="text-sm text-slate-400">{agent.type}</p>
                            </div>

                            <div className="mt-6 flex items-center justify-between text-sm">
                                <div className="flex items-center gap-1 text-slate-300">
                                    <Zap className="h-4 w-4 text-emerald-500" />
                                    <span className="font-medium text-emerald-400">{agent.cost}</span>
                                </div>
                                <div className="text-slate-500">
                                    {agent.calls.toLocaleString()} calls
                                </div>
                            </div>

                            <div className="mt-6">
                                <button className="w-full rounded-lg bg-slate-800 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-slate-700">
                                    View Contract Details
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
