'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Outfit } from 'next/font/google';
import {
    Send, Check, Building2, Mail, Phone, MessageSquare,
    CreditCard, ArrowLeft, Sparkles,
} from 'lucide-react';
import Link from 'next/link';
import { CosmicBackground } from '@/components/CosmicBackground';

const outfit = Outfit({ subsets: ['latin'], weight: ['400', '500', '600', '700', '800'] });

// ─── Design Tokens ──────────────────────────────────────────────

const GOLD = '#8B7332';
const GOLD_LIGHT = '#BFA265';
const PURPLE = '#a855f7';
const PURPLE_DIM = 'rgba(168, 85, 247, 0.12)';
const PURPLE_BORDER = 'rgba(168, 85, 247, 0.25)';
const GLASS_BG = 'rgba(12, 12, 20, 0.55)';
const GLASS_BORDER = 'rgba(255, 255, 255, 0.06)';

const inputWrapperStyle: React.CSSProperties = {
    background: 'linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)',
    backdropFilter: 'blur(12px)',
    WebkitBackdropFilter: 'blur(12px)',
    border: '1px solid rgba(255,255,255,0.1)',
    boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.04), 0 4px 20px rgba(0,0,0,0.2)',
};

// ─── Page ───────────────────────────────────────────────────────

