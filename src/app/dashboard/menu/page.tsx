'use client';

import { motion } from 'framer-motion';
import { Palette, Code2, Smartphone, Search, Shield, CheckSquare, Square, ChevronRight } from 'lucide-react';
import { CosmicBackground } from '@/components/CosmicBackground';
import DashboardNav from '@/components/DashboardNav';


// ─── Design Tokens ──────────────────────────────────────────────

const GOLD = '#8B7332';
const GOLD_LIGHT = '#BFA265';
const GOLD_DIM = 'rgba(139, 115, 50, 0.2)';
const GOLD_BORDER = 'rgba(139, 115, 50, 0.35)';
const GLASS_BG = 'rgba(12, 12, 20, 0.55)';
const GLASS_BORDER = 'rgba(255, 255, 255, 0.06)';

// ─── Mock Data ──────────────────────────────────────────────────

const SCOPE = {
    type: 'Custom Website + Loyalty Platform',
    description: 'Full-stack web presence with integrated Guap digital loyalty system, designed to drive both online visibility and in-store retention.',
};

const DELIVERABLES = [
    { title: 'Homepage Design & Build', done: true },
    { title: 'About / Story Page', done: true },
    { title: 'Services / Menu Page', done: true },
    { title: 'Mobile Responsive Layout', done: false },
    { title: 'Contact Form Integration', done: false },
    { title: 'Guap Loyalty Card Setup', done: false },
    { title: 'SEO & Meta Tags', done: false },
    { title: 'Analytics Dashboard', done: false },
    { title: 'Domain & Hosting Setup', done: false },
    { title: 'Launch & Handoff', done: false },
];

const TECH_STACK = [
    { name: 'Next.js', color: '#fff' },
    { name: 'React', color: '#61dafb' },
    { name: 'TypeScript', color: '#3178c6' },
    { name: 'Supabase', color: '#3fcf8e' },
    { name: 'Vercel', color: '#fff' },
    { name: 'Framer Motion', color: '#e846ff' },
];

const FEATURES = [
    { icon: Palette, title: 'Custom Design', desc: 'Bespoke visual identity — no templates' },
    { icon: Code2, title: 'Modern Stack', desc: 'Next.js + Supabase for speed & scale' },
    { icon: Smartphone, title: 'Mobile First', desc: 'Perfect on every device & screen size' },
    { icon: Search, title: 'SEO Ready', desc: 'Built to rank on search engines' },
    { icon: Shield, title: 'SSL & Security', desc: 'Enterprise-grade protection included' },
];

// ─── Page ───────────────────────────────────────────────────────

