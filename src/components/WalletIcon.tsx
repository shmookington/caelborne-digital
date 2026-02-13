'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import SoftGlassLogo from './SoftGlassLogo';

interface WalletCard {
    id: string;
    current_points: number;
    tier: 'Bronze' | 'Silver' | 'Gold';
    shop: {
        id: string;
        name: string;
        slug: string;
        accent_color: string;
    };
}

interface WalletIconProps {
    cards: WalletCard[];
    onCardClick?: (shopSlug: string) => void;
}

export const WalletIcon: React.FC<WalletIconProps> = ({ cards }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedCard, setSelectedCard] = useState<WalletCard | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
                setSelectedCard(null);
            }
        };

        if (isOpen || selectedCard) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isOpen, selectedCard]);

    const tierColors: Record<string, string> = {
        Bronze: '#cd7f32',
        Silver: '#c0c0c0',
        Gold: '#ffd700',
    };

    // Card dimensions (Apple Wallet style - credit card ratio ~1.586)
    const CARD_WIDTH = 320;
    const CARD_HEIGHT = 200;
    const CARD_RADIUS = 20;

    // ============ REDEMPTION VIEW (as a card) ============
    if (selectedCard) {
        return (
            <div ref={containerRef} className="flex flex-col items-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                >
                    {/* Card shape maintained - just taller for content */}
                    <div
                        style={{
                            width: `${CARD_WIDTH}px`,
                            minHeight: `${CARD_HEIGHT + 120}px`,
                            borderRadius: `${CARD_RADIUS}px`,
                            background: `linear-gradient(160deg, ${selectedCard.shop.accent_color}88 0%, ${selectedCard.shop.accent_color}44 30%, #1a1520 100%)`,
                            border: `2px solid ${selectedCard.shop.accent_color}66`,
                            boxShadow: `
                                0 30px 60px -15px rgba(0,0,0,0.5),
                                0 0 50px ${selectedCard.shop.accent_color}33,
                                inset 0 1px 1px rgba(255,255,255,0.15)
                            `,
                            position: 'relative',
                            overflow: 'hidden',
                        }}
                    >
                        {/* Shine effect */}
                        <div
                            style={{
                                position: 'absolute',
                                top: 0,
                                left: '-50%',
                                width: '200%',
                                height: '100%',
                                background: 'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.08) 45%, rgba(255,255,255,0.12) 50%, rgba(255,255,255,0.08) 55%, transparent 60%)',
                                pointerEvents: 'none',
                            }}
                        />

                        {/* Card content */}
                        <div className="relative p-5 flex flex-col h-full">
                            {/* Header with back button */}
                            <div className="flex justify-between items-center mb-4">
                                <button
                                    onClick={() => setSelectedCard(null)}
                                    className="text-white/50 hover:text-white text-sm transition-colors"
                                >
                                    ← Back
                                </button>
                                <span
                                    className="text-xs font-bold px-2.5 py-1 rounded-full"
                                    style={{
                                        background: `${tierColors[selectedCard.tier]}22`,
                                        color: tierColors[selectedCard.tier],
                                        border: `1px solid ${tierColors[selectedCard.tier]}44`,
                                    }}
                                >
                                    {selectedCard.tier}
                                </span>
                            </div>

                            {/* Shop info */}
                            <div className="flex items-center gap-4 mb-5">
                                <div
                                    className="w-16 h-16 rounded-xl flex items-center justify-center text-2xl font-black"
                                    style={{
                                        background: `linear-gradient(135deg, ${selectedCard.shop.accent_color} 0%, ${selectedCard.shop.accent_color}88 100%)`,
                                        boxShadow: `0 8px 20px ${selectedCard.shop.accent_color}44`,
                                    }}
                                >
                                    {selectedCard.shop.name.charAt(0)}
                                </div>
                                <div>
                                    <h2 className="text-lg font-bold text-white">{selectedCard.shop.name}</h2>
                                    <p className="text-sm text-white/50 mt-0.5">{selectedCard.current_points} points</p>
                                </div>
                            </div>

                            {/* Reward section */}
                            <div className="flex-1 flex flex-col gap-3">
                                <div className="p-4 rounded-xl bg-black/30 border border-white/10">
                                    <span className="text-[10px] uppercase tracking-widest text-white/40 block mb-1">Available Reward</span>
                                    <span className="text-sm font-bold text-[#fbbf24]">Free Item</span>
                                </div>

                                <button className="w-full py-3.5 rounded-xl font-bold text-sm bg-white text-black hover:bg-white/90 transition-all active:scale-[0.98]">
                                    Redeem Now
                                </button>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Tap to go back hint */}
                <motion.p
                    className="mt-5 text-sm text-white/40"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                >
                    Tap back to return
                </motion.p>
            </div>
        );
    }

    // ============ CLOSED STATE - Single Card ============
    if (!isOpen) {
        return (
            <div ref={containerRef} className="flex flex-col items-center">
                <motion.div
                    className="relative cursor-pointer"
                    onClick={() => setIsOpen(true)}
                    whileHover={{ scale: 1.03, y: -5 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                    style={{ perspective: '1000px' }}
                >
                    {/* Stacked card preview (cards behind) */}
                    {cards.slice(1, 3).map((card, index) => (
                        <motion.div
                            key={card.id}
                            className="absolute rounded-[20px]"
                            style={{
                                width: `${CARD_WIDTH}px`,
                                height: `${CARD_HEIGHT}px`,
                                background: `linear-gradient(145deg, ${card.shop.accent_color}44 0%, ${card.shop.accent_color}22 100%)`,
                                border: `1px solid ${card.shop.accent_color}33`,
                                top: `${(index + 1) * -6}px`,
                                left: '50%',
                                transform: `translateX(-50%) scale(${1 - (index + 1) * 0.02})`,
                                zIndex: 10 - index,
                                opacity: 0.5 - index * 0.15,
                            }}
                        />
                    ))}

                    {/* Main card (top card) */}
                    <div
                        style={{
                            width: `${CARD_WIDTH}px`,
                            height: `${CARD_HEIGHT}px`,
                            borderRadius: `${CARD_RADIUS}px`,
                            background: cards[0]
                                ? `linear-gradient(145deg, ${cards[0].shop.accent_color}99 0%, ${cards[0].shop.accent_color}55 40%, #1a1520 100%)`
                                : 'linear-gradient(145deg, #4a4055 0%, #2a2535 50%, #1a1520 100%)',
                            border: cards[0] ? `2px solid ${cards[0].shop.accent_color}66` : '2px solid rgba(168, 85, 247, 0.3)',
                            boxShadow: `
                                0 25px 50px -12px rgba(0,0,0,0.5),
                                0 0 40px ${cards[0]?.shop.accent_color || 'rgba(168, 85, 247, 0.2)'}33,
                                inset 0 1px 1px rgba(255,255,255,0.12)
                            `,
                            position: 'relative',
                            overflow: 'hidden',
                            zIndex: 20,
                        }}
                    >
                        {/* Shine effect */}
                        <div
                            style={{
                                position: 'absolute',
                                top: 0,
                                left: '-50%',
                                width: '200%',
                                height: '100%',
                                background: 'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.08) 45%, rgba(255,255,255,0.12) 50%, rgba(255,255,255,0.08) 55%, transparent 60%)',
                                pointerEvents: 'none',
                            }}
                        />

                        {/* Card content */}
                        <div className="absolute inset-0 flex flex-col justify-between p-5">
                            {/* Top - Branding */}
                            <div className="flex justify-between items-start">
                                <SoftGlassLogo size={40} />
                                {cards.length > 0 && (
                                    <span className="text-xs text-white/60 bg-black/30 px-2.5 py-1 rounded-full">
                                        {cards.length} card{cards.length !== 1 ? 's' : ''}
                                    </span>
                                )}
                            </div>

                            {/* Bottom - Shop info */}
                            <div>
                                {cards[0] ? (
                                    <div className="flex items-center gap-3">
                                        <div
                                            className="w-12 h-12 rounded-xl flex items-center justify-center text-lg font-black"
                                            style={{
                                                background: `linear-gradient(135deg, ${cards[0].shop.accent_color} 0%, ${cards[0].shop.accent_color}88 100%)`,
                                                boxShadow: `0 4px 12px ${cards[0].shop.accent_color}44`,
                                            }}
                                        >
                                            {cards[0].shop.name.charAt(0)}
                                        </div>
                                        <div>
                                            <p className="text-base font-semibold text-white">{cards[0].shop.name}</p>
                                            <p className="text-sm text-white/50">{cards[0].current_points} points</p>
                                        </div>
                                    </div>
                                ) : (
                                    <p className="text-sm text-white/50">No cards yet</p>
                                )}
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Label */}
                <motion.p
                    className="mt-6 text-sm text-white/50"
                    animate={{ opacity: [0.5, 0.8, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                >
                    Tap to open wallet
                </motion.p>
            </div>
        );
    }

    // ============ OPEN STATE - Stacked Cards ============
    return (
        <div ref={containerRef} className="flex flex-col items-center">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="relative"
                style={{ width: `${CARD_WIDTH}px` }}
            >
                {/* Card stack */}
                <div className="relative" style={{ height: `${(cards.length + 1) * 140 + 100}px` }}>
                    {/* User's cards */}
                    {cards.map((card, index) => (
                        <motion.div
                            key={card.id}
                            className="absolute cursor-pointer"
                            style={{ width: `${CARD_WIDTH}px`, left: 0, zIndex: cards.length - index }}
                            initial={{ opacity: 0, y: -40, scale: 0.95 }}
                            animate={{ opacity: 1, y: index * 140, scale: 1 }}
                            transition={{
                                type: 'spring',
                                stiffness: 300,
                                damping: 25,
                                delay: index * 0.06,
                            }}
                            whileHover={{ y: index * 140 - 10, scale: 1.02, zIndex: 50 }}
                            onClick={() => setSelectedCard(card)}
                        >
                            {/* Card shape */}
                            <div
                                style={{
                                    width: '100%',
                                    height: `${CARD_HEIGHT}px`,
                                    borderRadius: `${CARD_RADIUS}px`,
                                    background: `linear-gradient(135deg, ${card.shop.accent_color}99 0%, ${card.shop.accent_color}55 35%, #1a1520 100%)`,
                                    border: `2px solid ${card.shop.accent_color}66`,
                                    boxShadow: `
                                        0 12px 30px -8px rgba(0,0,0,0.5),
                                        0 0 25px ${card.shop.accent_color}25,
                                        inset 0 1px 1px rgba(255,255,255,0.12)
                                    `,
                                    position: 'relative',
                                    overflow: 'hidden',
                                }}
                            >
                                {/* Shine */}
                                <div
                                    style={{
                                        position: 'absolute',
                                        top: 0,
                                        left: '-100%',
                                        width: '200%',
                                        height: '100%',
                                        background: 'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.06) 45%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0.06) 55%, transparent 60%)',
                                        pointerEvents: 'none',
                                    }}
                                />

                                {/* Card content */}
                                <div className="absolute inset-0 flex items-center justify-between px-5">
                                    <div className="flex items-center gap-4">
                                        <div
                                            className="w-14 h-14 rounded-xl flex items-center justify-center text-xl font-black"
                                            style={{
                                                background: `linear-gradient(135deg, ${card.shop.accent_color} 0%, ${card.shop.accent_color}88 100%)`,
                                                boxShadow: `0 6px 16px ${card.shop.accent_color}44`,
                                            }}
                                        >
                                            {card.shop.name.charAt(0)}
                                        </div>
                                        <div>
                                            <p className="text-base font-bold text-white">{card.shop.name}</p>
                                            <p className="text-sm text-white/50">{card.current_points} points</p>
                                        </div>
                                    </div>

                                    <span
                                        className="text-xs font-bold px-2.5 py-1 rounded-full"
                                        style={{
                                            background: `${tierColors[card.tier]}22`,
                                            color: tierColors[card.tier],
                                            border: `1px solid ${tierColors[card.tier]}44`,
                                        }}
                                    >
                                        {card.tier}
                                    </span>
                                </div>
                            </div>
                        </motion.div>
                    ))}

                    {/* Add Card - Apple style dashed outline card */}
                    <motion.div
                        className="absolute"
                        style={{ width: `${CARD_WIDTH}px`, left: 0, zIndex: 0 }}
                        initial={{ opacity: 0, y: -30 }}
                        animate={{ opacity: 1, y: cards.length * 140 }}
                        transition={{
                            type: 'spring',
                            stiffness: 300,
                            damping: 25,
                            delay: cards.length * 0.06 + 0.1,
                        }}
                    >
                        <Link href="/discover" className="block">
                            <div
                                style={{
                                    width: '100%',
                                    height: `${CARD_HEIGHT}px`,
                                    borderRadius: `${CARD_RADIUS}px`,
                                    border: '2px dashed rgba(255,255,255,0.2)',
                                    background: 'rgba(255,255,255,0.02)',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '8px',
                                    transition: 'all 0.2s ease',
                                }}
                                className="hover:border-white/40 hover:bg-white/5"
                            >
                                <div
                                    style={{
                                        width: '40px',
                                        height: '40px',
                                        borderRadius: '12px',
                                        border: '2px dashed rgba(255,255,255,0.25)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}
                                >
                                    <span className="text-2xl text-white/40">+</span>
                                </div>
                                <span className="text-sm font-medium text-white/40">Add Card</span>
                            </div>
                        </Link>
                    </motion.div>
                </div>

                {/* Close button */}
                <motion.button
                    onClick={() => setIsOpen(false)}
                    className="w-full mt-4 py-3 text-sm text-white/40 hover:text-white/60 transition-colors"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                >
                    Tap to close
                </motion.button>
            </motion.div>
        </div>
    );
};
