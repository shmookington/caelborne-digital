'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '@/lib/supabase';
import { isAdmin } from '@/lib/isAdmin';
import { CosmicBackground } from '@/components/CosmicBackground';
import AdminNav from '@/components/AdminNav';
import {
    ChevronDown,
    ChevronUp,
    ArrowUpDown,
    Calendar,
    Phone,
    Mail,
    Briefcase,
    Palette,
    Globe,
    Clock,
    Target,
    Layers,
    Circle,
    CheckCircle2,
    Loader,
    Archive,
    Copy,
    CheckCheck,
    Trash2,
    Settings2,
    X,
    Square,
    CheckSquare,
    MinusSquare,
    Search,
} from 'lucide-react';
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

// ─── Status Config ──────────────────────────────────────────────

const STATUS_CONFIG: Record<string, { label: string; color: string; bg: string; icon: any }> = {
    new: { label: 'New', color: '#4dabf7', bg: 'rgba(77, 171, 247, 0.12)', icon: Circle },
    in_progress: { label: 'In Progress', color: '#fcc419', bg: 'rgba(252, 196, 25, 0.12)', icon: Loader },
    done: { label: 'Done', color: '#51cf66', bg: 'rgba(81, 207, 102, 0.12)', icon: CheckCircle2 },
    archived: { label: 'Archived', color: '#868e96', bg: 'rgba(134, 142, 150, 0.12)', icon: Archive },
};

type SortKey = 'date' | 'name' | 'status';
type SortDir = 'asc' | 'desc';

interface Ticket {
    id: string;
    created_at: string;
    name: string | null;
    phone: string | null;
    email: string | null;
    business_type: string | null;
    aesthetic_vibe: string | null;
    services: string[] | null;
    current_website: string | null;
    timeline: string | null;
    top_priority: string | null;
    summary: string | null;
    status: string;
}

// ─── Page ───────────────────────────────────────────────────────

