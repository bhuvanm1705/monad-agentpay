import { Shield, Bell, Wallet, Key } from 'lucide-react';

export default function Settings() {
    return (
        <div className="space-y-6 animate-in fade-in duration-500 max-w-4xl">
            <div>
                <h1 className="text-2xl font-bold tracking-tight text-white">Platform Settings</h1>
                <p className="text-slate-400">Manage your connected wallets and agent configurations.</p>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
                {/* Navigation/Tabs (Static for UI) */}
                <div className="col-span-1 space-y-1">
                    <button className="flex w-full items-center gap-3 rounded-lg bg-slate-800 px-3 py-2 text-sm font-medium text-white transition-colors">
                        <Wallet className="h-4 w-4 text-emerald-400" />
                        Wallet Constraints
                    </button>
                    <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-slate-400 transition-colors hover:bg-slate-800 hover:text-white">
                        <Shield className="h-4 w-4" />
                        Security
                    </button>
                    <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-slate-400 transition-colors hover:bg-slate-800 hover:text-white">
                        <Bell className="h-4 w-4" />
                        Notifications
                    </button>
                    <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-slate-400 transition-colors hover:bg-slate-800 hover:text-white">
                        <Key className="h-4 w-4" />
                        API Keys
                    </button>
                </div>

                {/* Content Area */}
                <div className="col-span-1 space-y-6 md:col-span-3">
                    <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-6">
                        <h2 className="text-lg font-semibold text-white">Global Spending Limits</h2>
                        <p className="mt-1 text-sm text-slate-400">Set the maximum amount your deployed agents can spend autonomously.</p>

                        <div className="mt-6 space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-300">Daily Spending Limit (MON)</label>
                                <div className="mt-2 flex rounded-md shadow-sm">
                                    <input
                                        type="number"
                                        defaultValue="50.0"
                                        className="block w-full rounded-md border-0 bg-slate-800 py-2.5 px-3 text-white ring-1 ring-inset ring-slate-700 focus:ring-2 focus:ring-inset focus:ring-emerald-500 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-300">Per-Transaction Limit (MON)</label>
                                <div className="mt-2 flex rounded-md shadow-sm">
                                    <input
                                        type="number"
                                        defaultValue="5.0"
                                        className="block w-full rounded-md border-0 bg-slate-800 py-2.5 px-3 text-white ring-1 ring-inset ring-slate-700 focus:ring-2 focus:ring-inset focus:ring-emerald-500 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                            <div className="flex items-center justify-between py-4 border-t border-slate-800 mt-6">
                                <div>
                                    <h3 className="text-sm font-medium text-white">Require Manual Approval</h3>
                                    <p className="text-xs text-slate-400 pt-1">Transactions above the limits will pause and require manual signature.</p>
                                </div>
                                <div className="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-emerald-500 transition-colors duration-200 ease-in-out">
                                    <span className="translate-x-5 pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"></span>
                                </div>
                            </div>
                        </div>

                        <div className="mt-6 flex justify-end gap-3 border-t border-slate-800 pt-6">
                            <button type="button" className="rounded-md px-3 py-2 text-sm font-semibold text-white hover:bg-slate-800">
                                Cancel
                            </button>
                            <button type="submit" className="rounded-md bg-emerald-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-emerald-500">
                                Save Constraints
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
