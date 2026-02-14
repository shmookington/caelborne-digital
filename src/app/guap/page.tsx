'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Outfit } from 'next/font/google';
import {
    CreditCard, QrCode, TrendingUp, Sparkles,
    Star, Users, Gift, ArrowRight, Zap, Shield, BarChart3,
} from 'lucide-react';
import { CosmicBackground } from '@/components/CosmicBackground';

const outfit = Outfit({ subsets: ['latin'], weight: ['400', '500', '600', '700', '800'] });

// ─── Design Tokens ──────────────────────────────────────────────

const GOLD = '#8B7332';
const GOLD_LIGHT = '#BFA265';
const GOLD_DIM = 'rgba(139, 115, 50, 0.2)';
const GOLD_BORDER = 'rgba(139, 115, 50, 0.35)';
const GLASS_BG = 'rgba(12, 12, 20, 0.82)';
const GLASS_BORDER = 'rgba(255, 255, 255, 0.06)';

const PURPLE = '#a855f7';
const PURPLE_DIM = 'rgba(168, 85, 247, 0.12)';
const PURPLE_BORDER = 'rgba(168, 85, 247, 0.25)';

// ─── Data ───────────────────────────────────────────────────────

const FEATURES = [
    {
        icon: CreditCard,
        title: 'Digital Loyalty Cards',
        desc: 'Beautiful virtual cards your customers carry in their pocket — no plastic, no apps to download.',
    },
    {
        icon: QrCode,
        title: 'Instant QR Check-In',
        desc: 'Customers scan, earn points, and redeem rewards in seconds. Zero friction.',
    },
    {
        icon: BarChart3,
        title: 'Real-Time Analytics',
        desc: 'See who\'s coming back, what they\'re buying, and how your retention grows over time.',
    },
    {
        icon: Gift,
        title: 'Custom Rewards',
        desc: 'Set your own milestones — free items, discounts, VIP tiers. Whatever fits your brand.',
    },
    {
        icon: Users,
        title: 'Customer Insights',
        desc: 'Build a real database of your regulars. Know their preferences and purchase history.',
    },
    {
        icon: Shield,
        title: 'Fully Managed',
        desc: 'We handle the tech. You focus on your business. Updates, hosting, and support included.',
    },
];

const PRICING_HIGHLIGHTS = [
    'Custom-branded digital loyalty card',
    'QR code scan-to-earn system',
    'Customer management dashboard',
    'Unlimited customers & transactions',
    'Analytics & retention insights',
    'Ongoing support & updates',
];

// ─── Animations ─────────────────────────────────────────────────

const fadeUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
};

const stagger = {
    animate: { transition: { staggerChildren: 0.06 } },
};

// ─── Page ───────────────────────────────────────────────────────

