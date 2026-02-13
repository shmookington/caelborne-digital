'use client';

import { motion } from 'framer-motion';
import { CosmicBackground } from './CosmicBackground';

const GOLD = '#8B7332';

export default function LoadingScreen() {
    return (
        <div className="fixed inset-0 flex items-center justify-center overflow-hidden">
            <CosmicBackground />

            {/* Animated gradient orbs — gold tones */}
            <motion.div
                className="absolute w-[500px] h-[500px] rounded-full"
                style={{
                    background: `radial-gradient(circle, rgba(201,169,110,0.15) 0%, transparent 70%)`,
                    filter: 'blur(60px)',
                }}
                animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.3, 0.5, 0.3],
                }}
                transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: 'easeInOut',
                }}
            />
            <motion.div
                className="absolute w-[400px] h-[400px] rounded-full"
                style={{
                    background: `radial-gradient(circle, rgba(224,201,146,0.12) 0%, transparent 70%)`,
                    filter: 'blur(50px)',
                }}
                animate={{
                    scale: [1.2, 1, 1.2],
                    opacity: [0.4, 0.2, 0.4],
                }}
                transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: 'easeInOut',
                }}
            />

            {/* Main content container */}
            <div className="relative z-10 flex flex-col items-center">
                {/* Logo with glow */}
                <motion.div
                    className="relative"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                >
                    {/* Outer glow ring */}
                    <motion.div
                        className="absolute inset-0 -m-8"
                        style={{
                            background: `radial-gradient(circle, rgba(201,169,110,0.3) 0%, transparent 60%)`,
                            filter: 'blur(20px)',
                        }}
                        animate={{
                            scale: [1, 1.2, 1],
                            opacity: [0.5, 0.8, 0.5],
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: 'easeInOut',
                        }}
                    />

                    {/* Spinning ring */}
                    <motion.div
                        className="absolute -inset-6"
                        style={{
                            borderRadius: '50%',
                            border: '2px solid transparent',
                            borderTopColor: `rgba(201, 169, 110, 0.6)`,
                            borderRightColor: `rgba(201, 169, 110, 0.2)`,
                        }}
                        animate={{ rotate: 360 }}
                        transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            ease: 'linear',
                        }}
                    />

                    {/* Second spinning ring (opposite direction) */}
                    <motion.div
                        className="absolute -inset-10"
                        style={{
                            borderRadius: '50%',
                            border: '1px solid transparent',
                            borderTopColor: `rgba(224, 201, 146, 0.4)`,
                            borderLeftColor: `rgba(224, 201, 146, 0.1)`,
                        }}
                        animate={{ rotate: -360 }}
                        transition={{
                            duration: 2.5,
                            repeat: Infinity,
                            ease: 'linear',
                        }}
                    />

                    {/* Glass container with Caelborne mark */}
                    <motion.div
                        className="relative w-24 h-24 rounded-3xl flex items-center justify-center overflow-hidden"
                        style={{
                            background: 'linear-gradient(145deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.04) 100%)',
                            backdropFilter: 'blur(40px)',
                            WebkitBackdropFilter: 'blur(40px)',
                            border: '1px solid rgba(255, 255, 255, 0.15)',
                            boxShadow: `0 20px 60px rgba(0, 0, 0, 0.3), 0 0 40px rgba(201, 169, 110, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.2)`,
                        }}
                        animate={{
                            boxShadow: [
                                `0 20px 60px rgba(0, 0, 0, 0.3), 0 0 40px rgba(201, 169, 110, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.2)`,
                                `0 20px 60px rgba(0, 0, 0, 0.3), 0 0 60px rgba(201, 169, 110, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.2)`,
                                `0 20px 60px rgba(0, 0, 0, 0.3), 0 0 40px rgba(201, 169, 110, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.2)`,
                            ],
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: 'easeInOut',
                        }}
                    >
                        {/* Glass shine effect */}
                        <div
                            className="absolute inset-0 pointer-events-none"
                            style={{
                                background: 'linear-gradient(135deg, rgba(255,255,255,0.15) 0%, transparent 40%, transparent 60%, rgba(255,255,255,0.05) 100%)',
                            }}
                        />

                        {/* Caelborne "C" monogram */}
                        <motion.div
                            animate={{
                                scale: [1, 1.05, 1],
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: 'easeInOut',
                            }}
                            style={{
                                fontSize: '36px',
                                fontWeight: 800,
                                color: GOLD,
                                letterSpacing: '-0.02em',
                                lineHeight: 1,
                            }}
                        >
                            C
                        </motion.div>
                    </motion.div>
                </motion.div>

                {/* Loading text */}
                <motion.div
                    className="mt-8 flex flex-col items-center"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                >
                    <motion.p
                        className="text-white/60 text-sm font-medium tracking-wider"
                        animate={{
                            opacity: [0.5, 1, 0.5],
                        }}
                        transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            ease: 'easeInOut',
                        }}
                    >
                        Loading...
                    </motion.p>

                    {/* Animated dots bar — gold */}
                    <div className="mt-4 flex gap-1.5">
                        {[0, 1, 2, 3, 4].map((i) => (
                            <motion.div
                                key={i}
                                className="w-1.5 h-1.5 rounded-full"
                                style={{
                                    background: `linear-gradient(135deg, ${GOLD}, #BFA265)`,
                                }}
                                animate={{
                                    scale: [1, 1.5, 1],
                                    opacity: [0.3, 1, 0.3],
                                }}
                                transition={{
                                    duration: 1,
                                    repeat: Infinity,
                                    delay: i * 0.15,
                                    ease: 'easeInOut',
                                }}
                            />
                        ))}
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
