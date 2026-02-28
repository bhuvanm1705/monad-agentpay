'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Users, History, Settings } from 'lucide-react';

const navigation = [
    { name: 'Dashboard', href: '/', icon: LayoutDashboard },
    { name: 'Agents', href: '/agents', icon: Users },
    { name: 'Transactions', href: '/transactions', icon: History },
    { name: 'Settings', href: '/settings', icon: Settings },
];

export default function Sidebar() {
    const pathname = usePathname();

    return (
        <div className="flex h-full w-64 flex-col border-r border-slate-800 bg-slate-900">
            <div className="flex h-16 shrink-0 items-center px-6">
                <span className="text-xl font-bold tracking-tight text-white">
                    Agent<span className="text-emerald-500">Pay</span>
                </span>
            </div>
            <div className="flex flex-col gap-1 px-4 py-4">
                {navigation.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all ${isActive
                                    ? 'bg-emerald-500/10 text-emerald-400'
                                    : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                                }`}
                        >
                            <item.icon className={`h-5 w-5 ${isActive ? 'text-emerald-400' : 'text-slate-400'}`} />
                            {item.name}
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}