export default function GuapContactPage() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [message, setMessage] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Guap inquiry:', { name, email, phone, message });
        setSubmitted(true);
    };

    return (
        <div className={outfit.className}>
            <CosmicBackground />

            <div className="min-h-screen relative z-10 flex flex-col items-center justify-center px-6" style={{ paddingTop: '80px', paddingBottom: '60px' }}>

                {/* Back link */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    style={{ width: '100%', maxWidth: '440px', marginBottom: '24px' }}
                >
                    <Link
                        href="/guap"
                        style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '6px',
                            fontSize: '13px',
                            fontWeight: 500,
                            color: '#8E95A0',
                            textDecoration: 'none',
                            transition: 'color 0.2s ease',
                        }}
                        onMouseEnter={(e) => { e.currentTarget.style.color = '#B0B8C4'; }}
                        onMouseLeave={(e) => { e.currentTarget.style.color = '#8E95A0'; }}
                    >
                        <ArrowLeft size={14} />
                        Back to Guap
                    </Link>
                </motion.div>

                {/* Form Card */}
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    style={{
                        width: '100%',
                        maxWidth: '440px',
                        borderRadius: '24px',
                        background: GLASS_BG,
                        backdropFilter: 'blur(40px)',
                        WebkitBackdropFilter: 'blur(40px)',
                        border: `1px solid ${GLASS_BORDER}`,
                        boxShadow: '0 0 60px rgba(168, 85, 247, 0.08)',
                        padding: 'clamp(24px, 4vw, 36px)',
                        position: 'relative',
                        overflow: 'hidden',
                    }}
                >
                    {/* Decorative glow */}
                    <div style={{
                        position: 'absolute',
                        top: '-80px',
                        right: '-80px',
                        width: '200px',
                        height: '200px',
                        borderRadius: '50%',
                        background: 'radial-gradient(circle, rgba(168,85,247,0.1) 0%, transparent 70%)',
                        pointerEvents: 'none',
                    }} />

                    <div style={{ position: 'relative', zIndex: 1 }}>
                        {/* Header */}
                        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
                            {/* Badge */}
                            <div style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '6px',
                                padding: '6px 14px',
                                borderRadius: '100px',
                                background: PURPLE_DIM,
                                border: `1px solid ${PURPLE_BORDER}`,
                                marginBottom: '16px',
                            }}>
                                <CreditCard size={12} style={{ color: PURPLE }} />
                                <span style={{ fontSize: '11px', fontWeight: 600, color: PURPLE, letterSpacing: '0.04em' }}>
                                    Guap Loyalty Platform
                                </span>
                            </div>

                            <h1 style={{
                                fontSize: '24px',
                                fontWeight: 800,
                                color: '#fff',
                                letterSpacing: '-0.03em',
                                marginBottom: '8px',
                            }}>
                                Get Guap for Your Business
                            </h1>
                            <p style={{
                                fontSize: '14px',
                                color: '#B0B8C4',
                                lineHeight: 1.5,
                            }}>
                                Tell us about your business and we&apos;ll set up your custom loyalty platform.
                            </p>
                        </div>

                        {submitted ? (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                style={{ textAlign: 'center', padding: '20px 0' }}
                            >
                                <div style={{
                                    width: '56px',
                                    height: '56px',
                                    borderRadius: '50%',
                                    background: 'rgba(34, 197, 94, 0.12)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    margin: '0 auto 16px',
                                }}>
                                    <Check size={28} style={{ color: '#22c55e' }} />
                                </div>
                                <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#fff', marginBottom: '8px' }}>
                                    You&apos;re on the list!
                                </h3>
                                <p style={{ fontSize: '13px', color: '#B0B8C4', marginBottom: '6px' }}>
                                    We&apos;ll reach out within 24 hours to get your Guap loyalty platform set up.
                                </p>
                                <p style={{ fontSize: '13px', color: '#8E95A0', marginBottom: '20px' }}>
                                    In the meantime, we&apos;ll prepare a custom demo for your brand.
                                </p>
                                <Link
                                    href="/guap"
                                    style={{ fontSize: '13px', color: PURPLE, textDecoration: 'none', fontWeight: 600 }}
                                >
                                    ← Back to Guap
                                </Link>
                            </motion.div>
                        ) : (
                            <form onSubmit={handleSubmit}>
                                {/* Business Name */}
                                <div
                                    style={{ ...inputWrapperStyle, marginBottom: '14px', borderRadius: '14px', padding: '14px 16px' }}
                                    className="flex items-center gap-3"
                                >
                                    <Building2 size={18} style={{ color: PURPLE, flexShrink: 0, opacity: 0.7 }} />
                                    <input
                                        type="text"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        required
                                        placeholder="Business name"
                                        className="w-full bg-transparent focus:outline-none"
                                        style={{ border: 'none', outline: 'none', color: '#fff', fontSize: '14px' }}
                                    />
                                </div>

                                {/* Email */}
                                <div
                                    style={{ ...inputWrapperStyle, marginBottom: '14px', borderRadius: '14px', padding: '14px 16px' }}
                                    className="flex items-center gap-3"
                                >
                                    <Mail size={18} style={{ color: PURPLE, flexShrink: 0, opacity: 0.7 }} />
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                        placeholder="Email address"
                                        className="w-full bg-transparent focus:outline-none"
                                        style={{ border: 'none', outline: 'none', color: '#fff', fontSize: '14px' }}
                                    />
                                </div>

                                {/* Phone */}
                                <div
                                    style={{ ...inputWrapperStyle, marginBottom: '14px', borderRadius: '14px', padding: '14px 16px' }}
                                    className="flex items-center gap-3"
                                >
                                    <Phone size={18} style={{ color: PURPLE, flexShrink: 0, opacity: 0.7 }} />
                                    <input
                                        type="tel"
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                        required
                                        placeholder="Phone number"
                                        className="w-full bg-transparent focus:outline-none"
                                        style={{ border: 'none', outline: 'none', color: '#fff', fontSize: '14px' }}
                                    />
                                </div>

                                {/* Business type / message */}
                                <div
                                    style={{ ...inputWrapperStyle, marginBottom: '20px', borderRadius: '14px', padding: '14px 16px' }}
                                    className="flex items-start gap-3"
                                >
                                    <MessageSquare size={18} style={{ color: PURPLE, flexShrink: 0, opacity: 0.7, marginTop: '2px' }} />
                                    <textarea
                                        value={message}
                                        onChange={(e) => setMessage(e.target.value)}
                                        rows={2}
                                        placeholder="What type of business? (e.g. coffee shop, restaurant, barbershop)"
                                        className="w-full bg-transparent focus:outline-none resize-none"
                                        style={{ border: 'none', outline: 'none', color: '#fff', fontSize: '14px', lineHeight: 1.5 }}
                                    />
                                </div>

                                {/* Submit */}
                                <motion.button
                                    type="submit"
                                    className="w-full flex items-center justify-center gap-2"
                                    style={{
                                        padding: '15px',
                                        borderRadius: '14px',
                                        background: `linear-gradient(135deg, ${PURPLE} 0%, #c084fc 100%)`,
                                        color: '#fff',
                                        fontSize: '14px',
                                        fontWeight: 700,
                                        border: 'none',
                                        cursor: 'pointer',
                                        boxShadow: '0 8px 30px rgba(168, 85, 247, 0.3)',
                                    }}
                                    whileHover={{ scale: 1.02, boxShadow: '0 12px 40px rgba(168, 85, 247, 0.4)' }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    <Sparkles size={16} />
                                    Get My Guap Platform
                                </motion.button>
                            </form>
                        )}
                    </div>
                </motion.div>

                {/* Footer note */}
                <p style={{
                    fontSize: '12px',
                    color: '#8E95A0',
                    textAlign: 'center',
                    marginTop: '24px',
                }}>
                    Free setup consultation · No commitment required
                </p>
            </div>
        </div>
    );
}
