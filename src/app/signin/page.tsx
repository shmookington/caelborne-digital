'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '@/lib/supabase';
import { isAdmin } from '@/lib/isAdmin';
import { ArrowLeft, Mail, Lock, Loader2, Eye, EyeOff } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { CosmicBackground } from '@/components/CosmicBackground';

// ─── Design Tokens ──────────────────────────────────────────────
const PURPLE = '#b026ff';
const PURPLE_GLOW = 'rgba(176, 38, 255, 0.4)';
const GLASS_BG = 'rgba(12, 12, 20, 0.6)';
const GLASS_BORDER = 'rgba(255, 255, 255, 0.08)';
const INPUT_BG = 'rgba(255, 255, 255, 0.06)';
const INPUT_BORDER = 'rgba(255, 255, 255, 0.12)';
const INPUT_BORDER_FOCUS = PURPLE;

export default function SignInPage() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleSignIn = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            setError(error.message);
            setLoading(false);
        } else {
            router.push(isAdmin(data.user?.email) ? '/admin' : '/dashboard');
        }
    };

    const inputStyle: React.CSSProperties = {
        width: '100%',
        padding: '16px 16px 16px 48px',
        borderRadius: '14px',
        fontSize: '15px',
        color: '#fff',
        background: INPUT_BG,
        border: `1px solid ${INPUT_BORDER}`,
        outline: 'none',
        transition: 'border 0.2s, box-shadow 0.2s',
    };

    return (
        <div
            style={{
                minHeight: '100vh',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '24px',
                position: 'relative',
                overflow: 'hidden',
                color: '#fff',
            }}
        >
            <CosmicBackground />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                style={{
                    width: '100%',
                    maxWidth: '420px',
                    position: 'relative',
                    zIndex: 10,
                }}
            >
                {/* Back Link */}
                <Link
                    href="/"
                    style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '8px',
                        fontSize: '13px',
                        color: 'rgba(255,255,255,0.5)',
                        textDecoration: 'none',
                        marginBottom: '24px',
                    }}
                >
                    <ArrowLeft size={16} />
                    Back to home
                </Link>

                {/* Glass Card */}
                <div
                    style={{
                        background: GLASS_BG,
                        backdropFilter: 'blur(40px)',
                        WebkitBackdropFilter: 'blur(40px)',
                        border: `1px solid ${GLASS_BORDER}`,
                        borderRadius: '24px',
                        padding: 'clamp(28px, 5vw, 40px)',
                        boxShadow: '0 8px 40px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.04)',
                    }}
                >
                    {/* Header */}
                    <div style={{ marginBottom: '32px' }}>
                        <h1
                            style={{
                                fontSize: '28px',
                                fontWeight: 800,
                                marginBottom: '8px',
                                letterSpacing: '-0.02em',
                            }}
                        >
                            Welcome Back
                        </h1>
                        <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '14px' }}>
                            Sign in to access your wallet.
                        </p>
                    </div>

                    <form onSubmit={handleSignIn}>
                        {/* Email */}
                        <div style={{ marginBottom: '20px' }}>
                            <label
                                style={{
                                    display: 'block',
                                    fontSize: '12px',
                                    fontWeight: 600,
                                    color: 'rgba(255,255,255,0.5)',
                                    marginBottom: '8px',
                                    letterSpacing: '0.03em',
                                    textTransform: 'uppercase',
                                }}
                            >
                                Email
                            </label>
                            <div style={{ position: 'relative' }}>
                                <Mail
                                    size={18}
                                    style={{
                                        position: 'absolute',
                                        left: '16px',
                                        top: '50%',
                                        transform: 'translateY(-50%)',
                                        color: 'rgba(255,255,255,0.3)',
                                        pointerEvents: 'none',
                                    }}
                                />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="you@example.com"
                                    required
                                    style={inputStyle}
                                    onFocus={(e) => {
                                        e.target.style.border = `1px solid ${INPUT_BORDER_FOCUS}`;
                                        e.target.style.boxShadow = `0 0 20px ${PURPLE_GLOW}`;
                                    }}
                                    onBlur={(e) => {
                                        e.target.style.border = `1px solid ${INPUT_BORDER}`;
                                        e.target.style.boxShadow = 'none';
                                    }}
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div style={{ marginBottom: '24px' }}>
                            <label
                                style={{
                                    display: 'block',
                                    fontSize: '12px',
                                    fontWeight: 600,
                                    color: 'rgba(255,255,255,0.5)',
                                    marginBottom: '8px',
                                    letterSpacing: '0.03em',
                                    textTransform: 'uppercase',
                                }}
                            >
                                Password
                            </label>
                            <div style={{ position: 'relative' }}>
                                <Lock
                                    size={18}
                                    style={{
                                        position: 'absolute',
                                        left: '16px',
                                        top: '50%',
                                        transform: 'translateY(-50%)',
                                        color: 'rgba(255,255,255,0.3)',
                                        pointerEvents: 'none',
                                    }}
                                />
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    required
                                    style={{ ...inputStyle, paddingRight: '48px' }}
                                    onFocus={(e) => {
                                        e.target.style.border = `1px solid ${INPUT_BORDER_FOCUS}`;
                                        e.target.style.boxShadow = `0 0 20px ${PURPLE_GLOW}`;
                                    }}
                                    onBlur={(e) => {
                                        e.target.style.border = `1px solid ${INPUT_BORDER}`;
                                        e.target.style.boxShadow = 'none';
                                    }}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    style={{
                                        position: 'absolute',
                                        right: '16px',
                                        top: '50%',
                                        transform: 'translateY(-50%)',
                                        background: 'none',
                                        border: 'none',
                                        cursor: 'pointer',
                                        color: 'rgba(255,255,255,0.3)',
                                        padding: 0,
                                    }}
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                        </div>

                        {/* Error */}
                        {error && (
                            <p
                                style={{
                                    color: '#f87171',
                                    fontSize: '13px',
                                    marginBottom: '16px',
                                    padding: '10px 14px',
                                    borderRadius: '10px',
                                    background: 'rgba(248,113,113,0.1)',
                                    border: '1px solid rgba(248,113,113,0.2)',
                                }}
                            >
                                {error}
                            </p>
                        )}

                        {/* Submit Button */}
                        <motion.button
                            type="submit"
                            disabled={loading}
                            whileHover={{ scale: 1.02, boxShadow: `0 12px 40px ${PURPLE_GLOW}` }}
                            whileTap={{ scale: 0.98 }}
                            style={{
                                width: '100%',
                                padding: '16px',
                                borderRadius: '14px',
                                fontWeight: 700,
                                fontSize: '15px',
                                color: '#fff',
                                background: `linear-gradient(135deg, ${PURPLE} 0%, #9020cc 100%)`,
                                border: 'none',
                                cursor: loading ? 'not-allowed' : 'pointer',
                                opacity: loading ? 0.6 : 1,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '8px',
                                boxShadow: `0 8px 30px ${PURPLE_GLOW}`,
                                transition: 'opacity 0.2s',
                            }}
                        >
                            {loading ? <Loader2 size={20} className="animate-spin" /> : 'Sign In'}
                        </motion.button>

                        {/* Sign Up Link */}
                        <p
                            style={{
                                textAlign: 'center',
                                fontSize: '13px',
                                color: 'rgba(255,255,255,0.5)',
                                marginTop: '20px',
                            }}
                        >
                            Don&apos;t have an account?{' '}
                            <Link
                                href="/signup"
                                style={{ color: PURPLE, textDecoration: 'none', fontWeight: 600 }}
                            >
                                Create one
                            </Link>
                        </p>
                    </form>
                </div>
            </motion.div>
        </div>
    );
}
