'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CosmicBackground } from '@/components/CosmicBackground';
import {
    User,
    Mail,
    Calendar,
    Shield,
    LogOut,
    ChevronRight,
    FolderKanban,
    FileText,
    PhoneCall,
    MessageSquare,
    ShoppingBag,
    Settings,
    Bell,
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { isAdmin as checkAdmin } from '@/lib/isAdmin';
import { Outfit } from 'next/font/google';

const outfit = Outfit({ subsets: ['latin'] });

// ─── Design Tokens ──────────────────────────────────────────────

const GOLD = '#C5A044';
const GOLD_LIGHT = '#DAC06A';
const GOLD_DIM = 'rgba(197, 160, 68, 0.15)';
const GOLD_BORDER = 'rgba(197, 160, 68, 0.3)';
const GLASS_BG = 'rgba(12, 12, 20, 0.55)';
const GLASS_BORDER = 'rgba(255, 255, 255, 0.06)';

// ─── Page ───────────────────────────────────────────────────────

export default function AccountPage() {
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const getUser = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            if (!session?.user) {
                router.push('/signin');
                return;
            }
            setUser(session.user);
            setLoading(false);
        };
        getUser();
    }, [router]);

    const handleSignOut = async () => {
        await supabase.auth.signOut();
        router.push('/');
    };

    const formatDate = (dateStr: string) => {
        return new Date(dateStr).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    if (loading) {
        return (
            <div className={outfit.className}>
                <CosmicBackground />
                <div style={{
                    minHeight: '100vh',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative',
                    zIndex: 10,
                }}>
                    <motion.div
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        style={{ color: GOLD_LIGHT, fontSize: '14px', fontWeight: 500 }}
                    >
                        Loading...
                    </motion.div>
                </div>
            </div>
        );
    }

    const userIsAdmin = checkAdmin(user?.email);

    const menuSections = userIsAdmin
        ? [
            {
                title: 'ADMIN',
                items: [
                    { label: 'Admin Panel', icon: Shield, href: '/admin', desc: 'Overview & analytics' },
                    { label: 'Requests', icon: ShoppingBag, href: '/admin/requests', desc: 'Manage client inquiries' },
                ],
            },
            {
                title: 'PREFERENCES',
                items: [
                    { label: 'Notifications', icon: Bell, href: '/account/notifications', desc: 'Manage alerts' },
                    { label: 'Settings', icon: Settings, href: '/account/settings', desc: 'App preferences' },
                ],
            },
        ]
        : [
            {
                title: 'MY PROJECT',
                items: [
                    { label: 'Project Dashboard', icon: FolderKanban, href: '/dashboard', desc: 'Track your project progress' },
                    { label: 'Documents', icon: FileText, href: '/dashboard/customers', desc: 'Files & deliverables' },
                    { label: 'Schedule a Call', icon: PhoneCall, href: '/account/schedule', desc: 'Book a meeting with our team' },
                ],
            },
            {
                title: 'SUPPORT',
                items: [
                    { label: 'Contact Us', icon: MessageSquare, href: '/guap/contact', desc: 'Reach the Caelborne team' },
                    { label: 'Notifications', icon: Bell, href: '/account/notifications', desc: 'Manage alerts' },
                    { label: 'Settings', icon: Settings, href: '/account/settings', desc: 'Account preferences' },
                ],
            },
        ];

    return (
        <div className={outfit.className}>
            <CosmicBackground />

            <div style={{
                minHeight: '100vh',
                position: 'relative',
                zIndex: 10,
                color: '#fff',
                padding: '24px',
                paddingTop: '100px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textShadow: '0 2px 8px rgba(0,0,0,0.5)',
            }}>

                <div style={{ width: '100%', maxWidth: '520px' }}>

                    {/* ── Profile Header ────────────────────── */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            marginBottom: '36px',
                        }}
                    >
                        {/* Avatar */}
                        <div style={{
                            width: '80px',
                            height: '80px',
                            borderRadius: '50%',
                            background: `linear-gradient(135deg, ${GOLD} 0%, ${GOLD_LIGHT} 100%)`,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginBottom: '16px',
                            boxShadow: `0 8px 30px rgba(197, 160, 68, 0.3)`,
                        }}>
                            <User size={32} color="#0a0a14" strokeWidth={1.5} />
                        </div>

                        {/* Name / Email */}
                        <h1 style={{
                            fontSize: '22px',
                            fontWeight: 700,
                            letterSpacing: '-0.02em',
                            marginBottom: '6px',
                        }}>
                            {user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'User'}
                        </h1>
                        <p style={{
                            fontSize: '13px',
                            color: 'rgba(255,255,255,0.5)',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px',
                        }}>
                            <Mail size={12} />
                            {user?.email}
                        </p>
                    </motion.div>

                    {/* ── Info Card ──────────────────────────── */}
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1, duration: 0.5 }}
                        style={{
                            background: GLASS_BG,
                            border: `1px solid ${GLASS_BORDER}`,
                            borderRadius: '16px',
                            padding: '20px',
                            marginBottom: '24px',
                            backdropFilter: 'blur(20px)',
                            WebkitBackdropFilter: 'blur(20px)',
                        }}
                    >
                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                        }}>
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '10px',
                                fontSize: '13px',
                                color: 'rgba(255,255,255,0.5)',
                            }}>
                                <Calendar size={14} color={GOLD_LIGHT} />
                                Member since {user?.created_at ? formatDate(user.created_at) : '—'}
                            </div>
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '6px',
                                fontSize: '12px',
                                color: GOLD_LIGHT,
                                background: GOLD_DIM,
                                padding: '4px 10px',
                                borderRadius: '20px',
                                border: `1px solid ${GOLD_BORDER}`,
                            }}>
                                <Shield size={11} />
                                {userIsAdmin ? 'Admin' : 'Verified'}
                            </div>
                        </div>
                    </motion.div>

                    {/* ── Menu Sections ──────────────────────── */}
                    {menuSections.map((section, sIdx) => (
                        <motion.div
                            key={section.title}
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.15 + sIdx * 0.08, duration: 0.5 }}
                            style={{ marginBottom: '24px' }}
                        >
                            <p style={{
                                fontSize: '11px',
                                fontWeight: 600,
                                letterSpacing: '0.1em',
                                color: GOLD_LIGHT,
                                marginBottom: '10px',
                                paddingLeft: '4px',
                                textShadow: 'none',
                            }}>
                                {section.title}
                            </p>

                            <div style={{
                                background: GLASS_BG,
                                border: `1px solid ${GLASS_BORDER}`,
                                borderRadius: '16px',
                                overflow: 'hidden',
                                backdropFilter: 'blur(20px)',
                                WebkitBackdropFilter: 'blur(20px)',
                            }}>
                                {section.items.map((item, i) => (
                                    <Link
                                        key={item.label}
                                        href={item.href}
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '14px',
                                            padding: '16px 20px',
                                            textDecoration: 'none',
                                            color: '#fff',
                                            transition: 'background 0.2s ease',
                                            borderTop: i > 0 ? `1px solid ${GLASS_BORDER}` : 'none',
                                        }}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.background = 'rgba(255,255,255,0.04)';
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.background = 'transparent';
                                        }}
                                    >
                                        <div style={{
                                            width: '36px',
                                            height: '36px',
                                            borderRadius: '10px',
                                            background: GOLD_DIM,
                                            border: `1px solid ${GOLD_BORDER}`,
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            flexShrink: 0,
                                        }}>
                                            <item.icon size={16} color={GOLD_LIGHT} />
                                        </div>
                                        <div style={{ flex: 1 }}>
                                            <p style={{
                                                fontSize: '14px',
                                                fontWeight: 600,
                                                marginBottom: '2px',
                                                textShadow: 'none',
                                            }}>
                                                {item.label}
                                            </p>
                                            <p style={{
                                                fontSize: '12px',
                                                color: 'rgba(255,255,255,0.4)',
                                                textShadow: 'none',
                                            }}>
                                                {item.desc}
                                            </p>
                                        </div>
                                        <ChevronRight size={14} color="rgba(255,255,255,0.2)" />
                                    </Link>
                                ))}
                            </div>
                        </motion.div>
                    ))}

                    {/* ── Sign Out ───────────────────────────── */}
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.35, duration: 0.5 }}
                    >
                        <motion.button
                            onClick={handleSignOut}
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.98 }}
                            style={{
                                width: '100%',
                                padding: '16px',
                                borderRadius: '16px',
                                background: GLASS_BG,
                                border: `1px solid ${GLASS_BORDER}`,
                                color: '#ff6b6b',
                                fontSize: '14px',
                                fontWeight: 600,
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '8px',
                                backdropFilter: 'blur(20px)',
                                WebkitBackdropFilter: 'blur(20px)',
                                transition: 'background 0.2s ease',
                                textShadow: 'none',
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.background = 'rgba(255, 107, 107, 0.08)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.background = GLASS_BG;
                            }}
                        >
                            <LogOut size={15} />
                            Sign Out
                        </motion.button>
                    </motion.div>

                    {/* Spacer */}
                    <div style={{ height: '60px' }} />
                </div>
            </div>
        </div>
    );
}
