'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { CheckCircle, ArrowRight, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { CosmicBackground } from '@/components/CosmicBackground';

function OrderConfirmationContent() {
    const searchParams = useSearchParams();
    const orderId = searchParams.get('id');
    const pointsEarned = searchParams.get('points');

    return (
        <div className="min-h-screen text-white flex flex-col items-center justify-center p-6">
            {/* Cosmic Background */}
            <CosmicBackground />

            <motion.div
                className="relative z-10 text-center max-w-md"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
            >
                {/* Success Icon */}
                <motion.div
                    className="w-20 h-20 mx-auto mb-6 rounded-full bg-green-500/20 flex items-center justify-center"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: 'spring' }}
                >
                    <CheckCircle size={40} className="text-green-400" />
                </motion.div>

                <h1 className="text-3xl font-black mb-3">Order Placed!</h1>
                <p className="text-white/50 mb-6">
                    Your order has been sent to the business. You&apos;ll be notified when it&apos;s ready for pickup.
                </p>

                {/* Points Earned */}
                {pointsEarned && parseInt(pointsEarned) > 0 && (
                    <motion.div
                        className="mb-8 p-4 rounded-xl"
                        style={{
                            background: 'linear-gradient(135deg, rgba(176, 38, 255, 0.1) 0%, rgba(176, 38, 255, 0.05) 100%)',
                            border: '1px solid rgba(176, 38, 255, 0.3)',
                        }}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                    >
                        <div className="flex items-center justify-center gap-2 mb-1">
                            <Sparkles size={18} className="text-[#b026ff]" />
                            <span className="text-2xl font-black text-white">+{pointsEarned}</span>
                            <span className="text-white/60 font-semibold">points</span>
                        </div>
                        <p className="text-xs text-white/40">Added to your loyalty balance</p>
                    </motion.div>
                )}

                {orderId && (
                    <p className="text-xs text-white/30 mb-8 font-mono">
                        Order ID: {orderId.slice(0, 8)}...
                    </p>
                )}

                <div className="space-y-3">
                    <Link
                        href="/wallet"
                        className="w-full py-4 rounded-xl font-bold text-base flex items-center justify-center gap-2 transition-all"
                        style={{
                            background: 'linear-gradient(135deg, #b026ff 0%, #9020cc 100%)',
                            boxShadow: '0 8px 30px rgba(176, 38, 255, 0.4)',
                        }}
                    >
                        Back to Wallet
                        <ArrowRight size={18} />
                    </Link>
                    <Link
                        href="/orders"
                        className="block w-full py-4 rounded-xl font-semibold text-sm text-white/60 hover:text-white transition-colors text-center"
                        style={{
                            background: 'rgba(255,255,255,0.03)',
                            border: '1px solid rgba(255,255,255,0.08)',
                        }}
                    >
                        View My Orders
                    </Link>
                </div>
            </motion.div>
        </div>
    );
}

export default function OrderConfirmationPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-[#050505] flex items-center justify-center">
                <div className="w-8 h-8 border-2 border-[#b026ff] border-t-transparent rounded-full animate-spin" />
            </div>
        }>
            <OrderConfirmationContent />
        </Suspense>
    );
}
