'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { CosmicBackground } from '@/components/CosmicBackground';
import GlobalNav from '@/components/GlobalNav';
import {
    ArrowRight, Check, Sparkles, Globe, Layers, Zap, Shield,
    ChevronRight, Send, Building2, Palette, Code2, BarChart3,
    Headphones, Rocket, Star, Users, X
} from 'lucide-react';

// ─── Constants ──────────────────────────────────────────────────

const GOLD = '#8B7332';
const GOLD_LIGHT = '#BFA265';
const GOLD_DIM = 'rgba(139, 115, 50, 0.2)';
const GOLD_BORDER = 'rgba(139, 115, 50, 0.35)';
const GLASS_BG = 'rgba(12, 12, 20, 0.65)';
const GLASS_BORDER = 'rgba(255, 255, 255, 0.06)';
const GLASS_HIGHLIGHT = 'rgba(255, 255, 255, 0.03)';

const SERVICES = [
    {
        icon: Palette,
        title: 'Website Design & Build',
        desc: 'Custom-designed, high-performance websites tailored to your brand. No templates — every pixel is intentional.',
        features: ['Custom UI/UX Design', 'Mobile-First Development', 'SEO Optimization', 'Brand Identity Integration'],
    },
    {
        icon: Code2,
        title: 'Digital Modernization',
        desc: 'Future-proof your operations with next-gen technology. Automated workflows, modern payment systems, and smart infrastructure.',
        features: ['Automated Workflows', 'Modern Payment Integration', 'Analytics & Insights', 'Cloud Infrastructure'],
    },
    {
        icon: Layers,
        title: 'Guap Loyalty Platform',
        desc: 'Our flagship customer retention system. Digital loyalty cards, tiered rewards, and real-time analytics — built by Caelborne.',
        features: ['Digital Loyalty Cards', 'Tiered Reward Programs', 'QR Code Integration', 'Customer Analytics'],
    },
];

const MANAGEMENT_TIERS = [
    {
        name: 'Foundation',
        tagline: 'Stay Live & Secure',
        desc: 'Everything your site needs to run smoothly — we handle the infrastructure.',
        features: [
            'Hosting & SSL',
            'Monthly security updates',
            'Uptime monitoring',
            '99.9% uptime SLA',
            'Email support',
        ],
        accent: 'rgba(255, 255, 255, 0.7)',
    },
    {
        name: 'Growth',
        tagline: 'Scale With Confidence',
        desc: 'For businesses ready to actively grow their online presence.',
        popular: true,
        features: [
            'Everything in Foundation',
            'Monthly content updates',
            'SEO performance reports',
            'Priority support',
            'Analytics dashboard',
            'A/B testing',
        ],
        accent: GOLD,
    },
    {
        name: 'Full Suite',
        tagline: 'White-Glove Service',
        desc: 'Dedicated support with strategic guidance for established businesses.',
        features: [
            'Everything in Growth',
            'Dedicated account manager',
            'Same-day support',
            'Social media integration',
            'Custom feature development',
            'Quarterly strategy reviews',
        ],
        accent: 'rgba(255, 255, 255, 0.7)',
    },
];

const PROCESS_STEPS = [
    { icon: Headphones, title: 'Consultation', desc: 'We learn your business, your goals, and your vision.' },
    { icon: BarChart3, title: 'Scope & Quote', desc: 'Itemized proposal — you choose what fits your budget.' },
    { icon: Rocket, title: 'Build', desc: 'We design, develop, and refine until it\'s perfect.' },
    { icon: Shield, title: 'Launch & Manage', desc: 'Go live with confidence. We handle everything after.' },
];

const BUSINESS_TYPES = [
    { label: 'Restaurant', emoji: '🍽️' },
    { label: 'Real Estate', emoji: '🏠' },
    { label: 'Barbershop', emoji: '💈' },
    { label: 'Salon', emoji: '💇' },
    { label: 'Retail', emoji: '🛍️' },
    { label: 'Fitness', emoji: '💪' },
    { label: 'Café', emoji: '☕' },
    { label: 'Auto Shop', emoji: '🔧' },
    { label: 'Photography', emoji: '📸' },
    { label: 'Law Firm', emoji: '⚖️' },
    { label: 'Medical', emoji: '🏥' },
    { label: 'Other', emoji: '✨' },
];

const INTEREST_OPTIONS = [
    { label: 'Website Design & Build', emoji: '🎨' },
    { label: 'Digital Modernization', emoji: '⚡' },
    { label: 'Guap Loyalty Integration', emoji: '💎' },
    { label: 'Full Package', emoji: '🚀' },
];

// ─── Keyframes (injected once) ──────────────────────────────────

