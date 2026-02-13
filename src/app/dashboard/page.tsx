'use client';

import { motion } from 'framer-motion';
import { supabase } from '@/lib/supabase';
import { LogOut, Rocket, CalendarClock, TrendingUp, ExternalLink, PhoneCall, MessageSquare, CheckCircle2, Circle, Loader } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { CosmicBackground } from '@/components/CosmicBackground';
import DashboardNav from '@/components/DashboardNav';


// ─── Design Tokens ──────────────────────────────────────────────

const GOLD = '#8B7332';
const GOLD_LIGHT = '#BFA265';
const GOLD_DIM = 'rgba(139, 115, 50, 0.2)';
const GOLD_BORDER = 'rgba(139, 115, 50, 0.35)';
const GLASS_BG = 'rgba(12, 12, 20, 0.55)';
const GLASS_BORDER = 'rgba(255, 255, 255, 0.06)';

// ─── Mock Project Data ──────────────────────────────────────────

const PROJECT = {
    name: "Amir's Coffee Shop",
    phase: 'Design',
    completion: 35,
    daysUntilLaunch: 42,
    startDate: 'Jan 15, 2026',
    targetLaunch: 'Mar 28, 2026',
};

const MILESTONES = [
    { title: 'Consultation', date: 'Jan 10, 2026', status: 'complete' as const },
    { title: 'Scope & Quote', date: 'Jan 12, 2026', status: 'complete' as const },
    { title: 'Brand & Design', date: 'Jan 20, 2026', status: 'active' as const },
    { title: 'Development', date: 'Feb 15, 2026', status: 'upcoming' as const },
    { title: 'Testing & QA', date: 'Mar 10, 2026', status: 'upcoming' as const },
    { title: 'Launch', date: 'Mar 28, 2026', status: 'upcoming' as const },
];

const QUICK_ACTIONS = [
    { label: 'View Documents', href: '/dashboard/customers', icon: ExternalLink },
    { label: 'Schedule a Call', href: '#', icon: PhoneCall },
    { label: 'Contact Support', href: '#', icon: MessageSquare },
];

// ─── Page ───────────────────────────────────────────────────────

