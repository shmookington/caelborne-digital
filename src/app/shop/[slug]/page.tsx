'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Outfit } from 'next/font/google';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { CosmicBackground } from '@/components/CosmicBackground';
import { Store, Clock, MapPin, Sparkles, ChevronLeft, Loader2, Check, Star, Zap, Gift } from 'lucide-react';

const outfit = Outfit({ subsets: ['latin'] });

interface Shop {
    id: string;
    name: string;
    slug: string;
    description: string | null;
    accent_color: string;
    logo_url: string | null;
    hero_image_url: string | null;
}

interface MenuItem {
    id: string;
    name: string;
    price: number;
    is_available: boolean;
}

export default function ShopPage({ params }: { params: Promise<{ slug: string }> }) {
    const router = useRouter();
    const [slug, setSlug] = useState<string>('');
    const [shop, setShop] = useState<Shop | null>(null);
    const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [notFound, setNotFound] = useState(false);
    const [joining, setJoining] = useState(false);
    const [alreadyJoined, setAlreadyJoined] = useState(false);
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        const init = async () => {
            const { slug: paramSlug } = await params;
            setSlug(paramSlug);

            const { data: { session } } = await supabase.auth.getSession();
            setUser(session?.user || null);

            const { data: shopData, error: shopError } = await supabase
                .from('shops')
                .select('*')
                .eq('slug', paramSlug)
                .single();

            if (shopError || !shopData) {
                setNotFound(true);
                setLoading(false);
                return;
            }

            setShop(shopData);

            const { data: items } = await supabase
                .from('menu_items')
                .select('id, name, price, is_available')
                .eq('shop_id', shopData.id)
                .eq('is_available', true)
                .order('created_at', { ascending: true });

            if (items) setMenuItems(items);

            if (session?.user) {
                const { data: existingCard } = await supabase
                    .from('wallet_cards')
                    .select('id')
                    .eq('user_id', session.user.id)
                    .eq('shop_id', shopData.id)
                    .single();
                if (existingCard) setAlreadyJoined(true);
            }

            setLoading(false);
        };
        init();
    }, [params]);

    const handleJoinProgram = async () => {
        if (!shop) return;
        if (!user) {
            router.push(`/signup?redirect=/shop/${slug}`);
            return;
        }
        setJoining(true);
        const { error } = await supabase
            .from('wallet_cards')
            .insert({ user_id: user.id, shop_id: shop.id, current_points: 0, tier: 'Bronze' });
        if (!error) {
            setAlreadyJoined(true);
            setTimeout(() => router.push('/wallet'), 1000);
        }
        setJoining(false);
    };

    if (loading) {
        return (
            <div className={`min-h-screen bg-[#030305] flex items-center justify-center ${outfit.className}`}>
                <CosmicBackground />
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-12 h-12 rounded-full border-2 border-transparent"
                    style={{ borderTopColor: '#a855f7', borderRightColor: '#06b6d4' }}
                />
            </div>
        );
    }

    if (notFound || !shop) {
        return (
            <div className={`min-h-screen bg-[#030305] text-white flex flex-col items-center justify-center ${outfit.className}`}>
                <CosmicBackground />
                <div className="relative z-10 text-center">
                    <div className="text-8xl font-black mb-6 bg-gradient-to-b from-white/20 to-transparent bg-clip-text text-transparent">404</div>
                    <p className="text-white/40 mb-8">This shop doesn't exist.</p>
                    <Link href="/discover" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/[0.03] border border-white/10 text-white/80 hover:text-white hover:border-white/20 transition-all">
                        <ChevronLeft size={18} />
                        Back to Discover
                    </Link>
                </div>
            </div>
        );
    }

    const accent = shop.accent_color || '#a855f7';

    return (
        <div className={`min-h-screen bg-[#030305] text-white ${outfit.className}`}>
            <CosmicBackground />

            {/* Back Button - Fixed */}
            <div className="fixed top-20 left-6 z-50">
                <Link
                    href="/discover"
                    className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-black/60 backdrop-blur-xl border border-white/10 text-white/70 hover:text-white hover:border-white/20 transition-all text-sm font-medium"
                >
                    <ChevronLeft size={16} />
                    Back
                </Link>
            </div>

            {/* Hero */}
            <div className="relative pt-16">
                {/* Background Glow */}
                <div
                    className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full blur-[120px] opacity-30"
                    style={{ background: accent }}
                />

                {/* Content */}
                <div className="relative z-10 pt-20 pb-8 px-6">
                    <div className="max-w-2xl mx-auto text-center">
                        {/* Logo */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5 }}
                            className="inline-block mb-8"
                        >
                            <div
                                className="w-28 h-28 rounded-[2rem] flex items-center justify-center text-4xl font-black mx-auto relative"
                                style={{
                                    background: `linear-gradient(145deg, ${accent} 0%, ${accent}88 100%)`,
                                    boxShadow: `0 20px 60px ${accent}55, inset 0 1px 0 rgba(255,255,255,0.2)`
                                }}
                            >
                                {shop.logo_url ? (
                                    <Image src={shop.logo_url} alt="Logo" fill className="object-cover rounded-[2rem] p-3" />
                                ) : (
                                    shop.name.charAt(0)
                                )}
                            </div>
                        </motion.div>

                        {/* Name */}
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-4xl sm:text-5xl font-black tracking-tight mb-4"
                        >
                            {shop.name}
                        </motion.h1>

                        {/* Badges */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="flex items-center justify-center gap-3 mb-6"
                        >
                            <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#22c55e]/10 border border-[#22c55e]/20 text-[#22c55e] text-xs font-bold">
                                <div className="w-1.5 h-1.5 rounded-full bg-[#22c55e]" />
                                Open Now
                            </span>
                            <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.06] text-white/50 text-xs font-medium">
                                <MapPin size={12} />
                                Local
                            </span>
                            <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.06] text-white/50 text-xs font-medium">
                                <Star size={12} className="text-[#fbbf24]" fill="#fbbf24" />
                                New
                            </span>
                        </motion.div>

                        {/* Description */}
                        {shop.description && (
                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.3 }}
                                className="text-white/40 text-lg max-w-md mx-auto leading-relaxed"
                            >
                                {shop.description}
                            </motion.p>
                        )}
                    </div>
                </div>
            </div>

            {/* Join CTA Card */}
            <div className="relative z-10 px-6 py-8">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="max-w-2xl mx-auto"
                >
                    <div className="relative rounded-[2rem] p-[1px] overflow-hidden" style={{ background: `linear-gradient(135deg, ${accent}66 0%, transparent 50%, ${accent}33 100%)` }}>
                        <div className="relative rounded-[2rem] p-8 bg-[#0a0a0c] overflow-hidden">
                            {/* Glow */}
                            <div className="absolute -top-20 -right-20 w-48 h-48 rounded-full blur-[80px] opacity-40" style={{ background: accent }} />

                            <div className="relative z-10 flex flex-col sm:flex-row items-center gap-6">
                                {/* Icon */}
                                <div
                                    className="w-20 h-20 rounded-2xl flex items-center justify-center shrink-0"
                                    style={{ background: `${accent}22` }}
                                >
                                    {alreadyJoined ? (
                                        <Check size={36} style={{ color: accent }} />
                                    ) : (
                                        <Gift size={36} style={{ color: accent }} />
                                    )}
                                </div>

                                {/* Text */}
                                <div className="flex-1 text-center sm:text-left">
                                    <h2 className="text-2xl font-bold mb-2">
                                        {alreadyJoined ? "You're a Member!" : "Join Rewards Program"}
                                    </h2>
                                    <p className="text-white/40">
                                        {alreadyJoined
                                            ? "View your card and start earning points"
                                            : "Earn points on every purchase. Unlock exclusive rewards."}
                                    </p>
                                </div>

                                {/* Button */}
                                {alreadyJoined ? (
                                    <Link
                                        href="/wallet"
                                        className="w-full sm:w-auto px-8 py-4 rounded-2xl font-bold text-center flex items-center justify-center gap-2 text-white transition-all hover:scale-[1.02] active:scale-95"
                                        style={{ background: accent, boxShadow: `0 10px 30px ${accent}55` }}
                                    >
                                        <Sparkles size={18} />
                                        View Card
                                    </Link>
                                ) : (
                                    <button
                                        onClick={handleJoinProgram}
                                        disabled={joining}
                                        className="w-full sm:w-auto px-8 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 text-white transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-50"
                                        style={{ background: accent, boxShadow: `0 10px 30px ${accent}55` }}
                                    >
                                        {joining ? (
                                            <Loader2 size={18} className="animate-spin" />
                                        ) : (
                                            <Zap size={18} />
                                        )}
                                        {joining ? 'Joining...' : 'Join Free'}
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Divider */}
            <div className="relative z-10 px-6 py-4">
                <div className="max-w-2xl mx-auto h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            </div>

            {/* Menu */}
            <div className="relative z-10 px-6 pb-32">
                <div className="max-w-2xl mx-auto">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-sm font-bold text-white/30 uppercase tracking-widest">Menu</h2>
                        <span className="text-xs text-white/20">{menuItems.length} items</span>
                    </div>

                    {menuItems.length === 0 ? (
                        <div className="text-center py-16">
                            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-white/[0.02] border border-white/[0.05] flex items-center justify-center">
                                <Store size={28} className="text-white/10" />
                            </div>
                            <p className="text-white/30">Menu coming soon</p>
                        </div>
                    ) : (
                        <div className="space-y-3">
                            {menuItems.map((item, index) => (
                                <motion.div
                                    key={item.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.5 + index * 0.05 }}
                                    className="group"
                                >
                                    <div className="relative rounded-2xl p-[1px] bg-gradient-to-r from-white/[0.05] to-transparent hover:from-white/10 transition-all">
                                        <div className="rounded-2xl p-5 bg-[#08080a] flex items-center justify-between gap-4">
                                            <div className="flex-1">
                                                <h3 className="font-semibold text-white/90 group-hover:text-white transition-colors">
                                                    {item.name}
                                                </h3>
                                            </div>
                                            <div
                                                className="px-4 py-2 rounded-xl text-sm font-bold"
                                                style={{ background: `${accent}15`, color: accent }}
                                            >
                                                ${item.price.toFixed(2)}
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
