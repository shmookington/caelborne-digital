'use client';

import { motion } from 'framer-motion';
import { FileText, Download, Clock, CheckCircle2, AlertCircle, Shield, Bookmark, Receipt } from 'lucide-react';
import { CosmicBackground } from '@/components/CosmicBackground';
import DashboardNav from '@/components/DashboardNav';


// ─── Design Tokens ──────────────────────────────────────────────

const GOLD = '#8B7332';
const GOLD_LIGHT = '#BFA265';
const GOLD_DIM = 'rgba(139, 115, 50, 0.2)';
const GOLD_BORDER = 'rgba(139, 115, 50, 0.35)';
const GLASS_BG = 'rgba(12, 12, 20, 0.55)';
const GLASS_BORDER = 'rgba(255, 255, 255, 0.06)';

// ─── Mock Documents ─────────────────────────────────────────────

const DOCUMENTS = [
    {
        title: 'Service Agreement',
        description: 'Master service agreement covering project scope, terms, and deliverables.',
        date: 'Jan 12, 2026',
        status: 'signed' as const,
        icon: Shield,
        type: 'Contract',
    },
    {
        title: 'Project Proposal',
        description: 'Detailed scope breakdown with itemized pricing and timeline.',
        date: 'Jan 10, 2026',
        status: 'signed' as const,
        icon: FileText,
        type: 'Proposal',
    },
    {
        title: 'Invoice #001',
        description: 'Initial deposit — 50% of total project cost.',
        date: 'Jan 15, 2026',
        status: 'paid' as const,
        icon: Receipt,
        type: 'Invoice',
    },
    {
        title: 'Brand Guidelines',
        description: 'Color palette, typography, logo usage, and visual standards.',
        date: 'Jan 22, 2026',
        status: 'draft' as const,
        icon: Bookmark,
        type: 'Design',
    },
    {
        title: 'Invoice #002',
        description: 'Milestone payment — Design phase completion.',
        date: 'Feb 18, 2026',
        status: 'pending' as const,
        icon: Receipt,
        type: 'Invoice',
    },
];

const STATUS_CONFIG = {
    signed: { label: 'Signed', color: '#34d399', bg: 'rgba(52, 211, 153, 0.1)', icon: CheckCircle2 },
    paid: { label: 'Paid', color: '#34d399', bg: 'rgba(52, 211, 153, 0.1)', icon: CheckCircle2 },
    pending: { label: 'Pending', color: '#fbbf24', bg: 'rgba(251, 191, 36, 0.1)', icon: Clock },
    draft: { label: 'Draft', color: '#8E95A0', bg: 'rgba(255,255,255,0.04)', icon: AlertCircle },
};

// ─── Page ───────────────────────────────────────────────────────