const KEYFRAMES = `
@keyframes caelShimmer {
    0% { background-position: -200% center; }
    100% { background-position: 200% center; }
}
@keyframes caelGlow {
    0%, 100% { opacity: 0.4; }
    50% { opacity: 0.8; }
}
@keyframes caelFloat {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-8px); }
}
@keyframes caelBorderRotate {
    0% { --angle: 0deg; }
    100% { --angle: 360deg; }
}
@keyframes caelPulse {
    0%, 100% { box-shadow: 0 0 20px rgba(201, 169, 110, 0.1); }
    50% { box-shadow: 0 0 40px rgba(201, 169, 110, 0.2); }
}
`;

// ─── Reusable Components ────────────────────────────────────────

function GlassCard({ children, style, hover = true, ...props }: {
    children: React.ReactNode;
    style?: React.CSSProperties;
    hover?: boolean;
    [key: string]: unknown;
}) {
    return (
        <motion.div
            whileHover={hover ? {
                y: -6,
                boxShadow: `0 16px 48px rgba(0, 0, 0, 0.4), inset 0 1px 0 ${GLASS_HIGHLIGHT}, 0 0 0 1px rgba(201, 169, 110, 0.15), 0 0 30px rgba(201, 169, 110, 0.06)`,
                transition: { type: 'spring', stiffness: 400, damping: 20 },
            } : {}}
            style={{
                background: GLASS_BG,
                backdropFilter: 'blur(40px)',
                WebkitBackdropFilter: 'blur(40px)',
                border: `1px solid ${GLASS_BORDER}`,
                borderRadius: '24px',
                padding: '36px',
                boxShadow: `0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 ${GLASS_HIGHLIGHT}`,
                transition: 'box-shadow 0.4s ease, border-color 0.4s ease',
                ...style,
            }}
            {...props}
        >
            {children}
        </motion.div>
    );
}

function SectionHeading({ badge, title, subtitle }: {
    badge?: string;
    title: string;
    subtitle?: string;
}) {
    return (
        <div style={{ textAlign: 'center', marginBottom: '64px', maxWidth: '700px', margin: '0 auto 64px' }}>
            {badge && (
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '8px',
                        padding: '8px 18px',
                        borderRadius: '100px',
                        background: GOLD_DIM,
                        border: `1px solid ${GOLD_BORDER}`,
                        marginBottom: '24px',
                        fontSize: '12px',
                        fontWeight: 600,
                        color: GOLD,
                        textTransform: 'uppercase',
                        letterSpacing: '0.1em',
                    }}
                >
                    {badge}
                </motion.div>
            )}
            <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                style={{
                    fontSize: 'clamp(28px, 5vw, 48px)',
                    fontWeight: 700,
                    lineHeight: 1.1,
                    letterSpacing: '-0.03em',
                    color: '#fff',
                    marginBottom: subtitle ? '16px' : '0',
                }}
            >
                {title}
            </motion.h2>
            {subtitle && (
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    style={{
                        fontSize: 'clamp(15px, 2vw, 18px)',
                        lineHeight: 1.6,
                        color: 'rgba(255, 255, 255, 0.65)',
                    }}
                >
                    {subtitle}
                </motion.p>
            )}
        </div>
    );
}

// ─── Main Page ──────────────────────────────────────────────────

