'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Ticket } from 'lucide-react';

const GOLD = '#C5A044';
const GOLD_LIGHT = '#DAC06A';

export default function AdminNav() {
    const pathname = usePathname();

    const tabs = [
        { href: '/admin', label: 'Overview', icon: LayoutDashboard },
        { href: '/admin/requests', label: 'Requests', icon: Ticket },
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
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                zIndex: 9998,
            }}
        >
            {/* Admin badge */}
            <span style={{
                fontSize: '9px',
                fontWeight: 700,
                letterSpacing: '0.12em',
                color: GOLD,
                background: 'rgba(197, 160, 68, 0.12)',
                border: '1px solid rgba(197, 160, 68, 0.25)',
                padding: '3px 8px',
                borderRadius: '6px',
                marginRight: '10px',
                textTransform: 'uppercase',
            }}>
                Admin
            </span>

            {tabs.map((tab) => {
                const active = pathname === tab.href;
                const Icon = tab.icon;
                return (
                    <Link
                        key={tab.href}
                        href={tab.href}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px',
                            padding: '6px 14px',
                            borderRadius: '8px',
                            fontSize: '12px',
                            fontWeight: 500,
                            textDecoration: 'none',
                            color: active ? '#fff' : 'rgba(255, 255, 255, 0.45)',
                            background: active ? 'rgba(255, 255, 255, 0.08)' : 'none',
                            transition: 'all 0.2s ease',
                        }}
                    >
                        <Icon size={13} style={{ color: active ? GOLD_LIGHT : 'inherit' }} />
                        {tab.label}
                    </Link>
                );
            })}
        </nav>
    );
}