export default function DashboardPage() {
    const router = useRouter();

    const handleSignOut = async () => {
        await supabase.auth.signOut();
        router.push('/');
    }

    return (
        <>
            <CosmicBackground />
            <DashboardNav />

            <div className="min-h-screen relative z-10" style={{ paddingTop: '104px' }}>

                {/* ── Header ─────────────────────────── */}
                <header
                    style={{
                        padding: '32px 24px 24px',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'flex-start',
                    }}
                >
                    <div>
                        <p style={{
                            fontSize: '11px',
                            fontWeight: 600,
                            color: GOLD,
                            textTransform: 'uppercase',
                            letterSpacing: '0.12em',
                            marginBottom: '8px',
                        }}>
                            Client Portal
                        </p>
                        <h1 style={{
                            fontSize: 'clamp(22px, 4vw, 30px)',
                            fontWeight: 700,
                            color: '#fff',
                            letterSpacing: '-0.02em',
                        }}>
                            Welcome back, {PROJECT.name}
                        </h1>
                    </div>

                    {/* Phase badge */}
                    <div style={{
                        padding: '8px 16px',
                        borderRadius: '100px',
                        background: GOLD_DIM,
                        border: `1px solid ${GOLD_BORDER}`,
                        fontSize: '12px',
                        fontWeight: 600,
                        color: GOLD_LIGHT,
                        letterSpacing: '0.04em',
                        whiteSpace: 'nowrap',
                    }}>
                        Phase: {PROJECT.phase}
                    </div>
                </header>

                {/* ── Stats Cards ────────────────────── */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, 1fr)',
                    gap: '12px',
                    padding: '0 24px 32px',
                }}>
                    {[
                        {
                            label: 'Current Phase',
                            value: PROJECT.phase,
                            icon: Rocket,
                            accent: GOLD,
                        },
                        {
                            label: 'Days to Launch',
                            value: PROJECT.daysUntilLaunch.toString(),
                            icon: CalendarClock,
                            accent: '#60a5fa',
                        },
                        {
                            label: 'Completion',
                            value: `${PROJECT.completion}%`,
                            icon: TrendingUp,
                            accent: '#34d399',
                        },
                    ].map((stat, i) => (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.08, duration: 0.5 }}
                            style={{
                                padding: '20px',
                                borderRadius: '18px',
                                background: GLASS_BG,
                                backdropFilter: 'blur(24px)',
                                WebkitBackdropFilter: 'blur(24px)',
                                border: `1px solid ${GLASS_BORDER}`,
                                textAlign: 'center',
                            }}
                        >
                            <stat.icon size={20} style={{ color: stat.accent, margin: '0 auto 10px', opacity: 0.8 }} />
                            <p style={{
                                fontSize: '24px',
                                fontWeight: 700,
                                color: '#fff',
                                letterSpacing: '-0.02em',
                            }}>
                                {stat.value}
                            </p>
                            <p style={{
                                fontSize: '11px',
                                color: '#8E95A0',
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

                {/* ── Progress Bar ────────────────────── */}
                <div style={{ padding: '0 24px 40px' }}>
                    <div style={{
                        background: GLASS_BG,
                        backdropFilter: 'blur(24px)',
                        WebkitBackdropFilter: 'blur(24px)',
                        border: `1px solid ${GLASS_BORDER}`,
                        borderRadius: '18px',
                        padding: '24px',
                    }}>
                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginBottom: '14px',
                        }}>
                            <span style={{ fontSize: '13px', fontWeight: 600, color: '#B0B8C4' }}>
                                Project Progress
                            </span>
                            <span style={{ fontSize: '13px', fontWeight: 700, color: GOLD_LIGHT }}>
                                {PROJECT.completion}%
                            </span>
                        </div>
                        <div style={{
                            height: '6px',
                            borderRadius: '100px',
                            background: 'rgba(255,255,255,0.06)',
                            overflow: 'hidden',
                        }}>
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${PROJECT.completion}%` }}
                                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
                                style={{
                                    height: '100%',
                                    borderRadius: '100px',
                                    background: `linear-gradient(90deg, ${GOLD}, ${GOLD_LIGHT})`,
                                }}
                            />
                        </div>
                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            marginTop: '10px',
                        }}>
                            <span style={{ fontSize: '11px', color: '#8E95A0' }}>
                                Started {PROJECT.startDate}
                            </span>
                            <span style={{ fontSize: '11px', color: '#8E95A0' }}>
                                Target {PROJECT.targetLaunch}
                            </span>
                        </div>
                    </div>
                </div>

                {/* ── Timeline ───────────────────────── */}
                <div style={{ padding: '0 24px 40px' }}>
                    <h2 style={{
                        fontSize: '12px',
                        fontWeight: 600,
                        color: '#8E95A0',
                        textTransform: 'uppercase',
                        letterSpacing: '0.1em',
                        marginBottom: '20px',
                    }}>
                        Project Timeline
                    </h2>

                    <div style={{
                        background: GLASS_BG,
                        backdropFilter: 'blur(24px)',
                        WebkitBackdropFilter: 'blur(24px)',
                        border: `1px solid ${GLASS_BORDER}`,
                        borderRadius: '18px',
                        padding: '24px',
                    }}>
                        {MILESTONES.map((milestone, i) => (
                            <motion.div
                                key={milestone.title}
                                initial={{ opacity: 0, x: -12 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.4 + i * 0.08, duration: 0.4 }}
                                style={{
                                    display: 'flex',
                                    alignItems: 'flex-start',
                                    gap: '16px',
                                    padding: '14px 0',
                                    borderBottom: i < MILESTONES.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none',
                                }}
                            >
                                {/* Status icon */}
                                <div style={{ paddingTop: '2px', flexShrink: 0 }}>
                                    {milestone.status === 'complete' ? (
                                        <CheckCircle2 size={18} style={{ color: '#34d399' }} />
                                    ) : milestone.status === 'active' ? (
                                        <div style={{
                                            width: '18px',
                                            height: '18px',
                                            borderRadius: '50%',
                                            border: `2px solid ${GOLD}`,
                                            background: GOLD_DIM,
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                        }}>
                                            <div style={{
                                                width: '6px',
                                                height: '6px',
                                                borderRadius: '50%',
                                                background: GOLD,
                                            }} />
                                        </div>
                                    ) : (
                                        <Circle size={18} style={{ color: 'rgba(255,255,255,0.15)' }} />
                                    )}
                                </div>

                                {/* Content */}
                                <div style={{ flex: 1 }}>
                                    <p style={{
                                        fontSize: '14px',
                                        fontWeight: milestone.status === 'active' ? 700 : 500,
                                        color: milestone.status === 'upcoming'
                                            ? '#8E95A0'
                                            : milestone.status === 'active'
                                                ? '#fff'
                                                : '#B0B8C4',
                                    }}>
                                        {milestone.title}
                                    </p>
                                    <p style={{
                                        fontSize: '11px',
                                        color: '#8E95A0',
                                        marginTop: '2px',
                                    }}>
                                        {milestone.date}
                                    </p>
                                </div>

                                {/* Status label */}
                                {milestone.status === 'active' && (
                                    <span style={{
                                        fontSize: '10px',
                                        fontWeight: 600,
                                        color: GOLD,
                                        textTransform: 'uppercase',
                                        letterSpacing: '0.08em',
                                        padding: '4px 10px',
                                        borderRadius: '100px',
                                        background: GOLD_DIM,
                                        border: `1px solid ${GOLD_BORDER}`,
                                    }}>
                                        In Progress
                                    </span>
                                )}
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* ── Quick Actions ──────────────────── */}
                <div style={{ padding: '0 24px 60px' }}>
                    <h2 style={{
                        fontSize: '12px',
                        fontWeight: 600,
                        color: '#8E95A0',
                        textTransform: 'uppercase',
                        letterSpacing: '0.1em',
                        marginBottom: '16px',
                    }}>
                        Quick Actions
                    </h2>

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                        gap: '12px',
                    }}>
                        {QUICK_ACTIONS.map((action, i) => (
                            <motion.div
                                key={action.label}
                                initial={{ opacity: 0, y: 12 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.6 + i * 0.08, duration: 0.4 }}
                            >
                                <Link
                                    href={action.href}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '12px',
                                        padding: '18px 20px',
                                        borderRadius: '16px',
                                        background: GLASS_BG,
                                        backdropFilter: 'blur(24px)',
                                        WebkitBackdropFilter: 'blur(24px)',
                                        border: `1px solid ${GLASS_BORDER}`,
                                        textDecoration: 'none',
                                        color: '#B0B8C4',
                                        fontSize: '13px',
                                        fontWeight: 500,
                                        transition: 'all 0.2s ease',
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.borderColor = GOLD_BORDER;
                                        e.currentTarget.style.color = '#fff';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.borderColor = GLASS_BORDER;
                                        e.currentTarget.style.color = '#B0B8C4';
                                    }}
                                >
                                    <action.icon size={18} style={{ color: GOLD, opacity: 0.7, flexShrink: 0 }} />
                                    {action.label}
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}
