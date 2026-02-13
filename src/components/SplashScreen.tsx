'use client';

import React, { useEffect, useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SplashScreenProps {
    onComplete: () => void;
}

const GOLD = '#8B7332';
const GOLD_LIGHT = '#BFA265';

// ─── Seeded PRNG (deterministic across server/client) ───────────

function mulberry32(seed: number) {
    return () => {
        seed |= 0; seed = seed + 0x6D2B79F5 | 0;
        let t = Math.imul(seed ^ seed >>> 15, 1 | seed);
        t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
        return ((t ^ t >>> 14) >>> 0) / 4294967296;
    };
}

// ─── Particle System ────────────────────────────────────────────

interface Particle {
    id: number;
    x: number;
    y: number;
    size: number;
    delay: number;
    duration: number;
    drift: number;
}

function generateParticles(count: number): Particle[] {
    const rand = mulberry32(42); // fixed seed for deterministic output
    const particles: Particle[] = [];
    for (let i = 0; i < count; i++) {
        particles.push({
            id: i,
            x: rand() * 100,
            y: rand() * 100,
            size: rand() * 3 + 1,
            delay: rand() * 1.5,
            duration: rand() * 2 + 2,
            drift: (rand() - 0.5) * 60,
        });
    }
    return particles;
}

// ─── Component ──────────────────────────────────────────────────

export const SplashScreen: React.FC<SplashScreenProps> = ({ onComplete }) => {
    const [phase, setPhase] = useState<'particles' | 'brand' | 'tagline' | 'exit'>('particles');
    const particles = useMemo(() => generateParticles(40), []);

    useEffect(() => {
        const t1 = setTimeout(() => setPhase('brand'), 600);
        const t2 = setTimeout(() => setPhase('tagline'), 1800);
        const t3 = setTimeout(() => setPhase('exit'), 2800);
        const t4 = setTimeout(() => onComplete(), 3400);

        return () => {
            clearTimeout(t1);
            clearTimeout(t2);
            clearTimeout(t3);
            clearTimeout(t4);
        };
    }, [onComplete]);

    const letters = ['C', 'A', 'E', 'L', 'B', 'O', 'R', 'N', 'E'];

    return (
        <motion.div
            className="fixed inset-0 z-50 w-screen h-screen flex flex-col items-center justify-center overflow-hidden"
            style={{
                background: 'radial-gradient(ellipse at 50% 40%, #0c0c18 0%, #050510 50%, #020208 100%)',
            }}
            animate={phase === 'exit' ? { opacity: 0 } : { opacity: 1 }}
            transition={{ duration: 0.6, ease: [0.32, 0, 0.67, 0] }}
        >
            {/* ── Floating Particle Field ────────────────────────── */}
            <div className="absolute inset-0 overflow-hidden">
                {particles.map((p) => (
                    <motion.div
                        key={p.id}
                        className="absolute rounded-full"
                        style={{
                            left: `${p.x}%`,
                            top: `${p.y}%`,
                            width: `${p.size}px`,
                            height: `${p.size}px`,
                            background: `radial-gradient(circle, ${GOLD_LIGHT} 0%, transparent 70%)`,
                            boxShadow: `0 0 ${p.size * 3}px rgba(201,169,110,0.4)`,
                        }}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{
                            opacity: [0, 0.8, 0.4, 0.8, 0],
                            scale: [0, 1.2, 0.8, 1, 0],
                            y: [0, p.drift],
                            x: [0, p.drift * 0.3],
                        }}
                        transition={{
                            delay: p.delay,
                            duration: p.duration,
                            ease: 'easeInOut',
                        }}
                    />
                ))}
            </div>

            {/* ── Radial Light Burst (appears with brand) ────────── */}
            <motion.div
                className="absolute"
                style={{
                    width: '800px',
                    height: '800px',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    background: `
                        radial-gradient(ellipse 60% 40% at 50% 50%, rgba(201,169,110,0.12) 0%, transparent 60%),
                        radial-gradient(ellipse 40% 80% at 50% 50%, rgba(224,201,146,0.06) 0%, transparent 50%)
                    `,
                    filter: 'blur(40px)',
                }}
                initial={{ opacity: 0, scale: 0.3 }}
                animate={
                    phase !== 'particles'
                        ? { opacity: 1, scale: 1 }
                        : { opacity: 0, scale: 0.3 }
                }
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            />

            {/* ── Horizontal Light Streak ────────────────────────── */}
            <motion.div
                className="absolute"
                style={{
                    width: '120%',
                    height: '1px',
                    top: '50%',
                    left: '-10%',
                    background: `linear-gradient(90deg, transparent 0%, ${GOLD}40 20%, ${GOLD} 50%, ${GOLD}40 80%, transparent 100%)`,
                    boxShadow: `0 0 30px 4px rgba(201,169,110,0.15)`,
                }}
                initial={{ scaleX: 0, opacity: 0 }}
                animate={
                    phase !== 'particles'
                        ? { scaleX: 1, opacity: [0, 1, 0.3] }
                        : { scaleX: 0, opacity: 0 }
                }
                transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
            />

            {/* ── Main Content ───────────────────────────────────── */}
            <div className="relative z-10 flex flex-col items-center">

                {/* CAELBORNE — cinematic letter reveal */}
                <div className="flex items-center justify-center mb-4 overflow-hidden">
                    {letters.map((letter, i) => (
                        <motion.span
                            key={i}
                            className="text-5xl sm:text-6xl md:text-7xl font-black"
                            style={{
                                letterSpacing: '0.04em',
                                background: `linear-gradient(180deg, #ffffff 0%, rgba(255,255,255,0.75) 50%, ${GOLD_LIGHT} 100%)`,
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                textShadow: 'none',
                            }}
                            initial={{
                                opacity: 0,
                                y: 80,
                                rotateX: -90,
                                filter: 'blur(12px)',
                                scale: 0.5,
                            }}
                            animate={
                                phase !== 'particles'
                                    ? {
                                        opacity: 1,
                                        y: 0,
                                        rotateX: 0,
                                        filter: 'blur(0px)',
                                        scale: 1,
                                    }
                                    : {
                                        opacity: 0,
                                        y: 80,
                                        rotateX: -90,
                                        filter: 'blur(12px)',
                                        scale: 0.5,
                                    }
                            }
                            transition={{
                                delay: 0.1 + i * 0.05,
                                duration: 0.9,
                                ease: [0.16, 1, 0.3, 1],
                            }}
                        >
                            {letter}
                        </motion.span>
                    ))}
                </div>

                {/* Accent Line — elegant horizontal reveal */}
                <motion.div
                    style={{
                        width: '80px',
                        height: '1.5px',
                        background: `linear-gradient(90deg, transparent, ${GOLD}, transparent)`,
                        marginBottom: '20px',
                    }}
                    initial={{ scaleX: 0, opacity: 0 }}
                    animate={
                        phase !== 'particles'
                            ? { scaleX: 1, opacity: 1 }
                            : { scaleX: 0, opacity: 0 }
                    }
                    transition={{ delay: 0.7, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                />

                {/* Tagline — premium shimmer text */}
                <AnimatePresence>
                    {(phase === 'tagline' || phase === 'exit') && (
                        <motion.div
                            className="overflow-hidden"
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                        >
                            <motion.p
                                className="text-xs sm:text-sm tracking-[0.3em] uppercase font-medium"
                                style={{
                                    background: `linear-gradient(90deg, ${GOLD} 0%, ${GOLD_LIGHT} 50%, ${GOLD} 100%)`,
                                    backgroundSize: '200% 100%',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                    animation: 'splashShimmer 2s ease-in-out infinite',
                                }}
                                initial={{ y: 20, opacity: 0, filter: 'blur(5px)' }}
                                animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
                                transition={{ delay: 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                            >
                                Digital Modernization Studio
                            </motion.p>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* ── Corner Accents — cinematic framing ──────────────── */}
            {[
                { top: '10%', left: '8%', rotate: '0deg' },
                { top: '10%', right: '8%', rotate: '90deg' },
                { bottom: '10%', left: '8%', rotate: '-90deg' },
                { bottom: '10%', right: '8%', rotate: '180deg' },
            ].map((pos, i) => (
                <motion.div
                    key={i}
                    className="absolute"
                    style={{
                        ...pos,
                        width: '40px',
                        height: '40px',
                        borderTop: `1px solid rgba(201,169,110,0.2)`,
                        borderLeft: `1px solid rgba(201,169,110,0.2)`,
                        transform: `rotate(${pos.rotate})`,
                    }}
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={
                        phase !== 'particles'
                            ? { opacity: 1, scale: 1 }
                            : { opacity: 0, scale: 0.5 }
                    }
                    transition={{
                        delay: 0.8 + i * 0.1,
                        duration: 0.6,
                        ease: [0.16, 1, 0.3, 1],
                    }}
                />
            ))}

            {/* CSS Keyframes */}
            <style jsx global>{`
                @keyframes splashShimmer {
                    0%, 100% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                }
            `}</style>
        </motion.div>
    );
};
