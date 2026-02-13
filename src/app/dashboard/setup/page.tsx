'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '@/lib/supabase';
import { ArrowLeft, Rocket, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { CosmicBackground } from '@/components/CosmicBackground';

const GOLD = '#8B7332';
const GOLD_LIGHT = '#BFA265';

export default function ProjectSetupPage() {
    const router = useRouter();
    const [projectName, setProjectName] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
            router.push('/signin');
            return;
        }

        // Create slug from name
        const slug = projectName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

        // Check if slug exists
        const { data: existing } = await supabase
            .from('shops')
            .select('id')
            .eq('slug', slug)
            .single();

        if (existing) {
            setError('A project with a similar name already exists. Try a different name.');
            setLoading(false);
            return;
        }

        // Create project entry
        const { error: insertError } = await supabase
            .from('shops')
            .insert({
                name: projectName,
                slug: slug,
                owner_id: user.id,
                accent_color: GOLD,
                is_active: true,
            });

        if (insertError) {
            setError(insertError.message);
            setLoading(false);
            return;
        }

        // Update user role to owner
        await supabase
            .from('profiles')
            .update({ role: 'owner' })
            .eq('id', user.id);

        router.push('/dashboard');
    };

    return (
        <div className="min-h-screen text-white flex items-center justify-center p-6">
            <CosmicBackground />

            <motion.div
                className="w-full max-w-md relative z-10"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                {/* Back Link */}
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 text-sm text-white/50 hover:text-white mb-8 transition-colors"
                >
                    <ArrowLeft size={16} />
                    Back to home
                </Link>

                {/* Header */}
                <div className="mb-8">
                    <div
                        className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4"
                        style={{ background: `linear-gradient(135deg, ${GOLD} 0%, ${GOLD_LIGHT} 100%)` }}
                    >
                        <Rocket size={28} style={{ color: '#0a0a14' }} />
                    </div>
                    <h1 className="text-3xl font-black mb-2">Onboard Your Project</h1>
                    <p className="text-white/50">Let&apos;s get your project set up in the portal.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="space-y-2">
                        <label className="text-sm text-white/60">Project / Business Name</label>
                        <input
                            type="text"
                            value={projectName}
                            onChange={(e) => setProjectName(e.target.value)}
                            placeholder="e.g. Amir's Coffee Shop"
                            required
                            style={{ borderColor: 'rgba(140, 110, 50, 0.3)' }}
                            className="w-full px-4 py-4 rounded-xl bg-white/5 border text-white placeholder:text-white/30 focus:outline-none transition-colors"
                            onFocus={(e) => e.currentTarget.style.borderColor = GOLD}
                            onBlur={(e) => e.currentTarget.style.borderColor = 'rgba(140, 110, 50, 0.3)'}
                        />
                    </div>

                    {error && (
                        <p className="text-red-400 text-sm">{error}</p>
                    )}

                    <button
                        type="submit"
                        disabled={loading || !projectName.trim()}
                        className="w-full py-4 rounded-xl font-bold text-base flex items-center justify-center gap-2 transition-all disabled:opacity-50"
                        style={{
                            background: `linear-gradient(135deg, ${GOLD} 0%, ${GOLD_LIGHT} 100%)`,
                            color: '#0a0a14',
                            boxShadow: `0 8px 30px rgba(168, 135, 62, 0.3)`,
                        }}
                    >
                        {loading ? (
                            <Loader2 size={20} className="animate-spin" />
                        ) : (
                            'Get Started'
                        )}
                    </button>
                </form>
            </motion.div>
        </div>
    );
}
