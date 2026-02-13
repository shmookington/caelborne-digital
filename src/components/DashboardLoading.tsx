'use client';

import { motion } from 'framer-motion';
import { Outfit } from 'next/font/google';

const outfit = Outfit({ subsets: ['latin'], weight: ['400', '600', '700'] });

const GOLD = '#8B7332';
const GOLD_LIGHT = '#BFA265';

/**
 * Premium loading screen for dashboard page transitions.
 * Shows the Caelborne wordmark with a pulsing glow and an
 * animated gold progress bar.
 */
export default function DashboardLoading() {
    return (
        <div
            style={{
                minHeight: '100vh',
                background: '#050508',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '32px',
            }}
        >
            {/* Subtle radial glow behind text */}
            <div
                style={{
                    position: 'absolute',
                    width: '300px',
                    height: '300px',
                    borderRadius: '50%',
                    background: `radial-gradient(circle, rgba(168,135,62,0.08) 0%, transparent 70%)`,
                    pointerEvents: 'none',
                }}
            />

            {/* Caelborne wordmark */}
            <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className={outfit.className}
                style={{
                    position: 'relative',
                    zIndex: 1,
                }}
            >
                <motion.span
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
                    style={{
                        fontSize: '20px',
                        fontWeight: 700,
                        letterSpacing: '-0.03em',
                        background: `linear-gradient(135deg, ${GOLD_LIGHT} 0%, ${GOLD} 100%)`,
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                    }}
                >
                    Caelborne
                </motion.span>
            </motion.div>

            {/* Animated progress bar */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.15, duration: 0.3 }}
                style={{
                    width: '120px',
                    height: '2px',
                    borderRadius: '100px',
                    background: 'rgba(255,255,255,0.04)',
                    overflow: 'hidden',
                    position: 'relative',
                    zIndex: 1,
                }}
            >
                <motion.div
                    animate={{ x: ['-100%', '200%'] }}
                    transition={{
                        duration: 1.4,
                        repeat: Infinity,
                        ease: [0.65, 0, 0.35, 1],
                    }}
                    style={{
                        width: '50%',
                        height: '100%',
                        borderRadius: '100px',
                        background: `linear-gradient(90deg, transparent, ${GOLD}, transparent)`,
                    }}
                />
            </motion.div>
        </div>
    );
}