export default function GuapProductPage() {
    return (
        <div className={outfit.className}>
            <CosmicBackground />

            <div className="min-h-screen relative z-10" style={{ paddingTop: '72px' }}>

                {/* ═══════════════════════════════════════
                    HERO
                ═══════════════════════════════════════ */}
                <section style={{
                    padding: '80px 24px 60px',
                    textAlign: 'center',
                    maxWidth: '800px',
                    margin: '0 auto',
                }}>
                    {/* Badge */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                        style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '8px',
                            padding: '8px 18px',
                            borderRadius: '100px',
                            background: PURPLE_DIM,
                            border: `1px solid ${PURPLE_BORDER}`,
                            marginBottom: '28px',
                        }}
                    >
                        <Sparkles size={14} style={{ color: PURPLE }} />
                        <span style={{ fontSize: '12px', fontWeight: 600, color: PURPLE, letterSpacing: '0.04em' }}>
                            A Caelborne Product
                        </span>
                    </motion.div>

                    {/* Headline */}
                    <motion.h1
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                        style={{
                            fontSize: 'clamp(36px, 6vw, 60px)',
                            fontWeight: 800,
                            color: '#fff',
                            letterSpacing: '-0.03em',
                            lineHeight: 1.1,
                            marginBottom: '20px',
                        }}
                    >
                        Get{' '}
                        <span style={{
                            background: `linear-gradient(135deg, ${PURPLE} 0%, #c084fc 50%, ${GOLD_LIGHT} 100%)`,
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                        }}>
                            Guap
                        </span>
                    </motion.h1>

                    {/* Subtitle */}
                    <motion.p
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                        style={{
                            fontSize: 'clamp(16px, 2.5vw, 20px)',
                            color: '#D8DCE3',
                            lineHeight: 1.6,
                            maxWidth: '560px',
                            margin: '0 auto 40px',
                            textShadow: '0 2px 8px rgba(0,0,0,0.6)',
                        }}
                    >
                        A digital loyalty platform that turns first-time visitors into lifelong customers.
                        Built by Caelborne. Ready for your business.
                    </motion.p>

                    {/* CTA Buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.4 }}
                        style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}
                    >
                        <Link
                            href="/guap/contact"
                            style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '8px',
                                padding: '14px 28px',
                                borderRadius: '14px',
                                background: `linear-gradient(135deg, ${GOLD} 0%, ${GOLD_LIGHT} 100%)`,
                                color: '#0a0a14',
                                fontSize: '14px',
                                fontWeight: 700,
                                textDecoration: 'none',
                                letterSpacing: '-0.01em',
                                boxShadow: `0 8px 30px rgba(168, 135, 62, 0.3)`,
                                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'translateY(-1px)';
                                e.currentTarget.style.boxShadow = '0 12px 40px rgba(168, 135, 62, 0.4)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.boxShadow = '0 8px 30px rgba(168, 135, 62, 0.3)';
                            }}
                        >
                            Get Guap for My Business
                            <ArrowRight size={16} />
                        </Link>
                        <button
                            onClick={() => {
                                document.getElementById('features')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                            }}
                            style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '8px',
                                padding: '14px 28px',
                                borderRadius: '14px',
                                background: 'rgba(255,255,255,0.08)',
                                border: '1px solid rgba(255,255,255,0.18)',
                                color: '#fff',
                                fontSize: '14px',
                                fontWeight: 600,
                                cursor: 'pointer',
                                transition: 'all 0.2s ease',
                                textShadow: '0 1px 4px rgba(0,0,0,0.4)',
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)';
                                e.currentTarget.style.color = '#fff';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
                                e.currentTarget.style.color = 'rgba(255,255,255,0.7)';
                            }}
                        >
                            See How It Works
                        </button>
                    </motion.div>
                </section>

                {/* ═══════════════════════════════════════
                    PREVIEW CARD
                ═══════════════════════════════════════ */}
                <section style={{ padding: '0 24px 80px', maxWidth: '600px', margin: '0 auto' }}>
                    <motion.div
                        initial={{ opacity: 0, y: 24, scale: 0.97 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ delay: 0.4, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                        style={{
                            borderRadius: '24px',
                            background: 'linear-gradient(145deg, rgba(168,85,247,0.1) 0%, rgba(168,135,62,0.08) 100%)',
                            border: `1px solid ${PURPLE_BORDER}`,
                            padding: '40px',
                            textAlign: 'center',
                            position: 'relative',
                            overflow: 'hidden',
                        }}
                    >
                        {/* Decorative glow */}
                        <div style={{
                            position: 'absolute',
                            top: '-40px',
                            right: '-40px',
                            width: '200px',
                            height: '200px',
                            borderRadius: '50%',
                            background: `radial-gradient(circle, rgba(168,85,247,0.15) 0%, transparent 70%)`,
                            pointerEvents: 'none',
                        }} />

                        <div style={{
                            width: '64px',
                            height: '64px',
                            borderRadius: '18px',
                            background: `linear-gradient(135deg, ${PURPLE} 0%, #c084fc 100%)`,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            margin: '0 auto 20px',
                            boxShadow: '0 8px 30px rgba(168, 85, 247, 0.3)',
                        }}>
                            <CreditCard size={28} style={{ color: '#fff' }} />
                        </div>

                        <h3 style={{
                            fontSize: '20px',
                            fontWeight: 700,
                            color: '#fff',
                            marginBottom: '8px',
                            letterSpacing: '-0.02em',
                        }}>
                            Your Brand. Your Rewards.
                        </h3>
                        <p style={{
                            fontSize: '14px',
                            color: '#fff',
                            lineHeight: 1.6,
                            maxWidth: '380px',
                            margin: '0 auto',
                        }}>
                            Every Guap card is custom-designed to match your brand identity —
                            colors, logo, and all. It lives in your customers&apos; digital wallets.
                        </p>

                        {/* Mock loyalty card preview */}
                        <div style={{
                            marginTop: '28px',
                            padding: '24px',
                            borderRadius: '16px',
                            background: 'linear-gradient(135deg, #1a1a2e 0%, #0f0f1a 100%)',
                            border: '1px solid rgba(255,255,255,0.06)',
                        }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                                <span style={{ fontSize: '14px', fontWeight: 700, color: '#fff' }}>☕ Your Coffee Shop</span>
                                <span style={{ fontSize: '10px', fontWeight: 600, color: GOLD_LIGHT, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Gold</span>
                            </div>
                            <div style={{ display: 'flex', gap: '6px', marginBottom: '16px' }}>
                                {Array.from({ length: 10 }).map((_, i) => (
                                    <div
                                        key={i}
                                        style={{
                                            flex: 1,
                                            height: '4px',
                                            borderRadius: '100px',
                                            background: i < 7
                                                ? `linear-gradient(90deg, ${PURPLE}, #c084fc)`
                                                : 'rgba(255,255,255,0.06)',
                                        }}
                                    />
                                ))}
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <span style={{ fontSize: '11px', color: '#8E95A0' }}>7/10 stamps</span>
                                <span style={{ fontSize: '11px', color: PURPLE }}>3 to free drink ✨</span>
                            </div>
                        </div>
                    </motion.div>
                </section>

                {/* ═══════════════════════════════════════
                    FEATURES
                ═══════════════════════════════════════ */}
                <section id="features" style={{ padding: '0 24px 80px', maxWidth: '900px', margin: '0 auto' }}>
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        style={{ textAlign: 'center', marginBottom: '40px' }}
                    >
                        <p style={{
                            fontSize: '11px',
                            fontWeight: 600,
                            color: GOLD,
                            textTransform: 'uppercase',
                            letterSpacing: '0.12em',
                            marginBottom: '12px',
                        }}>
                            Everything You Need
                        </p>
                        <h2 style={{
                            fontSize: 'clamp(24px, 4vw, 36px)',
                            fontWeight: 800,
                            color: '#fff',
                            letterSpacing: '-0.03em',
                        }}>
                            Loyalty, Simplified
                        </h2>
                    </motion.div>

                    <motion.div
                        variants={stagger}
                        initial="initial"
                        whileInView="animate"
                        viewport={{ once: true }}
                        style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
                            gap: '14px',
                        }}
                    >
                        {FEATURES.map((feat) => (
                            <motion.div
                                key={feat.title}
                                variants={fadeUp}
                                transition={{ duration: 0.4 }}
                                style={{
                                    padding: '28px',
                                    borderRadius: '18px',
                                    background: GLASS_BG,
                                    backdropFilter: 'blur(24px)',
                                    WebkitBackdropFilter: 'blur(24px)',
                                    border: `1px solid ${GLASS_BORDER}`,
                                    transition: 'border-color 0.2s ease',
                                }}
                                onMouseEnter={(e) => {
                                    (e.currentTarget as HTMLElement).style.borderColor = PURPLE_BORDER;
                                }}
                                onMouseLeave={(e) => {
                                    (e.currentTarget as HTMLElement).style.borderColor = GLASS_BORDER;
                                }}
                            >
                                <feat.icon size={22} style={{ color: PURPLE, marginBottom: '14px', opacity: 1 }} />
                                <h3 style={{
                                    fontSize: '15px',
                                    fontWeight: 700,
                                    color: '#fff',
                                    marginBottom: '6px',
                                    letterSpacing: '-0.01em',
                                }}>
                                    {feat.title}
                                </h3>
                                <p style={{
                                    fontSize: '13px',
                                    color: '#D8DCE3',
                                    lineHeight: 1.55,
                                }}>
                                    {feat.desc}
                                </p>
                            </motion.div>
                        ))}
                    </motion.div>
                </section>

                {/* ═══════════════════════════════════════
                    JUST GUAP — STANDALONE OPTION
                ═══════════════════════════════════════ */}
                <section style={{ padding: '0 24px 80px', maxWidth: '700px', margin: '0 auto' }}>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        style={{
                            borderRadius: '24px',
                            background: GLASS_BG,
                            backdropFilter: 'blur(24px)',
                            WebkitBackdropFilter: 'blur(24px)',
                            border: `1px solid ${GOLD_BORDER}`,
                            padding: 'clamp(32px, 5vw, 48px)',
                            position: 'relative',
                            overflow: 'hidden',
                        }}
                    >
                        {/* Gold glow */}
                        <div style={{
                            position: 'absolute',
                            top: '-60px',
                            left: '-60px',
                            width: '240px',
                            height: '240px',
                            borderRadius: '50%',
                            background: `radial-gradient(circle, rgba(168,135,62,0.1) 0%, transparent 70%)`,
                            pointerEvents: 'none',
                        }} />

                        <div style={{ position: 'relative', zIndex: 1 }}>
                            {/* Badge */}
                            <div style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '6px',
                                padding: '6px 14px',
                                borderRadius: '100px',
                                background: GOLD_DIM,
                                border: `1px solid ${GOLD_BORDER}`,
                                marginBottom: '20px',
                            }}>
                                <Zap size={12} style={{ color: GOLD_LIGHT }} />
                                <span style={{ fontSize: '11px', fontWeight: 600, color: GOLD_LIGHT, letterSpacing: '0.04em' }}>
                                    Standalone Option
                                </span>
                            </div>

                            <h3 style={{
                                fontSize: 'clamp(22px, 3.5vw, 30px)',
                                fontWeight: 800,
                                color: '#fff',
                                letterSpacing: '-0.03em',
                                marginBottom: '12px',
                            }}>
                                Just want Guap?
                            </h3>

                            <p style={{
                                fontSize: '15px',
                                color: '#D8DCE3',
                                lineHeight: 1.65,
                                marginBottom: '28px',
                                maxWidth: '500px',
                            }}>
                                Don&apos;t need a full website? No problem. Get Guap as a standalone digital
                                loyalty platform for your business — fully managed by Caelborne.
                            </p>

                            {/* Checklist */}
                            <div style={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                                gap: '10px',
                                marginBottom: '32px',
                            }}>
                                {PRICING_HIGHLIGHTS.map((item) => (
                                    <div
                                        key={item}
                                        style={{ display: 'flex', alignItems: 'center', gap: '10px' }}
                                    >
                                        <Star size={14} style={{ color: GOLD, flexShrink: 0 }} />
                                        <span style={{ fontSize: '13px', color: '#D8DCE3', fontWeight: 500 }}>
                                            {item}
                                        </span>
                                    </div>
                                ))}
                            </div>

                            {/* CTA */}
                            <Link
                                href="/guap/contact"
                                style={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '8px',
                                    padding: '14px 28px',
                                    borderRadius: '14px',
                                    background: `linear-gradient(135deg, ${GOLD} 0%, ${GOLD_LIGHT} 100%)`,
                                    color: '#0a0a14',
                                    fontSize: '14px',
                                    fontWeight: 700,
                                    textDecoration: 'none',
                                    letterSpacing: '-0.01em',
                                    boxShadow: `0 8px 30px rgba(168, 135, 62, 0.3)`,
                                    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = 'translateY(-1px)';
                                    e.currentTarget.style.boxShadow = '0 12px 40px rgba(168, 135, 62, 0.4)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = 'translateY(0)';
                                    e.currentTarget.style.boxShadow = '0 8px 30px rgba(168, 135, 62, 0.3)';
                                }}
                            >
                                Get Started
                                <ArrowRight size={16} />
                            </Link>
                        </div>
                    </motion.div>
                </section>

                {/* ═══════════════════════════════════════
                    BOTTOM CTA
                ═══════════════════════════════════════ */}
                <section style={{
                    padding: '60px 24px 80px',
                    textAlign: 'center',
                    maxWidth: '600px',
                    margin: '0 auto',
                    background: 'rgba(12, 12, 20, 0.75)',
                    backdropFilter: 'blur(30px)',
                    WebkitBackdropFilter: 'blur(30px)',
                    borderRadius: '24px',
                    border: `1px solid ${GLASS_BORDER}`,
                }}>
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        <p style={{
                            fontSize: '11px',
                            fontWeight: 600,
                            color: GOLD,
                            textTransform: 'uppercase',
                            letterSpacing: '0.12em',
                            marginBottom: '12px',
                        }}>
                            Ready to Grow?
                        </p>
                        <h2 style={{
                            fontSize: 'clamp(24px, 4vw, 36px)',
                            fontWeight: 800,
                            color: '#fff',
                            letterSpacing: '-0.03em',
                            marginBottom: '16px',
                        }}>
                            Let&apos;s get your customers coming back.
                        </h2>
                        <p style={{
                            fontSize: '15px',
                            color: '#D8DCE3',
                            lineHeight: 1.6,
                            marginBottom: '28px',
                        }}>
                            Whether bundled with a full Caelborne build or as a standalone product,
                            Guap is the easiest way to launch a loyalty program.
                        </p>
                        <Link
                            href="/business/start"
                            style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '8px',
                                padding: '14px 28px',
                                borderRadius: '14px',
                                background: `linear-gradient(135deg, ${GOLD} 0%, ${GOLD_LIGHT} 100%)`,
                                color: '#0a0a14',
                                fontSize: '14px',
                                fontWeight: 700,
                                textDecoration: 'none',
                                boxShadow: `0 8px 30px rgba(168, 135, 62, 0.3)`,
                                transition: 'transform 0.2s ease',
                            }}
                            onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-1px)'; }}
                            onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; }}
                        >
                            Book a Consultation
                            <ArrowRight size={16} />
                        </Link>
                    </motion.div>
                </section>
            </div>
        </div>
    );
}
