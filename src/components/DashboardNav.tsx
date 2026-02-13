'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, FolderKanban, FileText } from 'lucide-react';

const GOLD = '#8B7332';

export default function DashboardNav() {
    const pathname = usePathname();

    const tabs = [
        { href: '/dashboard', label: 'Overview', icon: LayoutDashboard },
        { href: '/dashboard/menu', label: 'Project', icon: FolderKanban },
        { href: '/dashboard/customers', label: 'Documents', icon: FileText },
    ];

    return (
        <nav
            style={{
                position: 'fixed',
                top: '48px',
                left: 0,
                right: 0,
                width: '100%',
                padding: '8px 20px',
                background: 'rgba(10, 10, 12, 0.85)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                zIndex: 100,
                display: 'flex',
                justifyContent: 'center',
            }}
        >
            <div style={{ display: 'flex', gap: '24px' }}>
                {tabs.map((tab) => {
                    const isActive = pathname === tab.href;
                    const Icon = tab.icon;

                    return (
                        <Link
                            key={tab.href}
                            href={tab.href}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '6px',
                                textDecoration: 'none',
                                padding: '6px 12px',
                                borderRadius: '8px',
                                color: isActive ? GOLD : 'rgba(255,255,255,0.5)',
                                background: isActive ? 'rgba(139, 115, 50, 0.1)' : 'transparent',
                                border: 'none',
                                transition: 'all 0.2s ease',
                            }}
                        >
                            <Icon size={16} />
                            <span style={{ fontSize: '13px', fontWeight: isActive ? 600 : 500 }}>
                                {tab.label}
                            </span>
                        </Link>
                    );
                })}
            </div>
        </nav>
    );
}
