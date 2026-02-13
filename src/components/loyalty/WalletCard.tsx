'use client';

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Outfit } from 'next/font/google';
import clsx from 'clsx';
import { MouseEvent, useState } from 'react';
import StampGrid from './StampGrid';
import { QRCodeSVG } from 'qrcode.react';
import { Sparkles, Crown, Wallet } from 'lucide-react';

const outfit = Outfit({ subsets: ['latin'] });

export interface WalletCardProps {
    businessName: string;
    description?: string;
    logoUrl?: string;
    colorTheme: string;
    currentStamps: number;
    maxStamps: number;
    className?: string;
}

export default function WalletCard({
    businessName,
    description = "Earn points with every purchase!",
    logoUrl,
    colorTheme,
    currentStamps,
    maxStamps,
    className
}: WalletCardProps) {
    const [isFlipped, setIsFlipped] = useState(false);

    // 3D Tilt Logic
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseX = useSpring(x, { stiffness: 500, damping: 100 });
    const mouseY = useSpring(y, { stiffness: 500, damping: 100 });

    const rotateX = useTransform(mouseY, [-0.5, 0.5], ["12deg", "-12deg"]);
    const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-12deg", "12deg"]);

    // Glare position
    const glareX = useTransform(mouseX, [-0.5, 0.5], ["0%", "100%"]);
    const glareY = useTransform(mouseY, [-0.5, 0.5], ["0%", "100%"]);

    function handleMouseMove(e: MouseEvent<HTMLDivElement>) {
        const rect = e.currentTarget.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseXFromCenter = e.clientX - rect.left - width / 2;
        const mouseYFromCenter = e.clientY - rect.top - height / 2;

        x.set(mouseXFromCenter / width);
        y.set(mouseYFromCenter / height);
    }

    function handleMouseLeave() {
        x.set(0);
        y.set(0);
    }

    const progressPercent = Math.min((currentStamps / maxStamps) * 100, 100);

    return (
        <div
            style={{ perspective: 1200 }}
            className={clsx("relative w-full max-w-[380px] aspect-[1.586]", className)}
        >
            <motion.div
                onClick={() => setIsFlipped(!isFlipped)}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                initial={false}
                animate={{
                    rotateY: isFlipped ? 180 : 0,
                }}
                transition={{ duration: 0.6, type: "spring", stiffness: 260, damping: 20 }}
                style={{
                    rotateX: isFlipped ? 0 : rotateX,
                    rotateY: isFlipped ? 180 : rotateY,
                    transformStyle: "preserve-3d",
                }}
                className={clsx(
                    "w-full h-full rounded-3xl cursor-pointer relative",
                    outfit.className
                )}
            >
                {/* ==================== FRONT FACE ==================== */}
                <div
                    className="absolute inset-0 rounded-3xl overflow-hidden"
                    style={{
                        background: `linear-gradient(145deg, ${colorTheme} 0%, ${colorTheme}cc 40%, #0d0d0d 100%)`,
                        boxShadow: `
                            0 25px 50px -12px rgba(0,0,0,0.7),
                            0 12px 25px -8px ${colorTheme}44,
                            inset 0 1px 0 rgba(255,255,255,0.15),
                            inset 0 -1px 0 rgba(0,0,0,0.3)
                        `,
                        backfaceVisibility: 'hidden',
                        WebkitBackfaceVisibility: 'hidden'
                    }}
                >
                    {/* Holographic shimmer effect */}
                    <div
                        className="absolute inset-0 opacity-30"
                        style={{
                            background: `linear-gradient(
                                45deg,
                                transparent 30%,
                                rgba(255,255,255,0.1) 45%,
                                rgba(255,255,255,0.2) 50%,
                                rgba(255,255,255,0.1) 55%,
                                transparent 70%
                            )`,
                            backgroundSize: '200% 200%',
                        }}
                    />

                    {/* Card chip */}
                    <div
                        className="absolute top-8 left-8"
                        style={{
                            width: '50px',
                            height: '38px',
                            borderRadius: '8px',
                            background: 'linear-gradient(145deg, #d4af37 0%, #b8962a 50%, #8b7020 100%)',
                            boxShadow: 'inset 0 1px 2px rgba(255,255,255,0.4), inset 0 -1px 2px rgba(0,0,0,0.2)',
                        }}
                    >
                        {/* Chip lines */}
                        <div className="absolute inset-2 flex flex-col justify-between">
                            <div className="h-[2px] bg-black/20 rounded-full" />
                            <div className="h-[2px] bg-black/20 rounded-full" />
                            <div className="h-[2px] bg-black/20 rounded-full" />
                        </div>
                    </div>

                    {/* Contactless icon */}
                    <div className="absolute top-8 right-8">
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" className="text-white/60">
                            <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0" />
                            <path d="M8.5 12a3 3 0 013-3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                            <path d="M6 12a6 6 0 016-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                            <path d="M3.5 12a8.5 8.5 0 018.5-8.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                        </svg>
                    </div>

                    {/* Business name and tier */}
                    <div className="absolute bottom-28 left-8 right-8">
                        <h3
                            className="text-2xl font-black tracking-tight text-white"
                            style={{ textShadow: '0 2px 10px rgba(0,0,0,0.3)' }}
                        >
                            {businessName}
                        </h3>
                        <div className="flex items-center gap-2 mt-2">
                            <Sparkles size={14} className="text-amber-300" />
                            <span className="text-sm font-semibold text-white/80 uppercase tracking-wider">
                                Loyalty Member
                            </span>
                        </div>
                    </div>

                    {/* Points display */}
                    <div className="absolute bottom-8 left-8 right-8">
                        <div className="flex items-end justify-between mb-3">
                            <div>
                                <p className="text-xs text-white/50 uppercase tracking-wider mb-1">Points</p>
                                <p className="text-3xl font-black text-white" style={{ textShadow: '0 2px 10px rgba(0,0,0,0.3)' }}>
                                    {currentStamps.toLocaleString()}
                                </p>
                            </div>
                            <div className="text-right">
                                <p className="text-xs text-white/50 uppercase tracking-wider mb-1">Next Reward</p>
                                <p className="text-lg font-bold text-white/80">{maxStamps.toLocaleString()}</p>
                            </div>
                        </div>

                        {/* Progress bar */}
                        <div
                            className="h-2 rounded-full overflow-hidden"
                            style={{ background: 'rgba(0,0,0,0.3)' }}
                        >
                            <motion.div
                                className="h-full rounded-full"
                                initial={{ width: 0 }}
                                animate={{ width: `${progressPercent}%` }}
                                transition={{ duration: 1, ease: "easeOut" }}
                                style={{
                                    background: 'linear-gradient(90deg, rgba(255,255,255,0.6), rgba(255,255,255,0.9))',
                                    boxShadow: '0 0 10px rgba(255,255,255,0.5)',
                                }}
                            />
                        </div>
                    </div>

                    {/* Glare effect */}
                    <motion.div
                        className="absolute inset-0 rounded-3xl pointer-events-none"
                        style={{
                            background: 'linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.25) 45%, rgba(255,255,255,0.4) 50%, rgba(255,255,255,0.25) 55%, transparent 70%)',
                            opacity: 0.6,
                            x: glareX,
                            y: glareY,
                            mixBlendMode: 'overlay',
                        }}
                    />

                    {/* Card border glow */}
                    <div
                        className="absolute inset-0 rounded-3xl pointer-events-none"
                        style={{
                            border: '1px solid rgba(255,255,255,0.15)',
                            boxShadow: 'inset 0 0 30px rgba(255,255,255,0.05)',
                        }}
                    />
                </div>

                {/* ==================== BACK FACE ==================== */}
                <div
                    className="absolute inset-0 rounded-3xl overflow-hidden"
                    style={{
                        background: 'linear-gradient(180deg, #1a1a1a 0%, #0a0a0a 100%)',
                        transform: 'rotateY(180deg)',
                        backfaceVisibility: 'hidden',
                        WebkitBackfaceVisibility: 'hidden',
                        boxShadow: `
                            0 25px 50px -12px rgba(0,0,0,0.7),
                            0 0 0 1px ${colorTheme}33
                        `,
                    }}
                >
                    {/* Magnetic stripe */}
                    <div
                        className="w-full h-12 mt-6"
                        style={{ background: 'linear-gradient(180deg, #333 0%, #1a1a1a 50%, #333 100%)' }}
                    />

                    {/* Content */}
                    <div className="flex flex-col items-center justify-center px-8 py-6 text-center">
                        <div className="space-y-1 mb-4">
                            <h3 className="text-base font-bold text-white/90 tracking-wide uppercase">Scan to Earn</h3>
                            <p className="text-[11px] text-white/40">Member ID: #{Math.floor(Math.random() * 900000 + 100000)}</p>
                        </div>

                        {/* QR Code */}
                        <div
                            className="p-3 rounded-xl"
                            style={{
                                background: 'white',
                                boxShadow: `0 0 20px ${colorTheme}44`,
                            }}
                        >
                            <QRCodeSVG
                                value={`https://guap.com/redeem/${businessName}`}
                                size={100}
                                fgColor="#000000"
                                bgColor="#ffffff"
                                level="M"
                            />
                        </div>

                        <p className="text-[10px] text-white/30 max-w-[200px] leading-tight mt-4">
                            Show this code at checkout to earn points or redeem rewards.
                        </p>
                    </div>

                    {/* Accent line at bottom */}
                    <div
                        className="absolute bottom-0 left-0 right-0 h-1"
                        style={{ background: `linear-gradient(90deg, transparent, ${colorTheme}, transparent)` }}
                    />
                </div>
            </motion.div>
        </div>
    );
}
