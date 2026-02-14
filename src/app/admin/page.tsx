'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '@/lib/supabase';
import { isAdmin } from '@/lib/isAdmin';
import { CosmicBackground } from '@/components/CosmicBackground';
import AdminNav from '@/components/AdminNav';
import {
    Inbox,
    CircleDot,
    Loader,
    CheckCircle2,
    ChevronRight,
    Briefcase,
    Clock,
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Outfit } from 'next/font/google';

const outfit = Outfit({ subsets: ['latin'] });

// ─── Design Tokens ──────────────────────────────────────────────

const GOLD = '#C5A044';
const GOLD_LIGHT = '#DAC06A';
const GOLD_DIM = 'rgba(197, 160, 68, 0.15)';
const GOLD_BORDER = 'rgba(197, 160, 68, 0.3)';
const GLASS_BG = 'rgba(12, 12, 20, 0.55)';
const GLASS_BORDER = 'rgba(255, 255, 255, 0.06)';

interface TicketRow {
    id: string;
    created_at: string;
    name: string | null;
    business_type: string | null;
    status: string;
}

// ─── Page ───────────────────────────────────────────────────────

export default function AdminOverview() {
    const [tickets, setTickets] = useState<TicketRow[]>([]);
    const [loading, setLoading] = useState(true);
    const [authorized, setAuthorized] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const init = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            if (!session?.user || !isAdmin(session.user.email)) {
                router.push('/dashboard');
                return;
            }
            setAuthorized(true);

            const { data } = await supabase
                .from('tickets')
                .select('id, created_at, name, business_type, status')
                .order('created_at', { ascending: false });

            setTickets(data || []);
            setLoading(false);
        };
        init();
    }, [router]);

    if (!authorized) return null;

    const counts = {
        total: tickets.length,
        new: tickets.filter((t) => t.status === 'new').length,
        in_progress: tickets.filter((t) => t.status === 'in_progress').length,
        done: tickets.filter((t) => t.status === 'done').length,
    };

    const recent = tickets.slice(0, 5);

    const statusColor: Record<string, string> = {
        new: '#4dabf7',
        in_progress: '#fcc419',
        done: '#51cf66',
        archived: '#868e96',
    };

    const statusLabel: Record<string, string> = {
        new: 'New',
        in_progress: 'In Progress',
        done: 'Done',
        archived: 'Archived',
    };

    const timeAgo = (d: string) => {
        const now = Date.now();
        const then = new Date(d).getTime();
        const diff = Math.max(0, now - then);
        const mins = Math.floor(diff / 60000);
        if (mins < 1) return 'Just now';
        if (mins < 60) return `${mins}m ago`;
        const hrs = Math.floor(mins / 60);
        if (hrs < 24) return `${hrs}h ago`;
        const days = Math.floor(hrs / 24);
        if (days === 1) return 'Yesterday';
        if (days < 7) return `${days}d ago`;
        const weeks = Math.floor(days / 7);
        if (weeks < 5) return `${weeks}w ago`;
        const months = Math.floor(days / 30);
        if (months < 12) return `${months}mo ago`;
        return `${Math.floor(months / 12)}y ago`;
    };

    return (
        <div className={outfit.className}>
            <CosmicBackground />
            <AdminNav />

            <div style={{
                minHeight: '100vh',
                position: 'relative',
                zIndex: 10,
                color: '#fff',
                padding: '24px',
                paddingTop: '110px',
            }}>
                <div style={{ maxWidth: '700px', margin: '0 auto' }}>

                    {/* ── Header ────────────────────────────── */}
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        style={{ marginBottom: '28px' }}
                    >
                        <p style={{
                            fontSize: '11px',
                            fontWeight: 600,
                            color: GOLD,
                            textTransform: 'uppercase',
                            letterSpacing: '0.12em',
                            marginBottom: '8px',
                        }}>
                            Admin Portal
                        </p>
                        <h1 style={{
                            fontSize: 'clamp(22px, 4vw, 28px)',
                            fontWeight: 700,
                            letterSpacing: '-0.03em',
                        }}>
                            Welcome back, Amir
                        </h1>
                    </motion.div>

                    {/* ── Stats Cards ───────────────────────── */}
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(4, 1fr)',
                        gap: '10px',
                        marginBottom: '28px',
                    }}>
                        {([
                            { label: 'Total', value: counts.total, icon: Inbox, color: GOLD_LIGHT },
                            { label: 'New', value: counts.new, icon: CircleDot, color: '#4dabf7' },
                            { label: 'In Progress', value: counts.in_progress, icon: Loader, color: '#fcc419' },
                            { label: 'Done', value: counts.done, icon: CheckCircle2, color: '#51cf66' },
                        ]).map((stat, i) => (
                            <motion.div
                                key={stat.label}
                                initial={{ opacity: 0, y: 12 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.05 + i * 0.06, duration: 0.4 }}
                                style={{
                                    padding: '18px 14px',
                                    borderRadius: '16px',
                                    background: GLASS_BG,
                                    backdropFilter: 'blur(20px)',
                                    WebkitBackdropFilter: 'blur(20px)',
                                    border: `1px solid ${GLASS_BORDER}`,
                                    textAlign: 'center',
                                }}
                            >
                                <stat.icon size={18} style={{ color: stat.color, margin: '0 auto 8px', opacity: 0.8 }} />
                                <p style={{
                                    fontSize: '22px',
                                    fontWeight: 700,
                                    letterSpacing: '-0.02em',
                                }}>
                                    {loading ? '–' : stat.value}
                                </p>
                                <p style={{
                                    fontSize: '10px',
                                    color: 'rgba(255,255,255,0.4)',
                                    marginTop: '4px',
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.08em',
                                    fontWeight: 500,
                                }}>
                                    {stat.label}
                                </p>
                            </motion.div>
                        ))}
                    </div>

                    {/* ── Recent Requests ───────────────────── */}
                    <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.5 }}
                    >
                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginBottom: '12px',
                        }}>
                            <p style={{
                                fontSize: '13px',
                                fontWeight: 600,
                                color: 'rgba(255,255,255,0.7)',
                            }}>
                                Recent Requests
                            </p>
                            <Link
                                href="/admin/requests"
                                style={{
                                    fontSize: '12px',
                                    color: GOLD_LIGHT,
                                    textDecoration: 'none',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '4px',
                                }}
                            >
                                View All <ChevronRight size={12} />
                            </Link>
                        </div>

                        <div style={{
                            background: GLASS_BG,
                            border: `1px solid ${GLASS_BORDER}`,
                            borderRadius: '16px',
                            overflow: 'hidden',
                            backdropFilter: 'blur(20px)',
                            WebkitBackdropFilter: 'blur(20px)',
                        }}>
                            {loading ? (
                                <motion.div
                                    animate={{ opacity: [0.3, 1, 0.3] }}
                                    transition={{ duration: 1.5, repeat: Infinity }}
                                    style={{
                                        padding: '40px',
                                        textAlign: 'center',
                                        color: GOLD_LIGHT,
                                        fontSize: '13px',
                                    }}
                                >
                                    Loading...
                                </motion.div>
                            ) : recent.length === 0 ? (
                                <p style={{
                                    padding: '40px',
                                    textAlign: 'center',
                                    color: 'rgba(255,255,255,0.35)',
                                    fontSize: '13px',
                                }}>
                                    No requests yet. They&apos;ll show up here.
                                </p>
                            ) : (
                                recent.map((ticket, i) => (
                                    <Link
                                        key={ticket.id}
                                        href="/admin/requests"
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '12px',
                                            padding: '14px 18px',
                                            textDecoration: 'none',
                                            color: '#fff',
                                            borderTop: i > 0 ? `1px solid ${GLASS_BORDER}` : 'none',
                                            transition: 'background 0.2s ease',
                                        }}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.background = 'rgba(255,255,255,0.03)';
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.background = 'transparent';
                                        }}
                                    >
                                        {/* Status dot */}
                                        <div style={{
                                            width: '7px',
                                            height: '7px',
                                            borderRadius: '50%',
                                            background: statusColor[ticket.status] || '#868e96',
                                            flexShrink: 0,
                                            boxShadow: `0 0 6px ${statusColor[ticket.status] || '#868e96'}40`,
                                        }} />

                                        {/* Info */}
                                        <div style={{ flex: 1, minWidth: 0 }}>
                                            <p style={{
                                                fontSize: '13px',
                                                fontWeight: 600,
                                                overflow: 'hidden',
                                                textOverflow: 'ellipsis',
                                                whiteSpace: 'nowrap',
                                            }}>
                                                {ticket.name || 'Unnamed Request'}
                                            </p>
                                            <div style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '8px',
                                                marginTop: '2px',
                                            }}>
                                                {ticket.business_type && (
                                                    <span style={{
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        gap: '3px',
                                                        fontSize: '11px',
                                                        color: 'rgba(255,255,255,0.35)',
                                                    }}>
                                                        <Briefcase size={9} />
                                                        {ticket.business_type}
                                                    </span>
                                                )}
                                                <span style={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: '3px',
                                                    fontSize: '11px',
                                                    color: 'rgba(255,255,255,0.35)',
                                                }}>
                                                    <Clock size={9} />
                                                    {timeAgo(ticket.created_at)}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Status label */}
                                        <span style={{
                                            fontSize: '10px',
                                            fontWeight: 600,
                                            color: statusColor[ticket.status] || '#868e96',
                                            flexShrink: 0,
                                        }}>
                                            {statusLabel[ticket.status] || ticket.status}
                                        </span>

                                        <ChevronRight size={12} color="rgba(255,255,255,0.2)" />
                                    </Link>
                                ))
                            )}
                        </div>
                    </motion.div>

                    <div style={{ height: '60px' }} />
                </div>
            </div>
        </div>
    );
}
