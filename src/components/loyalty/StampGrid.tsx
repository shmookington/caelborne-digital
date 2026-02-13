'use client';

import { motion } from 'framer-motion';

interface StampGridProps {
    totalStamps: number;
    filledStamps: number;
    colorTheme: string;
}

export default function StampGrid({ totalStamps, filledStamps, colorTheme }: StampGridProps) {
    // Generate array of length totalStamps
    const stamps = Array.from({ length: totalStamps }, (_, i) => i);

    return (
        <div className="flex flex-wrap gap-2 mt-4">
            {stamps.map((index) => {
                const isFilled = index < filledStamps;

                return (
                    <div
                        key={index}
                        className="relative w-8 h-8 flex items-center justify-center"
                    >
                        {/* Empty State: Dashed Circle */}
                        {!isFilled && (
                            <div className="w-full h-full rounded-full border-2 border-dashed border-white/20" />
                        )}

                        {/* Filled State: The Stamp */}
                        {isFilled && (
                            <motion.div
                                initial={{ scale: 0, opacity: 0, rotate: -45 }}
                                animate={{ scale: 1, opacity: 1, rotate: 0 }}
                                transition={{
                                    type: "spring",
                                    stiffness: 300,
                                    damping: 15,
                                    delay: index * 0.05 // Stagger effect
                                }}
                                className="absolute inset-0 flex items-center justify-center text-white"
                                style={{
                                    // Glow effect matching the brand
                                    filter: `drop-shadow(0 0 8px ${colorTheme})`
                                }}
                            >
                                {/* Simple "G" Stamp Icon */}
                                <div
                                    className="w-full h-full rounded-full flex items-center justify-center font-bold text-sm bg-white/20 backdrop-blur-sm border border-white/40"
                                    style={{ background: colorTheme }}
                                >
                                    G
                                </div>
                            </motion.div>
                        )}
                    </div>
                );
            })}
        </div>
    );
}
