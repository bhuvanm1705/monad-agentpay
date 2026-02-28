'use client';

import { Activity, CreditCard, Users, ArrowRightLeft } from 'lucide-react';
import { useContract, useContractRead } from '@thirdweb-dev/react';

export default function Home() {
  // Mock Contract Address - To be updated after actual deployment
  const REGISTRY_CONTRACT_ADDRESS = "0x0000000000000000000000000000000000000000";

  // Web3 Hooks for Smart Contract Interaction
  const { contract } = useContract(REGISTRY_CONTRACT_ADDRESS);
  const { data: globalCallCount, isLoading: isCallsLoading } = useContractRead(contract, "globalCallCount");

  // In a real app we'd fetch Total Agents via an array getter, mock here for UI
  const stats = [
    { name: 'Total Agents Registered', value: '142', icon: Users, change: '+12% from last week' },
    { name: '24h Transaction Volume', value: '45,231 MON', icon: Activity, change: '+4.5% from yesterday' },
    { name: 'Active Payment Flows', value: globalCallCount ? globalCallCount.toString() : '...', icon: ArrowRightLeft, change: isCallsLoading ? 'Loading blockchain data...' : 'Live On-Chain Data' },
    { name: 'Total Value Locked', value: '$1.4M', icon: CreditCard, change: '+1% from yesterday' },
  ];
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-white">Dashboard</h1>
        <p className="text-slate-400">Welcome to the AgentPay Protocol overview.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.name} className="relative overflow-hidden rounded-xl border border-slate-800 bg-slate-900/50 p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-400">{stat.name}</p>
                <p className="mt-2 text-3xl font-bold tracking-tight text-white">{stat.value}</p>
              </div>
              <div className="rounded-full bg-emerald-500/10 p-3">
                <stat.icon className="h-5 w-5 text-emerald-500" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-xs text-emerald-400">
              {stat.change}
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activity Table (Simulated) */}
      < div className="rounded-xl border border-slate-800 bg-slate-900/50 p-6" >
        <h2 className="text-lg font-semibold text-white mb-4">Live Agent Activity</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-400">
            <thead className="bg-slate-800/50 text-xs uppercase text-slate-500">
              <tr>
                <th scope="col" className="px-6 py-3">Payer Agent</th>
                <th scope="col" className="px-6 py-3">Payee Agent</th>
                <th scope="col" className="px-6 py-3">Amount</th>
                <th scope="col" className="px-6 py-3">Service Type</th>
                <th scope="col" className="px-6 py-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {/* Dummy row 1 */}
              <tr className="border-b border-slate-800 hover:bg-slate-800/50 transition-colors">
                <td className="px-6 py-4 font-medium text-white">DataScraper-X</td>
                <td className="px-6 py-4">LLM-Formatter</td>
                <td className="px-6 py-4 font-bold text-emerald-400">0.05 MON</td>
                <td className="px-6 py-4">API Parsing</td>
                <td className="px-6 py-4">
                  <span className="rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-xs font-semibold text-emerald-400">Settled</span>
                </td>
              </tr>
              {/* Dummy row 2 */}
              <tr className="border-b border-slate-800 hover:bg-slate-800/50 transition-colors">
                <td className="px-6 py-4 font-medium text-white">ArbitrageBot-V2</td>
                <td className="px-6 py-4">AlphaSignalNet</td>
                <td className="px-6 py-4 font-bold text-emerald-400">12.0 MON</td>
                <td className="px-6 py-4">Trade Signal Data</td>
                <td className="px-6 py-4">
                  <span className="rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-xs font-semibold text-emerald-400">Settled</span>
                </td>
              </tr>
              {/* Dummy row 3 */}
              <tr className="border-b border-slate-800 hover:bg-slate-800/50 transition-colors">
                <td className="px-6 py-4 font-medium text-white">ContentGen-AI</td>
                <td className="px-6 py-4">Midjourney-API-Wrapper</td>
                <td className="px-6 py-4 font-bold text-emerald-400">0.15 MON</td>
                <td className="px-6 py-4">Image Generation</td>
                <td className="px-6 py-4">
                  <span className="rounded-full bg-amber-500/10 px-2.5 py-0.5 text-xs font-semibold text-amber-400">Processing</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div >
    </div >
  );
}
