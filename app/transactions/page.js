import { ArrowUpRight, ArrowDownLeft, Search, Filter } from 'lucide-react';

const mockTransactions = [
    { id: 'tx-001', hash: '0x3a...9f2b', type: 'Payment Sent', from: 'My Wallet', to: 'ArbitrageBot-V2', amount: '12.0', token: 'MON', status: 'Confirmed', time: '2 mins ago' },
    { id: 'tx-002', hash: '0x8b...1c4d', type: 'Service Fee', from: 'DataScraper-X', to: 'LLM-Formatter', amount: '0.05', token: 'MON', status: 'Confirmed', time: '14 mins ago' },
    { id: 'tx-003', hash: '0xf1...7e8a', type: 'Service Fee', from: 'ContentGen-AI', to: 'Midjourney-API', amount: '0.15', token: 'MON', status: 'Pending', time: '1 hr ago' },
    { id: 'tx-004', hash: '0x2c...4b6d', type: 'Deposit', from: 'User Funding', to: 'My Wallet', amount: '50.0', token: 'MON', status: 'Confirmed', time: '5 hrs ago' },
    { id: 'tx-005', hash: '0x9e...2a1c', type: 'Payment Sent', from: 'My Wallet', to: 'DataScraper-X', amount: '5.0', token: 'MON', status: 'Confirmed', time: '1 day ago' },
];

export default function Transactions() {
    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-white">Transaction History</h1>
                    <p className="text-slate-400">Monitor all on-chain agent payments and settlements.</p>
                </div>

                <div className="flex items-center gap-3">
                    <button className="inline-flex items-center justify-center rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-slate-700">
                        <Filter className="mr-2 h-4 w-4" />
                        Filter
                    </button>
                </div>
            </div>

            <div className="flex items-center gap-2 rounded-lg border border-slate-800 bg-slate-900/50 px-4 py-2 focus-within:ring-1 focus-within:ring-emerald-500">
                <Search className="h-5 w-5 text-slate-400" />
                <input
                    type="text"
                    placeholder="Search by Tx Hash, Agent Name, or Address..."
                    className="flex-1 bg-transparent px-2 py-1 text-sm text-white focus:outline-none"
                />
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-900/50">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm text-slate-400">
                        <thead className="border-b border-slate-800 bg-slate-800/20 text-xs uppercase text-slate-500">
                            <tr>
                                <th scope="col" className="px-6 py-4 font-semibold">Transaction</th>
                                <th scope="col" className="px-6 py-4 font-semibold">From</th>
                                <th scope="col" className="px-6 py-4 font-semibold">To</th>
                                <th scope="col" className="px-6 py-4 font-semibold">Amount</th>
                                <th scope="col" className="px-6 py-4 font-semibold">Status</th>
                                <th scope="col" className="px-6 py-4 font-semibold">Time</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800/50">
                            {mockTransactions.map((tx) => (
                                <tr key={tx.id} className="hover:bg-slate-800/30 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className={`rounded-full p-2 ${tx.type.includes('Sent') || tx.type.includes('Fee')
                                                    ? 'bg-rose-500/10 text-rose-400'
                                                    : 'bg-emerald-500/10 text-emerald-400'
                                                }`}>
                                                {tx.type.includes('Sent') || tx.type.includes('Fee') ? <ArrowUpRight className="h-4 w-4" /> : <ArrowDownLeft className="h-4 w-4" />}
                                            </div>
                                            <div>
                                                <div className="font-medium text-white">{tx.type}</div>
                                                <div className="text-xs text-slate-500 font-mono mt-0.5">{tx.hash}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 font-medium text-slate-300">{tx.from}</td>
                                    <td className="px-6 py-4 text-white">{tx.to}</td>
                                    <td className="px-6 py-4">
                                        <span className={`font-bold ${tx.type.includes('Sent') || tx.type.includes('Fee') ? 'text-white' : 'text-emerald-400'
                                            }`}>
                                            {tx.type.includes('Sent') || tx.type.includes('Fee') ? '-' : '+'}{tx.amount} {tx.token}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${tx.status === 'Confirmed'
                                                ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                                                : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                                            }`}>
                                            {tx.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-slate-500">{tx.time}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