export default function ProjectPage() {
    const completedCount = DELIVERABLES.filter(d => d.done).length;

    return (
        <>
            <CosmicBackground />
            <DashboardNav />

            <div className="min-h-screen relative z-10" style={{ paddingTop: '104px' }}>

                {/* ── Header ─────────────────────────── */}
                <header style={{ padding: '32px 24px 24px' }}>
                    <p style={{
                        fontSize: '11px',
                        fontWeight: 600,
                        color: GOLD,
                        textTransform: 'uppercase',
                        letterSpacing: '0.12em',
                        marginBottom: '8px',
                    }}>
                        Project Details
                    </p>
                    <h1 style={{
                        fontSize: 'clamp(22px, 4vw, 30px)',
                        fontWeight: 700,
                        color: '#fff',
                        letterSpacing: '-0.02em',
                    }}>
                        What We&apos;re Building
                    </h1>
                </header>

                {/* ── Scope Card ─────────────────────── */}
                <div style={{ padding: '0 24px 28px' }}>
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        style={{
                            background: GLASS_BG,
                            backdropFilter: 'blur(24px)',
                            WebkitBackdropFilter: 'blur(24px)',
                            border: `1px solid ${GLASS_BORDER}`,
                            borderRadius: '18px',
                            padding: '28px',
                        }}
                    >
                        <div style={{
                            fontSize: '10px',
                            fontWeight: 600,
                            color: GOLD,
                            textTransform: 'uppercase',
                            letterSpacing: '0.1em',
                            marginBottom: '10px',
                        }}>
                            Project Scope
                        </div>
                        <h3 style={{
                            fontSize: '18px',
                            fontWeight: 700,
                            color: '#fff',
                            marginBottom: '8px',
                            letterSpacing: '-0.02em',
                        }}>
                            {SCOPE.type}
                        </h3>
                        <p style={{
                            fontSize: '14px',
                            color: '#B0B8C4',
                            lineHeight: 1.6,
                        }}>
                            {SCOPE.description}
                        </p>
                    </motion.div>
                </div>

                {/* ── Features Grid ──────────────────── */}
                <div style={{ padding: '0 24px 28px' }}>
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
                        gap: '10px',
                    }}>
                        {FEATURES.map((feat, i) => (
                            <motion.div
                                key={feat.title}
                                initial={{ opacity: 0, y: 12 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.15 + i * 0.06, duration: 0.4 }}
                                style={{
                                    padding: '18px',
                                    borderRadius: '14px',
                                    background: GLASS_BG,
                                    border: `1px solid ${GLASS_BORDER}`,
                                    backdropFilter: 'blur(24px)',
                                    WebkitBackdropFilter: 'blur(24px)',
                                }}
                            >
                                <feat.icon size={18} style={{ color: GOLD, marginBottom: '10px', opacity: 0.8 }} />
                                <p style={{ fontSize: '13px', fontWeight: 600, color: '#fff', marginBottom: '4px' }}>
                                    {feat.title}
                                </p>
                                <p style={{ fontSize: '11px', color: '#8E95A0', lineHeight: 1.4 }}>
                                    {feat.desc}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* ── Deliverables Checklist ─────────── */}
                <div style={{ padding: '0 24px 28px' }}>
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.5 }}
                        style={{
                            background: GLASS_BG,
                            backdropFilter: 'blur(24px)',
                            WebkitBackdropFilter: 'blur(24px)',
                            border: `1px solid ${GLASS_BORDER}`,
                            borderRadius: '18px',
                            padding: '24px',
                        }}
                    >
                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginBottom: '18px',
                        }}>
                            <span style={{ fontSize: '14px', fontWeight: 600, color: 'rgba(255,255,255,0.8)' }}>
                                Deliverables
                            </span>
                            <span style={{ fontSize: '12px', fontWeight: 600, color: GOLD_LIGHT }}>
                                {completedCount}/{DELIVERABLES.length}
                            </span>
                        </div>

                        {DELIVERABLES.map((item, i) => (
                            <div
                                key={item.title}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '12px',
                                    padding: '10px 0',
                                    borderBottom: i < DELIVERABLES.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none',
                                }}
                            >
                                {item.done ? (
                                    <CheckSquare size={16} style={{ color: '#34d399', flexShrink: 0 }} />
                                ) : (
                                    <Square size={16} style={{ color: 'rgba(255,255,255,0.15)', flexShrink: 0 }} />
                                )}
                                <span style={{
                                    fontSize: '13px',
                                    fontWeight: 500,
                                    color: item.done ? 'rgba(255,255,255,0.5)' : 'rgba(255,255,255,0.75)',
                                    textDecoration: item.done ? 'line-through' : 'none',
                                }}>
                                    {item.title}
                                </span>
                            </div>
                        ))}
                    </motion.div>
                </div>

                {/* ── Tech Stack ─────────────────────── */}
                <div style={{ padding: '0 24px 60px' }}>
                    <h2 style={{
                        fontSize: '12px',
                        fontWeight: 600,
                        color: '#8E95A0',
                        textTransform: 'uppercase',
                        letterSpacing: '0.1em',
                        marginBottom: '16px',
                    }}>
                        Tech Stack
                    </h2>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                        {TECH_STACK.map((tech, i) => (
                            <motion.span
                                key={tech.name}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.5 + i * 0.06, duration: 0.3 }}
                                style={{
                                    padding: '8px 16px',
                                    borderRadius: '100px',
                                    background: 'rgba(255,255,255,0.04)',
                                    border: '1px solid rgba(255,255,255,0.08)',
                                    fontSize: '12px',
                                    fontWeight: 600,
                                    color: tech.color,
                                    letterSpacing: '0.02em',
                                }}
                            >
                                {tech.name}
                            </motion.span>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}