export default function AdminRequestsPage() {
    const [tickets, setTickets] = useState<Ticket[]>([]);
    const [loading, setLoading] = useState(true);
    const [authorized, setAuthorized] = useState(false);
    const [expandedId, setExpandedId] = useState<string | null>(null);
    const [sortKey, setSortKey] = useState<SortKey>('date');
    const [sortDir, setSortDir] = useState<SortDir>('desc');
    const [filterStatus, setFilterStatus] = useState<string>('all');
    const [copiedId, setCopiedId] = useState<string | null>(null);
    const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
    const [bulkMode, setBulkMode] = useState(false);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [bulkUpdating, setBulkUpdating] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const router = useRouter();

    useEffect(() => {
        const init = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            if (!session?.user || !isAdmin(session.user.email)) {
                router.push('/dashboard');
                return;
            }
            setAuthorized(true);

            const { data, error } = await supabase
                .from('tickets')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) console.error('Error fetching tickets:', error);
            else setTickets(data || []);
            setLoading(false);
        };
        init();
    }, [router]);

    if (!authorized) return null;

    // Update ticket status
    const updateStatus = async (id: string, newStatus: string) => {
        const { error } = await supabase
            .from('tickets')
            .update({ status: newStatus })
            .eq('id', id);

        if (!error) {
            setTickets((prev) =>
                prev.map((t) => (t.id === id ? { ...t, status: newStatus } : t))
            );
        }
    };

    const copySummary = (ticket: Ticket) => {
        if (ticket.summary) {
            navigator.clipboard.writeText(ticket.summary);
            setCopiedId(ticket.id);
            setTimeout(() => setCopiedId(null), 2000);
        }
    };

    // ── Bulk helpers ─────────────────────────────────────────────
    const toggleSelect = (id: string) => {
        setSelectedIds((prev) => {
            const next = new Set(prev);
            if (next.has(id)) next.delete(id);
            else next.add(id);
            return next;
        });
    };

    const toggleSelectAll = () => {
        const visibleIds = sorted.map((t) => t.id);
        const allSelected = visibleIds.length > 0 && visibleIds.every((id) => selectedIds.has(id));
        if (allSelected) setSelectedIds(new Set());
        else setSelectedIds(new Set(visibleIds));
    };

    const exitBulkMode = () => {
        setBulkMode(false);
        setSelectedIds(new Set());
    };

    const bulkUpdateStatus = async (newStatus: string) => {
        const ids = Array.from(selectedIds);
        if (ids.length === 0) return;
        setBulkUpdating(true);
        for (const id of ids) {
            await supabase.from('tickets').update({ status: newStatus }).eq('id', id);
        }
        setTickets((prev) =>
            prev.map((t) => (selectedIds.has(t.id) ? { ...t, status: newStatus } : t))
        );
        setSelectedIds(new Set());
        setBulkUpdating(false);
    };

    const bulkDelete = async () => {
        const ids = Array.from(selectedIds);
        if (ids.length === 0) return;
        setBulkUpdating(true);
        for (const id of ids) {
            await supabase.from('tickets').delete().eq('id', id);
        }
        setTickets((prev) => prev.filter((t) => !selectedIds.has(t.id)));
        setSelectedIds(new Set());
        setShowDeleteConfirm(false);
        setBulkUpdating(false);
    };

    // Sort, search & filter
    const sorted = [...tickets]
        .filter((t) => filterStatus === 'all' || t.status === filterStatus)
        .filter((t) => {
            if (!searchQuery.trim()) return true;
            const q = searchQuery.toLowerCase();
            return (
                (t.name || '').toLowerCase().includes(q) ||
                (t.email || '').toLowerCase().includes(q) ||
                (t.business_type || '').toLowerCase().includes(q) ||
                (t.summary || '').toLowerCase().includes(q) ||
                (t.phone || '').toLowerCase().includes(q)
            );
        })
        .sort((a, b) => {
            const dir = sortDir === 'asc' ? 1 : -1;
            if (sortKey === 'date') return (new Date(a.created_at).getTime() - new Date(b.created_at).getTime()) * dir;
            if (sortKey === 'name') return ((a.name || '').localeCompare(b.name || '')) * dir;
            if (sortKey === 'status') {
                const order = ['new', 'in_progress', 'done', 'archived'];
                return (order.indexOf(a.status) - order.indexOf(b.status)) * dir;
            }
            return 0;
        });

    const toggleSort = (key: SortKey) => {
        if (sortKey === key) setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
        else { setSortKey(key); setSortDir('desc'); }
    };

    const formatDate = (d: string) =>
        new Date(d).toLocaleDateString('en-US', {
            month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: '2-digit',
        });

    const statusCounts = {
        all: tickets.length,
        new: tickets.filter((t) => t.status === 'new').length,
        in_progress: tickets.filter((t) => t.status === 'in_progress').length,
        done: tickets.filter((t) => t.status === 'done').length,
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
                <div style={{ maxWidth: '800px', margin: '0 auto' }}>

                    {/* ── Header ─────────────────────────────── */}
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        style={{ marginBottom: '24px', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}
                    >
                        <div>
                            <h1 style={{ fontSize: '24px', fontWeight: 700, letterSpacing: '-0.03em', marginBottom: '6px' }}>
                                All Requests
                            </h1>
                            <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.5)' }}>
                                {tickets.length} total submission{tickets.length !== 1 ? 's' : ''}
                            </p>
                        </div>
                        <button
                            onClick={() => bulkMode ? exitBulkMode() : setBulkMode(true)}
                            style={{
                                display: 'flex', alignItems: 'center', gap: '6px',
                                padding: '8px 16px', borderRadius: '10px', fontSize: '13px', fontWeight: 600,
                                background: bulkMode ? 'rgba(197, 160, 68, 0.15)' : 'rgba(255,255,255,0.06)',
                                border: `1px solid ${bulkMode ? GOLD_BORDER : GLASS_BORDER}`,
                                color: bulkMode ? GOLD_LIGHT : 'rgba(255,255,255,0.6)',
                                cursor: 'pointer', transition: 'all 0.2s ease',
                            }}
                        >
                            <Settings2 size={14} />
                            {bulkMode ? 'Done' : 'Manage'}
                        </button>
                    </motion.div>

                    {/* ── Filter Pills ────────────────────────── */}
                    <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.05, duration: 0.4 }}
                        style={{ display: 'flex', gap: '8px', marginBottom: '16px', flexWrap: 'wrap' }}
                    >
                        {(['all', 'new', 'in_progress', 'done'] as const).map((key) => {
                            const active = filterStatus === key;
                            const config = key === 'all'
                                ? { label: 'All', color: GOLD_LIGHT, bg: GOLD_DIM }
                                : STATUS_CONFIG[key];
                            return (
                                <button
                                    key={key}
                                    onClick={() => setFilterStatus(key)}
                                    style={{
                                        padding: '6px 14px',
                                        borderRadius: '20px',
                                        fontSize: '12px',
                                        fontWeight: 600,
                                        border: `1px solid ${active ? config.color : GLASS_BORDER}`,
                                        background: active ? config.bg : 'transparent',
                                        color: active ? config.color : 'rgba(255,255,255,0.5)',
                                        cursor: 'pointer',
                                        transition: 'all 0.2s ease',
                                    }}
                                >
                                    {config.label} ({statusCounts[key as keyof typeof statusCounts] ?? 0})
                                </button>
                            );
                        })}
                    </motion.div>

                    {/* ── Search Bar ─────────────────────────── */}
                    <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.07, duration: 0.4 }}
                        style={{ position: 'relative', marginBottom: '16px' }}
                    >
                        <Search
                            size={15}
                            style={{
                                position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)',
                                color: searchQuery ? GOLD_LIGHT : 'rgba(255,255,255,0.3)',
                                transition: 'color 0.2s ease',
                            }}
                        />
                        <input
                            type="text"
                            placeholder="Search by name, email, business type..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            style={{
                                width: '100%', padding: '10px 14px 10px 40px',
                                borderRadius: '12px', fontSize: '13px', fontWeight: 500,
                                background: 'rgba(255,255,255,0.04)',
                                border: `1px solid ${searchQuery ? GOLD_BORDER : GLASS_BORDER}`,
                                color: '#fff', outline: 'none',
                                transition: 'all 0.2s ease',
                            }}
                        />
                        {searchQuery && (
                            <button
                                onClick={() => setSearchQuery('')}
                                style={{
                                    position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)',
                                    background: 'rgba(255,255,255,0.08)', border: 'none',
                                    borderRadius: '50%', width: '22px', height: '22px',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    cursor: 'pointer', color: 'rgba(255,255,255,0.5)',
                                }}
                            >
                                <X size={12} />
                            </button>
                        )}
                    </motion.div>

                    {/* ── Sort Controls ───────────────────────── */}
                    <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1, duration: 0.4 }}
                        style={{ display: 'flex', gap: '8px', marginBottom: '20px' }}
                    >
                        {([
                            { key: 'date' as SortKey, label: 'Date' },
                            { key: 'name' as SortKey, label: 'Name' },
                            { key: 'status' as SortKey, label: 'Status' },
                        ]).map((item) => {
                            const active = sortKey === item.key;
                            return (
                                <button
                                    key={item.key}
                                    onClick={() => toggleSort(item.key)}
                                    style={{
                                        display: 'flex', alignItems: 'center', gap: '4px',
                                        padding: '5px 10px', borderRadius: '8px', fontSize: '11px', fontWeight: 500,
                                        border: 'none',
                                        background: active ? 'rgba(255,255,255,0.08)' : 'transparent',
                                        color: active ? '#fff' : 'rgba(255,255,255,0.4)',
                                        cursor: 'pointer', transition: 'all 0.2s ease',
                                    }}
                                >
                                    <ArrowUpDown size={10} />
                                    {item.label}
                                    {active && (sortDir === 'asc' ? ' ↑' : ' ↓')}
                                </button>
                            );
                        })}
                    </motion.div>

                    {/* ── Select All (bulk mode) ──────────────── */}
                    {bulkMode && sorted.length > 0 && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            style={{ marginBottom: '12px' }}
                        >
                            <button
                                onClick={toggleSelectAll}
                                style={{
                                    display: 'flex', alignItems: 'center', gap: '8px',
                                    padding: '8px 14px', borderRadius: '10px', fontSize: '12px', fontWeight: 600,
                                    background: 'rgba(255,255,255,0.04)', border: `1px solid ${GLASS_BORDER}`,
                                    color: 'rgba(255,255,255,0.6)', cursor: 'pointer', transition: 'all 0.2s ease',
                                }}
                            >
                                {(() => {
                                    const visibleIds = sorted.map((t) => t.id);
                                    const allSelected = visibleIds.length > 0 && visibleIds.every((id) => selectedIds.has(id));
                                    const someSelected = visibleIds.some((id) => selectedIds.has(id));
                                    if (allSelected) return <><CheckSquare size={14} color={GOLD_LIGHT} /> Deselect All</>;
                                    if (someSelected) return <><MinusSquare size={14} color={GOLD_LIGHT} /> Select All</>;
                                    return <><Square size={14} /> Select All</>;
                                })()}
                            </button>
                        </motion.div>
                    )}

                    {/* ── Loading / Empty ─────────────────────── */}
                    {loading && (
                        <motion.div
                            animate={{ opacity: [0.3, 1, 0.3] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                            style={{ textAlign: 'center', padding: '60px 0', color: GOLD_LIGHT, fontSize: '14px' }}
                        >
                            Loading requests...
                        </motion.div>
                    )}

                    {!loading && sorted.length === 0 && (
                        <div style={{ textAlign: 'center', padding: '60px 0', color: 'rgba(255,255,255,0.4)', fontSize: '14px' }}>
                            {filterStatus === 'all'
                                ? "No requests yet. They'll show up here when someone fills out the questionnaire."
                                : `No ${STATUS_CONFIG[filterStatus]?.label.toLowerCase()} requests.`}
                        </div>
                    )}

                    {/* ── Ticket Cards ────────────────────────── */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        <AnimatePresence>
                            {sorted.map((ticket, i) => {
                                const expanded = expandedId === ticket.id;
                                const sc = STATUS_CONFIG[ticket.status] || STATUS_CONFIG.new;
                                const StatusIcon = sc.icon;

                                return (
                                    <motion.div
                                        key={ticket.id}
                                        initial={{ opacity: 0, y: 12 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -8 }}
                                        transition={{ delay: i * 0.03, duration: 0.4 }}
                                        style={{
                                            background: GLASS_BG,
                                            border: `1px solid ${GLASS_BORDER}`,
                                            borderRadius: '16px',
                                            overflow: 'hidden',
                                            backdropFilter: 'blur(20px)',
                                            WebkitBackdropFilter: 'blur(20px)',
                                        }}
                                    >
                                        {/* Card Header */}
                                        <div
                                            style={{
                                                width: '100%', display: 'flex', alignItems: 'center', gap: '0px',
                                                padding: '0', background: 'none',
                                            }}
                                        >
                                            {/* Bulk checkbox */}
                                            {bulkMode && (
                                                <button
                                                    onClick={(e) => { e.stopPropagation(); toggleSelect(ticket.id); }}
                                                    style={{
                                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                        width: '44px', flexShrink: 0, background: 'none',
                                                        border: 'none', cursor: 'pointer', padding: '16px 0 16px 16px',
                                                    }}
                                                >
                                                    {selectedIds.has(ticket.id)
                                                        ? <CheckSquare size={18} color={GOLD_LIGHT} />
                                                        : <Square size={18} color="rgba(255,255,255,0.25)" />
                                                    }
                                                </button>
                                            )}
                                            <button
                                                onClick={() => setExpandedId(expanded ? null : ticket.id)}
                                                style={{
                                                    flex: 1, display: 'flex', alignItems: 'center', gap: '14px',
                                                    padding: '16px 20px', background: 'none', border: 'none',
                                                    color: '#fff', cursor: 'pointer', textAlign: 'left',
                                                    paddingLeft: bulkMode ? '4px' : '20px',
                                                }}
                                            >
                                                <div style={{
                                                    width: '8px', height: '8px', borderRadius: '50%',
                                                    background: sc.color, flexShrink: 0,
                                                    boxShadow: `0 0 8px ${sc.color}40`,
                                                }} />
                                                <div style={{ flex: 1, minWidth: 0 }}>
                                                    <p style={{
                                                        fontSize: '14px', fontWeight: 600, marginBottom: '3px',
                                                        overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                                                    }}>
                                                        {ticket.name || 'Unnamed Request'}
                                                    </p>
                                                    <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)' }}>
                                                        {ticket.business_type || 'No type'} · {formatDate(ticket.created_at)}
                                                    </p>
                                                </div>
                                                <div style={{
                                                    display: 'flex', alignItems: 'center', gap: '5px',
                                                    fontSize: '11px', fontWeight: 600, color: sc.color,
                                                    background: sc.bg, padding: '4px 10px', borderRadius: '20px', flexShrink: 0,
                                                }}>
                                                    <StatusIcon size={10} />
                                                    {sc.label}
                                                </div>
                                                {expanded ? <ChevronUp size={14} color="rgba(255,255,255,0.3)" /> : <ChevronDown size={14} color="rgba(255,255,255,0.3)" />}
                                            </button>
                                        </div>

                                        {/* Expanded */}
                                        <AnimatePresence>
                                            {expanded && (
                                                <motion.div
                                                    initial={{ height: 0, opacity: 0 }}
                                                    animate={{ height: 'auto', opacity: 1 }}
                                                    exit={{ height: 0, opacity: 0 }}
                                                    transition={{ duration: 0.25 }}
                                                    style={{ overflow: 'hidden' }}
                                                >
                                                    <div style={{
                                                        padding: '0 20px 20px',
                                                        borderTop: `1px solid ${GLASS_BORDER}`,
                                                        paddingTop: '16px',
                                                    }}>
                                                        {/* Contact */}
                                                        <div style={{
                                                            display: 'grid',
                                                            gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
                                                            gap: '10px', marginBottom: '16px',
                                                        }}>
                                                            {ticket.phone && (
                                                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px' }}>
                                                                    <Phone size={13} color={GOLD_LIGHT} />
                                                                    <span style={{ color: 'rgba(255,255,255,0.8)' }}>{ticket.phone}</span>
                                                                </div>
                                                            )}
                                                            {ticket.email && (
                                                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px' }}>
                                                                    <Mail size={13} color={GOLD_LIGHT} />
                                                                    <span style={{ color: 'rgba(255,255,255,0.8)' }}>{ticket.email}</span>
                                                                </div>
                                                            )}
                                                        </div>

                                                        {/* Answers */}
                                                        <div style={{
                                                            display: 'grid',
                                                            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                                                            gap: '10px', marginBottom: '16px',
                                                        }}>
                                                            {[
                                                                { label: 'Business Type', value: ticket.business_type, icon: Briefcase },
                                                                { label: 'Aesthetic', value: ticket.aesthetic_vibe, icon: Palette },
                                                                { label: 'Website', value: ticket.current_website, icon: Globe },
                                                                { label: 'Timeline', value: ticket.timeline, icon: Clock },
                                                                { label: 'Priority', value: ticket.top_priority, icon: Target },
                                                                { label: 'Services', value: ticket.services?.join(', '), icon: Layers },
                                                            ].filter((r) => r.value).map((row) => (
                                                                <div key={row.label} style={{
                                                                    background: 'rgba(255,255,255,0.03)',
                                                                    borderRadius: '10px', padding: '10px 12px',
                                                                }}>
                                                                    <div style={{
                                                                        display: 'flex', alignItems: 'center', gap: '6px',
                                                                        fontSize: '10px', fontWeight: 600, letterSpacing: '0.06em',
                                                                        color: 'rgba(255,255,255,0.35)', marginBottom: '4px',
                                                                        textTransform: 'uppercase',
                                                                    }}>
                                                                        <row.icon size={10} />
                                                                        {row.label}
                                                                    </div>
                                                                    <p style={{ fontSize: '13px', fontWeight: 500, color: '#fff' }}>
                                                                        {row.value}
                                                                    </p>
                                                                </div>
                                                            ))}
                                                        </div>

                                                        {/* Actions */}
                                                        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
                                                            <select
                                                                value={ticket.status}
                                                                onChange={(e) => updateStatus(ticket.id, e.target.value)}
                                                                style={{
                                                                    padding: '6px 12px', borderRadius: '8px', fontSize: '12px', fontWeight: 500,
                                                                    background: 'rgba(255,255,255,0.06)', border: `1px solid ${GLASS_BORDER}`,
                                                                    color: '#fff', cursor: 'pointer', outline: 'none',
                                                                }}
                                                            >
                                                                <option value="new" style={{ background: '#1a1a2e' }}>⦿ New</option>
                                                                <option value="in_progress" style={{ background: '#1a1a2e' }}>⏳ In Progress</option>
                                                                <option value="done" style={{ background: '#1a1a2e' }}>✓ Done</option>
                                                                <option value="archived" style={{ background: '#1a1a2e' }}>📦 Archived</option>
                                                            </select>
                                                            <button
                                                                onClick={() => copySummary(ticket)}
                                                                style={{
                                                                    display: 'flex', alignItems: 'center', gap: '5px',
                                                                    padding: '6px 12px', borderRadius: '8px', fontSize: '12px', fontWeight: 500,
                                                                    background: 'rgba(255,255,255,0.06)', border: `1px solid ${GLASS_BORDER}`,
                                                                    color: 'rgba(255,255,255,0.7)', cursor: 'pointer', transition: 'all 0.2s ease',
                                                                }}
                                                            >
                                                                {copiedId === ticket.id
                                                                    ? <><CheckCheck size={12} /> Copied!</>
                                                                    : <><Copy size={12} /> Copy Summary</>
                                                                }
                                                            </button>
                                                        </div>
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </motion.div>
                                );
                            })}
                        </AnimatePresence>
                    </div>

                    <div style={{ height: bulkMode ? '120px' : '60px' }} />
                </div>

                {/* ── Floating Bulk Action Bar ─────────────── */}
                <AnimatePresence>
                    {bulkMode && selectedIds.size > 0 && (
                        <motion.div
                            initial={{ y: 80, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: 80, opacity: 0 }}
                            transition={{ type: 'spring', damping: 22, stiffness: 300 }}
                            style={{
                                position: 'fixed', bottom: '24px', left: '50%', transform: 'translateX(-50%)',
                                display: 'flex', alignItems: 'center', gap: '12px',
                                padding: '12px 20px', borderRadius: '16px',
                                background: 'rgba(12, 12, 20, 0.85)', backdropFilter: 'blur(24px)',
                                WebkitBackdropFilter: 'blur(24px)',
                                border: `1px solid ${GOLD_BORDER}`, boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
                                zIndex: 100,
                            }}
                        >
                            <span style={{ fontSize: '13px', fontWeight: 600, color: GOLD_LIGHT, whiteSpace: 'nowrap' }}>
                                {selectedIds.size} selected
                            </span>
                            <div style={{ width: '1px', height: '20px', background: 'rgba(255,255,255,0.1)' }} />
                            <select
                                defaultValue=""
                                onChange={(e) => { if (e.target.value) { bulkUpdateStatus(e.target.value); e.target.value = ''; } }}
                                disabled={bulkUpdating}
                                style={{
                                    padding: '6px 12px', borderRadius: '8px', fontSize: '12px', fontWeight: 500,
                                    background: 'rgba(255,255,255,0.08)', border: `1px solid ${GLASS_BORDER}`,
                                    color: '#fff', cursor: 'pointer', outline: 'none',
                                }}
                            >
                                <option value="" disabled style={{ background: '#1a1a2e' }}>Change Status</option>
                                <option value="new" style={{ background: '#1a1a2e' }}>⦿ New</option>
                                <option value="in_progress" style={{ background: '#1a1a2e' }}>⏳ In Progress</option>
                                <option value="done" style={{ background: '#1a1a2e' }}>✓ Done</option>
                                <option value="archived" style={{ background: '#1a1a2e' }}>📦 Archived</option>
                            </select>
                            <button
                                onClick={() => setShowDeleteConfirm(true)}
                                disabled={bulkUpdating}
                                style={{
                                    display: 'flex', alignItems: 'center', gap: '6px',
                                    padding: '6px 14px', borderRadius: '8px', fontSize: '12px', fontWeight: 600,
                                    background: 'rgba(255, 69, 58, 0.15)', border: '1px solid rgba(255, 69, 58, 0.3)',
                                    color: '#ff453a', cursor: 'pointer', transition: 'all 0.2s ease',
                                }}
                            >
                                <Trash2 size={13} />
                                Delete
                            </button>
                            <button
                                onClick={() => setSelectedIds(new Set())}
                                style={{
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    width: '28px', height: '28px', borderRadius: '8px',
                                    background: 'rgba(255,255,255,0.06)', border: 'none',
                                    color: 'rgba(255,255,255,0.5)', cursor: 'pointer', transition: 'all 0.2s ease',
                                }}
                            >
                                <X size={14} />
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* ── Delete Confirmation Modal ────────────── */}
                <AnimatePresence>
                    {showDeleteConfirm && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            style={{
                                position: 'fixed', inset: 0, zIndex: 200,
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)',
                                WebkitBackdropFilter: 'blur(8px)',
                            }}
                            onClick={() => !bulkUpdating && setShowDeleteConfirm(false)}
                        >
                            <motion.div
                                initial={{ scale: 0.92, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0.92, opacity: 0 }}
                                transition={{ type: 'spring', damping: 24, stiffness: 300 }}
                                onClick={(e) => e.stopPropagation()}
                                style={{
                                    width: '100%', maxWidth: '380px', margin: '0 20px',
                                    background: 'rgba(18, 18, 28, 0.95)', borderRadius: '20px',
                                    border: `1px solid rgba(255, 69, 58, 0.2)`,
                                    padding: '28px', textAlign: 'center',
                                    boxShadow: '0 20px 60px rgba(0,0,0,0.6)',
                                }}
                            >
                                <div style={{
                                    width: '48px', height: '48px', borderRadius: '50%',
                                    background: 'rgba(255, 69, 58, 0.12)', display: 'flex',
                                    alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px',
                                }}>
                                    <Trash2 size={22} color="#ff453a" />
                                </div>
                                <h3 style={{ fontSize: '17px', fontWeight: 700, marginBottom: '8px', color: '#fff' }}>
                                    Delete {selectedIds.size} ticket{selectedIds.size !== 1 ? 's' : ''}?
                                </h3>
                                <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.5)', marginBottom: '24px', lineHeight: 1.5 }}>
                                    This action cannot be undone. The selected ticket{selectedIds.size !== 1 ? 's' : ''} will be permanently removed.
                                </p>
                                <div style={{ display: 'flex', gap: '10px' }}>
                                    <button
                                        onClick={() => setShowDeleteConfirm(false)}
                                        disabled={bulkUpdating}
                                        style={{
                                            flex: 1, padding: '10px', borderRadius: '10px', fontSize: '13px', fontWeight: 600,
                                            background: 'rgba(255,255,255,0.08)', border: `1px solid ${GLASS_BORDER}`,
                                            color: '#fff', cursor: 'pointer', transition: 'all 0.2s ease',
                                        }}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={bulkDelete}
                                        disabled={bulkUpdating}
                                        style={{
                                            flex: 1, padding: '10px', borderRadius: '10px', fontSize: '13px', fontWeight: 600,
                                            background: 'rgba(255, 69, 58, 0.2)', border: '1px solid rgba(255, 69, 58, 0.4)',
                                            color: '#ff453a', cursor: 'pointer', transition: 'all 0.2s ease',
                                        }}
                                    >
                                        {bulkUpdating ? 'Deleting...' : 'Delete'}
                                    </button>
                                </div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
