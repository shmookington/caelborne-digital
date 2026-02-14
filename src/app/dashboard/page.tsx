'use client';

import { useState, useEffect } from 'react';
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

// ─── Types ──────────────────────────────────────────────────────

interface Project {
    id: string;
    name: string;
    phase: string;
    completion: number;
    start_date: string | null;
    target_launch: string | null;
}

interface Milestone {
    id: string;
    title: string;
    date: string | null;
    status: 'complete' | 'active' | 'upcoming';
    sort_order: number;
}

const QUICK_ACTIONS = [
    { label: 'View Documents', href: '/dashboard/customers', icon: ExternalLink },
    { label: 'Schedule a Call', href: '/account/schedule', icon: PhoneCall },
    { label: 'Contact Support', href: '/guap/contact', icon: MessageSquare },
];

// ─── Helpers ────────────────────────────────────────────────────

function formatDate(dateStr: string | null): string {
    if (!dateStr) return '—';
    return new Date(dateStr + 'T00:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

function daysUntil(dateStr: string | null): number {
    if (!dateStr) return 0;
    const target = new Date(dateStr + 'T00:00:00');
    const now = new Date();
    return Math.max(0, Math.ceil((target.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)));
}

// ─── Page ───────────────────────────────────────────────────────

export default function DashboardPage() {
    const router = useRouter();
    const [project, setProject] = useState<Project | null>(null);
    const [milestones, setMilestones] = useState<Milestone[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function load() {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) { router.push('/signin'); return; }

            // Fetch first project for this user
            const { data: projects } = await supabase
                .from('projects')
                .select('*')
                .eq('user_id', user.id)
                .limit(1);

            if (projects && projects.length > 0) {
                setProject(projects[0]);

                // Fetch milestones
                const { data: ms } = await supabase
                    .from('milestones')
                    .select('*')
                    .eq('project_id', projects[0].id)
                    .order('sort_order', { ascending: true });

                if (ms) setMilestones(ms);
            }

            setLoading(false);
        }
        load();
    }, [router]);

    const handleSignOut = async () => {
        await supabase.auth.signOut();
        router.push('/');
    }

    // ─── Loading State ──────────────────────────────────────────

    if (loading) {
        return (
            <>
                <CosmicBackground />
                <DashboardNav />
                <div className="min-h-screen relative z-10" style={{ paddingTop: '104px' }}>
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        minHeight: '60vh',
                        gap: '16px',
                    }}>
                        <Loader size={28} style={{ color: GOLD, animation: 'spin 1s linear infinite' }} />
                        <p style={{ fontSize: '14px', color: '#8E95A0' }}>Loading your project…</p>
                    </div>
                </div>
                <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
            </>
        );
    }

    // ─── No Project State ───────────────────────────────────────

    if (!project) {
        return (
            <>
                <CosmicBackground />
                <DashboardNav />
                <div className="min-h-screen relative z-10" style={{ paddingTop: '104px' }}>
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        minHeight: '60vh',
                        gap: '16px',
                        padding: '24px',
                        textAlign: 'center',
                    }}>
                        <Rocket size={40} style={{ color: GOLD, opacity: 0.6 }} />
                        <h2 style={{ fontSize: '22px', fontWeight: 700, color: '#fff' }}>No Project Yet</h2>
                        <p style={{ fontSize: '14px', color: '#8E95A0', maxWidth: '360px', lineHeight: 1.6 }}>
                            Once your project kicks off, you&apos;ll see your timeline, milestones, and progress right here.
                        </p>
                        <Link
                            href="/guap/contact"
                            style={{
                                marginTop: '12px',
                                padding: '12px 28px',
                                borderRadius: '100px',
                                background: `linear-gradient(135deg, ${GOLD}, ${GOLD_LIGHT})`,
                                color: '#fff',
                                fontSize: '13px',
                                fontWeight: 600,
                                textDecoration: 'none',
                            }}
                        >
                            Get Started
                        </Link>
                    </div>
                </div>
            </>
        );
    }

    // ─── Main Render ────────────────────────────────────────────

    const daysLeft = daysUntil(project.target_launch);

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
                            Welcome back, {project.name}
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
                        Phase: {project.phase}
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
                            value: project.phase,
                            icon: Rocket,
                            accent: GOLD,
                        },
                        {
                            label: 'Days to Launch',
                            value: daysLeft.toString(),
                            icon: CalendarClock,
                            accent: '#60a5fa',
                        },
                        {
                            label: 'Completion',
                            value: `${project.completion}%`,
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
                                {project.completion}%
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
                                animate={{ width: `${project.completion}%` }}
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
                                Started {formatDate(project.start_date)}
                            </span>
                            <span style={{ fontSize: '11px', color: '#8E95A0' }}>
                                Target {formatDate(project.target_launch)}
                            </span>
                        </div>
                    </div>
                </div>

                {/* ── Timeline ───────────────────────── */}
                {milestones.length > 0 && (
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
                            {milestones.map((milestone, i) => (
                                <motion.div
                                    key={milestone.id}
                                    initial={{ opacity: 0, x: -12 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.4 + i * 0.08, duration: 0.4 }}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'flex-start',
                                        gap: '16px',
                                        padding: '14px 0',
                                        borderBottom: i < milestones.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none',
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
                                            {formatDate(milestone.date)}
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
                )}

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
