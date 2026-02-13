'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface DigitalCardProps {
    accentColor?: string;
}

export const DigitalCard: React.FC<DigitalCardProps> = ({
    accentColor = '#a855f7',
}) => {
    return (
        <motion.div
            className="relative mx-auto w-full"
            style={{
                maxWidth: '520px',
                minHeight: '320px',
                aspectRatio: '1.586/1',
                perspective: '1200px',
            }}
            initial={{ opacity: 0, y: 40, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
            {/* Ambient Glow Behind Card */}
            <div
                className="absolute -inset-8 rounded-[50px] blur-[80px] opacity-70"
                style={{
                    background: `radial-gradient(ellipse at center, ${accentColor}55 0%, transparent 65%)`,
                }}
            />

            {/* Main Card - Apple Frosted Glass */}
            <motion.div
                className="relative w-full h-full rounded-[28px] overflow-hidden"
                style={{
                    // Apple frosted glass - clear, translucent with heavy blur
                    background: `
                        linear-gradient(
                            160deg,
                            rgba(255, 255, 255, 0.18) 0%,
                            rgba(255, 255, 255, 0.10) 30%,
                            rgba(200, 180, 255, 0.08) 60%,
                            rgba(255, 255, 255, 0.14) 100%
                        )
                    `,
                    backdropFilter: 'blur(40px) saturate(1.8)',
                    WebkitBackdropFilter: 'blur(40px) saturate(1.8)',
                    border: '1.5px solid rgba(255, 255, 255, 0.45)',
                    boxShadow: `
                        0 25px 50px -12px rgba(0, 0, 0, 0.25),
                        0 12px 24px -8px rgba(0, 0, 0, 0.15),
                        0 0 0 0.5px rgba(255, 255, 255, 0.2),
                        inset 0 2px 0 rgba(255, 255, 255, 0.35),
                        inset 0 -1px 0 rgba(255, 255, 255, 0.1)
                    `,
                }}
                whileHover={{
                    scale: 1.02,
                    rotateY: 3,
                    rotateX: -2,
                }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
                {/* Primary Gloss Highlight - Apple-style curved shine */}
                <div
                    className="absolute inset-x-0 top-0 h-[45%] pointer-events-none"
                    style={{
                        background: `
                            linear-gradient(
                                180deg,
                                rgba(255, 255, 255, 0.50) 0%,
                                rgba(255, 255, 255, 0.25) 20%,
                                rgba(255, 255, 255, 0.08) 45%,
                                transparent 100%
                            )
                        `,
                        borderRadius: '28px 28px 50% 50%',
                    }}
                />

                {/* Edge highlight - left */}
                <div
                    className="absolute left-0 top-[10%] bottom-[10%] w-[1.5px] pointer-events-none"
                    style={{
                        background: 'linear-gradient(180deg, transparent 0%, rgba(255,255,255,0.5) 30%, rgba(255,255,255,0.5) 70%, transparent 100%)',
                    }}
                />

                {/* Edge highlight - right */}
                <div
                    className="absolute right-0 top-[10%] bottom-[10%] w-[1px] pointer-events-none"
                    style={{
                        background: 'linear-gradient(180deg, transparent 0%, rgba(255,255,255,0.2) 30%, rgba(255,255,255,0.2) 70%, transparent 100%)',
                    }}
                />

                {/* Moving Shimmer - continuous CSS flow */}
                <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                        background: `
                            linear-gradient(
                                110deg,
                                transparent 20%,
                                rgba(255, 255, 255, 0.12) 35%,
                                rgba(255, 255, 255, 0.22) 50%,
                                rgba(255, 255, 255, 0.12) 65%,
                                transparent 80%
                            )
                        `,
                        backgroundSize: '200% 100%',
                        animation: 'cardShimmer 0.8s linear infinite',
                    }}
                />
                <style dangerouslySetInnerHTML={{
                    __html: `
                    @keyframes cardShimmer {
                        0% { transform: translateX(-100%); }
                        100% { transform: translateX(100%); }
                    }
                `}} />

                {/* Bottom glow - subtle iridescent reflection */}
                <div
                    className="absolute inset-x-0 bottom-0 h-[25%] pointer-events-none"
                    style={{
                        background: 'linear-gradient(0deg, rgba(200, 180, 255, 0.12) 0%, transparent 100%)',
                    }}
                />

                {/* G Logo + Text */}
                <div className="absolute inset-0 flex flex-col items-center justify-center w-full h-full p-8 gap-2">
                    {/* Logo with emboss effect */}
                    <motion.div
                        className="relative select-none"
                        style={{
                            width: 'clamp(100px, 25vw, 150px)',
                            height: 'clamp(100px, 25vw, 150px)',
                        }}
                        initial={{ opacity: 0, scale: 0.8, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                    >
                        {/* Subtle glow around logo */}
                        <div
                            className="absolute inset-0"
                            style={{
                                background: 'radial-gradient(circle at 50% 50%, rgba(168, 85, 247, 0.25) 0%, transparent 55%)',
                                filter: 'blur(10px)',
                            }}
                        />

                        {/* Logo */}
                        <img
                            src="/guap-logo-transparent.png"
                            alt="GUAP"
                            className="relative w-full h-full object-contain"
                            style={{
                                filter: 'drop-shadow(0 6px 12px rgba(0,0,0,0.5)) drop-shadow(0 15px 30px rgba(168, 85, 247, 0.4))',
                            }}
                        />
                    </motion.div>

                    {/* Text */}
                    <motion.span
                        className="select-none relative"
                        style={{
                            fontSize: 'clamp(18px, 4vw, 28px)',
                            fontWeight: 300,
                            letterSpacing: '0.4em',
                            color: 'rgba(0, 0, 0, 0.7)',
                            textTransform: 'uppercase',
                            textShadow: '0 1px 2px rgba(255,255,255,0.3)',
                        }}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    >
                        guap
                    </motion.span>
                </div>
            </motion.div>
        </motion.div>
    );
};
