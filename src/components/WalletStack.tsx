'use client';

import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, QrCode, TrendingUp, Gift, Zap, Store } from 'lucide-react';
import Link from 'next/link';

// Card content types
interface WalletCardContent {
    type: 'logo' | 'text' | 'cta' | 'feature' | 'step';
    content?: string;
    subtext?: string;
    // For feature cards
    icon?: 'qr' | 'trending' | 'gift' | 'zap';
    title?: string;
    desc?: string;
    // For step cards
    step?: string;
}

export interface WalletStackRef {
    cardRefs: (HTMLDivElement | null)[];
    glowRef: HTMLDivElement | null;
}

interface WalletStackProps {
    cards: WalletCardContent[];
    user?: any;
    accentColor?: string;
}

// Single wallet card - uses same styling as original DigitalCard
const WalletCard = forwardRef<HTMLDivElement, {
    content: WalletCardContent;
    index: number;
    total: number;
    user?: any;
    accentColor: string;
}>(({ content, index, total, user, accentColor }, ref) => {
    return (
        <div
            ref={ref}
            className="absolute top-0 left-0 w-full h-full rounded-[28px] overflow-hidden will-change-transform"
            style={{
                // Dark glass — smoky translucent with depth
                background: `
                    linear-gradient(
                        160deg,
                        rgba(20, 15, 35, 0.85) 0%,
                        rgba(15, 12, 30, 0.80) 30%,
                        rgba(25, 18, 45, 0.75) 60%,
                        rgba(18, 14, 32, 0.82) 100%
                    )
                `,
                backdropFilter: 'blur(40px) saturate(1.6)',
                WebkitBackdropFilter: 'blur(40px) saturate(1.6)',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                boxShadow: `
                    0 25px 60px -12px rgba(0, 0, 0, 0.6),
                    0 12px 30px -8px rgba(0, 0, 0, 0.4),
                    0 0 0 0.5px rgba(255, 255, 255, 0.08),
                    0 0 40px -10px rgba(168, 85, 247, 0.15),
                    inset 0 1px 0 rgba(255, 255, 255, 0.15),
                    inset 0 -1px 0 rgba(255, 255, 255, 0.05)
                `,
                zIndex: total - index,
            }}
        >
            {/* === ALL KEYFRAMES — single style block === */}
            <style dangerouslySetInnerHTML={{
                __html: `
                @keyframes cardShimmer {
                    0% { transform: translateX(-100%); }
                    100% { transform: translateX(100%); }
                }
                @keyframes cardShimmer2 {
                    0% { transform: translateX(100%); }
                    100% { transform: translateX(-100%); }
                }
                @keyframes cardShimmer3 {
                    0% { transform: translateX(-100%) skewX(-5deg); }
                    100% { transform: translateX(100%) skewX(-5deg); }
                }
                @keyframes holoShift {
                    0% { background-position: 0% 50%; filter: hue-rotate(0deg); }
                    50% { background-position: 100% 50%; filter: hue-rotate(180deg); }
                    100% { background-position: 0% 50%; filter: hue-rotate(360deg); }
                }
                @keyframes borderSpin {
                    0% { --border-angle: 0deg; filter: hue-rotate(0deg) blur(0.5px); }
                    100% { --border-angle: 360deg; filter: hue-rotate(360deg) blur(0.5px); }
                }
                @keyframes sparkle {
                    0%, 100% { opacity: 0; transform: scale(0); }
                    50% { opacity: 1; transform: scale(1); }
                }
                @keyframes floatUp {
                    0% { transform: translateY(0) translateX(0); }
                    33% { transform: translateY(-8px) translateX(3px); }
                    66% { transform: translateY(-4px) translateX(-2px); }
                    100% { transform: translateY(0) translateX(0); }
                }
            `}} />

            {/* L1: Animated rainbow border — vivid conic rotation */}
            <div
                className="absolute -inset-[1.5px] rounded-[29px] pointer-events-none"
                style={{
                    background: `conic-gradient(
                        from 0deg,
                        #a855f7, #ec4899, #3b82f6, #10b981, #f59e0b, #ef4444, #8b5cf6, #a855f7
                    )`,
                    animation: 'borderSpin 4s linear infinite',
                    mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                    maskComposite: 'exclude',
                    WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                    WebkitMaskComposite: 'xor',
                    padding: '1.5px',
                }}
            />

            {/* L2: Outer glow bleed from border */}
            <div
                className="absolute -inset-[4px] rounded-[32px] pointer-events-none"
                style={{
                    background: `conic-gradient(
                        from 0deg,
                        rgba(168, 85, 247, 0.2), rgba(236, 72, 153, 0.15),
                        rgba(59, 130, 246, 0.15), rgba(16, 185, 129, 0.1),
                        rgba(245, 158, 11, 0.15), rgba(168, 85, 247, 0.2)
                    )`,
                    animation: 'borderSpin 4s linear infinite',
                    filter: 'blur(8px)',
                    mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                    maskComposite: 'exclude',
                    WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                    WebkitMaskComposite: 'xor',
                    padding: '6px',
                }}
            />

            {/* L3: Holographic iridescent overlay — shifts through rainbow */}
            <div
                className="absolute inset-0 rounded-[28px] pointer-events-none"
                style={{
                    background: `linear-gradient(
                        135deg,
                        rgba(168, 85, 247, 0.08) 0%,
                        rgba(236, 72, 153, 0.06) 20%,
                        rgba(59, 130, 246, 0.08) 40%,
                        rgba(16, 185, 129, 0.06) 60%,
                        rgba(245, 158, 11, 0.08) 80%,
                        rgba(168, 85, 247, 0.06) 100%
                    )`,
                    backgroundSize: '200% 200%',
                    animation: 'holoShift 6s ease-in-out infinite',
                    mixBlendMode: 'screen' as const,
                }}
            />

            {/* L4: SVG noise grain texture — premium physical feel */}
            <div
                className="absolute inset-0 rounded-[28px] pointer-events-none"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
                    backgroundSize: '128px 128px',
                    opacity: 0.03,
                    mixBlendMode: 'overlay' as const,
                }}
            />

            {/* L5: Top gloss — subtle curved highlight */}
            <div
                className="absolute inset-x-0 top-0 h-[40%] pointer-events-none"
                style={{
                    background: `linear-gradient(
                        180deg,
                        rgba(255, 255, 255, 0.15) 0%,
                        rgba(255, 255, 255, 0.06) 25%,
                        transparent 100%
                    )`,
                    borderRadius: '28px 28px 50% 50%',
                }}
            />

            {/* L6: Glass inner frame — depth layering */}
            <div
                className="absolute pointer-events-none rounded-[22px]"
                style={{
                    top: '6px',
                    left: '6px',
                    right: '6px',
                    bottom: '6px',
                    border: '0.5px solid rgba(255, 255, 255, 0.06)',
                    boxShadow: 'inset 0 0 20px rgba(168, 85, 247, 0.03)',
                }}
            />

            {/* L7: Prismatic edge highlights */}
            <div
                className="absolute left-0 top-[8%] bottom-[8%] w-[1px] pointer-events-none"
                style={{
                    background: 'linear-gradient(180deg, transparent, rgba(168, 85, 247, 0.5) 20%, rgba(236, 72, 153, 0.4) 40%, rgba(59, 130, 246, 0.4) 60%, rgba(16, 185, 129, 0.3) 80%, transparent)',
                }}
            />
            <div
                className="absolute right-0 top-[8%] bottom-[8%] w-[1px] pointer-events-none"
                style={{
                    background: 'linear-gradient(180deg, transparent, rgba(59, 130, 246, 0.3) 20%, rgba(168, 85, 247, 0.3) 40%, rgba(236, 72, 153, 0.3) 60%, rgba(245, 158, 11, 0.2) 80%, transparent)',
                }}
            />
            <div
                className="absolute top-0 left-[8%] right-[8%] h-[1px] pointer-events-none"
                style={{
                    background: 'linear-gradient(90deg, transparent, rgba(168, 85, 247, 0.3) 20%, rgba(236, 72, 153, 0.4) 50%, rgba(59, 130, 246, 0.3) 80%, transparent)',
                }}
            />
            <div
                className="absolute bottom-0 left-[8%] right-[8%] h-[1px] pointer-events-none"
                style={{
                    background: 'linear-gradient(90deg, transparent, rgba(59, 130, 246, 0.2) 20%, rgba(168, 85, 247, 0.3) 50%, rgba(236, 72, 153, 0.2) 80%, transparent)',
                }}
            />

            {/* L8: Triple shimmer system — 3 angles, 3 speeds */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-[28px]">
                {/* Primary shimmer — 110° */}
                <div style={{
                    position: 'absolute', inset: 0,
                    background: 'linear-gradient(110deg, transparent 20%, rgba(255,255,255,0.06) 38%, rgba(255,255,255,0.12) 50%, rgba(255,255,255,0.06) 62%, transparent 80%)',
                    animation: 'cardShimmer 0.8s linear infinite',
                }} />
                {/* Counter shimmer — 70° (reverse) */}
                <div style={{
                    position: 'absolute', inset: 0,
                    background: 'linear-gradient(70deg, transparent 25%, rgba(168,85,247,0.04) 40%, rgba(236,72,153,0.06) 50%, rgba(59,130,246,0.04) 60%, transparent 75%)',
                    animation: 'cardShimmer2 1.4s linear infinite',
                }} />
                {/* Accent shimmer — 150° (skewed, slower) */}
                <div style={{
                    position: 'absolute', inset: 0,
                    background: 'linear-gradient(150deg, transparent 30%, rgba(255,255,255,0.03) 45%, rgba(255,255,255,0.07) 50%, rgba(255,255,255,0.03) 55%, transparent 70%)',
                    animation: 'cardShimmer3 2s linear infinite',
                }} />
            </div>

            {/* L9: Sparkle particles */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-[28px]">
                {[
                    { top: '15%', left: '20%', size: 3, delay: 0, dur: 2 },
                    { top: '30%', left: '75%', size: 2, delay: 0.5, dur: 1.8 },
                    { top: '60%', left: '40%', size: 2.5, delay: 1, dur: 2.2 },
                    { top: '45%', left: '85%', size: 2, delay: 1.5, dur: 1.6 },
                    { top: '75%', left: '15%', size: 3, delay: 0.8, dur: 2.4 },
                    { top: '20%', left: '55%', size: 2, delay: 1.2, dur: 1.9 },
                    { top: '80%', left: '65%', size: 2.5, delay: 0.3, dur: 2.1 },
                    { top: '50%', left: '30%', size: 2, delay: 1.7, dur: 1.7 },
                ].map((s, i) => (
                    <div
                        key={i}
                        style={{
                            position: 'absolute',
                            top: s.top,
                            left: s.left,
                            width: `${s.size}px`,
                            height: `${s.size}px`,
                            borderRadius: '50%',
                            background: 'radial-gradient(circle, rgba(255,255,255,0.9) 0%, rgba(168,85,247,0.4) 50%, transparent 70%)',
                            animation: `sparkle ${s.dur}s ease-in-out ${s.delay}s infinite, floatUp ${s.dur * 1.5}s ease-in-out ${s.delay}s infinite`,
                            boxShadow: '0 0 4px rgba(168, 85, 247, 0.6)',
                        }}
                    />
                ))}
            </div>

            {/* L10: Bottom iridescent reflection */}
            <div
                className="absolute inset-x-0 bottom-0 h-[30%] pointer-events-none rounded-b-[28px]"
                style={{
                    background: 'linear-gradient(0deg, rgba(168, 85, 247, 0.1) 0%, rgba(236, 72, 153, 0.06) 40%, transparent 100%)',
                }}
            />

            {/* Content - Absolute centering with inline styles */}
            <div
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                {content.type === 'logo' && (
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <div
                            className="relative select-none"
                            style={{ width: 'clamp(100px, 25vw, 150px)', height: 'clamp(100px, 25vw, 150px)' }}
                        >
                            <div
                                className="absolute inset-0"
                                style={{
                                    background: 'radial-gradient(circle at 50% 50%, rgba(168, 85, 247, 0.25) 0%, transparent 55%)',
                                    filter: 'blur(10px)',
                                }}
                            />
                            <img
                                src="/guap-logo-transparent.png"
                                alt="GUAP"
                                className="relative w-full h-full object-contain"
                                style={{
                                    filter: 'drop-shadow(0 6px 12px rgba(0,0,0,0.5)) drop-shadow(0 15px 30px rgba(168, 85, 247, 0.4))',
                                }}
                            />
                        </div>
                        <span
                            className="select-none mt-2"
                            style={{
                                fontSize: 'clamp(18px, 4vw, 28px)',
                                fontWeight: 300,
                                letterSpacing: '0.4em',
                                color: 'rgba(255, 255, 255, 0.8)',
                                textTransform: 'uppercase',
                                textShadow: '0 1px 4px rgba(0,0,0,0.5)',
                            }}
                        >
                            guap
                        </span>
                    </div>
                )}

                {content.type === 'text' && (
                    <div className="text-center px-4">
                        <h2
                            className="font-black tracking-tight leading-[1.05]"
                            style={{
                                fontSize: 'clamp(28px, 7vw, 48px)',
                                letterSpacing: '-0.02em',
                                background: 'linear-gradient(180deg, #ffffff 0%, #c4b5fd 50%, #818cf8 100%)',
                                backgroundSize: 'auto 200%',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                            }}
                        >
                            {content.content}
                        </h2>
                        {content.subtext && (
                            <p className="mt-4 text-base leading-relaxed max-w-xs mx-auto" style={{ color: 'rgba(255, 255, 255, 0.5)' }}>
                                {content.subtext}
                            </p>
                        )}
                    </div>
                )}

                {content.type === 'feature' && (
                    <div className="text-center px-6">
                        <div
                            className="w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center"
                            style={{
                                background: 'rgba(255, 255, 255, 0.06)',
                                border: '1px solid rgba(255, 255, 255, 0.1)',
                                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
                            }}
                        >
                            <span className="text-purple-300">
                                {content.icon === 'qr' && <QrCode size={28} strokeWidth={1.5} />}
                                {content.icon === 'trending' && <TrendingUp size={28} strokeWidth={1.5} />}
                                {content.icon === 'gift' && <Gift size={28} strokeWidth={1.5} />}
                                {content.icon === 'zap' && <Zap size={28} strokeWidth={1.5} />}
                            </span>
                        </div>
                        <h3
                            className="font-bold mb-2"
                            style={{
                                fontSize: 'clamp(24px, 5vw, 36px)',
                                background: 'linear-gradient(180deg, #ffffff 0%, #c4b5fd 100%)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                            }}
                        >
                            {content.title}
                        </h3>
                        <p className="text-base max-w-xs mx-auto" style={{ color: 'rgba(255, 255, 255, 0.5)' }}>
                            {content.desc}
                        </p>
                    </div>
                )}

                {content.type === 'step' && (
                    <div className="text-center px-6">
                        <span
                            className="font-black block mb-3"
                            style={{
                                fontSize: 'clamp(48px, 12vw, 80px)',
                                letterSpacing: '-0.02em',
                                background: 'linear-gradient(180deg, #c4b5fd 0%, #818cf8 100%)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                            }}
                        >
                            {content.step}
                        </span>
                        <h3
                            className="font-bold mb-2"
                            style={{
                                fontSize: 'clamp(24px, 5vw, 36px)',
                                color: 'rgba(255, 255, 255, 0.9)',
                            }}
                        >
                            {content.title}
                        </h3>
                        <p className="text-base max-w-xs mx-auto" style={{ color: 'rgba(255, 255, 255, 0.5)' }}>
                            {content.desc}
                        </p>
                    </div>
                )}

                {content.type === 'cta' && (
                    <div className="text-center">
                        <p className="text-base mb-6" style={{ color: 'rgba(255, 255, 255, 0.5)' }}>Start earning rewards today</p>
                        <Link
                            href={user ? "/wallet" : "/signup"}
                            className="group inline-flex items-center gap-3 px-6 py-3 rounded-full font-semibold text-base transition-all hover:scale-105 active:scale-95"
                            style={{
                                background: 'rgba(255, 255, 255, 0.08)',
                                backdropFilter: 'blur(16px)',
                                WebkitBackdropFilter: 'blur(16px)',
                                border: '1px solid rgba(255, 255, 255, 0.15)',
                                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
                            }}
                        >
                            <Sparkles size={18} className="text-purple-300" />
                            <span style={{ color: 'rgba(255, 255, 255, 0.9)' }}>{user ? 'Open Wallet' : 'Get Started Free'}</span>
                            <ArrowRight size={16} className="text-purple-300 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
});

WalletCard.displayName = 'WalletCard';

// Main WalletStack component
const WalletStackInner = forwardRef<WalletStackRef, WalletStackProps>(
    ({ cards, user, accentColor = '#a855f7' }, ref) => {
        const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
        const glowRef = useRef<HTMLDivElement | null>(null);

        useImperativeHandle(ref, () => ({
            cardRefs: cardRefs.current,
            glowRef: glowRef.current,
        }));

        return (
            <motion.div
                className="relative mx-auto"
                style={{
                    width: '100%',
                    maxWidth: '520px',
                    height: '328px',
                    perspective: '1500px', // Increased for deeper 3D
                }}
                initial={{ opacity: 0, y: 40, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
                {/* Holographic ambient underglow */}
                <div
                    ref={glowRef}
                    className="absolute -inset-20 rounded-[100px] pointer-events-none"
                    style={{
                        background: `
                            radial-gradient(ellipse 50% 40% at 30% 50%, rgba(168, 85, 247, 0.25) 0%, transparent 55%),
                            radial-gradient(ellipse 50% 40% at 70% 50%, rgba(236, 72, 153, 0.2) 0%, transparent 55%),
                            radial-gradient(ellipse 60% 50% at 50% 60%, rgba(59, 130, 246, 0.15) 0%, transparent 50%),
                            radial-gradient(ellipse 80% 70% at center, rgba(139, 92, 246, 0.2) 0%, transparent 60%)
                        `,
                        filter: 'blur(50px)',
                        opacity: 0.9,
                    }}
                />

                {/* Rainbow pulsing ring */}
                <motion.div
                    className="absolute -inset-14 rounded-[70px] pointer-events-none"
                    style={{
                        border: '1.5px solid transparent',
                        backgroundImage: 'conic-gradient(from 0deg, rgba(168,85,247,0.2), rgba(236,72,153,0.15), rgba(59,130,246,0.15), rgba(16,185,129,0.1), rgba(245,158,11,0.15), rgba(168,85,247,0.2))',
                        backgroundOrigin: 'border-box',
                        backgroundClip: 'border-box',
                        mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                        maskComposite: 'exclude',
                        WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                        WebkitMaskComposite: 'xor',
                        padding: '1.5px',
                        filter: 'blur(1px)',
                    }}
                    animate={{
                        scale: [1, 1.03, 1],
                        opacity: [0.4, 0.8, 0.4],
                    }}
                    transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: 'easeInOut',
                    }}
                />

                {/* Cards container */}
                <div
                    className="relative"
                    style={{ width: '100%', height: '100%' }}
                >
                    {cards.map((card, i) => (
                        <WalletCard
                            key={i}
                            ref={(el) => { cardRefs.current[i] = el; }}
                            content={card}
                            index={i}
                            total={cards.length}
                            user={user}
                            accentColor={accentColor}
                        />
                    ))}
                </div>
            </motion.div>
        );
    }
);

WalletStackInner.displayName = 'WalletStack';

export const WalletStack = WalletStackInner;

WalletStack.displayName = 'WalletStack';
