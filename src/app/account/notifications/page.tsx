'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CosmicBackground } from '@/components/CosmicBackground';
import {
    ArrowLeft, Bell, BellOff, CheckCheck, Clock, Info, AlertTriangle, Sparkles, Trash2,
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { Outfit } from 'next/font/google';

const outfit = Outfit({ subsets: ['latin'] });

const GOLD = '#C5A044';
const GOLD_LIGHT = '#DAC06A';
const GOLD_DIM = 'rgba(197, 160, 68, 0.15)';
const GOLD_BORDER = 'rgba(197, 160, 68, 0.3)';
const GLASS_BG = 'rgba(12, 12, 20, 0.55)';
const GLASS_BORDER = 'rgba(255, 255, 255, 0.06)';

interface Notification {
    id: string;
    type: 'info' | 'success' | 'warning' | 'update';
    title: string;
    message: string;
    time: string;
    read: boolean;
}

const MOCK_NOTIFICATIONS: Notification[] = [
    {
        id: '1', type: 'success', title: 'Welcome to Caelborne!',
        message: 'Your account has been created successfully. Explore your dashboard to get started.',
        time: 'Just now', read: false,
    },
    {
        id: '2', type: 'info', title: 'Project Dashboard Available',
        message: 'Track your project milestones and deliverables from your dashboard.',
        time: '1 hour ago', read: false,
    },
    {
        id: '3', type: 'update', title: 'New Features Coming Soon',
        message: 'We\'re working on document sharing, real-time chat, and scheduling features.',
        time: '2 hours ago', read: true,
    },
];

const TYPE_ICONS: Record<string, React.ReactNode> = {
    info: <Info size={16} color="#60a5fa" />,
    success: <CheckCheck size={16} color="#4ade80" />,
    warning: <AlertTriangle size={16} color="#fbbf24" />,
    update: <Sparkles size={16} color={GOLD_LIGHT} />,
};

const TYPE_COLORS: Record<string, string> = {
    info: 'rgba(96, 165, 250, 0.12)',
    success: 'rgba(74, 222, 128, 0.12)',
    warning: 'rgba(251, 191, 36, 0.12)',
    update: GOLD_DIM,
};

export default function NotificationsPage() {
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [notifications, setNotifications] = useState<Notification[]>(MOCK_NOTIFICATIONS);
    const router = useRouter();

    useEffect(() => {
        const getUser = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            if (!session?.user) { router.push('/signin'); return; }
            setUser(session.user);
            setLoading(false);
        };
        getUser();
    }, [router]);

    const markAllRead = () => {
        setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    };

    const dismissNotification = (id: string) => {
        setNotifications((prev) => prev.filter((n) => n.id !== id));
    };

    const unreadCount = notifications.filter((n) => !n.read).length;

    if (loading) {
        return (
            <div className={outfit.className}>
                <CosmicBackground />
                <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', zIndex: 10 }}>
                    <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1.5, repeat: Infinity }}
                        style={{ color: GOLD_LIGHT, fontSize: '14px', fontWeight: 500 }}>Loading...</motion.div>
                </div>
            </div>
        );
    }

    return (
        <div className={outfit.className}>
            <CosmicBackground />
            <div style={{
                minHeight: '100vh', position: 'relative', zIndex: 10, color: '#fff',
                padding: '24px', paddingTop: '100px', display: 'flex', flexDirection: 'column', alignItems: 'center',
            }}>
                <div style={{ width: '100%', maxWidth: '520px' }}>

                    {/* Back */}
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
                        <Link href="/account" style={{
                            display: 'inline-flex', alignItems: 'center', gap: '6px',
                            color: GOLD_LIGHT, fontSize: '13px', textDecoration: 'none', marginBottom: '24px',
                        }}>
                            <ArrowLeft size={14} /> Back to Account
                        </Link>
                    </motion.div>

                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}
                    >
                        <div>
                            <h1 style={{ fontSize: '26px', fontWeight: 700, letterSpacing: '-0.02em' }}>Notifications</h1>
                            {unreadCount > 0 && (
                                <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.5)', marginTop: '4px' }}>
                                    {unreadCount} unread
                                </p>
                            )}
                        </div>
                        {unreadCount > 0 && (
                            <button
                                onClick={markAllRead}
                                style={{
                                    padding: '8px 14px', borderRadius: '10px', cursor: 'pointer',
                                    background: GOLD_DIM, border: `1px solid ${GOLD_BORDER}`,
                                    color: GOLD_LIGHT, fontSize: '12px', fontWeight: 600, fontFamily: 'inherit',
                                }}
                            >
                                Mark all read
                            </button>
                        )}
                    </motion.div>

                    {/* Notifications list */}
                    <AnimatePresence mode="popLayout">
                        {notifications.length === 0 ? (
                            <motion.div
                                key="empty"
                                initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                                style={{
                                    background: GLASS_BG, border: `1px solid ${GLASS_BORDER}`, borderRadius: '16px',
                                    padding: '48px 24px', textAlign: 'center', backdropFilter: 'blur(20px)',
                                }}
                            >
                                <BellOff size={32} color="rgba(255,255,255,0.2)" style={{ marginBottom: '12px' }} />
                                <p style={{ fontSize: '15px', fontWeight: 600, color: 'rgba(255,255,255,0.5)' }}>All caught up!</p>
                                <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.3)', marginTop: '4px' }}>No notifications right now.</p>
                            </motion.div>
                        ) : (
                            notifications.map((notif, i) => (
                                <motion.div
                                    key={notif.id}
                                    layout
                                    initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, x: -100, transition: { duration: 0.3 } }}
                                    transition={{ delay: i * 0.05, duration: 0.4 }}
                                    style={{
                                        background: GLASS_BG, border: `1px solid ${notif.read ? GLASS_BORDER : GOLD_BORDER}`,
                                        borderRadius: '14px', padding: '18px 20px', marginBottom: '10px',
                                        backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
                                        position: 'relative', overflow: 'hidden',
                                    }}
                                >
                                    {/* Unread indicator */}
                                    {!notif.read && (
                                        <div style={{
                                            position: 'absolute', top: '20px', left: '8px', width: '6px', height: '6px',
                                            borderRadius: '50%', background: GOLD_LIGHT,
                                        }} />
                                    )}

                                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px', paddingLeft: notif.read ? 0 : '10px' }}>
                                        <div style={{
                                            width: '36px', height: '36px', borderRadius: '10px', flexShrink: 0,
                                            background: TYPE_COLORS[notif.type], display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        }}>
                                            {TYPE_ICONS[notif.type]}
                                        </div>
                                        <div style={{ flex: 1 }}>
                                            <p style={{ fontSize: '14px', fontWeight: 600, marginBottom: '4px' }}>{notif.title}</p>
                                            <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.5)', lineHeight: 1.5 }}>{notif.message}</p>
                                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '10px' }}>
                                                <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.3)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                                    <Clock size={10} /> {notif.time}
                                                </span>
                                                <button
                                                    onClick={() => dismissNotification(notif.id)}
                                                    style={{
                                                        background: 'none', border: 'none', cursor: 'pointer',
                                                        color: 'rgba(255,255,255,0.25)', padding: '4px', display: 'flex',
                                                    }}
                                                    onMouseEnter={(e) => { e.currentTarget.style.color = '#ff6b6b'; }}
                                                    onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(255,255,255,0.25)'; }}
                                                >
                                                    <Trash2 size={13} />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))
                        )}
                    </AnimatePresence>

                    <div style={{ height: '60px' }} />
                </div>
            </div>
        </div>
    );
}
