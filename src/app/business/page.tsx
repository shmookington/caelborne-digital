'use client';

import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { CosmicBackground } from '@/components/CosmicBackground';
import {
    ArrowDown,
    Send,
    Check,
    Palette,
    TrendingUp,
    Users,
    Zap,
    Building2,
    Mail,
    Phone,
    MessageSquare,
    ArrowRight,
} from 'lucide-react';
import Link from 'next/link';

// ─── Design Tokens ──────────────────────────────────────────────

const GOLD = '#8B7332';
const GOLD_LIGHT = '#BFA265';
const GOLD_DIM = 'rgba(139, 115, 50, 0.2)';
const GOLD_BORDER = 'rgba(139, 115, 50, 0.35)';
const GLASS_BG = 'rgba(12, 12, 20, 0.65)';
const GLASS_BORDER = 'rgba(255, 255, 255, 0.06)';

// Premium input wrapper styles
const inputWrapperStyle: React.CSSProperties = {
    background: 'linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)',
    backdropFilter: 'blur(12px)',
    WebkitBackdropFilter: 'blur(12px)',
    border: '1px solid rgba(255,255,255,0.1)',
    boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.04), 0 4px 20px rgba(0,0,0,0.2)',
};

export default function BusinessPage() {
    const [businessName, setBusinessName] = useState('');
    const [businessEmail, setBusinessEmail] = useState('');
    const [businessPhone, setBusinessPhone] = useState('');
    const [businessMessage, setBusinessMessage] = useState('');
    const [contactSubmitted, setContactSubmitted] = useState(false);
    const formRef = useRef<HTMLDivElement>(null);

    const handleBusinessContact = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Business inquiry:', { businessName, businessEmail, businessMessage });
        setContactSubmitted(true);
    };

    const scrollToForm = () => {
        formRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    // Benefits with gold accent icons
    const benefits = [
        { icon: <Palette size={20} />, label: 'Custom Design' },
        { icon: <TrendingUp size={20} />, label: 'Growth' },
        { icon: <Users size={20} />, label: 'Retention' },
        { icon: <Zap size={20} />, label: 'Performance' },
    ];

    return (
        <>
            <CosmicBackground />

            <div className="min-h-screen relative" style={{ color: '#fff' }}>
                {/* ========== HERO SECTION ========== */}
                <section className="relative z-10 min-h-[80vh] flex flex-col justify-center items-center px-6 lg:px-12 pt-24 pb-12">
                    <motion.div
                        className="max-w-3xl mx-auto text-center"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.6 }}
                    >
                        {/* Gold badge */}
                        <div
                            style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '8px',
                                padding: '8px 18px',
                                borderRadius: '100px',
                                background: GOLD_DIM,
                                border: `1px solid ${GOLD_BORDER}`,
                                marginBottom: '28px',
                                fontSize: '12px',
                                fontWeight: 600,
                                color: GOLD,
                                textTransform: 'uppercase',
                                letterSpacing: '0.1em',
                            }}
                        >
                            For Business
                        </div>

                        <h1
                            className="font-black tracking-tight leading-[1.1] mb-5"
                            style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', color: '#fff' }}
                        >
                            Grow Your Business.{' '}
                            <span style={{ color: GOLD }}>Digitally.</span>
                        </h1>
                        <p className="max-w-xl mx-auto mb-8" style={{ fontSize: '1.2rem', color: '#B0B8C4' }}>
                            Custom websites, loyalty platforms, and digital modernization — tailored to your business.
                        </p>

                        {/* Compact benefits row */}
                        <div className="grid grid-cols-2 sm:flex sm:flex-wrap justify-center" style={{ gap: '1rem' }}>
                            {benefits.map((b, i) => (
                                <div
                                    key={i}
                                    className="flex items-center gap-2 text-sm justify-center sm:justify-start"
                                    style={{ color: '#B0B8C4' }}
                                >
                                    <span style={{ color: GOLD, flexShrink: 0 }}>{b.icon}</span>
                                    <span className="whitespace-nowrap">{b.label}</span>
                                </div>
                            ))}
                        </div>

                        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap', marginTop: '2rem' }}>
                            <button
                                onClick={scrollToForm}
                                className="group inline-flex items-center gap-2 font-semibold hover:opacity-90 transition-all hover:scale-105"
                                style={{
                                    padding: '1.1rem 2.5rem',
                                    fontSize: '1rem',
                                    color: '#0a0a14',
                                    background: `linear-gradient(135deg, ${GOLD} 0%, #9a7f3d 100%)`,
                                    borderRadius: '14px',
                                    border: 'none',
                                    cursor: 'pointer',
                                    boxShadow: `0 12px 40px rgba(201, 169, 110, 0.25)`,
                                }}
                            >
                                Get in Touch
                                <ArrowDown size={18} className="group-hover:translate-y-0.5 transition-transform" />
                            </button>

                            <Link href="/business/saas" style={{ textDecoration: 'none' }}>
                                <button
                                    className="group inline-flex items-center gap-2 font-semibold transition-all hover:scale-105"
                                    style={{
                                        padding: '1.1rem 2rem',
                                        fontSize: '1rem',
                                        color: 'rgba(255, 255, 255, 0.6)',
                                        background: 'rgba(255, 255, 255, 0.04)',
                                        borderRadius: '14px',
                                        border: '1px solid rgba(255, 255, 255, 0.1)',
                                        cursor: 'pointer',
                                    }}
                                >
                                    View Pricing
                                    <ArrowRight size={16} />
                                </button>
                            </Link>
                        </div>

                        <div className="mt-8">
                            <Link
                                href="/dashboard"
                                className="transition-colors text-sm font-medium flex items-center justify-center gap-2 group"
                                style={{ color: '#8E95A0' }}
                            >
                                Already a partner? Go to Dashboard
                                <ArrowDown size={14} className="-rotate-90 group-hover:translate-x-0.5 transition-transform" />
                            </Link>
                        </div>
                    </motion.div>
                </section>

                {/* ========== CONTACT FORM SECTION ========== */}
                <section ref={formRef} className="relative z-10 py-16 px-6 lg:px-12">
                    <div className="max-w-md mx-auto">
                        <motion.div
                            className="rounded-2xl p-6 lg:p-8 overflow-hidden relative"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                            style={{
                                background: GLASS_BG,
                                border: `1px solid ${GLASS_BORDER}`,
                                boxShadow: `0 0 60px rgba(201, 169, 110, 0.1)`,
                                backdropFilter: 'blur(40px)',
                                WebkitBackdropFilter: 'blur(40px)',
                            }}
                        >
                            <div className="relative z-10">
                                <h2 className="text-2xl font-bold mb-2 text-center" style={{ color: '#fff' }}>
                                    Let&apos;s get you started
                                </h2>
                                <p className="mb-6 text-center text-sm" style={{ color: '#B0B8C4' }}>
                                    We&apos;ll reach out within 24 hours.
                                </p>

                                {contactSubmitted ? (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="text-center py-8"
                                    >
                                        <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center"
                                            style={{ background: 'rgba(34, 197, 94, 0.15)' }}>
                                            <Check size={32} style={{ color: '#22c55e' }} />
                                        </div>
                                        <h3 className="text-xl font-bold mb-2" style={{ color: '#fff' }}>We&apos;ll be in touch shortly!</h3>
                                        <p className="mb-2 text-sm" style={{ color: '#B0B8C4' }}>Thanks for your interest in Caelborne Digital.</p>
                                        <p className="mb-6 text-sm" style={{ color: '#8E95A0' }}>Our team will review your info and reach out within 24-48 hours.</p>
                                        <Link
                                            href="/"
                                            className="text-sm transition-colors" style={{ color: GOLD }}
                                        >
                                            ← Back to Home
                                        </Link>
                                    </motion.div>
                                ) : (
                                    <form onSubmit={handleBusinessContact}>
                                        {/* Business Name */}
                                        <div
                                            style={{ ...inputWrapperStyle, marginBottom: '16px', borderRadius: '14px', padding: '14px 18px' }}
                                            className="flex items-center gap-3 transition-all duration-300"
                                        >
                                            <Building2 size={20} style={{ color: GOLD, flexShrink: 0 }} />
                                            <input
                                                type="text"
                                                value={businessName}
                                                onChange={(e) => setBusinessName(e.target.value)}
                                                required
                                                placeholder="Business name"
                                                className="w-full bg-transparent focus:outline-none"
                                                style={{ border: 'none', outline: 'none', color: '#fff', fontSize: '15px' }}
                                            />
                                        </div>

                                        {/* Email */}
                                        <div
                                            style={{ ...inputWrapperStyle, marginBottom: '16px', borderRadius: '14px', padding: '14px 18px' }}
                                            className="flex items-center gap-3 transition-all duration-300"
                                        >
                                            <Mail size={20} style={{ color: GOLD, flexShrink: 0 }} />
                                            <input
                                                type="email"
                                                value={businessEmail}
                                                onChange={(e) => setBusinessEmail(e.target.value)}
                                                placeholder="Email address (optional)"
                                                className="w-full bg-transparent focus:outline-none"
                                                style={{ border: 'none', outline: 'none', color: '#fff', fontSize: '15px' }}
                                            />
                                        </div>

                                        {/* Phone */}
                                        <div
                                            style={{ ...inputWrapperStyle, marginBottom: '16px', borderRadius: '14px', padding: '14px 18px' }}
                                            className="flex items-center gap-3 transition-all duration-300"
                                        >
                                            <Phone size={20} style={{ color: GOLD, flexShrink: 0 }} />
                                            <input
                                                type="tel"
                                                value={businessPhone}
                                                onChange={(e) => setBusinessPhone(e.target.value)}
                                                required
                                                placeholder="Phone number"
                                                className="w-full bg-transparent focus:outline-none"
                                                style={{ border: 'none', outline: 'none', color: '#fff', fontSize: '15px' }}
                                            />
                                        </div>

                                        {/* Message */}
                                        <div
                                            style={{ ...inputWrapperStyle, marginBottom: '20px', borderRadius: '14px', padding: '14px 18px' }}
                                            className="flex items-start gap-3 transition-all duration-300"
                                        >
                                            <MessageSquare size={20} style={{ color: GOLD, flexShrink: 0, marginTop: '2px' }} />
                                            <textarea
                                                value={businessMessage}
                                                onChange={(e) => setBusinessMessage(e.target.value)}
                                                rows={1}
                                                placeholder="Tell us about your business (optional)"
                                                className="w-full bg-transparent focus:outline-none resize-none"
                                                style={{ border: 'none', outline: 'none', color: '#fff', fontSize: '15px' }}
                                            />
                                        </div>

                                        {/* Submit Button */}
                                        <motion.button
                                            type="submit"
                                            className="w-full py-4 font-semibold text-[15px] flex items-center justify-center gap-2 transition-all"
                                            style={{
                                                background: `linear-gradient(135deg, ${GOLD} 0%, #9a7f3d 100%)`,
                                                color: '#0a0a14',
                                                boxShadow: `0 4px 20px rgba(201, 169, 110, 0.3)`,
                                                borderRadius: '14px',
                                                border: 'none',
                                                cursor: 'pointer',
                                            }}
                                            whileHover={{ scale: 1.02, boxShadow: `0 6px 30px rgba(201, 169, 110, 0.4)` }}
                                            whileTap={{ scale: 0.98 }}
                                        >
                                            <Send size={18} />
                                            Get in Touch
                                        </motion.button>
                                    </form>
                                )}
                            </div>
                        </motion.div>

                        {/* Simple footer text */}
                        <p className="text-center text-xs mt-8" style={{ color: '#8E95A0' }}>
                            Free consultation · No commitment required
                        </p>
                    </div>
                </section>

                {/* ========== MINIMAL FOOTER ========== */}
                <footer className="relative z-10 px-6 py-8 text-center">
                    <p className="text-xs" style={{ color: 'rgba(255,255,255,0.15)' }}>
                        © 2026 Caelborne Digital
                    </p>
                </footer>
            </div>
        </>
    );
}
