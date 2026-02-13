'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '@/lib/supabase';
import { ArrowLeft, Heart, Star, MapPin, Wallet, Compass, ShoppingBag } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { CosmicBackground } from '@/components/CosmicBackground';
import LoadingScreen from '@/components/LoadingScreen';

interface FavoriteShop {
    id: string;
    shop: {
        id: string;
        name: string;
        slug: string;
        accent_color: string;
        description: string | null;
    };
}

export default function FavoritesPage() {
    const router = useRouter();
    const [favorites, setFavorites] = useState<FavoriteShop[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const init = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) {
                router.push('/signin');
                return;
            }

            // Fetch user's favorite shops
            const { data: favoritesData } = await supabase
                .from('favorites')
                .select(`
                    id,
                    shop:shops (
                        id,
                        name,
                        slug,
                        accent_color,
                        description
                    )
                `)
                .eq('user_id', user.id);

            if (favoritesData) {
                setFavorites(favoritesData as any);
            }

            setLoading(false);
        };

        init();
    }, [router]);

    if (loading) {
        return <LoadingScreen />;
    }

    return (
        <div className="min-h-screen text-white pb-32">
            {/* Cosmic Background */}
            <CosmicBackground />

            {/* Header - Frosted Glass */}
            <header
                className="relative z-10 flex items-center gap-4"
                style={{
                    padding: '20px 24px',
                    background: 'linear-gradient(180deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 100%)',
                    backdropFilter: 'blur(40px)',
                    WebkitBackdropFilter: 'blur(40px)',
                    borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                }}
            >
                <Link
                    href="/wallet"
                    className="p-3 -ml-2 rounded-2xl transition-all hover:bg-white/10"
                    style={{
                        background: 'rgba(255, 255, 255, 0.05)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                    }}
                >
                    <ArrowLeft size={20} className="text-white/70" />
                </Link>
                <h1 className="text-xl font-bold">Favorites</h1>
            </header>

            {/* Favorites List */}
            <main className="relative z-10 px-6 py-8">
                {favorites.length === 0 ? (
                    <motion.div
                        className="text-center py-20"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <div
                            className="w-24 h-24 mx-auto mb-6 rounded-full flex items-center justify-center"
                            style={{
                                background: 'linear-gradient(145deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.03) 100%)',
                                backdropFilter: 'blur(40px)',
                                border: '1px solid rgba(255, 255, 255, 0.1)',
                            }}
                        >
                            <Heart size={40} className="text-white/30" />
                        </div>
                        <p className="text-white/40 mb-6 text-lg">No favorites yet</p>
                        <Link
                            href="/discover"
                            className="inline-flex items-center gap-3 px-8 py-4 rounded-full text-sm font-bold transition-all hover:scale-105"
                            style={{
                                background: 'linear-gradient(145deg, rgba(236,72,153,0.25) 0%, rgba(236,72,153,0.15) 100%)',
                                backdropFilter: 'blur(40px)',
                                WebkitBackdropFilter: 'blur(40px)',
                                border: '1px solid rgba(236, 72, 153, 0.4)',
                                boxShadow: '0 8px 32px rgba(236, 72, 153, 0.2), inset 0 1px 0 rgba(255,255,255,0.15)',
                                color: '#fbcfe8',
                            }}
                        >
                            Discover Shops
                        </Link>
                    </motion.div>
                ) : (
                    <div className="space-y-5 max-w-2xl mx-auto">
                        {favorites.map((favorite, index) => (
                            <motion.div
                                key={favorite.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.08 }}
                            >
                                <Link href={`/shop/${favorite.shop.slug}`} className="block group">
                                    <div
                                        className="relative overflow-hidden"
                                        style={{
                                            background: 'linear-gradient(145deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.03) 100%)',
                                            backdropFilter: 'blur(60px)',
                                            WebkitBackdropFilter: 'blur(60px)',
                                            border: '1px solid rgba(255, 255, 255, 0.15)',
                                            boxShadow: '0 8px 40px rgba(0, 0, 0, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.15)',
                                            borderRadius: '32px',
                                            padding: '24px 28px',
                                        }}
                                    >
                                        {/* Glass Shine Effect */}
                                        <div
                                            className="absolute inset-0 pointer-events-none opacity-50"
                                            style={{
                                                background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, transparent 40%, transparent 60%, rgba(255,255,255,0.03) 100%)',
                                                borderRadius: '32px',
                                            }}
                                        />

                                        {/* Accent Glow */}
                                        <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ borderRadius: '32px' }}>
                                            <div
                                                className="absolute -top-16 -right-16 w-40 h-40 rounded-full blur-[80px] opacity-30 group-hover:opacity-50 transition-opacity"
                                                style={{ background: favorite.shop.accent_color }}
                                            />
                                        </div>

                                        {/* Content */}
                                        <div className="relative z-10 flex items-center gap-4">
                                            {/* Shop Initial Badge */}
                                            <div
                                                className="w-14 h-14 rounded-2xl flex items-center justify-center text-xl font-black text-white flex-shrink-0"
                                                style={{
                                                    background: `linear-gradient(145deg, ${favorite.shop.accent_color} 0%, ${favorite.shop.accent_color}bb 100%)`,
                                                    boxShadow: `0 12px 32px ${favorite.shop.accent_color}44`,
                                                }}
                                            >
                                                {favorite.shop.name.charAt(0)}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <h3 className="font-bold text-lg text-white truncate">{favorite.shop.name}</h3>
                                                <p className="text-sm text-white/40 truncate">
                                                    {favorite.shop.description || 'Tap to view shop'}
                                                </p>
                                            </div>
                                            <Heart
                                                size={24}
                                                className="text-pink-400 flex-shrink-0"
                                                fill="#f472b6"
                                            />
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                )}
            </main>

            {/* Bottom Nav - Floating Pills */}
            <nav
                className="fixed bottom-0 left-0 right-0 z-20"
                style={{
                    padding: '16px 24px 32px',
                }}
            >
                <div className="max-w-lg mx-auto flex justify-center gap-2">
                    <Link
                        href="/wallet"
                        className="flex items-center gap-2 px-4 py-3 rounded-full transition-all hover:scale-105"
                        style={{
                            background: 'linear-gradient(145deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.03) 100%)',
                            backdropFilter: 'blur(20px)',
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                        }}
                    >
                        <Wallet size={18} className="text-white/50" />
                        <span className="text-sm font-medium text-white/50">Wallet</span>
                    </Link>
                    <Link
                        href="/discover"
                        className="flex items-center gap-2 px-4 py-3 rounded-full transition-all hover:scale-105"
                        style={{
                            background: 'linear-gradient(145deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.03) 100%)',
                            backdropFilter: 'blur(20px)',
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                        }}
                    >
                        <Compass size={18} className="text-white/50" />
                        <span className="text-sm font-medium text-white/50">Discover</span>
                    </Link>
                    <Link
                        href="/orders"
                        className="flex items-center gap-2 px-4 py-3 rounded-full transition-all hover:scale-105"
                        style={{
                            background: 'linear-gradient(145deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.03) 100%)',
                            backdropFilter: 'blur(20px)',
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                        }}
                    >
                        <ShoppingBag size={18} className="text-white/50" />
                        <span className="text-sm font-medium text-white/50">Orders</span>
                    </Link>
                    <button
                        className="flex items-center gap-2 px-4 py-3 rounded-full transition-all"
                        style={{
                            background: 'linear-gradient(145deg, rgba(236,72,153,0.25) 0%, rgba(236,72,153,0.15) 100%)',
                            backdropFilter: 'blur(20px)',
                            border: '1px solid rgba(236, 72, 153, 0.4)',
                            boxShadow: '0 4px 20px rgba(236, 72, 153, 0.2)',
                        }}
                    >
                        <Heart size={18} className="text-pink-400" />
                        <span className="text-sm font-medium text-pink-200">Favorites</span>
                    </button>
                </div>
            </nav>
        </div>
    );
}
