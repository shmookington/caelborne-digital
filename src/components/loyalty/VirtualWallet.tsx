'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Outfit } from 'next/font/google';
import clsx from 'clsx';
import WalletCard, { WalletCardProps } from './WalletCard';
import SoftGlassLogo from '../SoftGlassLogo';

const outfit = Outfit({ subsets: ['latin'] });

interface CardSlotData extends Omit<WalletCardProps, 'className'> {
    id: string;
}

interface VirtualWalletProps {
    cards: CardSlotData[];
    className?: string;
}

export default function VirtualWallet({ cards, className }: VirtualWalletProps) {
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);
    const [hoveredSlot, setHoveredSlot] = useState<string | null>(null);
    const [activeCard, setActiveCard] = useState<CardSlotData | null>(null);
    const [selectedCardId, setSelectedCardId] = useState<string | null>(cards.length > 0 ? cards[0].id : null);

    const handleToggleWallet = () => {
        if (activeCard) return; // Don't toggle when card is drawn
        setIsOpen(!isOpen);
    };

    const handleDrawCard = (card: CardSlotData, e: React.MouseEvent) => {
        e.stopPropagation();
        if (selectedCardId === card.id) {
            // Second tap — navigate to card detail
            setActiveCard(card);
        } else {
            // First tap — reveal this card's content
            setSelectedCardId(card.id);
        }
    };

    const handlePutBackCard = () => {
        setActiveCard(null);
    };

    return (
        <div className={clsx("relative flex flex-col items-center justify-center min-h-[400px]", className, outfit.className)}>

            {/* === THE WALLET (Single Morphing Container) === */}
            <motion.div
                layout
                onClick={handleToggleWallet}
                className="relative cursor-pointer overflow-hidden"
                style={{
                    borderRadius: isOpen ? '24px' : '16px',
                    boxShadow: isOpen
                        ? '0 25px 60px -15px rgba(0,0,0,0.3), 0 0 0 1px rgba(255,255,255,0.2)'
                        : '0 8px 40px rgba(0,0,0,0.15), 0 0 0 1px rgba(255,255,255,0.2), inset 0 1px 0 rgba(255,255,255,0.3)',
                    backdropFilter: 'blur(24px) saturate(180%)',
                    WebkitBackdropFilter: 'blur(24px) saturate(180%)',
                }}
                initial={false}
                animate={{
                    width: isOpen ? 560 : 400,
                }}
                transition={{
                    layout: { duration: 0.5, ease: [0.32, 0.72, 0, 1] },
                    width: { duration: 0.5, ease: [0.32, 0.72, 0, 1] },
                }}
            >
                {/* Subtle Ambient Edge Glow — soft silver/platinum, not rainbow */}
                <div
                    className="absolute -inset-[1px] rounded-[17px] pointer-events-none"
                    style={{
                        background: 'linear-gradient(145deg, rgba(255,255,255,0.35) 0%, rgba(255,255,255,0.12) 40%, rgba(255,255,255,0.08) 60%, rgba(255,255,255,0.25) 100%)',
                        filter: 'blur(4px)',
                    }}
                />

                {/* Glass Base — frosted titanium feel */}
                <div
                    className="absolute inset-0 rounded-[16px]"
                    style={{
                        background: 'linear-gradient(155deg, rgba(255,255,255,0.24) 0%, rgba(255,255,255,0.14) 35%, rgba(245,240,255,0.10) 65%, rgba(255,255,255,0.20) 100%)',
                        backdropFilter: 'blur(40px) saturate(1.8)',
                        WebkitBackdropFilter: 'blur(40px) saturate(1.8)',
                    }}
                />

                {/* Top edge highlight — single clean line of light */}
                <div
                    className="absolute inset-x-0 top-0 h-[1px] pointer-events-none rounded-t-[16px]"
                    style={{
                        background: 'linear-gradient(90deg, transparent 10%, rgba(255,255,255,0.6) 50%, transparent 90%)',
                    }}
                />

                {/* Left edge highlight */}
                <div
                    className="absolute left-0 top-[10%] bottom-[10%] w-[1px] pointer-events-none"
                    style={{
                        background: 'linear-gradient(180deg, transparent, rgba(255,255,255,0.3) 30%, rgba(255,255,255,0.3) 70%, transparent)',
                    }}
                />

                {/* Clean Light Shimmer — continuous CSS flow */}
                <div
                    className="absolute inset-0 pointer-events-none overflow-hidden rounded-[16px]"
                >
                    <div
                        className="absolute inset-0"
                        style={{
                            background: `linear-gradient(
                                110deg,
                                transparent 20%,
                                rgba(255, 255, 255, 0.08) 35%,
                                rgba(255, 255, 255, 0.15) 50%,
                                rgba(255, 255, 255, 0.08) 65%,
                                transparent 80%
                            )`,
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
                </div>

                {/* Inner border — crisp, thin */}
                <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                        borderRadius: '16px',
                        border: '1px solid rgba(255,255,255,0.35)',
                        boxShadow: 'inset 0 1px 2px rgba(255,255,255,0.12)',
                    }}
                />

                {/* === CLOSED CONTENT (Premium Card Face) === */}
                <motion.div
                    className="relative z-10 flex flex-col items-center justify-between"
                    animate={{
                        opacity: isOpen ? 0 : 1,
                    }}
                    transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
                    style={{
                        pointerEvents: isOpen ? 'none' : 'auto',
                        position: isOpen ? 'absolute' : 'relative',
                        inset: 0,
                        padding: '28px 32px',
                        height: isOpen ? undefined : 252,
                    }}
                >
                    {/* Top Row - Chip + Contactless */}
                    <div className="w-full flex items-start justify-between">
                        {/* Card Chip */}
                        <div
                            style={{
                                width: '46px',
                                height: '34px',
                                borderRadius: '7px',
                                background: 'linear-gradient(145deg, #e8d5a0 0%, #c4a95a 30%, #d4b96e 60%, #b89840 100%)',
                                boxShadow: 'inset 0 1px 2px rgba(255,255,255,0.5), inset 0 -1px 2px rgba(0,0,0,0.15), 0 2px 8px rgba(0,0,0,0.15)',
                                position: 'relative',
                                overflow: 'hidden',
                            }}
                        >
                            {/* Chip lines */}
                            <div className="absolute inset-[5px] flex flex-col justify-between">
                                <div className="h-[1.5px] rounded-full" style={{ background: 'rgba(0,0,0,0.12)' }} />
                                <div className="h-[1.5px] rounded-full" style={{ background: 'rgba(0,0,0,0.12)' }} />
                                <div className="h-[1.5px] rounded-full" style={{ background: 'rgba(0,0,0,0.12)' }} />
                            </div>
                            {/* Chip center divider */}
                            <div
                                className="absolute top-[5px] bottom-[5px] left-1/2 w-[1.5px] -translate-x-1/2"
                                style={{ background: 'rgba(0,0,0,0.12)' }}
                            />
                        </div>

                        {/* Contactless Icon */}
                        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" style={{ opacity: 0.5 }}>
                            <path d="M8.5 12a3 3 0 013-3" stroke="rgba(0,0,0,0.6)" strokeWidth="2" strokeLinecap="round" />
                            <path d="M6 12a6 6 0 016-6" stroke="rgba(0,0,0,0.5)" strokeWidth="2" strokeLinecap="round" />
                            <path d="M3.5 12a8.5 8.5 0 018.5-8.5" stroke="rgba(0,0,0,0.4)" strokeWidth="2" strokeLinecap="round" />
                        </svg>
                    </div>

                    {/* Center - Logo + Brand */}
                    <div className="flex flex-col items-center -mt-1">
                        {/* Embossed Card Number Dots */}
                        <div className="flex items-center gap-6 mb-5">
                            {[0, 1, 2, 3].map((group) => (
                                <div key={group} className="flex gap-1.5">
                                    {[0, 1, 2, 3].map((dot) => (
                                        <div
                                            key={dot}
                                            className="w-[6px] h-[6px] rounded-full"
                                            style={{
                                                background: 'rgba(0,0,0,0.2)',
                                                boxShadow: '0 1px 0 rgba(255,255,255,0.3)',
                                            }}
                                        />
                                    ))}
                                </div>
                            ))}
                        </div>

                        {/* Logo */}
                        <img
                            src="/guap-logo-transparent.png"
                            alt="GUAP"
                            style={{
                                width: '56px',
                                height: '56px',
                                objectFit: 'contain',
                                filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.15))',
                            }}
                        />

                        <p
                            className="text-sm uppercase tracking-[0.35em] mt-3 font-semibold"
                            style={{
                                color: 'rgba(0,0,0,0.55)',
                                textShadow: '0 1px 0 rgba(255,255,255,0.3)',
                            }}
                        >
                            Digital Wallet
                        </p>
                    </div>

                    {/* Bottom Row - Tap CTA */}
                    <div className="w-full flex items-end justify-between">
                        <div />
                        <motion.div
                            className="flex items-center gap-2"
                            animate={{ opacity: [0.3, 0.7, 0.3] }}
                            transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut' }}
                        >
                            <motion.div
                                className="w-1.5 h-1.5 rounded-full"
                                style={{ background: 'rgba(0,0,0,0.35)' }}
                                animate={{ scale: [1, 1.4, 1] }}
                                transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut' }}
                            />
                            <p
                                className="text-sm font-medium tracking-wider"
                                style={{ color: 'rgba(0,0,0,0.4)' }}
                            >
                                Tap to Open
                            </p>
                        </motion.div>
                        <div />
                    </div>
                </motion.div>

                {/* === OPEN CONTENT (Sleeves) === */}
                <motion.div
                    className="relative z-10 px-5 py-4"
                    animate={{
                        opacity: isOpen ? 1 : 0,
                    }}
                    transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
                    style={{
                        pointerEvents: isOpen ? 'auto' : 'none',
                        position: isOpen ? 'relative' : 'absolute',
                        inset: 0,
                    }}
                >
                    {/* Header with Logo */}
                    <div className="flex flex-col items-center mb-6">
                        <img
                            src="/guap-logo-transparent.png"
                            alt="GUAP"
                            style={{
                                width: '56px',
                                height: '56px',
                                objectFit: 'contain',
                                filter: 'drop-shadow(0 4px 12px rgba(255,255,255,0.2))',
                            }}
                        />
                        <p
                            className="text-lg uppercase tracking-[0.25em] mt-3 font-medium"
                            style={{ color: 'rgba(0,0,0,0.6)' }}
                        >
                            My Cards
                        </p>
                    </div>

                    {/* Stacked Cards - Matching Wallet Card Proportions */}
                    <div
                        className="relative mt-4 flex flex-col items-center"
                        style={{
                            width: '100%',
                            height: cards.length > 0
                                ? `${220 + (cards.length - 1) * 70}px`
                                : '100px',
                        }}
                    >
                        {cards.map((card, index) => {
                            const isHovered = hoveredSlot === card.id;
                            // Create refined color palette - darker, more sophisticated
                            const baseHue = card.colorTheme;

                            return (
                                <motion.div
                                    key={card.id}
                                    onHoverStart={() => setHoveredSlot(card.id)}
                                    onHoverEnd={() => setHoveredSlot(null)}
                                    onClick={(e) => handleDrawCard(card, e)}
                                    className="absolute cursor-pointer"
                                    style={{
                                        left: 'calc(50% - 160px)',
                                        width: '320px',
                                        top: `${index * 70}px`,
                                        zIndex: isHovered ? 100 : cards.length - index,
                                    }}
                                    animate={{
                                        y: isHovered ? -25 : 0,
                                        scale: isHovered ? 1.03 : 1,
                                    }}
                                    transition={{
                                        type: 'spring',
                                        stiffness: 500,
                                        damping: 35,
                                    }}
                                >
                                    {/* Card - Frosted Glass */}
                                    <div
                                        className="relative overflow-hidden"
                                        style={{
                                            width: '100%',
                                            height: '200px',
                                            borderRadius: '16px',
                                            background: 'linear-gradient(155deg, rgba(255,255,255,0.40) 0%, rgba(255,255,255,0.28) 35%, rgba(250,245,255,0.22) 65%, rgba(255,255,255,0.35) 100%)',
                                            backdropFilter: 'blur(50px) saturate(1.8)',
                                            WebkitBackdropFilter: 'blur(50px) saturate(1.8)',
                                            boxShadow: isHovered
                                                ? '0 25px 50px -12px rgba(0,0,0,0.15), 0 0 0 1px rgba(255,255,255,0.4)'
                                                : '0 8px 30px rgba(0,0,0,0.08), 0 0 0 1px rgba(255,255,255,0.35)',
                                        }}
                                    >
                                        {/* Top edge highlight */}
                                        <div
                                            className="absolute inset-x-0 top-0 h-[1px] pointer-events-none rounded-t-[16px]"
                                            style={{
                                                background: 'linear-gradient(90deg, transparent 10%, rgba(255,255,255,0.6) 50%, transparent 90%)',
                                            }}
                                        />

                                        {/* Inner border */}
                                        <div
                                            className="absolute inset-0 pointer-events-none"
                                            style={{
                                                borderRadius: '16px',
                                                border: '1px solid rgba(255,255,255,0.35)',
                                                boxShadow: 'inset 0 1px 2px rgba(255,255,255,0.12)',
                                            }}
                                        />


                                        {/* Card Content - blurred until selected */}
                                        <motion.div
                                            className="relative z-10 h-full flex flex-col justify-between"
                                            style={{ padding: '24px 36px' }}
                                            animate={{
                                                filter: selectedCardId === card.id ? 'blur(0px)' : 'blur(6px)',
                                                opacity: selectedCardId === card.id ? 1 : 0.7,
                                            }}
                                            transition={{ duration: 0.3, ease: 'easeOut' }}
                                        >
                                            {/* Top Row */}
                                            <div className="flex items-start justify-between">
                                                <div>
                                                    <h3
                                                        className="text-lg font-semibold tracking-tight"
                                                        style={{ color: 'rgba(0,0,0,0.85)' }}
                                                    >
                                                        {card.businessName}
                                                    </h3>
                                                    <p
                                                        className="text-xs mt-1 tracking-wide"
                                                        style={{ color: 'rgba(0,0,0,0.4)' }}
                                                    >
                                                        REWARDS
                                                    </p>
                                                </div>
                                                {/* Accent Circle */}
                                                <div
                                                    className="w-10 h-10 rounded-full"
                                                    style={{
                                                        background: `linear-gradient(135deg, ${baseHue}40 0%, ${baseHue}20 100%)`,
                                                        border: `1px solid ${baseHue}30`,
                                                    }}
                                                />
                                            </div>

                                            {/* Bottom Row */}
                                            <div className="flex items-end justify-between">
                                                <div>
                                                    <p
                                                        className="text-3xl font-bold tracking-tight"
                                                        style={{ color: 'rgba(0,0,0,0.85)' }}
                                                    >
                                                        {card.currentStamps}
                                                    </p>
                                                    <p
                                                        className="text-[10px] uppercase tracking-widest mt-0.5"
                                                        style={{ color: 'rgba(0,0,0,0.4)' }}
                                                    >
                                                        Points
                                                    </p>
                                                </div>
                                                {/* Progress Indicator */}
                                                <div className="flex items-center gap-2">
                                                    <span
                                                        className="text-xs"
                                                        style={{ color: 'rgba(0,0,0,0.4)' }}
                                                    >
                                                        {card.currentStamps}/{card.maxStamps}
                                                    </span>
                                                    <div
                                                        className="w-16 h-1 rounded-full overflow-hidden"
                                                        style={{ background: 'rgba(0,0,0,0.08)' }}
                                                    >
                                                        <motion.div
                                                            className="h-full rounded-full"
                                                            style={{ background: baseHue }}
                                                            initial={{ width: 0 }}
                                                            animate={{ width: `${(card.currentStamps / card.maxStamps) * 100}%` }}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </motion.div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>

                    {/* Add Card */}
                    <motion.div
                        onClick={(e) => { e.stopPropagation(); router.push('/discover'); }}
                        className="cursor-pointer mt-4"
                        whileHover={{ y: -3 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <div
                            className="flex items-center justify-center gap-2"
                            style={{
                                height: '44px',
                                borderRadius: '12px',
                                border: '1px dashed rgba(0,0,0,0.15)',
                                background: 'rgba(0,0,0,0.02)',
                            }}
                        >
                            <span style={{ color: 'rgba(0,0,0,0.35)', fontSize: '18px' }}>+</span>
                            <span style={{ color: 'rgba(0,0,0,0.35)', fontSize: '13px' }}>Add Card</span>
                        </div>
                    </motion.div>

                    {/* Empty State */}
                    {cards.length === 0 && (
                        <div className="text-center py-8">
                            <p style={{ color: 'rgba(0,0,0,0.35)', fontSize: '13px' }}>No cards yet</p>
                        </div>
                    )}
                </motion.div>
            </motion.div>

            {/* === ACTIVE CARD VIEW (Drawn from Sleeve) === */}
            <AnimatePresence>
                {activeCard && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md"
                        onClick={handlePutBackCard}
                    >
                        <motion.div
                            initial={{ y: 60, scale: 0.9, opacity: 0 }}
                            animate={{ y: 0, scale: 1, opacity: 1 }}
                            exit={{ y: 60, scale: 0.9, opacity: 0 }}
                            transition={{ duration: 0.35, ease: [0.32, 0.72, 0, 1] }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <WalletCard
                                businessName={activeCard.businessName}
                                description={activeCard.description}
                                colorTheme={activeCard.colorTheme}
                                currentStamps={activeCard.currentStamps}
                                maxStamps={activeCard.maxStamps}
                            />
                        </motion.div>

                        {/* Back Button */}
                        <motion.button
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 20 }}
                            transition={{ delay: 0.1, duration: 0.3 }}
                            onClick={handlePutBackCard}
                            className="absolute bottom-10 left-1/2 -translate-x-1/2 px-6 py-2 rounded-full bg-white/10 text-white/70 text-sm font-medium hover:bg-white/20 transition-colors"
                        >
                            Put Back
                        </motion.button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
