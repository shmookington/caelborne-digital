'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CosmicBackground } from '@/components/CosmicBackground';
import {
    ArrowLeft, Calendar, Clock, Video, Phone, Mail, CheckCircle2, ChevronRight,
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

const TIME_SLOTS = [
    '9:00 AM', '10:00 AM', '11:00 AM',
    '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM',
];

const CALL_TYPES = [
    { id: 'video', label: 'Video Call', desc: '30 min · Google Meet', icon: Video },
    { id: 'phone', label: 'Phone Call', desc: '15 min · We\'ll call you', icon: Phone },
    { id: 'email', label: 'Email Follow-up', desc: 'We\'ll respond within 24h', icon: Mail },
];

export default function ScheduleCallPage() {
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [selectedType, setSelectedType] = useState<string | null>(null);
    const [selectedDay, setSelectedDay] = useState<number | null>(null);
    const [selectedTime, setSelectedTime] = useState<string | null>(null);
    const [submitted, setSubmitted] = useState(false);
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

    // Generate next 5 business days
    const getNextBusinessDays = () => {
        const days: Date[] = [];
        const current = new Date();
        while (days.length < 5) {
            current.setDate(current.getDate() + 1);
            const dow = current.getDay();
            if (dow !== 0 && dow !== 6) {
                days.push(new Date(current));
            }
        }
        return days;
    };

    const businessDays = getNextBusinessDays();

    const handleSubmit = async () => {
        if (!selectedType || selectedDay === null || !selectedTime) return;

        const day = businessDays[selectedDay];
        const callType = CALL_TYPES.find((t) => t.id === selectedType);

        // Insert into tickets table as a scheduling request
        await supabase.from('tickets').insert([{
            name: user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'Client',
            email: user?.email,
            phone: null,
            business_type: 'Scheduled Call',
            summary: `Call Request: ${callType?.label} on ${day.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })} at ${selectedTime}`,
            status: 'new',
        }]);

        // Fire email notification (non-blocking)
        fetch('/api/notify', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'Client',
                email: user?.email,
                businessType: 'Scheduled Call',
                summary: `${callType?.label} on ${day.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })} at ${selectedTime}`,
                source: 'schedule',
            }),
        }).catch(() => { });

        setSubmitted(true);
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

    if (submitted) {
        return (
            <div className={outfit.className}>
                <CosmicBackground />
                <div style={{
                    minHeight: '100vh', position: 'relative', zIndex: 10, color: '#fff',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column',
                    padding: '24px', textAlign: 'center',
                }}>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, type: 'spring' }}
                    >
                        <div style={{
                            width: '72px', height: '72px', borderRadius: '50%',
                            background: 'rgba(74, 222, 128, 0.12)', display: 'flex',
                            alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px',
                        }}>
                            <CheckCircle2 size={32} color="#4ade80" />
                        </div>
                        <h1 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '8px' }}>You&apos;re Booked!</h1>
                        <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.5)', marginBottom: '28px', maxWidth: '320px' }}>
                            We&apos;ll confirm your {CALL_TYPES.find((t) => t.id === selectedType)?.label?.toLowerCase()} via email shortly.
                        </p>
                        <Link href="/account" style={{
                            display: 'inline-flex', alignItems: 'center', gap: '6px',
                            color: GOLD_LIGHT, fontSize: '13px', textDecoration: 'none',
                        }}>
                            <ArrowLeft size={14} /> Back to Account
                        </Link>
                    </motion.div>
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
                    <motion.div
                        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        style={{ marginBottom: '28px' }}
                    >
                        <h1 style={{ fontSize: '26px', fontWeight: 700, letterSpacing: '-0.02em' }}>Schedule a Call</h1>
                        <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.5)', marginTop: '6px' }}>
                            Pick a time that works for you — we&apos;ll handle the rest.
                        </p>
                    </motion.div>

                    {/* Step 1: Call Type */}
                    <motion.div
                        initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.05, duration: 0.5 }}
                        style={{ marginBottom: '20px' }}
                    >
                        <p style={{ fontSize: '12px', fontWeight: 600, letterSpacing: '0.08em', color: GOLD_LIGHT, marginBottom: '10px', paddingLeft: '2px' }}>
                            HOW WOULD YOU LIKE TO CONNECT?
                        </p>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                            {CALL_TYPES.map((type) => {
                                const Icon = type.icon;
                                const active = selectedType === type.id;
                                return (
                                    <button
                                        key={type.id}
                                        onClick={() => setSelectedType(type.id)}
                                        style={{
                                            width: '100%', padding: '16px 18px', borderRadius: '12px', cursor: 'pointer',
                                            background: active ? GOLD_DIM : GLASS_BG,
                                            border: `1px solid ${active ? GOLD_BORDER : GLASS_BORDER}`,
                                            color: '#fff', display: 'flex', alignItems: 'center', gap: '14px',
                                            fontFamily: 'inherit', textAlign: 'left',
                                            backdropFilter: 'blur(20px)', transition: 'all 0.2s ease',
                                        }}
                                    >
                                        <div style={{
                                            width: '38px', height: '38px', borderRadius: '10px', flexShrink: 0,
                                            background: active ? 'rgba(197, 160, 68, 0.2)' : 'rgba(255,255,255,0.04)',
                                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        }}>
                                            <Icon size={18} color={active ? GOLD_LIGHT : 'rgba(255,255,255,0.5)'} />
                                        </div>
                                        <div style={{ flex: 1 }}>
                                            <p style={{ fontSize: '14px', fontWeight: 600, marginBottom: '2px' }}>{type.label}</p>
                                            <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)' }}>{type.desc}</p>
                                        </div>
                                        {active && <CheckCircle2 size={18} color={GOLD_LIGHT} />}
                                    </button>
                                );
                            })}
                        </div>
                    </motion.div>

                    {/* Step 2: Pick a Day */}
                    {selectedType && selectedType !== 'email' && (
                        <motion.div
                            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4 }}
                            style={{ marginBottom: '20px' }}
                        >
                            <p style={{ fontSize: '12px', fontWeight: 600, letterSpacing: '0.08em', color: GOLD_LIGHT, marginBottom: '10px', paddingLeft: '2px' }}>
                                PICK A DAY
                            </p>
                            <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '4px' }}>
                                {businessDays.map((day, i) => {
                                    const active = selectedDay === i;
                                    return (
                                        <button
                                            key={i}
                                            onClick={() => setSelectedDay(i)}
                                            style={{
                                                flex: '0 0 auto', padding: '14px 16px', borderRadius: '12px', cursor: 'pointer',
                                                background: active ? GOLD_DIM : GLASS_BG,
                                                border: `1px solid ${active ? GOLD_BORDER : GLASS_BORDER}`,
                                                color: '#fff', fontFamily: 'inherit', textAlign: 'center',
                                                minWidth: '72px', transition: 'all 0.2s ease', backdropFilter: 'blur(20px)',
                                            }}
                                        >
                                            <p style={{ fontSize: '11px', color: active ? GOLD_LIGHT : 'rgba(255,255,255,0.4)', fontWeight: 600, marginBottom: '4px' }}>
                                                {day.toLocaleDateString('en-US', { weekday: 'short' }).toUpperCase()}
                                            </p>
                                            <p style={{ fontSize: '18px', fontWeight: 700 }}>{day.getDate()}</p>
                                            <p style={{ fontSize: '10px', color: 'rgba(255,255,255,0.35)' }}>
                                                {day.toLocaleDateString('en-US', { month: 'short' })}
                                            </p>
                                        </button>
                                    );
                                })}
                            </div>
                        </motion.div>
                    )}

                    {/* Step 3: Pick a Time */}
                    {selectedType && selectedType !== 'email' && selectedDay !== null && (
                        <motion.div
                            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4 }}
                            style={{ marginBottom: '28px' }}
                        >
                            <p style={{ fontSize: '12px', fontWeight: 600, letterSpacing: '0.08em', color: GOLD_LIGHT, marginBottom: '10px', paddingLeft: '2px' }}>
                                CHOOSE A TIME
                            </p>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(110px, 1fr))', gap: '8px' }}>
                                {TIME_SLOTS.map((slot) => {
                                    const active = selectedTime === slot;
                                    return (
                                        <button
                                            key={slot}
                                            onClick={() => setSelectedTime(slot)}
                                            style={{
                                                padding: '12px', borderRadius: '10px', cursor: 'pointer',
                                                background: active ? GOLD_DIM : GLASS_BG,
                                                border: `1px solid ${active ? GOLD_BORDER : GLASS_BORDER}`,
                                                color: active ? GOLD_LIGHT : 'rgba(255,255,255,0.7)',
                                                fontSize: '13px', fontWeight: 600, fontFamily: 'inherit',
                                                transition: 'all 0.2s ease', display: 'flex',
                                                alignItems: 'center', justifyContent: 'center', gap: '6px',
                                            }}
                                        >
                                            <Clock size={12} /> {slot}
                                        </button>
                                    );
                                })}
                            </div>
                        </motion.div>
                    )}

                    {/* Submit */}
                    {(selectedType === 'email' || (selectedType && selectedDay !== null && selectedTime)) && (
                        <motion.button
                            onClick={handleSubmit}
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.98 }}
                            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4 }}
                            style={{
                                width: '100%', padding: '16px', borderRadius: '14px', cursor: 'pointer',
                                background: `linear-gradient(135deg, ${GOLD} 0%, ${GOLD_LIGHT} 100%)`,
                                border: 'none', color: '#0a0a14', fontSize: '15px', fontWeight: 700,
                                fontFamily: 'inherit', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                                boxShadow: '0 8px 30px rgba(197, 160, 68, 0.25)',
                            }}
                        >
                            <Calendar size={16} />
                            {selectedType === 'email' ? 'Request Email Follow-up' : 'Confirm Booking'}
                        </motion.button>
                    )}

                    <div style={{ height: '60px' }} />
                </div>
            </div>
        </div>
    );
}
