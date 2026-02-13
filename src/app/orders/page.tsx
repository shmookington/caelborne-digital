'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '@/lib/supabase';
import { ArrowLeft, Clock, CheckCircle, Package, Wallet, Compass, ShoppingBag, Heart } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { CosmicBackground } from '@/components/CosmicBackground';
import LoadingScreen from '@/components/LoadingScreen';

interface Order {
    id: string;
    status: string;
    total: number;
    created_at: string;
    shop: {
        name: string;
        accent_color: string;
    };
}

export default function OrdersPage() {
    const router = useRouter();
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const init = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) {
                router.push('/signin');
                return;
            }

            const { data: ordersData } = await supabase
                .from('orders')
                .select(`
          id,
          status,
          total,
          created_at,
          shop:shops (
            name,
            accent_color
          )
        `)
                .eq('user_id', user.id)
                .order('created_at', { ascending: false });

            if (ordersData) {
                setOrders(ordersData.map((o: any) => ({ ...o, shop: o.shop })));
            }

            setLoading(false);
        };

        init();
    }, [router]);

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'pending': return <Clock size={16} className="text-yellow-400" />;
            case 'accepted': return <Package size={16} className="text-blue-400" />;
            case 'ready': return <CheckCircle size={16} className="text-green-400" />;
            case 'completed': return <CheckCircle size={16} className="text-black/40" />;
            default: return <Clock size={16} className="text-black/40" />;
        }
    };

    const getStatusLabel = (status: string) => {
        switch (status) {
            case 'pending': return 'Pending';
            case 'accepted': return 'Preparing';
            case 'ready': return 'Ready for Pickup';
            case 'completed': return 'Completed';
            case 'cancelled': return 'Cancelled';
            default: return status;
        }
    };

    if (loading) {
        return <LoadingScreen />;
    }

    return (
        <div className="min-h-screen pb-32" style={{ color: '#000' }}>
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
                    <ArrowLeft size={20} style={{ color: '#000' }} />
                </Link>
                <h1 className="text-xl font-bold">My Orders</h1>
            </header>

            {/* Orders List */}
            <main className="relative z-10 px-6 py-8">
                {orders.length === 0 ? (
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
                            <Package size={40} style={{ color: 'rgba(0,0,0,0.3)' }} />
                        </div>
                        <p className="mb-6 text-lg" style={{ color: 'rgba(0,0,0,0.5)' }}>No orders yet</p>
                        <Link
                            href="/discover"
                            className="inline-flex items-center gap-3 px-8 py-4 rounded-full text-sm font-bold transition-all hover:scale-105"
                            style={{
                                background: 'linear-gradient(145deg, rgba(168,85,247,0.25) 0%, rgba(168,85,247,0.15) 100%)',
                                backdropFilter: 'blur(40px)',
                                WebkitBackdropFilter: 'blur(40px)',
                                border: '1px solid rgba(168, 85, 247, 0.4)',
                                boxShadow: '0 8px 32px rgba(168, 85, 247, 0.2), inset 0 1px 0 rgba(255,255,255,0.15)',
                                color: '#000',
                            }}
                        >
                            Discover Shops
                        </Link>
                    </motion.div>
                ) : (
                    <div className="space-y-5 max-w-2xl mx-auto">
                        {orders.map((order, index) => (
                            <motion.div
                                key={order.id}
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
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.08 }}
                                whileHover={{ scale: 1.01, transition: { duration: 0.2 } }}
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
                                        className="absolute -top-16 -right-16 w-40 h-40 rounded-full blur-[80px] opacity-30"
                                        style={{ background: order.shop?.accent_color || '#a855f7' }}
                                    />
                                </div>

                                {/* Content */}
                                <div className="relative z-10">
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="flex items-center gap-4">
                                            {/* Shop Initial Badge */}
                                            <div
                                                className="w-14 h-14 rounded-2xl flex items-center justify-center text-xl font-black"
                                                style={{
                                                    color: '#fff',
                                                    background: `linear-gradient(145deg, ${order.shop?.accent_color || '#a855f7'} 0%, ${order.shop?.accent_color || '#a855f7'}bb 100%)`,
                                                    boxShadow: `0 12px 32px ${order.shop?.accent_color || '#a855f7'}44`,
                                                }}
                                            >
                                                {order.shop?.name?.charAt(0) || '?'}
                                            </div>
                                            <div>
                                                <h3 className="font-bold text-lg" style={{ color: '#000' }}>{order.shop?.name || 'Unknown Shop'}</h3>
                                                <p className="text-sm" style={{ color: 'rgba(0,0,0,0.5)' }}>
                                                    {new Date(order.created_at).toLocaleDateString('en-US', {
                                                        month: 'short',
                                                        day: 'numeric',
                                                        year: 'numeric'
                                                    })} · {new Date(order.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                </p>
                                            </div>
                                        </div>
                                        <span className="font-black text-2xl" style={{ color: '#000' }}>${order.total?.toFixed(2) || '0.00'}</span>
                                    </div>

                                    {/* Status Badge */}
                                    <div
                                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full"
                                        style={{
                                            background: order.status === 'ready'
                                                ? 'rgba(34, 197, 94, 0.15)'
                                                : order.status === 'pending'
                                                    ? 'rgba(250, 204, 21, 0.15)'
                                                    : order.status === 'accepted'
                                                        ? 'rgba(59, 130, 246, 0.15)'
                                                        : 'rgba(255, 255, 255, 0.08)',
                                            border: order.status === 'ready'
                                                ? '1px solid rgba(34, 197, 94, 0.3)'
                                                : order.status === 'pending'
                                                    ? '1px solid rgba(250, 204, 21, 0.3)'
                                                    : order.status === 'accepted'
                                                        ? '1px solid rgba(59, 130, 246, 0.3)'
                                                        : '1px solid rgba(255, 255, 255, 0.1)',
                                            backdropFilter: 'blur(20px)',
                                        }}
                                    >
                                        {getStatusIcon(order.status)}
                                        <span className={`text-sm font-semibold ${order.status === 'ready' ? 'text-green-600' :
                                            order.status === 'pending' ? 'text-yellow-600' :
                                                order.status === 'accepted' ? 'text-blue-600' :
                                                    'text-black/60'
                                            }`}>
                                            {getStatusLabel(order.status)}
                                        </span>
                                    </div>
                                </div>
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
                        <Wallet size={18} style={{ color: 'rgba(0,0,0,0.5)' }} />
                        <span className="text-sm font-medium" style={{ color: 'rgba(0,0,0,0.5)' }}>Wallet</span>
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
                        <Compass size={18} style={{ color: 'rgba(0,0,0,0.5)' }} />
                        <span className="text-sm font-medium" style={{ color: 'rgba(0,0,0,0.5)' }}>Discover</span>
                    </Link>
                    <button
                        className="flex items-center gap-2 px-4 py-3 rounded-full transition-all"
                        style={{
                            background: 'linear-gradient(145deg, rgba(168,85,247,0.25) 0%, rgba(168,85,247,0.15) 100%)',
                            backdropFilter: 'blur(20px)',
                            border: '1px solid rgba(168, 85, 247, 0.4)',
                            boxShadow: '0 4px 20px rgba(168, 85, 247, 0.2)',
                        }}
                    >
                        <ShoppingBag size={18} style={{ color: '#000' }} />
                        <span className="text-sm font-medium" style={{ color: '#000' }}>Orders</span>
                    </button>
                    <Link
                        href="/favorites"
                        className="flex items-center gap-2 px-4 py-3 rounded-full transition-all hover:scale-105"
                        style={{
                            background: 'linear-gradient(145deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.03) 100%)',
                            backdropFilter: 'blur(20px)',
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                        }}
                    >
                        <Heart size={18} style={{ color: 'rgba(0,0,0,0.5)' }} />
                        <span className="text-sm font-medium" style={{ color: 'rgba(0,0,0,0.5)' }}>Favorites</span>
                    </Link>
                </div>
            </nav>
        </div>
    );
}