export default function DocumentsPage() {
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
                        Resources
                    </p>
                    <h1 style={{
                        fontSize: 'clamp(22px, 4vw, 30px)',
                        fontWeight: 700,
                        color: '#fff',
                        letterSpacing: '-0.02em',
                    }}>
                        Documents & Files
                    </h1>
                </header>

                {/* ── Summary Stats ──────────────────── */}
                <div style={{ padding: '0 24px 28px', display: 'flex', gap: '10px' }}>
                    {[
                        { label: 'Total', value: DOCUMENTS.length.toString(), color: '#B0B8C4' },
                        { label: 'Signed', value: DOCUMENTS.filter(d => d.status === 'signed').length.toString(), color: '#34d399' },
                        { label: 'Pending', value: DOCUMENTS.filter(d => d.status === 'pending').length.toString(), color: '#fbbf24' },
                    ].map((stat, i) => (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.06, duration: 0.4 }}
                            style={{
                                flex: 1,
                                padding: '16px',
                                borderRadius: '14px',
                                background: GLASS_BG,
                                border: `1px solid ${GLASS_BORDER}`,
                                backdropFilter: 'blur(24px)',
                                WebkitBackdropFilter: 'blur(24px)',
                                textAlign: 'center',
                            }}
                        >
                            <p style={{ fontSize: '22px', fontWeight: 700, color: stat.color }}>{stat.value}</p>
                            <p style={{ fontSize: '10px', color: '#8E95A0', textTransform: 'uppercase', letterSpacing: '0.08em', marginTop: '4px', fontWeight: 500 }}>
                                {stat.label}
                            </p>
                        </motion.div>
                    ))}
                </div>

                {/* ── Documents List ─────────────────── */}
                <div style={{ padding: '0 24px 60px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        {DOCUMENTS.map((doc, i) => {
                            const statusCfg = STATUS_CONFIG[doc.status];
                            const StatusIcon = statusCfg.icon;

                            return (
                                <motion.div
                                    key={doc.title + i}
                                    initial={{ opacity: 0, y: 14 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2 + i * 0.06, duration: 0.4 }}
                                    style={{
                                        background: GLASS_BG,
                                        backdropFilter: 'blur(24px)',
                                        WebkitBackdropFilter: 'blur(24px)',
                                        border: `1px solid ${GLASS_BORDER}`,
                                        borderRadius: '18px',
                                        padding: '22px',
                                        cursor: 'pointer',
                                        transition: 'border-color 0.2s ease',
                                    }}
                                    onMouseEnter={(e) => {
                                        (e.currentTarget as HTMLElement).style.borderColor = GOLD_BORDER;
                                    }}
                                    onMouseLeave={(e) => {
                                        (e.currentTarget as HTMLElement).style.borderColor = GLASS_BORDER;
                                    }}
                                >
                                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
                                        {/* Icon */}
                                        <div style={{
                                            width: '40px',
                                            height: '40px',
                                            borderRadius: '10px',
                                            background: GOLD_DIM,
                                            border: `1px solid ${GOLD_BORDER}`,
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            flexShrink: 0,
                                        }}>
                                            <doc.icon size={18} style={{ color: GOLD }} />
                                        </div>

                                        {/* Content */}
                                        <div style={{ flex: 1 }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '4px' }}>
                                                <div>
                                                    <p style={{
                                                        fontSize: '14px',
                                                        fontWeight: 600,
                                                        color: '#fff',
                                                        marginBottom: '2px',
                                                    }}>
                                                        {doc.title}
                                                    </p>
                                                    <span style={{
                                                        fontSize: '10px',
                                                        fontWeight: 500,
                                                        color: '#8E95A0',
                                                        textTransform: 'uppercase',
                                                        letterSpacing: '0.06em',
                                                    }}>
                                                        {doc.type}
                                                    </span>
                                                </div>

                                                {/* Status badge */}
                                                <span style={{
                                                    display: 'inline-flex',
                                                    alignItems: 'center',
                                                    gap: '4px',
                                                    padding: '4px 10px',
                                                    borderRadius: '100px',
                                                    background: statusCfg.bg,
                                                    border: `1px solid ${statusCfg.color}22`,
                                                    fontSize: '10px',
                                                    fontWeight: 600,
                                                    color: statusCfg.color,
                                                    textTransform: 'uppercase',
                                                    letterSpacing: '0.06em',
                                                    whiteSpace: 'nowrap',
                                                    flexShrink: 0,
                                                }}>
                                                    <StatusIcon size={10} />
                                                    {statusCfg.label}
                                                </span>
                                            </div>

                                            <p style={{
                                                fontSize: '12px',
                                                color: '#8E95A0',
                                                lineHeight: 1.5,
                                                marginTop: '6px',
                                            }}>
                                                {doc.description}
                                            </p>

                                            <div style={{
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                alignItems: 'center',
                                                marginTop: '12px',
                                            }}>
                                                <span style={{
                                                    fontSize: '11px',
                                                    color: '#8E95A0',
                                                }}>
                                                    {doc.date}
                                                </span>

                                                <button style={{
                                                    display: 'inline-flex',
                                                    alignItems: 'center',
                                                    gap: '6px',
                                                    padding: '6px 14px',
                                                    borderRadius: '8px',
                                                    background: 'rgba(255,255,255,0.04)',
                                                    border: '1px solid rgba(255,255,255,0.08)',
                                                    color: '#B0B8C4',
                                                    fontSize: '11px',
                                                    fontWeight: 500,
                                                    cursor: 'pointer',
                                                    transition: 'all 0.2s ease',
                                                }}>
                                                    <Download size={12} />
                                                    Download
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </>
    );
}
