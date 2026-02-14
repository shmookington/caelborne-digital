'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { CosmicBackground } from '@/components/CosmicBackground';
import {
    ArrowRight,
    Sparkles,
    Palette,
    TrendingUp,
    Users,
    Shield,
    Zap,
    BarChart3,
} from 'lucide-react';
import Link from 'next/link';
import { Outfit } from 'next/font/google';

const outfit = Outfit({ subsets: ['latin'], weight: ['400', '500', '600', '700', '800'] });

// ─── Design Tokens ──────────────────────────────────────────────
const GOLD = '#C5A044';
const GOLD_LIGHT = '#DAC06A';
const GLASS_BG = 'rgba(12, 12, 20, 0.82)';
const GLASS_BORDER = 'rgba(255, 255, 255, 0.08)';

export default function BusinessPage() {
    const highlights = [
        { icon: Palette, label: 'Custom Design' },
        { icon: TrendingUp, label: 'Growth Strategy' },
        { icon: Users, label: 'Customer Retention' },
        { icon: Shield, label: 'Fully Managed' },
    ];

    return (
        <div className={outfit.className}>
            <CosmicBackground />

            <div style={{
                minHeight: '100vh',
                position: 'relative',
                zIndex: 10,
                color: '#fff',
                display: 'flex',
                flexDirection: 'column',
                paddingTop: '72px',
                textShadow: '0 2px 8px rgba(0,0,0,0.5)',
            }}>

                {/* ═══════════════════════════════════════
                    HERO — full-height centered
                ═══════════════════════════════════════ */}
                <section style={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    textAlign: 'center',
                    padding: '60px 24px 40px',
                    maxWidth: '720px',
                    margin: '0 auto',
                    width: '100%',
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
                            padding: '8px 20px',
                            borderRadius: '100px',
                            background: 'rgba(12, 12, 20, 0.6)',
                            border: '1px solid rgba(255,255,255,0.15)',
                            marginBottom: '32px',
                            fontSize: '11px',
                            fontWeight: 600,
                            color: '#fff',
                            letterSpacing: '0.12em',
                            textTransform: 'uppercase',
                        }}
                    >
                        <Sparkles size={12} />
                        For Business
                    </motion.div>

                    {/* Headline */}
                    <motion.h1
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                        style={{
                            fontSize: 'clamp(36px, 6vw, 64px)',
                            fontWeight: 800,
                            color: '#fff',
                            letterSpacing: '-0.03em',
                            lineHeight: 1.05,
                            marginBottom: '20px',
                        }}
                    >
                        Grow Your Business.{' '}
                        <span style={{ color: GOLD_LIGHT }}>Digitally.</span>
                    </motion.h1>

                    {/* Subtitle */}
                    <motion.p
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                        style={{
                            fontSize: 'clamp(16px, 2.5vw, 20px)',
                            color: '#fff',
                            lineHeight: 1.6,
                            maxWidth: '520px',
                            margin: '0 auto 36px',
                        }}
                    >
                        Custom websites, loyalty platforms, and digital modernization — tailored to your business.
                    </motion.p>

                    {/* Highlight pills */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.4 }}
                        style={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            gap: '10px',
                            justifyContent: 'center',
                            marginBottom: '40px',
                        }}
                    >
                        {highlights.map((h) => (
                            <div
                                key={h.label}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '8px',
                                    padding: '8px 16px',
                                    borderRadius: '100px',
                                    background: GLASS_BG,
                                    border: `1px solid ${GLASS_BORDER}`,
                                    fontSize: '13px',
                                    fontWeight: 500,
                                    color: '#fff',
                                }}
                            >
                                <h.icon size={14} style={{ color: GOLD_LIGHT }} />
                                {h.label}
                            </div>
                        ))}
                    </motion.div>

                    {/* Primary CTA — pushes into questionnaire */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.4 }}
                        style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}
                    >
                        <Link href="/business/start" style={{ textDecoration: 'none' }}>
                            <motion.button
                                whileHover={{ scale: 1.04 }}
                                whileTap={{ scale: 0.97 }}
                                style={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '10px',
                                    padding: '16px 36px',
                                    borderRadius: '14px',
                                    background: `linear-gradient(135deg, ${GOLD} 0%, ${GOLD_LIGHT} 100%)`,
                                    color: '#0a0a14',
                                    fontSize: '15px',
                                    fontWeight: 700,
                                    border: 'none',
                                    cursor: 'pointer',
                                    letterSpacing: '-0.01em',
                                    boxShadow: '0 8px 30px rgba(197, 160, 68, 0.35)',
                                    textShadow: 'none',
                                }}
                            >
                                Let&apos;s Build Yours
                                <ArrowRight size={18} />
                            </motion.button>
                        </Link>

                        <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', justifyContent: 'center' }}>
                            <Link href="/business/saas" style={{
                                fontSize: '13px',
                                color: 'rgba(255,255,255,0.55)',
                                textDecoration: 'none',
                                transition: 'color 0.2s ease',
                            }}>
                                View Services →
                            </Link>
                            <Link href="/business/register" style={{
                                fontSize: '13px',
                                color: GOLD_LIGHT,
                                textDecoration: 'none',
                                fontWeight: 600,
                                transition: 'color 0.2s ease',
                            }}>
                                Register Your Business →
                            </Link>
                            <Link href="/dashboard" style={{
                                fontSize: '13px',
                                color: 'rgba(255,255,255,0.55)',
                                textDecoration: 'none',
                                transition: 'color 0.2s ease',
                            }}>
                                Already a partner? Dashboard →
                            </Link>
                        </div>
                    </motion.div>
                </section>

                {/* ═══════════════════════════════════════
                    TRUST INDICATORS
                ═══════════════════════════════════════ */}
                <section style={{ padding: '0 24px 60px', maxWidth: '600px', margin: '0 auto' }}>
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            gap: '40px',
                            flexWrap: 'wrap',
                        }}
                    >
                        {[
                            { icon: Zap, value: '24hr', label: 'Response' },
                            { icon: BarChart3, value: 'Custom', label: 'Every Build' },
                            { icon: Shield, value: '99.9%', label: 'Uptime' },
                        ].map((stat) => (
                            <div key={stat.label} style={{ textAlign: 'center' }}>
                                <stat.icon size={18} style={{ color: GOLD_LIGHT, margin: '0 auto 8px', display: 'block' }} />
                                <div style={{
                                    fontSize: '22px',
                                    fontWeight: 800,
                                    color: '#fff',
                                    letterSpacing: '-0.02em',
                                }}>
                                    {stat.value}
                                </div>
                                <div style={{
                                    fontSize: '12px',
                                    color: 'rgba(255,255,255,0.5)',
                                    fontWeight: 500,
                                    marginTop: '2px',
                                }}>
                                    {stat.label}
                                </div>
                            </div>
                        ))}
                    </motion.div>
                </section>

                {/* Footer */}
                <footer style={{ padding: '0 24px 40px', textAlign: 'center' }}>
                    <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.2)' }}>
                        © 2026 Caelborne Digital
                    </p>
                </footer>
            </div>
        </div>
    );
}
