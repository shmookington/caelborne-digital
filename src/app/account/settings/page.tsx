'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CosmicBackground } from '@/components/CosmicBackground';
import {
    ArrowLeft, Shield, Eye, EyeOff, Lock, Mail, User, Bell, Palette, Save, Check,
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

interface SettingCardProps {
    icon: React.ReactNode;
    title: string;
    desc: string;
    children: React.ReactNode;
    delay?: number;
}

function SettingCard({ icon, title, desc, children, delay = 0 }: SettingCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay, duration: 0.5 }}
            style={{
                background: GLASS_BG,
                border: `1px solid ${GLASS_BORDER}`,
                borderRadius: '16px',
                padding: '24px',
                marginBottom: '16px',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
            }}
        >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                <div style={{
                    width: '36px', height: '36px', borderRadius: '10px',
                    background: GOLD_DIM, border: `1px solid ${GOLD_BORDER}`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                }}>
                    {icon}
                </div>
                <div>
                    <p style={{ fontSize: '15px', fontWeight: 600, color: '#fff' }}>{title}</p>
                    <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)' }}>{desc}</p>
                </div>
            </div>
            {children}
        </motion.div>
    );
}

function ToggleSwitch({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) {
    return (
        <button
            type="button"
            onClick={() => onChange(!checked)}
            style={{
                width: '44px', height: '24px', borderRadius: '12px', border: 'none', cursor: 'pointer',
                background: checked ? GOLD : 'rgba(255,255,255,0.12)', position: 'relative',
                transition: 'background 0.25s ease', flexShrink: 0,
            }}
        >
            <div style={{
                width: '18px', height: '18px', borderRadius: '50%', background: '#fff',
                position: 'absolute', top: '3px', transition: 'left 0.25s ease',
                left: checked ? '23px' : '3px',
                boxShadow: '0 1px 3px rgba(0,0,0,0.3)',
            }} />
        </button>
    );
}

function SettingRow({ label, children }: { label: string; children: React.ReactNode }) {
    return (
        <div style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            padding: '12px 0', borderTop: `1px solid ${GLASS_BORDER}`,
        }}>
            <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.7)' }}>{label}</span>
            {children}
        </div>
    );
}

export default function SettingsPage() {
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [saved, setSaved] = useState(false);
    const [displayName, setDisplayName] = useState('');
    const [darkMode, setDarkMode] = useState(true);
    const [emailNotifs, setEmailNotifs] = useState(true);
    const [pushNotifs, setPushNotifs] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const getUser = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            if (!session?.user) { router.push('/signin'); return; }
            setUser(session.user);
            setDisplayName(session.user.user_metadata?.full_name || session.user.email?.split('@')[0] || '');
            setLoading(false);
        };
        getUser();
    }, [router]);

    const handleSave = async () => {
        const { error } = await supabase.auth.updateUser({
            data: { full_name: displayName },
        });
        if (!error) {
            setSaved(true);
            setTimeout(() => setSaved(false), 2000);
        }
    };

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

                    {/* Title */}
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        style={{ fontSize: '26px', fontWeight: 700, letterSpacing: '-0.02em', marginBottom: '28px' }}
                    >
                        Settings
                    </motion.h1>

                    {/* Profile */}
                    <SettingCard icon={<User size={16} color={GOLD_LIGHT} />} title="Profile" desc="Manage your display name" delay={0.05}>
                        <div style={{ position: 'relative' }}>
                            <input
                                type="text" value={displayName} onChange={(e) => setDisplayName(e.target.value)}
                                placeholder="Display name"
                                style={{
                                    width: '100%', padding: '12px 16px', borderRadius: '10px', border: `1px solid ${GLASS_BORDER}`,
                                    background: 'rgba(255,255,255,0.04)', color: '#fff', fontSize: '14px', outline: 'none',
                                    fontFamily: 'inherit', boxSizing: 'border-box',
                                }}
                                onFocus={(e) => { e.currentTarget.style.borderColor = GOLD_BORDER; }}
                                onBlur={(e) => { e.currentTarget.style.borderColor = GLASS_BORDER; }}
                            />
                        </div>
                        <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.35)', marginTop: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <Mail size={11} /> {user?.email}
                        </p>
                    </SettingCard>

                    {/* Notifications */}
                    <SettingCard icon={<Bell size={16} color={GOLD_LIGHT} />} title="Notifications" desc="Choose how you get updates" delay={0.1}>
                        <SettingRow label="Email notifications">
                            <ToggleSwitch checked={emailNotifs} onChange={setEmailNotifs} />
                        </SettingRow>
                        <SettingRow label="Push notifications">
                            <ToggleSwitch checked={pushNotifs} onChange={setPushNotifs} />
                        </SettingRow>
                    </SettingCard>

                    {/* Appearance */}
                    <SettingCard icon={<Palette size={16} color={GOLD_LIGHT} />} title="Appearance" desc="Customize your view" delay={0.15}>
                        <SettingRow label="Dark mode">
                            <ToggleSwitch checked={darkMode} onChange={setDarkMode} />
                        </SettingRow>
                    </SettingCard>

                    {/* Security */}
                    <SettingCard icon={<Lock size={16} color={GOLD_LIGHT} />} title="Security" desc="Password & authentication" delay={0.2}>
                        <button
                            onClick={async () => {
                                if (user?.email) {
                                    await supabase.auth.resetPasswordForEmail(user.email, {
                                        redirectTo: `${window.location.origin}/account/settings`,
                                    });
                                    alert('Password reset email sent!');
                                }
                            }}
                            style={{
                                width: '100%', padding: '12px', borderRadius: '10px', cursor: 'pointer',
                                background: 'rgba(255,255,255,0.04)', border: `1px solid ${GLASS_BORDER}`,
                                color: 'rgba(255,255,255,0.7)', fontSize: '13px', fontWeight: 500,
                                fontFamily: 'inherit', transition: 'all 0.2s ease', display: 'flex',
                                alignItems: 'center', justifyContent: 'center', gap: '8px',
                            }}
                            onMouseEnter={(e) => { e.currentTarget.style.borderColor = GOLD_BORDER; e.currentTarget.style.color = GOLD_LIGHT; }}
                            onMouseLeave={(e) => { e.currentTarget.style.borderColor = GLASS_BORDER; e.currentTarget.style.color = 'rgba(255,255,255,0.7)'; }}
                        >
                            <Lock size={13} /> Reset Password
                        </button>
                    </SettingCard>

                    {/* Save */}
                    <motion.button
                        onClick={handleSave}
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.98 }}
                        initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.25, duration: 0.5 }}
                        style={{
                            width: '100%', padding: '16px', borderRadius: '14px', cursor: 'pointer',
                            background: `linear-gradient(135deg, ${GOLD} 0%, ${GOLD_LIGHT} 100%)`,
                            border: 'none', color: '#0a0a14', fontSize: '15px', fontWeight: 700,
                            fontFamily: 'inherit', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                            boxShadow: '0 8px 30px rgba(197, 160, 68, 0.25)',
                        }}
                    >
                        {saved ? <><Check size={16} /> Saved!</> : <><Save size={16} /> Save Changes</>}
                    </motion.button>

                    <div style={{ height: '60px' }} />
                </div>
            </div>
        </div>
    );
}
