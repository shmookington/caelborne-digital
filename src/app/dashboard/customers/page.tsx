'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FileText, Download, Clock, CheckCircle2, AlertCircle, Shield, Bookmark, Receipt, Loader, FolderOpen } from 'lucide-react';
import { CosmicBackground } from '@/components/CosmicBackground';
import DashboardNav from '@/components/DashboardNav';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import Link from 'next/link';


// ─── Design Tokens ──────────────────────────────────────────────

const GOLD = '#8B7332';
const GOLD_LIGHT = '#BFA265';
const GOLD_DIM = 'rgba(139, 115, 50, 0.2)';
const GOLD_BORDER = 'rgba(139, 115, 50, 0.35)';
const GLASS_BG = 'rgba(12, 12, 20, 0.55)';
const GLASS_BORDER = 'rgba(255, 255, 255, 0.06)';

// ─── Status Config (display config, not per-client data) ────────

const STATUS_CONFIG = {
    signed: { label: 'Signed', color: '#34d399', bg: 'rgba(52, 211, 153, 0.1)', icon: CheckCircle2 },
    paid: { label: 'Paid', color: '#34d399', bg: 'rgba(52, 211, 153, 0.1)', icon: CheckCircle2 },
    pending: { label: 'Pending', color: '#fbbf24', bg: 'rgba(251, 191, 36, 0.1)', icon: Clock },
    draft: { label: 'Draft', color: '#8E95A0', bg: 'rgba(255,255,255,0.04)', icon: AlertCircle },
};

const DOC_TYPE_ICONS: Record<string, React.ComponentType<{ size?: number; style?: React.CSSProperties }>> = {
    Contract: Shield,
    Proposal: FileText,
    Invoice: Receipt,
    Design: Bookmark,
};

// ─── Types ──────────────────────────────────────────────────────

interface Document {
    id: string;
    title: string;
    description: string | null;
    date: string | null;
    status: 'signed' | 'paid' | 'pending' | 'draft';
    doc_type: string | null;
    file_url: string | null;
}

// ─── Helpers ────────────────────────────────────────────────────

function formatDate(dateStr: string | null): string {
    if (!dateStr) return '—';
    return new Date(dateStr + 'T00:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

// ─── Page ───────────────────────────────────────────────────────

export default function DocumentsPage() {
    const router = useRouter();
    const [documents, setDocuments] = useState<Document[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function load() {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) { router.push('/signin'); return; }

            // Get user's project first
            const { data: projects } = await supabase
                .from('projects')
                .select('id')
                .eq('user_id', user.id)
                .limit(1);

            if (projects && projects.length > 0) {
                const { data: docs } = await supabase
                    .from('documents')
                    .select('*')
                    .eq('project_id', projects[0].id)
                    .order('date', { ascending: false });

                if (docs) setDocuments(docs as Document[]);
            }

            setLoading(false);
        }
        load();
    }, [router]);

    // ─── Loading ────────────────────────────────────────────────

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
                        <p style={{ fontSize: '14px', color: '#8E95A0' }}>Loading documents…</p>
                    </div>
                </div>
                <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
            </>
        );
    }

    // ─── Empty ──────────────────────────────────────────────────

    if (documents.length === 0) {
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
                        <FolderOpen size={40} style={{ color: GOLD, opacity: 0.6 }} />
                        <h2 style={{ fontSize: '22px', fontWeight: 700, color: '#fff' }}>No Documents Yet</h2>
                        <p style={{ fontSize: '14px', color: '#8E95A0', maxWidth: '360px', lineHeight: 1.6 }}>
                            Your contracts, invoices, and project files will appear here as they&apos;re created.
                        </p>
                        <Link
                            href="/dashboard"
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
                            Back to Dashboard
                        </Link>
                    </div>
                </div>
            </>
        );
    }

    // ─── Main ───────────────────────────────────────────────────

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
                        { label: 'Total', value: documents.length.toString(), color: '#B0B8C4' },
                        { label: 'Signed', value: documents.filter(d => d.status === 'signed').length.toString(), color: '#34d399' },
                        { label: 'Pending', value: documents.filter(d => d.status === 'pending').length.toString(), color: '#fbbf24' },
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
                        {documents.map((doc, i) => {
                            const statusCfg = STATUS_CONFIG[doc.status] || STATUS_CONFIG.draft;
                            const StatusIcon = statusCfg.icon;
                            const DocIcon = (doc.doc_type && DOC_TYPE_ICONS[doc.doc_type]) || FileText;

                            return (
                                <motion.div
                                    key={doc.id}
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
                                            <DocIcon size={18} style={{ color: GOLD }} />
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
                                                        {doc.doc_type || 'Document'}
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

                                            {doc.description && (
                                                <p style={{
                                                    fontSize: '12px',
                                                    color: '#8E95A0',
                                                    lineHeight: 1.5,
                                                    marginTop: '6px',
                                                }}>
                                                    {doc.description}
                                                </p>
                                            )}

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
                                                    {formatDate(doc.date)}
                                                </span>

                                                {doc.file_url ? (
                                                    <a
                                                        href={doc.file_url}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        style={{
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
                                                            textDecoration: 'none',
                                                        }}
                                                    >
                                                        <Download size={12} />
                                                        Download
                                                    </a>
                                                ) : (
                                                    <span style={{
                                                        display: 'inline-flex',
                                                        alignItems: 'center',
                                                        gap: '6px',
                                                        padding: '6px 14px',
                                                        borderRadius: '8px',
                                                        background: 'rgba(255,255,255,0.02)',
                                                        border: '1px solid rgba(255,255,255,0.04)',
                                                        color: '#5A5F6A',
                                                        fontSize: '11px',
                                                        fontWeight: 500,
                                                    }}>
                                                        <Download size={12} />
                                                        No File
                                                    </span>
                                                )}
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
