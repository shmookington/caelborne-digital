'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { CosmicBackground } from '@/components/CosmicBackground';
import { ArrowRight, Gem, Zap, Heart, Code2, Search, PenTool, Rocket, Palette, Shield } from 'lucide-react';
import Link from 'next/link';

// ─── Design Tokens ──────────────────────────────────────────────

const GOLD = '#8B7332';
const GOLD_LIGHT = '#BFA265';
const GOLD_DIM = 'rgba(139, 115, 50, 0.2)';
const GOLD_BORDER = 'rgba(139, 115, 50, 0.35)';
const GLASS_BG = 'rgba(12, 12, 20, 0.55)';
const GLASS_BORDER = 'rgba(255, 255, 255, 0.06)';
const GLASS_HIGHLIGHT = 'rgba(255, 255, 255, 0.03)';

// ─── Animation Presets ──────────────────────────────────────────

const fadeUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const },
};

const stagger = (delay: number) => ({
    ...fadeUp,
    transition: { ...fadeUp.transition, delay },
});

// ─── Page ───────────────────────────────────────────────────────

export default function AboutPage() {
    return (
        <>
            <CosmicBackground />

            <div className="min-h-screen text-white relative">
                {/* ═══════════════════════════════════════════════
                    HERO — We're Caelborne
                ═══════════════════════════════════════════════ */}
                <section
                    className="relative z-10 flex flex-col justify-center items-center px-6"
                    style={{
                        minHeight: '80vh',
                        paddingTop: '120px',
                        paddingBottom: '80px',
                    }}
                >
                    {/* Badge */}
                    <motion.div
                        {...stagger(0.2)}
                        style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '8px',
                            padding: '8px 20px',
                            borderRadius: '100px',
                            background: GOLD_DIM,
                            border: `1px solid ${GOLD_BORDER}`,
                            marginBottom: '40px',
                            fontSize: '11px',
                            fontWeight: 600,
                            color: GOLD,
                            letterSpacing: '0.12em',
                            textTransform: 'uppercase',
                        }}
                    >
                        <Gem size={12} />
                        Our Story
                    </motion.div>

                    {/* Main heading */}
                    <motion.h1
                        {...stagger(0.3)}
                        style={{
                            fontSize: 'clamp(40px, 8vw, 80px)',
                            fontWeight: 700,
                            lineHeight: 1,
                            letterSpacing: '-0.04em',
                            textAlign: 'center',
                            marginBottom: '28px',
                        }}
                    >
                        We&apos;re{' '}
                        <span
                            style={{
                                background: `linear-gradient(90deg, ${GOLD_LIGHT}, ${GOLD}, ${GOLD_LIGHT})`,
                                backgroundSize: '200% 100%',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                animation: 'aboutShimmer 4s ease-in-out infinite',
                            }}
                        >
                            Caelborne
                        </span>
                        <style dangerouslySetInnerHTML={{
                            __html: `
                            @keyframes aboutShimmer {
                                0% { background-position: -200% center; }
                                100% { background-position: 200% center; }
                            }
                            @keyframes processLine {
                                0% { transform: scaleX(0); }
                                100% { transform: scaleX(1); }
                            }
                        `}} />
                    </motion.h1>

                    {/* Subtitle */}
                    <motion.p
                        {...stagger(0.45)}
                        style={{
                            fontSize: 'clamp(16px, 2.5vw, 22px)',
                            fontWeight: 400,
                            lineHeight: 1.7,
                            color: 'rgba(255, 255, 255, 0.75)',
                            maxWidth: '580px',
                            textAlign: 'center',
                            letterSpacing: '-0.01em',
                        }}
                    >
                        A digital modernization studio that believes every business deserves
                        technology as ambitious as the people behind it.
                    </motion.p>
                </section>

                {/* ═══════════════════════════════════════════════
                    PROCESS — Our Approach
                ═══════════════════════════════════════════════ */}
                <section
                    className="relative z-10"
                    style={{ padding: '0 24px 80px', maxWidth: '800px', margin: '0 auto' }}
                >
                    <motion.div
                        {...fadeUp}
                        style={{ textAlign: 'center', marginBottom: '48px' }}
                    >
                        <p style={{
                            fontSize: '11px',
                            fontWeight: 600,
                            color: GOLD,
                            letterSpacing: '0.15em',
                            textTransform: 'uppercase',
                            marginBottom: '14px',
                        }}>
                            Our Process
                        </p>
                        <h2 style={{
                            fontSize: 'clamp(24px, 4vw, 34px)',
                            fontWeight: 700,
                            letterSpacing: '-0.03em',
                        }}>
                            Three steps. One vision.
                        </h2>
                    </motion.div>

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(3, 1fr)',
                        gap: '0',
                        position: 'relative',
                    }}>
                        {[
                            { icon: Search, step: '01', title: 'Discover', desc: 'We learn your business, your audience, and your goals.' },
                            { icon: PenTool, step: '02', title: 'Design', desc: 'We craft a custom solution tailored to your brand.' },
                            { icon: Rocket, step: '03', title: 'Deliver', desc: 'We build, test, launch, and continue to optimize.' },
                        ].map((item, i) => (
                            <motion.div
                                key={item.step}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.2, duration: 0.6, ease: [0.16, 1, 0.3, 1] as const }}
                                style={{ textAlign: 'center', position: 'relative', padding: '0 12px' }}
                            >
                                {/* Connecting line */}
                                {i < 2 && (
                                    <div style={{
                                        position: 'absolute',
                                        top: '24px',
                                        right: '-50%',
                                        width: '100%',
                                        height: '1px',
                                        background: `linear-gradient(90deg, ${GOLD_BORDER}, rgba(255,255,255,0.06))`,
                                        transformOrigin: 'left',
                                        zIndex: 0,
                                    }} />
                                )}
                                {/* Step number */}
                                <div style={{
                                    width: '48px',
                                    height: '48px',
                                    borderRadius: '50%',
                                    background: GOLD_DIM,
                                    border: `1px solid ${GOLD_BORDER}`,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    margin: '0 auto 16px',
                                    position: 'relative',
                                    zIndex: 1,
                                }}>
                                    <item.icon size={20} color={GOLD} />
                                </div>
                                <p style={{ fontSize: '10px', fontWeight: 700, color: GOLD, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '6px' }}>
                                    {item.step}
                                </p>
                                <h3 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '8px', letterSpacing: '-0.02em' }}>
                                    {item.title}
                                </h3>
                                <p style={{ fontSize: '13px', lineHeight: 1.6, color: '#B0B8C4' }}>
                                    {item.desc}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* ═══════════════════════════════════════════════
                    STATS — By the Numbers
                ═══════════════════════════════════════════════ */}
                <section
                    className="relative z-10"
                    style={{ padding: '0 24px 80px', maxWidth: '700px', margin: '0 auto' }}
                >
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(3, 1fr)',
                        gap: '20px',
                        textAlign: 'center',
                    }}>
                        {[
                            { value: 'Custom', label: 'Every Project', icon: Palette, gradient: `linear-gradient(135deg, ${GOLD}, ${GOLD_LIGHT})` },
                            { value: '24hr', label: 'Response Time', icon: Zap, gradient: `linear-gradient(135deg, ${GOLD_LIGHT}, ${GOLD})` },
                            { value: '99.9%', label: 'Uptime', icon: Shield, gradient: `linear-gradient(135deg, ${GOLD}, ${GOLD_LIGHT})` },
                        ].map((stat, i) => (
                            <motion.div
                                key={stat.label}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.15, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                                whileHover={{ y: -4, scale: 1.03 }}
                                style={{
                                    position: 'relative',
                                    padding: '28px 16px 24px',
                                    background: GLASS_BG,
                                    backdropFilter: 'blur(30px)',
                                    WebkitBackdropFilter: 'blur(30px)',
                                    border: `1px solid ${GOLD_BORDER}`,
                                    borderRadius: '20px',
                                    boxShadow: `0 4px 20px rgba(0,0,0,0.2), inset 0 1px 0 ${GLASS_HIGHLIGHT}`,
                                    overflow: 'hidden',
                                    cursor: 'default',
                                    transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.borderColor = GOLD;
                                    e.currentTarget.style.boxShadow = `0 8px 32px rgba(139,115,50,0.2), inset 0 1px 0 rgba(255,255,255,0.06)`;
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.borderColor = GOLD_BORDER;
                                    e.currentTarget.style.boxShadow = `0 4px 20px rgba(0,0,0,0.2), inset 0 1px 0 ${GLASS_HIGHLIGHT}`;
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
                                    fontSize: 'clamp(22px, 3vw, 30px)',
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
                    </div>
                </section>

                {/* ═══════════════════════════════════════════════
                    STORY — Why We Exist
                ═══════════════════════════════════════════════ */}
                <section
                    className="relative z-10"
                    style={{ padding: '40px 24px 120px', maxWidth: '800px', margin: '0 auto' }}
                >
                    <motion.div
                        {...fadeUp}
                        style={{
                            background: GLASS_BG,
                            backdropFilter: 'blur(40px)',
                            WebkitBackdropFilter: 'blur(40px)',
                            border: `1px solid ${GLASS_BORDER}`,
                            borderRadius: '28px',
                            padding: 'clamp(32px, 5vw, 56px)',
                            boxShadow: `0 8px 40px rgba(0, 0, 0, 0.3), inset 0 1px 0 ${GLASS_HIGHLIGHT}`,
                        }}
                    >
                        {/* Gold accent */}
                        <div style={{
                            width: '40px',
                            height: '2px',
                            background: `linear-gradient(90deg, ${GOLD}, transparent)`,
                            marginBottom: '28px',
                        }} />

                        <h2 style={{
                            fontSize: 'clamp(22px, 3vw, 30px)',
                            fontWeight: 700,
                            letterSpacing: '-0.03em',
                            marginBottom: '20px',
                            lineHeight: 1.2,
                        }}>
                            Built Different,{' '}
                            <span style={{ color: GOLD_LIGHT }}>On Purpose</span>
                        </h2>

                        <div style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '16px',
                            fontSize: 'clamp(15px, 2vw, 17px)',
                            lineHeight: 1.8,
                            color: 'rgba(255, 255, 255, 0.7)',
                        }}>
                            <p>
                                Most businesses are stuck between two options: expensive agencies that
                                over-promise and under-deliver, or DIY tools that produce generic,
                                forgettable results. We started Caelborne because we believed there
                                should be a third path.
                            </p>
                            <p>
                                We&apos;re a small, intentional studio that combines the craft of a
                                boutique agency with the speed and transparency of modern engineering.
                                Every project we take on gets the same obsessive attention to detail —
                                from the first pixel to the last line of code.
                            </p>
                            <p style={{ color: 'rgba(255,255,255,0.85)' }}>
                                No templates. No shortcuts. Just technology that feels like{' '}
                                <span style={{ color: GOLD_LIGHT, fontWeight: 500 }}>yours</span>.
                            </p>
                        </div>
                    </motion.div>
                </section>

                {/* ═══════════════════════════════════════════════
                    VALUES — What We Believe
                ═══════════════════════════════════════════════ */}
                <section
                    className="relative z-10"
                    style={{ padding: '0 24px 120px', maxWidth: '900px', margin: '0 auto' }}
                >
                    <motion.div
                        {...fadeUp}
                        style={{ textAlign: 'center', marginBottom: '56px' }}
                    >
                        <p style={{
                            fontSize: '11px',
                            fontWeight: 600,
                            color: GOLD,
                            letterSpacing: '0.15em',
                            textTransform: 'uppercase',
                            marginBottom: '16px',
                        }}>
                            Our Principles
                        </p>
                        <h2 style={{
                            fontSize: 'clamp(26px, 4vw, 38px)',
                            fontWeight: 700,
                            letterSpacing: '-0.03em',
                        }}>
                            What Drives Us
                        </h2>
                    </motion.div>

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                        gap: '20px',
                    }}>
                        {[
                            {
                                icon: Heart,
                                title: 'Craft Over Speed',
                                desc: 'We take the time to get it right. Every detail is considered, every interaction is polished, every line of code is intentional.',
                            },
                            {
                                icon: Code2,
                                title: 'Radical Transparency',
                                desc: 'No hidden fees, no scope creep surprises. You\'ll always know exactly where your project stands and what it costs.',
                            },
                            {
                                icon: Zap,
                                title: 'Future-Built',
                                desc: 'We use the most modern tools available — not because they\'re trendy, but because they make your product faster, safer, and easier to grow.',
                            },
                        ].map((value, i) => (
                            <motion.div
                                key={value.title}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.12, duration: 0.6, ease: [0.16, 1, 0.3, 1] as const }}
                                whileHover={{ y: -4, transition: { duration: 0.3 } }}
                                style={{
                                    background: GLASS_BG,
                                    backdropFilter: 'blur(40px)',
                                    WebkitBackdropFilter: 'blur(40px)',
                                    border: `1px solid ${GLASS_BORDER}`,
                                    borderRadius: '24px',
                                    padding: '36px',
                                    boxShadow: `0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 ${GLASS_HIGHLIGHT}`,
                                }}
                            >
                                <div style={{
                                    width: '44px',
                                    height: '44px',
                                    borderRadius: '12px',
                                    background: GOLD_DIM,
                                    border: `1px solid ${GOLD_BORDER}`,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    marginBottom: '20px',
                                }}>
                                    <value.icon size={20} color={GOLD} />
                                </div>
                                <h3 style={{
                                    fontSize: '18px',
                                    fontWeight: 700,
                                    marginBottom: '10px',
                                    letterSpacing: '-0.02em',
                                }}>
                                    {value.title}
                                </h3>
                                <p style={{
                                    fontSize: '14px',
                                    lineHeight: 1.7,
                                    color: 'rgba(255, 255, 255, 0.65)',
                                }}>
                                    {value.desc}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* ═══════════════════════════════════════════════
                    CTA — Ready to Work Together?
                ═══════════════════════════════════════════════ */}
                <section
                    className="relative z-10"
                    style={{ padding: '0 24px 120px', textAlign: 'center' }}
                >
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <div style={{
                            width: '40px',
                            height: '2px',
                            background: `linear-gradient(90deg, transparent, ${GOLD}, transparent)`,
                            margin: '0 auto 28px',
                        }} />
                        <h2 style={{
                            fontSize: 'clamp(24px, 4vw, 36px)',
                            fontWeight: 700,
                            letterSpacing: '-0.03em',
                            marginBottom: '16px',
                        }}>
                            Ready to work together?
                        </h2>
                        <p style={{
                            fontSize: '15px',
                            color: '#B0B8C4',
                            marginBottom: '32px',
                            maxWidth: '400px',
                            margin: '0 auto 32px',
                            lineHeight: 1.6,
                        }}>
                            Tell us about your project and we&apos;ll show you what&apos;s possible.
                        </p>
                        <Link href="/business" style={{ textDecoration: 'none' }}>
                            <motion.button
                                whileHover={{
                                    scale: 1.03,
                                    boxShadow: `0 16px 48px rgba(201, 169, 110, 0.25)`,
                                }}
                                whileTap={{ scale: 0.97 }}
                                style={{
                                    padding: '16px 40px',
                                    borderRadius: '14px',
                                    background: `linear-gradient(135deg, ${GOLD}, #9a7f3d)`,
                                    color: '#0a0a14',
                                    fontSize: '15px',
                                    fontWeight: 700,
                                    border: 'none',
                                    cursor: 'pointer',
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '8px',
                                    boxShadow: `0 8px 32px rgba(201, 169, 110, 0.15)`,
                                }}
                            >
                                Get in Touch
                                <ArrowRight size={16} />
                            </motion.button>
                        </Link>
                    </motion.div>
                </section>

                {/* Footer */}
                <footer className="relative z-10" style={{ padding: '0 24px 40px' }}>
                    <div style={{
                        maxWidth: '800px',
                        margin: '0 auto 32px',
                        height: '1px',
                        background: `linear-gradient(90deg, transparent, ${GOLD_BORDER}, transparent)`,
                    }} />
                    <p style={{
                        fontSize: '11px',
                        color: 'rgba(255, 255, 255, 0.12)',
                        letterSpacing: '0.04em',
                        textAlign: 'center',
                    }}>
                        © 2026 Caelborne Digital. All rights reserved.
                    </p>
                </footer>
            </div>
        </>
    );
}