export default function CaelbornePage() {
    const [showConsultation, setShowConsultation] = useState(false);
    const [businessType, setBusinessType] = useState('');
    const [interest, setInterest] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const consultRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Inject keyframes
        const style = document.createElement('style');
        style.textContent = KEYFRAMES;
        document.head.appendChild(style);
        return () => { document.head.removeChild(style); };
    }, []);

    const router = useRouter();

    const handleBookConsultation = () => {
        router.push('/business/start');
    };

    const handleSubmitConsultation = () => {
        console.log('=== Caelborne Consultation Request ===');
        console.log(JSON.stringify({ businessType, interest }, null, 2));
        setSubmitted(true);
    };

    return (
        <>
            <CosmicBackground />
            <GlobalNav />

            <div style={{ minHeight: '100vh', paddingTop: '44px', color: '#fff', position: 'relative', textShadow: '0 2px 8px rgba(0,0,0,0.5)' }}>

                {/* ═══════════════════════════════════════════════════
                    HERO SECTION
                ═══════════════════════════════════════════════════ */}
                <motion.section
                    style={{
                        minHeight: 'calc(100vh - 44px)',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        textAlign: 'center',
                        padding: '80px 24px 60px',
                        position: 'relative',
                        zIndex: 10,
                    }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                >
                    {/* Brand badge */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.8 }}
                        style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '10px',
                            padding: '10px 24px',
                            borderRadius: '100px',
                            background: 'rgba(12, 12, 20, 0.6)',
                            border: '1px solid rgba(255,255,255,0.15)',
                            marginBottom: '40px',
                            fontSize: '13px',
                            fontWeight: 600,
                            color: '#fff',
                            letterSpacing: '0.06em',
                        }}
                    >
                        <Sparkles size={14} />
                        Digital Modernization Studio
                    </motion.div>

                    {/* Main title */}
                    <motion.h1
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 0.9 }}
                        style={{
                            fontSize: 'clamp(42px, 8vw, 80px)',
                            fontWeight: 700,
                            lineHeight: 1.0,
                            letterSpacing: '-0.04em',
                            maxWidth: '900px',
                            marginBottom: '12px',
                        }}
                    >
                        Caelborne
                    </motion.h1>

                    {/* Subtitle line */}
                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7, duration: 0.8 }}
                        style={{
                            fontSize: 'clamp(16px, 2.5vw, 22px)',
                            fontWeight: 400,
                            lineHeight: 1.5,
                            color: '#fff',
                            maxWidth: '560px',
                            marginBottom: '16px',
                            letterSpacing: '-0.01em',
                        }}
                    >
                        We modernize your business&apos;s digital presence.
                    </motion.p>

                    {/* Gold accent line */}
                    <motion.div
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ delay: 0.9, duration: 0.8 }}
                        style={{
                            width: '60px',
                            height: '2px',
                            background: `linear-gradient(90deg, transparent, ${GOLD}, transparent)`,
                            marginBottom: '40px',
                        }}
                    />

                    {/* Tagline */}
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.1, duration: 0.8 }}
                        style={{
                            fontSize: 'clamp(13px, 1.8vw, 15px)',
                            lineHeight: 1.8,
                            color: '#fff',
                            maxWidth: '480px',
                            marginBottom: '48px',
                        }}
                    >
                        Custom websites. Automated operations. Next-generation technology.
                        <br />
                        Built for businesses ready to evolve.
                    </motion.p>

                    {/* CTA Buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.3, duration: 0.8 }}
                        style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', justifyContent: 'center' }}
                    >
                        <motion.button
                            onClick={handleBookConsultation}
                            whileHover={{
                                scale: 1.03,
                                boxShadow: `0 20px 60px rgba(201, 169, 110, 0.25)`,
                            }}
                            whileTap={{ scale: 0.97 }}
                            style={{
                                padding: '18px 40px',
                                borderRadius: '14px',
                                background: `linear-gradient(135deg, ${GOLD} 0%, #9a7f3d 100%)`,
                                color: '#0a0a14',
                                fontSize: '16px',
                                fontWeight: 700,
                                border: 'none',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '10px',
                                boxShadow: `0 12px 40px rgba(201, 169, 110, 0.2)`,
                                letterSpacing: '-0.01em',
                            }}
                        >
                            Book a Consultation
                            <ArrowRight size={18} />
                        </motion.button>

                        <motion.button
                            onClick={() => {
                                document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
                            }}
                            whileHover={{ scale: 1.03, background: 'rgba(255, 255, 255, 0.08)' }}
                            whileTap={{ scale: 0.97 }}
                            style={{
                                padding: '18px 32px',
                                borderRadius: '14px',
                                background: 'rgba(255, 255, 255, 0.04)',
                                color: 'rgba(255, 255, 255, 0.7)',
                                fontSize: '16px',
                                fontWeight: 600,
                                border: `1px solid rgba(255, 255, 255, 0.1)`,
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
                                backdropFilter: 'blur(10px)',
                                letterSpacing: '-0.01em',
                            }}
                        >
                            Our Services
                            <ChevronRight size={16} />
                        </motion.button>
                    </motion.div>

                    {/* Social proof */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.8, duration: 0.8 }}
                        style={{
                            marginTop: '80px',
                            display: 'grid',
                            gridTemplateColumns: 'repeat(3, 1fr)',
                            gap: '20px',
                            maxWidth: '680px',
                            margin: '80px auto 0',
                        }}
                    >
                        {[
                            { value: 'Custom', label: 'Every Project', icon: Palette, gradient: `linear-gradient(135deg, ${GOLD}, ${GOLD_LIGHT})` },
                            { value: '24hr', label: 'Response Time', icon: Zap, gradient: `linear-gradient(135deg, ${GOLD_LIGHT}, ${GOLD})` },
                            { value: '99.9%', label: 'Uptime', icon: Shield, gradient: `linear-gradient(135deg, ${GOLD}, ${GOLD_LIGHT})` },
                        ].map((stat, i) => (
                            <motion.div
                                key={stat.label}
                                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                transition={{ delay: 2.0 + i * 0.15, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                                whileHover={{ y: -4, scale: 1.03 }}
                                style={{
                                    position: 'relative',
                                    textAlign: 'center',
                                    padding: '28px 16px 24px',
                                    background: 'rgba(12, 12, 20, 0.6)',
                                    backdropFilter: 'blur(30px)',
                                    WebkitBackdropFilter: 'blur(30px)',
                                    border: `1px solid ${GOLD_BORDER}`,
                                    borderRadius: '20px',
                                    overflow: 'hidden',
                                    cursor: 'default',
                                    transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.borderColor = GOLD;
                                    e.currentTarget.style.boxShadow = `0 8px 32px ${GOLD_DIM}, inset 0 1px 0 rgba(255,255,255,0.06)`;
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.borderColor = GOLD_BORDER;
                                    e.currentTarget.style.boxShadow = 'none';
                                }}
                            >
                                {/* Top gold accent line */}
                                <div style={{
                                    position: 'absolute',
                                    top: 0,
                                    left: '20%',
                                    right: '20%',
                                    height: '1.5px',
                                    background: `linear-gradient(90deg, transparent, ${GOLD}, transparent)`,
                                }} />

                                {/* Icon circle */}
                                <div style={{
                                    width: '40px',
                                    height: '40px',
                                    borderRadius: '12px',
                                    background: GOLD_DIM,
                                    border: `1px solid ${GOLD_BORDER}`,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    margin: '0 auto 14px',
                                }}>
                                    <stat.icon size={18} style={{ color: GOLD_LIGHT }} />
                                </div>

                                {/* Value */}
                                <p style={{
                                    fontSize: 'clamp(22px, 3vw, 28px)',
                                    fontWeight: 800,
                                    letterSpacing: '-0.03em',
                                    background: stat.gradient,
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                    marginBottom: '6px',
                                    lineHeight: 1,
                                }}>
                                    {stat.value}
                                </p>

                                {/* Subtle gold bar */}
                                <div style={{
                                    width: '24px',
                                    height: '2px',
                                    background: `linear-gradient(90deg, transparent, ${GOLD}, transparent)`,
                                    margin: '8px auto',
                                    borderRadius: '2px',
                                }} />

                                {/* Label */}
                                <p style={{
                                    fontSize: '11px',
                                    color: '#8E95A0',
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.1em',
                                    fontWeight: 600,
                                }}>
                                    {stat.label}
                                </p>

                                {/* Background shimmer */}
                                <div style={{
                                    position: 'absolute',
                                    inset: 0,
                                    background: 'linear-gradient(135deg, rgba(255,255,255,0.02) 0%, transparent 40%, transparent 60%, rgba(255,255,255,0.01) 100%)',
                                    pointerEvents: 'none',
                                }} />
                            </motion.div>
                        ))}
                    </motion.div>
                </motion.section>

                {/* ═══════════════════════════════════════════════════
                    SERVICES SECTION
                ═══════════════════════════════════════════════════ */}
                <section
                    id="services"
                    style={{
                        position: 'relative',
                        zIndex: 10,
                        padding: '120px 24px',
                        maxWidth: '1100px',
                        margin: '0 auto',
                    }}
                >
                    <SectionHeading
                        badge="What We Do"
                        title="Built for Businesses That Refuse to Stay Behind"
                        subtitle="From custom websites to full digital transformation — we handle everything so you can focus on what matters."
                    />

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                        gap: '24px',
                    }}>
                        {SERVICES.map((service, i) => (
                            <motion.div
                                key={service.title}
                                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.15, duration: 0.7, type: 'spring', stiffness: 200, damping: 25 }}
                            >
                                <GlassCard style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                                    {/* Icon */}
                                    <div style={{
                                        width: '48px',
                                        height: '48px',
                                        borderRadius: '14px',
                                        background: GOLD_DIM,
                                        border: `1px solid ${GOLD_BORDER}`,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        marginBottom: '24px',
                                    }}>
                                        <service.icon size={22} color={GOLD} />
                                    </div>

                                    <h3 style={{
                                        fontSize: '20px',
                                        fontWeight: 700,
                                        marginBottom: '12px',
                                        letterSpacing: '-0.02em',
                                    }}>
                                        {service.title}
                                    </h3>

                                    <p style={{
                                        fontSize: '14px',
                                        lineHeight: 1.7,
                                        color: 'rgba(255, 255, 255, 0.65)',
                                        marginBottom: '24px',
                                        flex: 1,
                                    }}>
                                        {service.desc}
                                    </p>

                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                        {service.features.map((feat) => (
                                            <div key={feat} style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '10px',
                                                fontSize: '13px',
                                                color: 'rgba(255, 255, 255, 0.55)',
                                            }}>
                                                <Check size={14} color={GOLD} style={{ flexShrink: 0 }} />
                                                {feat}
                                            </div>
                                        ))}
                                    </div>
                                </GlassCard>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* ═══════════════════════════════════════════════════
                    PROCESS SECTION
                ═══════════════════════════════════════════════════ */}
                <section style={{
                    position: 'relative',
                    zIndex: 10,
                    padding: '120px 24px',
                    maxWidth: '900px',
                    margin: '0 auto',
                }}>
                    <SectionHeading
                        badge="How It Works"
                        title="From Vision to Launch in Four Steps"
                    />

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
                        {PROCESS_STEPS.map((step, i) => (
                            <motion.div
                                key={step.title}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.12, duration: 0.5 }}
                                style={{
                                    display: 'flex',
                                    alignItems: 'flex-start',
                                    gap: '24px',
                                    padding: '32px 0',
                                    borderBottom: i < PROCESS_STEPS.length - 1
                                        ? '1px solid rgba(255, 255, 255, 0.06)'
                                        : 'none',
                                }}
                            >
                                {/* Step number + icon */}
                                <div style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    gap: '8px',
                                    flexShrink: 0,
                                }}>
                                    <div style={{
                                        width: '52px',
                                        height: '52px',
                                        borderRadius: '16px',
                                        background: GOLD_DIM,
                                        border: `1px solid ${GOLD_BORDER}`,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}>
                                        <step.icon size={22} color={GOLD} />
                                    </div>
                                    <span style={{
                                        fontSize: '11px',
                                        fontWeight: 700,
                                        color: 'rgba(255, 255, 255, 0.5)',
                                        textTransform: 'uppercase',
                                        letterSpacing: '0.1em',
                                    }}>
                                        0{i + 1}
                                    </span>
                                </div>

                                <div style={{ paddingTop: '4px' }}>
                                    <h3 style={{
                                        fontSize: '18px',
                                        fontWeight: 700,
                                        marginBottom: '6px',
                                        letterSpacing: '-0.02em',
                                    }}>
                                        {step.title}
                                    </h3>
                                    <p style={{
                                        fontSize: '14px',
                                        lineHeight: 1.6,
                                        color: '#fff',
                                        textShadow: '0 2px 8px rgba(0,0,0,0.5)',
                                    }}>
                                        {step.desc}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* ═══════════════════════════════════════════════════
                    PRICING SECTION
                ═══════════════════════════════════════════════════ */}
                <section style={{
                    position: 'relative',
                    zIndex: 10,
                    padding: '120px 24px',
                    maxWidth: '1100px',
                    margin: '0 auto',
                }}>
                    <SectionHeading
                        badge="Pricing"
                        title="Transparent. Flexible. No Surprises."
                        subtitle="Every build is custom-quoted based on scope. Management plans keep your site fast, secure, and always evolving."
                    />

                    {/* Build pricing callout */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        style={{ marginBottom: '48px' }}
                    >
                        <GlassCard hover={false} style={{
                            textAlign: 'center',
                            padding: '40px 36px',
                            border: `1px solid ${GOLD_BORDER}`,
                        }}>
                            <div style={{
                                fontSize: '12px',
                                fontWeight: 700,
                                color: GOLD,
                                textTransform: 'uppercase',
                                letterSpacing: '0.12em',
                                marginBottom: '12px',
                            }}>
                                Website Builds
                            </div>
                            <h3 style={{
                                fontSize: 'clamp(24px, 4vw, 36px)',
                                fontWeight: 700,
                                letterSpacing: '-0.03em',
                                marginBottom: '12px',
                            }}>
                                Custom Quoted, Always Itemized
                            </h3>
                            <p style={{
                                fontSize: '15px',
                                color: 'rgba(255, 255, 255, 0.65)',
                                maxWidth: '500px',
                                margin: '0 auto 24px',
                                lineHeight: 1.6,
                            }}>
                                Every feature is line-itemed so you see exactly what you&apos;re paying for.
                                Over budget? We&apos;ll rework a plan that fits — no pressure, no compromises on quality.
                            </p>
                            <div style={{
                                display: 'inline-flex',
                                gap: '32px',
                                padding: '16px 32px',
                                borderRadius: '14px',
                                background: 'rgba(255, 255, 255, 0.03)',
                                border: '1px solid rgba(255, 255, 255, 0.06)',
                            }}>
                                {['Design', 'Development', 'Integrations', 'Content'].map((item) => (
                                    <span key={item} style={{
                                        fontSize: '12px',
                                        color: 'rgba(255, 255, 255, 0.7)',
                                        fontWeight: 600,
                                        textTransform: 'uppercase',
                                        letterSpacing: '0.06em',
                                    }}>
                                        {item}
                                    </span>
                                ))}
                            </div>
                        </GlassCard>
                    </motion.div>

                    {/* Management tiers */}
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                        gap: '24px',
                    }}>
                        {MANAGEMENT_TIERS.map((tier, i) => (
                            <motion.div
                                key={tier.name}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.15, duration: 0.6 }}
                            >
                                <GlassCard style={{
                                    height: '100%',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    border: tier.popular
                                        ? `1px solid ${GOLD_BORDER}`
                                        : `1px solid ${GLASS_BORDER}`,
                                    position: 'relative',
                                    overflow: 'hidden',
                                    animation: tier.popular ? 'caelPulse 4s ease-in-out infinite' : 'none',
                                }}>
                                    {/* Popular badge */}
                                    {tier.popular && (
                                        <div style={{
                                            position: 'absolute',
                                            top: '16px',
                                            right: '16px',
                                            padding: '4px 12px',
                                            borderRadius: '100px',
                                            background: GOLD_DIM,
                                            border: `1px solid ${GOLD_BORDER}`,
                                            fontSize: '10px',
                                            fontWeight: 700,
                                            color: GOLD,
                                            textTransform: 'uppercase',
                                            letterSpacing: '0.1em',
                                        }}>
                                            Most Popular
                                        </div>
                                    )}

                                    <h3 style={{
                                        fontSize: '16px',
                                        fontWeight: 700,
                                        color: tier.popular ? GOLD_LIGHT : 'rgba(255, 255, 255, 0.7)',
                                        marginBottom: '8px',
                                        letterSpacing: '-0.01em',
                                    }}>
                                        {tier.name}
                                    </h3>

                                    <div style={{ marginBottom: '8px' }}>
                                        <span style={{
                                            fontSize: '20px',
                                            fontWeight: 700,
                                            letterSpacing: '-0.02em',
                                            background: tier.popular
                                                ? `linear-gradient(135deg, ${GOLD_LIGHT}, ${GOLD})`
                                                : 'linear-gradient(135deg, rgba(255,255,255,0.8), rgba(255,255,255,0.5))',
                                            WebkitBackgroundClip: 'text',
                                            WebkitTextFillColor: 'transparent',
                                        }}>
                                            {tier.tagline}
                                        </span>
                                    </div>

                                    <p style={{
                                        fontSize: '13px',
                                        lineHeight: 1.5,
                                        color: 'rgba(255, 255, 255, 0.55)',
                                        marginBottom: '28px',
                                    }}>
                                        {tier.desc}
                                    </p>

                                    <div style={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        gap: '12px',
                                        flex: 1,
                                    }}>
                                        {tier.features.map((feat) => (
                                            <div key={feat} style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '10px',
                                                fontSize: '13px',
                                                color: 'rgba(255, 255, 255, 0.55)',
                                            }}>
                                                <Check
                                                    size={14}
                                                    color={tier.popular ? GOLD : 'rgba(255, 255, 255, 0.3)'}
                                                    style={{ flexShrink: 0 }}
                                                />
                                                {feat}
                                            </div>
                                        ))}
                                    </div>

                                    <motion.button
                                        onClick={handleBookConsultation}
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        style={{
                                            marginTop: '28px',
                                            padding: '14px 24px',
                                            borderRadius: '12px',
                                            background: tier.popular
                                                ? `linear-gradient(135deg, ${GOLD}, #9a7f3d)`
                                                : 'rgba(255, 255, 255, 0.06)',
                                            color: tier.popular ? '#0a0a14' : 'rgba(255, 255, 255, 0.6)',
                                            border: tier.popular
                                                ? 'none'
                                                : '1px solid rgba(255, 255, 255, 0.08)',
                                            fontSize: '14px',
                                            fontWeight: 700,
                                            cursor: 'pointer',
                                            textAlign: 'center',
                                        }}
                                    >
                                        Let&apos;s Talk
                                    </motion.button>
                                </GlassCard>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* ═══════════════════════════════════════════════════
                    CONSULTATION FORM
                ═══════════════════════════════════════════════════ */}
                <AnimatePresence>
                    {showConsultation && !submitted && (
                        <motion.section
                            ref={consultRef}
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 40 }}
                            transition={{ duration: 0.5 }}
                            style={{
                                position: 'relative',
                                zIndex: 10,
                                padding: '80px 24px 120px',
                                maxWidth: '640px',
                                margin: '0 auto',
                            }}
                        >
                            <GlassCard hover={false} style={{
                                border: `1px solid ${GOLD_BORDER}`,
                            }}>
                                {/* Close button */}
                                <button
                                    onClick={() => setShowConsultation(false)}
                                    style={{
                                        position: 'absolute',
                                        top: '20px',
                                        right: '20px',
                                        width: '32px',
                                        height: '32px',
                                        borderRadius: '50%',
                                        background: 'rgba(255, 255, 255, 0.06)',
                                        border: '1px solid rgba(255, 255, 255, 0.1)',
                                        color: 'rgba(255, 255, 255, 0.65)',
                                        cursor: 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}
                                >
                                    <X size={14} />
                                </button>

                                <h2 style={{
                                    fontSize: '28px',
                                    fontWeight: 700,
                                    letterSpacing: '-0.03em',
                                    marginBottom: '8px',
                                }}>
                                    Let&apos;s Build Something
                                </h2>
                                <p style={{
                                    fontSize: '14px',
                                    color: 'rgba(255, 255, 255, 0.65)',
                                    marginBottom: '36px',
                                    lineHeight: 1.6,
                                }}>
                                    Tell us a bit about your business and we&apos;ll reach out within 24 hours.
                                </p>

                                {/* Business Type */}
                                <div style={{ marginBottom: '32px' }}>
                                    <label style={{
                                        display: 'block',
                                        fontSize: '12px',
                                        fontWeight: 700,
                                        color: 'rgba(255, 255, 255, 0.55)',
                                        textTransform: 'uppercase',
                                        letterSpacing: '0.08em',
                                        marginBottom: '14px',
                                    }}>
                                        What type of business do you run?
                                    </label>
                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                                        {BUSINESS_TYPES.map((bt) => (
                                            <motion.button
                                                key={bt.label}
                                                onClick={() => setBusinessType(bt.label)}
                                                whileHover={{ scale: 1.04 }}
                                                whileTap={{ scale: 0.96 }}
                                                style={{
                                                    padding: '10px 18px',
                                                    borderRadius: '12px',
                                                    border: businessType === bt.label
                                                        ? `1px solid ${GOLD}`
                                                        : '1px solid rgba(255, 255, 255, 0.08)',
                                                    background: businessType === bt.label
                                                        ? GOLD_DIM
                                                        : 'rgba(255, 255, 255, 0.04)',
                                                    color: businessType === bt.label
                                                        ? GOLD_LIGHT
                                                        : 'rgba(255, 255, 255, 0.5)',
                                                    fontWeight: businessType === bt.label ? 700 : 500,
                                                    fontSize: '13px',
                                                    cursor: 'pointer',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: '6px',
                                                    transition: 'all 0.2s ease',
                                                }}
                                            >
                                                <span style={{ fontSize: '16px' }}>{bt.emoji}</span>
                                                {bt.label}
                                            </motion.button>
                                        ))}
                                    </div>
                                </div>

                                {/* Interest */}
                                <div style={{ marginBottom: '36px' }}>
                                    <label style={{
                                        display: 'block',
                                        fontSize: '12px',
                                        fontWeight: 700,
                                        color: 'rgba(255, 255, 255, 0.55)',
                                        textTransform: 'uppercase',
                                        letterSpacing: '0.08em',
                                        marginBottom: '14px',
                                    }}>
                                        What are you interested in?
                                    </label>
                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                                        {INTEREST_OPTIONS.map((opt) => (
                                            <motion.button
                                                key={opt.label}
                                                onClick={() => setInterest(opt.label)}
                                                whileHover={{ scale: 1.04 }}
                                                whileTap={{ scale: 0.96 }}
                                                style={{
                                                    padding: '10px 18px',
                                                    borderRadius: '12px',
                                                    border: interest === opt.label
                                                        ? `1px solid ${GOLD}`
                                                        : '1px solid rgba(255, 255, 255, 0.08)',
                                                    background: interest === opt.label
                                                        ? GOLD_DIM
                                                        : 'rgba(255, 255, 255, 0.04)',
                                                    color: interest === opt.label
                                                        ? GOLD_LIGHT
                                                        : 'rgba(255, 255, 255, 0.5)',
                                                    fontWeight: interest === opt.label ? 700 : 500,
                                                    fontSize: '13px',
                                                    cursor: 'pointer',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: '6px',
                                                    transition: 'all 0.2s ease',
                                                }}
                                            >
                                                <span style={{ fontSize: '16px' }}>{opt.emoji}</span>
                                                {opt.label}
                                            </motion.button>
                                        ))}
                                    </div>
                                </div>

                                {/* Submit */}
                                <motion.button
                                    onClick={handleSubmitConsultation}
                                    disabled={!businessType || !interest}
                                    whileHover={businessType && interest ? {
                                        scale: 1.02,
                                        boxShadow: `0 16px 48px rgba(201, 169, 110, 0.3)`,
                                    } : {}}
                                    whileTap={businessType && interest ? { scale: 0.98 } : {}}
                                    style={{
                                        width: '100%',
                                        padding: '16px',
                                        borderRadius: '14px',
                                        background: businessType && interest
                                            ? `linear-gradient(135deg, ${GOLD}, #9a7f3d)`
                                            : 'rgba(255, 255, 255, 0.06)',
                                        color: businessType && interest
                                            ? '#0a0a14'
                                            : 'rgba(255, 255, 255, 0.2)',
                                        fontSize: '15px',
                                        fontWeight: 700,
                                        border: 'none',
                                        cursor: businessType && interest ? 'pointer' : 'not-allowed',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        gap: '10px',
                                        boxShadow: businessType && interest
                                            ? `0 8px 30px rgba(201, 169, 110, 0.2)`
                                            : 'none',
                                        transition: 'all 0.3s ease',
                                    }}
                                >
                                    <Send size={16} />
                                    Request Consultation
                                </motion.button>
                            </GlassCard>
                        </motion.section>
                    )}
                </AnimatePresence>

                {/* ═══════════════════════════════════════════════════
                    SUCCESS STATE
                ═══════════════════════════════════════════════════ */}
                <AnimatePresence>
                    {submitted && (
                        <motion.section
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5 }}
                            style={{
                                position: 'relative',
                                zIndex: 10,
                                padding: '80px 24px 120px',
                                textAlign: 'center',
                                maxWidth: '500px',
                                margin: '0 auto',
                            }}
                        >
                            <GlassCard hover={false} style={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                border: `1px solid ${GOLD_BORDER}`,
                            }}>
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
                                    style={{
                                        width: '72px',
                                        height: '72px',
                                        borderRadius: '50%',
                                        background: `linear-gradient(135deg, ${GOLD}, #9a7f3d)`,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        marginBottom: '24px',
                                        boxShadow: `0 12px 40px rgba(201, 169, 110, 0.25)`,
                                    }}
                                >
                                    <Check size={32} color="#0a0a14" />
                                </motion.div>
                                <h2 style={{
                                    fontSize: '26px',
                                    fontWeight: 700,
                                    letterSpacing: '-0.03em',
                                    marginBottom: '12px',
                                }}>
                                    We&apos;ll be in touch.
                                </h2>
                                <p style={{
                                    fontSize: '15px',
                                    color: 'rgba(255, 255, 255, 0.65)',
                                    lineHeight: 1.6,
                                }}>
                                    Our team will reach out within 24 hours to schedule your consultation.
                                    <br />
                                    Welcome to Caelborne.
                                </p>
                            </GlassCard>
                        </motion.section>
                    )}
                </AnimatePresence>

                {/* ═══════════════════════════════════════════════════
                    BOTTOM CTA
                ═══════════════════════════════════════════════════ */}
                {!showConsultation && !submitted && (
                    <section style={{
                        position: 'relative',
                        zIndex: 10,
                        padding: '80px 24px 120px',
                        textAlign: 'center',
                    }}>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            style={{
                                maxWidth: '600px',
                                margin: '0 auto',
                            }}
                        >
                            <div style={{
                                width: '60px',
                                height: '2px',
                                background: `linear-gradient(90deg, transparent, ${GOLD}, transparent)`,
                                margin: '0 auto 32px',
                            }} />
                            <h2 style={{
                                fontSize: 'clamp(24px, 4vw, 36px)',
                                fontWeight: 700,
                                letterSpacing: '-0.03em',
                                marginBottom: '16px',
                            }}>
                                Ready to Modernize?
                            </h2>
                            <p style={{
                                fontSize: '15px',
                                lineHeight: 1.7,
                                color: '#fff',
                                textShadow: '0 2px 8px rgba(0,0,0,0.5)',
                                marginBottom: '36px',
                            }}>
                                Every great digital presence starts with a conversation.
                            </p>
                            <motion.button
                                onClick={handleBookConsultation}
                                whileHover={{
                                    scale: 1.03,
                                    boxShadow: `0 20px 60px rgba(201, 169, 110, 0.25)`,
                                }}
                                whileTap={{ scale: 0.97 }}
                                style={{
                                    padding: '18px 48px',
                                    borderRadius: '14px',
                                    background: `linear-gradient(135deg, ${GOLD}, #9a7f3d)`,
                                    color: '#0a0a14',
                                    fontSize: '16px',
                                    fontWeight: 700,
                                    border: 'none',
                                    cursor: 'pointer',
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '10px',
                                    boxShadow: `0 12px 40px rgba(201, 169, 110, 0.2)`,
                                }}
                            >
                                Book a Consultation
                                <ArrowRight size={18} />
                            </motion.button>
                        </motion.div>
                    </section>
                )}

                {/* Footer note */}
                <div style={{
                    position: 'relative',
                    zIndex: 10,
                    textAlign: 'center',
                    padding: '0 24px 60px',
                }}>
                    <p style={{
                        fontSize: '12px',
                        color: 'rgba(255, 255, 255, 0.15)',
                        letterSpacing: '0.04em',
                    }}>
                        Caelborne Digital · Modernizing businesses, one pixel at a time.
                    </p>
                </div>
            </div>
        </>
    );
}
