'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '@/lib/supabase';
import { Search, Plus, Check, Sparkles, MapPin, Zap } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { CosmicBackground } from '@/components/CosmicBackground';
import LoadingScreen from '@/components/LoadingScreen';
import { Outfit } from 'next/font/google';

const outfit = Outfit({ subsets: ['latin'] });

interface Shop {
    id: string;
    name: string;
    slug: string;
    accent_color: string;
    description: string | null;
}

export default function DiscoverPage() {
    const router = useRouter();
    const [shops, setShops] = useState<Shop[]>([]);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState<any>(null);
    const [userCards, setUserCards] = useState<string[]>([]);
    const [addingShop, setAddingShop] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchFocused, setSearchFocused] = useState(false);

    useEffect(() => {
        const init = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            if (session) {
                setUser(session.user);
                const { data: cardsData } = await supabase
                    .from('wallet_cards')
                    .select('shop_id')
                    .eq('user_id', session.user.id);
                if (cardsData) setUserCards(cardsData.map(c => c.shop_id));
            }

            const { data: shopsData } = await supabase
                .from('shops')
                .select('*')
                .eq('is_active', true);
            if (shopsData) setShops(shopsData);
            setLoading(false);
        };
        init();
    }, [router]);

    const handleAddToWallet = async (shopId: string, e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (!user) {
            router.push('/signin?redirect=/discover');
            return;
        }
        setAddingShop(shopId);
        const { error } = await supabase
            .from('wallet_cards')
            .insert({ user_id: user.id, shop_id: shopId, current_points: 0, tier: 'Bronze' });
        if (!error) setUserCards([...userCards, shopId]);
        setAddingShop(null);
    };

    const filteredShops = shops.filter(shop =>
        shop.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (loading) {
        return <LoadingScreen />;
    }

    return (
        <div className={`min-h-screen text-white overflow-x-hidden ${outfit.className}`}>
            <CosmicBackground />

            {/* Keyframes */}
            <style dangerouslySetInnerHTML={{
                __html: `
                @keyframes shimmerSlide {
                    0% { transform: translateX(-100%); }
                    100% { transform: translateX(100%); }
                }
                @keyframes goldSweep {
                    0% { background-position: -200% center; }
                    100% { background-position: 200% center; }
                }
                .discover-search::placeholder {
                    color: rgba(255, 255, 255, 0.2);
                }
                .discover-card:hover {
                    border-color: rgba(201, 169, 110, 0.15) !important;
                    box-shadow: 0 12px 40px rgba(0,0,0,0.5), 0 0 20px rgba(201,169,110,0.06), inset 0 1px 0 rgba(255,255,255,0.06) !important;
                }
            `}} />

            {/* Hero */}
            <div className="relative z-10 pt-24 sm:pt-32 pb-16 px-6 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6"
                        style={{
                            background: 'rgba(12, 12, 20, 0.55)',
                            border: '1px solid rgba(255, 255, 255, 0.06)',
                            boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.03)',
                        }}
                    >
                        <Sparkles size={14} style={{ color: '#8B7332' }} />
                        <span style={{ fontSize: '12px', fontWeight: 600, color: '#8B7332', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Explore Local</span>
                    </div>
                    <h1
                        style={{
                            fontSize: 'clamp(48px, 8vw, 72px)',
                            fontWeight: 900,
                            letterSpacing: '-0.03em',
                            color: '#ffffff',
                            textShadow: '0 2px 20px rgba(0,0,0,0.5), 0 0 60px rgba(0,0,0,0.3)',
                            marginBottom: '16px',
                            lineHeight: 1,
                        }}
                    >
                        Discover
                    </h1>
                    <p
                        style={{
                            fontSize: '17px',
                            fontWeight: 400,
                            lineHeight: 1.6,
                            color: 'rgba(255, 255, 255, 0.5)',
                            maxWidth: '400px',
                            margin: '0 auto',
                        }}
                    >
                        Join loyalty programs. Earn rewards. Support local businesses.
                    </p>
                </motion.div>
            </div>

            {/* Search */}
            <div className="relative z-10 px-6" style={{ paddingBottom: '48px' }}>
                <motion.div
                    className="mx-auto"
                    style={{ maxWidth: '520px', width: '100%' }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    <div className={`relative transition-all duration-500 ease-out ${searchFocused ? 'scale-[1.01]' : ''}`}>
                        {/* Focus glow */}
                        <div
                            className={`absolute -inset-[4px] rounded-[24px] transition-all duration-700 ease-out`}
                            style={{
                                background: 'radial-gradient(ellipse at center, rgba(201,169,110,0.2) 0%, transparent 70%)',
                                filter: 'blur(16px)',
                                opacity: searchFocused ? 0.6 : 0,
                            }}
                        />
                        <div
                            className="relative flex items-center overflow-hidden"
                            style={{
                                background: 'rgba(12, 12, 20, 0.55)',
                                backdropFilter: 'blur(30px)',
                                WebkitBackdropFilter: 'blur(30px)',
                                borderRadius: '20px',
                                border: searchFocused ? '1px solid rgba(201,169,110,0.2)' : '1px solid rgba(255, 255, 255, 0.06)',
                                boxShadow: '0 4px 20px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.03)',
                                transition: 'border-color 0.5s ease, box-shadow 0.5s ease',
                            }}
                        >
                            {/* Glass shine */}
                            <div
                                className="absolute inset-0 pointer-events-none"
                                style={{
                                    background: 'linear-gradient(135deg, rgba(255,255,255,0.04) 0%, transparent 40%)',
                                    borderRadius: '20px',
                                }}
                            />
                            {/* Search Icon */}
                            <div style={{
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                width: '36px', height: '36px', borderRadius: '10px', flexShrink: 0,
                                background: 'rgba(140, 110, 50, 0.12)',
                                border: '1px solid rgba(140, 110, 50, 0.15)',
                                marginLeft: '14px', color: '#8B7332',
                            }}>
                                <Search size={16} strokeWidth={2.5} />
                            </div>
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                onFocus={() => setSearchFocused(true)}
                                onBlur={() => setSearchFocused(false)}
                                placeholder="Search businesses..."
                                className="discover-search relative w-full bg-transparent text-white focus:outline-none focus:ring-0"
                                style={{
                                    padding: '18px 20px 18px 14px',
                                    fontSize: '15px',
                                    fontWeight: 500,
                                    letterSpacing: '0.01em',
                                    color: 'rgba(255,255,255,0.9)',
                                    border: 'none',
                                    outline: 'none',
                                    boxShadow: 'none',
                                    WebkitAppearance: 'none',
                                }}
                            />
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Quick Stats */}
            <div className="relative z-10 px-6 pt-0 pb-14">
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', maxWidth: '600px', margin: '0 auto' }}>
                    {[
                        { icon: <MapPin size={18} />, value: shops.length, label: 'Businesses', delay: 0.3 },
                        { icon: <Check size={18} />, value: userCards.length, label: 'Joined', delay: 0.35 },
                        { icon: <Sparkles size={18} />, value: '∞', label: 'Rewards', delay: 0.4 },
                    ].map((stat, i) => (
                        <motion.div
                            key={i}
                            style={{
                                textAlign: 'center',
                                padding: '24px 12px',
                                background: 'rgba(12, 12, 20, 0.55)',
                                backdropFilter: 'blur(30px)',
                                WebkitBackdropFilter: 'blur(30px)',
                                border: '1px solid rgba(255,255,255,0.06)',
                                borderRadius: '20px',
                                boxShadow: '0 4px 20px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.03)',
                            }}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: stat.delay, duration: 0.6 }}
                        >
                            <div style={{
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                width: '36px', height: '36px', borderRadius: '10px',
                                background: 'rgba(140, 110, 50, 0.15)',
                                border: '1px solid rgba(140, 110, 50, 0.2)',
                                margin: '0 auto 12px', color: '#8B7332',
                            }}>
                                {stat.icon}
                            </div>
                            <p style={{
                                fontSize: 'clamp(26px, 3vw, 34px)',
                                fontWeight: 700,
                                letterSpacing: '-0.03em',
                                color: '#BFA265',
                                marginBottom: '6px',
                                fontStyle: 'italic',
                                lineHeight: 1,
                            }}>{stat.value}</p>
                            <p style={{ fontSize: '11px', fontWeight: 600, color: '#8E95A0', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{stat.label}</p>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Divider */}
            <div className="relative z-10 px-6">
                <div className="max-w-4xl mx-auto" style={{ height: '1px', background: 'linear-gradient(90deg, transparent 5%, rgba(201,169,110,0.15) 30%, rgba(201,169,110,0.25) 50%, rgba(201,169,110,0.15) 70%, transparent 95%)' }} />
            </div>

            {/* Shops */}
            <main className="relative z-10 px-6 pt-10 pb-20">
                <div style={{ maxWidth: '1000px', margin: '0 auto' }}>

                    {/* Section heading */}
                    <div style={{ textAlign: 'center', marginBottom: '36px' }}>
                        <div style={{ width: '40px', height: '2px', background: 'linear-gradient(90deg, transparent, #8B7332, transparent)', margin: '0 auto 14px' }} />
                        <h2 style={{ fontSize: '13px', fontWeight: 700, color: '#8E95A0', textTransform: 'uppercase', letterSpacing: '0.15em' }}>Local Businesses</h2>
                    </div>
                    {filteredShops.length === 0 ? (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-24">
                            <div className="w-24 h-24 mx-auto mb-8 rounded-full flex items-center justify-center"
                                style={{
                                    background: 'rgba(20, 15, 35, 0.6)',
                                    border: '1px solid rgba(255,255,255,0.06)',
                                }}
                            >
                                <Search size={36} className="text-white/15" />
                            </div>
                            <h3 className="text-2xl font-bold mb-3 text-white/80">No businesses found</h3>
                            <p className="text-white/30 max-w-sm mx-auto">
                                {searchQuery ? `No results for "${searchQuery}"` : "Check back soon for new businesses."}
                            </p>
                        </motion.div>
                    ) : (
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                            gap: '24px',
                        }}>
                            <AnimatePresence>
                                {filteredShops.map((shop, index) => {
                                    const alreadyAdded = userCards.includes(shop.id);
                                    const isAdding = addingShop === shop.id;

                                    return (
                                        <motion.div
                                            key={shop.id}
                                            initial={{ opacity: 0, y: 30 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, scale: 0.95 }}
                                            transition={{ delay: index * 0.08, duration: 0.5 }}
                                            whileHover={{
                                                y: -6,
                                                scale: 1.015,
                                                transition: { type: 'spring', stiffness: 300, damping: 25 },
                                            }}
                                        >
                                            <Link href={`/shop/${shop.slug}`} className="block group" style={{ textDecoration: 'none' }}>
                                                <div
                                                    className="relative overflow-hidden discover-card"
                                                    style={{
                                                        background: 'linear-gradient(160deg, rgba(20, 15, 35, 0.9) 0%, rgba(12, 10, 25, 0.85) 100%)',
                                                        backdropFilter: 'blur(40px)',
                                                        WebkitBackdropFilter: 'blur(40px)',
                                                        border: '1px solid rgba(255, 255, 255, 0.06)',
                                                        boxShadow: '0 8px 32px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.06)',
                                                        borderRadius: '20px',
                                                        transition: 'border-color 0.5s ease, box-shadow 0.5s ease',
                                                    }}
                                                >
                                                    {/* ── Subtle shimmer ── */}
                                                    <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ borderRadius: '20px' }}>
                                                        <div style={{
                                                            position: 'absolute', inset: 0,
                                                            background: 'linear-gradient(110deg, transparent 30%, rgba(255,255,255,0.02) 45%, rgba(255,255,255,0.04) 50%, rgba(255,255,255,0.02) 55%, transparent 70%)',
                                                            animation: 'shimmerSlide 4s linear infinite',
                                                        }} />
                                                    </div>

                                                    {/* ── Top gloss ── */}
                                                    <div className="absolute inset-x-0 top-0 pointer-events-none" style={{
                                                        height: '40%',
                                                        background: 'linear-gradient(180deg, rgba(255,255,255,0.04) 0%, transparent 100%)',
                                                        borderRadius: '20px 20px 0 0',
                                                    }} />

                                                    {/* ── Hover glow ── */}
                                                    <div
                                                        className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none"
                                                        style={{
                                                            background: `radial-gradient(ellipse at center top, ${shop.accent_color}18 0%, transparent 60%)`,
                                                            borderRadius: '20px',
                                                            transition: 'opacity 0.7s ease',
                                                        }}
                                                    />

                                                    {/* ── Banner ── */}
                                                    <div style={{
                                                        height: '80px',
                                                        background: `linear-gradient(135deg, ${shop.accent_color}20 0%, ${shop.accent_color}08 60%, transparent 100%)`,
                                                        borderRadius: '20px 20px 0 0',
                                                        position: 'relative',
                                                    }}>
                                                        {/* Top gloss on banner */}
                                                        <div style={{
                                                            position: 'absolute', inset: 0,
                                                            background: 'linear-gradient(180deg, rgba(255,255,255,0.05) 0%, transparent 60%)',
                                                            borderRadius: '20px 20px 0 0',
                                                        }} />
                                                    </div>

                                                    {/* ── Icon ── */}
                                                    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '-30px', position: 'relative', zIndex: 10 }}>
                                                        <div
                                                            style={{
                                                                width: '56px',
                                                                height: '56px',
                                                                display: 'flex',
                                                                alignItems: 'center',
                                                                justifyContent: 'center',
                                                                fontSize: '22px',
                                                                fontWeight: 800,
                                                                color: '#ffffff',
                                                                background: `linear-gradient(145deg, ${shop.accent_color}, ${shop.accent_color}aa)`,
                                                                boxShadow: `0 6px 24px ${shop.accent_color}40, 0 0 0 3px rgba(12,10,25,0.9), 0 0 0 4px rgba(255,255,255,0.08)`,
                                                                borderRadius: '16px',
                                                            }}
                                                        >
                                                            {shop.name.charAt(0)}
                                                        </div>
                                                    </div>

                                                    {/* ── Body ── */}
                                                    <div style={{ padding: '14px 24px 24px', position: 'relative', zIndex: 5 }}>
                                                        <h3 style={{
                                                            textAlign: 'center',
                                                            fontWeight: 700,
                                                            fontSize: '17px',
                                                            color: 'rgba(255,255,255,0.9)',
                                                            marginBottom: '6px',
                                                            letterSpacing: '-0.01em',
                                                            overflow: 'hidden',
                                                            textOverflow: 'ellipsis',
                                                            whiteSpace: 'nowrap',
                                                        }}>
                                                            {shop.name}
                                                        </h3>
                                                        <p style={{
                                                            textAlign: 'center',
                                                            fontSize: '13px',
                                                            lineHeight: 1.5,
                                                            color: '#8E95A0',
                                                            maxWidth: '220px',
                                                            margin: '0 auto 16px',
                                                            display: '-webkit-box',
                                                            WebkitLineClamp: 2,
                                                            WebkitBoxOrient: 'vertical',
                                                            overflow: 'hidden',
                                                        }}>
                                                            {shop.description || 'Join the rewards program and earn points with every visit.'}
                                                        </p>

                                                        {/* Reward pill */}
                                                        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '16px' }}>
                                                            <div style={{
                                                                display: 'inline-flex',
                                                                alignItems: 'center',
                                                                gap: '6px',
                                                                padding: '5px 12px',
                                                                borderRadius: '99px',
                                                                background: 'rgba(201,169,110,0.06)',
                                                                border: '1px solid rgba(201,169,110,0.12)',
                                                            }}>
                                                                <Zap size={11} style={{ color: '#8B7332' }} />
                                                                <span style={{ fontSize: '11px', fontWeight: 600, color: 'rgba(201,169,110,0.6)' }}>Earn rewards with every visit</span>
                                                            </div>
                                                        </div>

                                                        {/* CTA */}
                                                        <button
                                                            onClick={(e) => handleAddToWallet(shop.id, e)}
                                                            disabled={alreadyAdded || isAdding}
                                                            style={{
                                                                width: '100%',
                                                                padding: '11px 0',
                                                                fontSize: '13px',
                                                                fontWeight: 700,
                                                                display: 'flex',
                                                                alignItems: 'center',
                                                                justifyContent: 'center',
                                                                gap: '6px',
                                                                borderRadius: '12px',
                                                                cursor: alreadyAdded ? 'default' : 'pointer',
                                                                transition: 'all 0.3s ease',
                                                                background: alreadyAdded
                                                                    ? 'rgba(52, 211, 153, 0.08)'
                                                                    : 'rgba(201, 169, 110, 0.08)',
                                                                color: alreadyAdded ? '#6ee7b7' : '#BFA265',
                                                                border: alreadyAdded
                                                                    ? '1px solid rgba(52, 211, 153, 0.15)'
                                                                    : '1px solid rgba(201, 169, 110, 0.15)',
                                                                letterSpacing: '0.02em',
                                                            }}
                                                        >
                                                            {isAdding ? (
                                                                <motion.div
                                                                    animate={{ rotate: 360 }}
                                                                    transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                                                                    style={{ width: 16, height: 16, border: '2px solid currentColor', borderTopColor: 'transparent', borderRadius: '50%' }}
                                                                />
                                                            ) : alreadyAdded ? (
                                                                <>
                                                                    <Check size={14} />
                                                                    Joined
                                                                </>
                                                            ) : (
                                                                <>
                                                                    <Plus size={14} />
                                                                    Join Program
                                                                </>
                                                            )}
                                                        </button>
                                                    </div>
                                                </div>
                                            </Link>
                                        </motion.div>
                                    );
                                })}
                            </AnimatePresence>
                        </div>
                    )}
                </div>
            </main>

            {/* ── Footer ── */}
            <footer className="relative z-10" style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '48px 24px 32px', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '32px' }}>
                    <div>
                        <h4 style={{ fontSize: '12px', fontWeight: 700, color: '#8E95A0', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '16px' }}>Company</h4>
                        {['About', 'Careers', 'Press'].map(item => (
                            <p key={item} style={{ fontSize: '13px', color: '#8E95A0', marginBottom: '10px', cursor: 'pointer' }}>{item}</p>
                        ))}
                    </div>
                    <div>
                        <h4 style={{ fontSize: '12px', fontWeight: 700, color: '#8E95A0', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '16px' }}>Product</h4>
                        {['Features', 'Pricing', 'Security'].map(item => (
                            <p key={item} style={{ fontSize: '13px', color: '#8E95A0', marginBottom: '10px', cursor: 'pointer' }}>{item}</p>
                        ))}
                    </div>
                    <div>
                        <h4 style={{ fontSize: '12px', fontWeight: 700, color: '#8E95A0', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '16px' }}>Legal</h4>
                        {['Privacy', 'Terms', 'Cookies'].map(item => (
                            <p key={item} style={{ fontSize: '13px', color: '#8E95A0', marginBottom: '10px', cursor: 'pointer' }}>{item}</p>
                        ))}
                    </div>
                </div>
                <div style={{ borderTop: '1px solid rgba(255,255,255,0.04)', padding: '20px 24px', textAlign: 'center' }}>
                    <p style={{ fontSize: '12px', color: '#8E95A0' }}>© 2026 Caelborne Digital. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
}
