'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import VirtualWallet from '@/components/loyalty/VirtualWallet';
import { CosmicBackground } from '@/components/CosmicBackground';
import LoadingScreen from '@/components/LoadingScreen';
import { Outfit } from 'next/font/google';

const outfit = Outfit({ subsets: ['latin'] });

interface WalletCard {
    id: string;
    businessName: string;
    description: string;
    colorTheme: string;
    currentStamps: number;
    maxStamps: number;
}

export default function WalletPage() {
    const router = useRouter();
    const [cards, setCards] = useState<WalletCard[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const init = async () => {
            // Check auth
            const { data: { session } } = await supabase.auth.getSession();
            if (!session) {
                router.push('/signin');
                return;
            }

            // Fetch user's wallet cards with shop details
            const { data: walletData, error } = await supabase
                .from('wallet_cards')
                .select(`
                    id,
                    current_points,
                    tier,
                    shop:shops (
                        id,
                        name,
                        accent_color
                    )
                `)
                .eq('user_id', session.user.id);

            if (walletData && !error) {
                const formattedCards: WalletCard[] = walletData.map((card: any) => ({
                    id: card.id,
                    businessName: card.shop?.name || 'Unknown Business',
                    description: getTierDescription(card.tier),
                    colorTheme: card.shop?.accent_color || '#a855f7',
                    currentStamps: card.current_points,
                    maxStamps: getTierMaxPoints(card.tier),
                }));
                setCards(formattedCards);
            }

            setLoading(false);
        };

        init();
    }, [router]);

    // Helper to get tier-based descriptions
    const getTierDescription = (tier: string): string => {
        switch (tier) {
            case 'Gold': return 'VIP Member - Max rewards unlocked!';
            case 'Silver': return 'Silver Member - 10% bonus points';
            case 'Bronze':
            default: return 'Earn points with every purchase!';
        }
    };

    // Helper to get max points per tier
    const getTierMaxPoints = (tier: string): number => {
        switch (tier) {
            case 'Gold': return 2000;
            case 'Silver': return 1000;
            case 'Bronze':
            default: return 500;
        }
    };

    if (loading) {
        return <LoadingScreen />;
    }

    return (
        <main className={`min-h-screen bg-black text-white flex items-center justify-center p-8 ${outfit.className}`}>
            <CosmicBackground />
            <div className="relative z-10">
                <VirtualWallet cards={cards} />
            </div>
        </main>
    );
}
