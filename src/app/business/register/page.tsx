'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '@/lib/supabase';
import { CosmicBackground } from '@/components/CosmicBackground';
import {
    Mail,
    Lock,
    Eye,
    EyeOff,
    ArrowRight,
    ArrowLeft,
    Loader2,
    User,
    Phone,
    Sparkles,
    Check,
    ChefHat,
    Scissors,
    Dumbbell,
    Building2,
    Home,
    ShoppingBag,
    Stethoscope,
    Car,
    Rocket,
} from 'lucide-react';
import { Outfit } from 'next/font/google';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const outfit = Outfit({ subsets: ['latin'], weight: ['400', '500', '600', '700', '800'] });

// ─── Design Tokens ──────────────────────────────────────────────
const GOLD = '#C5A044';
const GOLD_LIGHT = '#DAC06A';
const GOLD_DIM = 'rgba(197, 160, 68, 0.15)';
const GOLD_BORDER = 'rgba(197, 160, 68, 0.35)';
const GOLD_GLOW = 'rgba(197, 160, 68, 0.4)';
const GLASS_BG = 'rgba(12, 12, 20, 0.72)';
const GLASS_BORDER = 'rgba(255, 255, 255, 0.08)';
const INPUT_BG = 'rgba(255, 255, 255, 0.05)';
const INPUT_BORDER = 'rgba(255, 255, 255, 0.10)';

// ─── Business types ─────────────────────────────────────────────
const BUSINESS_TYPES = [
    { id: 'restaurant', label: 'Restaurant / Café', icon: <ChefHat size={22} /> },
    { id: 'barbershop', label: 'Barbershop', icon: <Scissors size={22} /> },
    { id: 'salon', label: 'Salon / Spa', icon: <Sparkles size={22} /> },
    { id: 'fitness', label: 'Fitness / Gym', icon: <Dumbbell size={22} /> },
    { id: 'retail', label: 'Retail / Shop', icon: <ShoppingBag size={22} /> },
    { id: 'realestate', label: 'Real Estate', icon: <Home size={22} /> },
    { id: 'medical', label: 'Medical / Health', icon: <Stethoscope size={22} /> },
    { id: 'auto', label: 'Auto / Detailing', icon: <Car size={22} /> },
    { id: 'other', label: 'Other', icon: <Building2 size={22} /> },
];

// ─── Step labels ────────────────────────────────────────────────
const STEP_LABELS = ['Account', 'Business', 'Welcome'];

export default function BusinessRegisterPage() {
    const router = useRouter();
    const [currentStep, setCurrentStep] = useState(0);
    const [direction, setDirection] = useState(1);

    // Step 1 — Account
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    // Step 2 — Business
    const [businessName, setBusinessName] = useState('');
    const [contactName, setContactName] = useState('');
    const [phone, setPhone] = useState('');
    const [businessType, setBusinessType] = useState('');

    // Shared
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    // ─── Helpers ─────────────────────────────────────────────────

    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
        e.target.style.borderColor = GOLD;
        e.target.style.boxShadow = `0 0 20px ${GOLD_GLOW}`;
    };
    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        e.target.style.borderColor = INPUT_BORDER;
        e.target.style.boxShadow = 'none';
    };

    const inputStyle: React.CSSProperties = {
        width: '100%',
        padding: '14px 16px 14px 46px',
        borderRadius: '14px',
        fontSize: '14px',
        color: '#fff',
        background: INPUT_BG,
        border: `1px solid ${INPUT_BORDER}`,
        outline: 'none',
        transition: 'border 0.2s, box-shadow 0.2s',
    };

    const labelStyle: React.CSSProperties = {
        display: 'block',
        fontSize: '11px',
        fontWeight: 600,
        color: 'rgba(255,255,255,0.45)',
        marginBottom: '8px',
        letterSpacing: '0.1em',
        textTransform: 'uppercase',
    };

    const iconStyle: React.CSSProperties = {
        position: 'absolute',
        left: '14px',
        top: '50%',
        transform: 'translateY(-50%)',
        color: 'rgba(255,255,255,0.25)',
        pointerEvents: 'none',
    };

    // ─── Step 1: Create Account ─────────────────────────────────

    const handleAccountSubmit = async () => {
        setError('');
        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }
        if (password.length < 6) {
            setError('Password must be at least 6 characters');
            return;
        }
        setLoading(true);

        const { error: authError } = await supabase.auth.signUp({ email, password });

        if (authError) {
            setError(authError.message);
            setLoading(false);
            return;
        }

        setLoading(false);
        setDirection(1);
        setCurrentStep(1);
    };

    // ─── Step 2: Business details + final submit ────────────────

    const handleBusinessSubmit = async () => {
        setError('');
        if (!businessName.trim()) {
            setError('Business name is required');
            return;
        }
        setLoading(true);

        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
            setError('Authentication failed. Please try again.');
            setLoading(false);
            return;
        }

        // Create shop
        const slug = businessName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

        const { error: shopError } = await supabase.from('shops').insert({
            name: businessName,
            slug: slug,
            owner_id: user.id,
            accent_color: GOLD,
            is_active: true,
        });

        if (shopError) {
            setError(shopError.message);
            setLoading(false);
            return;
        }

        // Update profile
        await supabase.from('profiles').update({
            role: 'owner',
            full_name: contactName || null,
            phone: phone || null,
        }).eq('id', user.id);

        // Also create a ticket for admin tracking
        const typeLabel = BUSINESS_TYPES.find((b) => b.id === businessType)?.label || businessType;
        await supabase.from('tickets').insert({
            name: contactName || businessName,
            email: email,
            phone: phone || null,
            business_type: typeLabel || null,
            summary: `New business registration: ${businessName}`,
            status: 'new',
        });

        // Send notification email
        fetch('/api/notify', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: contactName || businessName,
                email,
                phone,
                businessType: typeLabel,
                summary: `New business registration: ${businessName}`,
                source: 'registration',
            }),
        }).catch(() => { });

        setLoading(false);
        setDirection(1);
        setCurrentStep(2);
    };

    // ─── Slide animations ───────────────────────────────────────

    const slideVariants = {
        enter: (d: number) => ({ x: d > 0 ? 60 : -60, opacity: 0 }),
        center: { x: 0, opacity: 1 },
        exit: (d: number) => ({ x: d > 0 ? -60 : 60, opacity: 0 }),
    };

    return (
        <div className={outfit.className}>
            <CosmicBackground />

            <div style={{
                minHeight: '100vh',
                position: 'relative',
                zIndex: 10,
                color: '#fff',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '24px',
                paddingTop: '40px',
            }}>

                {/* ── Progress Indicators ─────────────────── */}
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0px',
                        marginBottom: '40px',
                    }}
                >
                    {STEP_LABELS.map((label, i) => {
                        const isActive = i === currentStep;
                        const isDone = i < currentStep;
                        return (
                            <div key={label} style={{ display: 'flex', alignItems: 'center' }}>
                                <div style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    gap: '8px',
                                }}>
                                    <motion.div
                                        animate={{
                                            scale: isActive ? 1 : 0.85,
                                            background: isDone
                                                ? `linear-gradient(135deg, ${GOLD}, ${GOLD_LIGHT})`
                                                : isActive
                                                    ? `linear-gradient(135deg, ${GOLD}, ${GOLD_LIGHT})`
                                                    : 'rgba(255,255,255,0.06)',
                                            border: isDone || isActive
                                                ? `2px solid ${GOLD}`
                                                : '2px solid rgba(255,255,255,0.1)',
                                        }}
                                        transition={{ duration: 0.3 }}
                                        style={{
                                            width: '36px',
                                            height: '36px',
                                            borderRadius: '50%',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            fontSize: '13px',
                                            fontWeight: 700,
                                            color: isDone || isActive ? '#0a0a14' : 'rgba(255,255,255,0.3)',
                                            boxShadow: isActive ? `0 0 20px ${GOLD_GLOW}` : 'none',
                                        }}
                                    >
                                        {isDone ? <Check size={16} strokeWidth={3} /> : i + 1}
                                    </motion.div>
                                    <span style={{
                                        fontSize: '10px',
                                        fontWeight: 600,
                                        letterSpacing: '0.08em',
                                        color: isActive ? GOLD_LIGHT : 'rgba(255,255,255,0.3)',
                                        textTransform: 'uppercase',
                                    }}>
                                        {label}
                                    </span>
                                </div>
                                {i < STEP_LABELS.length - 1 && (
                                    <div style={{
                                        width: '48px',
                                        height: '2px',
                                        background: i < currentStep
                                            ? `linear-gradient(90deg, ${GOLD}, ${GOLD_LIGHT})`
                                            : 'rgba(255,255,255,0.08)',
                                        marginLeft: '8px',
                                        marginRight: '8px',
                                        marginBottom: '20px',
                                        borderRadius: '1px',
                                        transition: 'background 0.3s ease',
                                    }} />
                                )}
                            </div>
                        );
                    })}
                </motion.div>

                {/* ── Main Card ────────────────────────────── */}
                <div style={{
                    width: '100%',
                    maxWidth: '460px',
                }}>
                    <AnimatePresence mode="wait" custom={direction}>

                        {/* ═══ STEP 1: Account ═══ */}
                        {currentStep === 0 && (
                            <motion.div
                                key="step-account"
                                custom={direction}
                                variants={slideVariants}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                            >
                                <div style={{
                                    background: GLASS_BG,
                                    backdropFilter: 'blur(40px)',
                                    WebkitBackdropFilter: 'blur(40px)',
                                    border: `1px solid ${GLASS_BORDER}`,
                                    borderRadius: '24px',
                                    padding: 'clamp(28px, 5vw, 40px)',
                                    boxShadow: '0 8px 40px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.04)',
                                }}>
                                    {/* Header */}
                                    <div style={{ marginBottom: '28px' }}>
                                        <motion.div
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                                            style={{
                                                width: '48px',
                                                height: '48px',
                                                borderRadius: '14px',
                                                background: GOLD_DIM,
                                                border: `1px solid ${GOLD_BORDER}`,
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                marginBottom: '16px',
                                            }}
                                        >
                                            <Mail size={22} style={{ color: GOLD_LIGHT }} />
                                        </motion.div>
                                        <h1 style={{
                                            fontSize: '24px',
                                            fontWeight: 800,
                                            letterSpacing: '-0.03em',
                                            marginBottom: '6px',
                                        }}>
                                            Create Your Account
                                        </h1>
                                        <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.5)', lineHeight: 1.5 }}>
                                            Set up your credentials to get started.
                                        </p>
                                    </div>

                                    {/* Email */}
                                    <div style={{ marginBottom: '16px' }}>
                                        <label style={labelStyle}>Email</label>
                                        <div style={{ position: 'relative' }}>
                                            <Mail size={16} style={iconStyle} />
                                            <input
                                                type="email"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                placeholder="you@business.com"
                                                required
                                                style={inputStyle}
                                                onFocus={handleFocus}
                                                onBlur={handleBlur}
                                            />
                                        </div>
                                    </div>

                                    {/* Password */}
                                    <div style={{ marginBottom: '16px' }}>
                                        <label style={labelStyle}>Password</label>
                                        <div style={{ position: 'relative' }}>
                                            <Lock size={16} style={iconStyle} />
                                            <input
                                                type={showPassword ? 'text' : 'password'}
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                placeholder="••••••••"
                                                required
                                                minLength={6}
                                                style={{ ...inputStyle, paddingRight: '46px' }}
                                                onFocus={handleFocus}
                                                onBlur={handleBlur}
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowPassword(!showPassword)}
                                                style={{
                                                    position: 'absolute', right: '14px', top: '50%',
                                                    transform: 'translateY(-50%)', background: 'none',
                                                    border: 'none', cursor: 'pointer',
                                                    color: 'rgba(255,255,255,0.3)', padding: 0,
                                                }}
                                            >
                                                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                            </button>
                                        </div>
                                    </div>

                                    {/* Confirm Password */}
                                    <div style={{ marginBottom: '24px' }}>
                                        <label style={labelStyle}>Confirm Password</label>
                                        <div style={{ position: 'relative' }}>
                                            <Lock size={16} style={iconStyle} />
                                            <input
                                                type={showConfirmPassword ? 'text' : 'password'}
                                                value={confirmPassword}
                                                onChange={(e) => setConfirmPassword(e.target.value)}
                                                placeholder="••••••••"
                                                required
                                                minLength={6}
                                                style={{ ...inputStyle, paddingRight: '46px' }}
                                                onFocus={handleFocus}
                                                onBlur={handleBlur}
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                                style={{
                                                    position: 'absolute', right: '14px', top: '50%',
                                                    transform: 'translateY(-50%)', background: 'none',
                                                    border: 'none', cursor: 'pointer',
                                                    color: 'rgba(255,255,255,0.3)', padding: 0,
                                                }}
                                            >
                                                {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                            </button>
                                        </div>
                                    </div>

                                    {/* Error */}
                                    {error && (
                                        <motion.p
                                            initial={{ opacity: 0, y: -4 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            style={{
                                                color: '#f87171', fontSize: '13px', marginBottom: '16px',
                                                padding: '10px 14px', borderRadius: '10px',
                                                background: 'rgba(248,113,113,0.08)',
                                                border: '1px solid rgba(248,113,113,0.15)',
                                            }}
                                        >
                                            {error}
                                        </motion.p>
                                    )}

                                    {/* Submit */}
                                    <motion.button
                                        onClick={handleAccountSubmit}
                                        disabled={loading || !email || !password || !confirmPassword}
                                        whileHover={{ scale: 1.02, boxShadow: `0 12px 40px ${GOLD_GLOW}` }}
                                        whileTap={{ scale: 0.98 }}
                                        style={{
                                            width: '100%', padding: '15px', borderRadius: '14px',
                                            fontWeight: 700, fontSize: '14px', color: '#0a0a14',
                                            background: `linear-gradient(135deg, ${GOLD} 0%, ${GOLD_LIGHT} 100%)`,
                                            border: 'none',
                                            cursor: loading ? 'not-allowed' : 'pointer',
                                            opacity: (!email || !password || !confirmPassword) ? 0.4 : loading ? 0.6 : 1,
                                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                                            gap: '8px', boxShadow: `0 8px 30px ${GOLD_GLOW}`,
                                            transition: 'opacity 0.2s',
                                        }}
                                    >
                                        {loading ? (
                                            <Loader2 size={18} className="animate-spin" />
                                        ) : (
                                            <>Continue <ArrowRight size={16} /></>
                                        )}
                                    </motion.button>

                                    {/* Sign In Link */}
                                    <p style={{
                                        textAlign: 'center', fontSize: '13px',
                                        color: 'rgba(255,255,255,0.4)', marginTop: '20px',
                                    }}>
                                        Already have an account?{' '}
                                        <Link href="/signin" style={{ color: GOLD_LIGHT, textDecoration: 'none', fontWeight: 600 }}>
                                            Sign in
                                        </Link>
                                    </p>
                                </div>
                            </motion.div>
                        )}

                        {/* ═══ STEP 2: Business Details ═══ */}
                        {currentStep === 1 && (
                            <motion.div
                                key="step-business"
                                custom={direction}
                                variants={slideVariants}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                            >
                                <div style={{
                                    background: GLASS_BG,
                                    backdropFilter: 'blur(40px)',
                                    WebkitBackdropFilter: 'blur(40px)',
                                    border: `1px solid ${GLASS_BORDER}`,
                                    borderRadius: '24px',
                                    padding: 'clamp(28px, 5vw, 40px)',
                                    boxShadow: '0 8px 40px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.04)',
                                }}>
                                    {/* Back */}
                                    <button
                                        onClick={() => { setDirection(-1); setCurrentStep(0); setError(''); }}
                                        style={{
                                            display: 'flex', alignItems: 'center', gap: '6px',
                                            background: 'none', border: 'none',
                                            color: 'rgba(255,255,255,0.5)', fontSize: '13px',
                                            cursor: 'pointer', padding: 0, marginBottom: '20px',
                                        }}
                                    >
                                        <ArrowLeft size={14} /> Back
                                    </button>

                                    {/* Header */}
                                    <div style={{ marginBottom: '24px' }}>
                                        <motion.div
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                                            style={{
                                                width: '48px', height: '48px', borderRadius: '14px',
                                                background: GOLD_DIM, border: `1px solid ${GOLD_BORDER}`,
                                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                marginBottom: '16px',
                                            }}
                                        >
                                            <Rocket size={22} style={{ color: GOLD_LIGHT }} />
                                        </motion.div>
                                        <h1 style={{
                                            fontSize: '24px', fontWeight: 800,
                                            letterSpacing: '-0.03em', marginBottom: '6px',
                                        }}>
                                            Your Business
                                        </h1>
                                        <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.5)', lineHeight: 1.5 }}>
                                            Tell us about your business so we can set things up.
                                        </p>
                                    </div>

                                    {/* Business Name */}
                                    <div style={{ marginBottom: '16px' }}>
                                        <label style={labelStyle}>Business Name</label>
                                        <div style={{ position: 'relative' }}>
                                            <Building2 size={16} style={iconStyle} />
                                            <input
                                                type="text"
                                                value={businessName}
                                                onChange={(e) => setBusinessName(e.target.value)}
                                                placeholder="e.g. Amir's Coffee Shop"
                                                required
                                                style={inputStyle}
                                                onFocus={handleFocus}
                                                onBlur={handleBlur}
                                            />
                                        </div>
                                    </div>

                                    {/* Contact Name */}
                                    <div style={{ marginBottom: '16px' }}>
                                        <label style={labelStyle}>Your Name</label>
                                        <div style={{ position: 'relative' }}>
                                            <User size={16} style={iconStyle} />
                                            <input
                                                type="text"
                                                value={contactName}
                                                onChange={(e) => setContactName(e.target.value)}
                                                placeholder="Your full name"
                                                style={inputStyle}
                                                onFocus={handleFocus}
                                                onBlur={handleBlur}
                                            />
                                        </div>
                                    </div>

                                    {/* Phone */}
                                    <div style={{ marginBottom: '20px' }}>
                                        <label style={labelStyle}>Phone (optional)</label>
                                        <div style={{ position: 'relative' }}>
                                            <Phone size={16} style={iconStyle} />
                                            <input
                                                type="tel"
                                                value={phone}
                                                onChange={(e) => setPhone(e.target.value)}
                                                placeholder="(555) 123-4567"
                                                style={inputStyle}
                                                onFocus={handleFocus}
                                                onBlur={handleBlur}
                                            />
                                        </div>
                                    </div>

                                    {/* Business Type Picker */}
                                    <div style={{ marginBottom: '24px' }}>
                                        <label style={labelStyle}>Business Type</label>
                                        <div style={{
                                            display: 'grid',
                                            gridTemplateColumns: 'repeat(3, 1fr)',
                                            gap: '8px',
                                        }}>
                                            {BUSINESS_TYPES.map((bt) => {
                                                const selected = businessType === bt.id;
                                                return (
                                                    <motion.button
                                                        key={bt.id}
                                                        onClick={() => setBusinessType(bt.id)}
                                                        whileHover={{ scale: 1.04 }}
                                                        whileTap={{ scale: 0.96 }}
                                                        style={{
                                                            display: 'flex', flexDirection: 'column',
                                                            alignItems: 'center', justifyContent: 'center',
                                                            gap: '6px', padding: '14px 6px',
                                                            borderRadius: '14px',
                                                            background: selected
                                                                ? `linear-gradient(135deg, rgba(197,160,68,0.18), rgba(197,160,68,0.06))`
                                                                : 'rgba(255,255,255,0.03)',
                                                            border: `1.5px solid ${selected ? GOLD : GLASS_BORDER}`,
                                                            color: selected ? GOLD_LIGHT : 'rgba(255,255,255,0.7)',
                                                            cursor: 'pointer',
                                                            transition: 'all 0.2s ease',
                                                            position: 'relative',
                                                        }}
                                                    >
                                                        {selected && (
                                                            <motion.div
                                                                initial={{ scale: 0 }}
                                                                animate={{ scale: 1 }}
                                                                style={{
                                                                    position: 'absolute', top: '5px', right: '5px',
                                                                    width: '14px', height: '14px',
                                                                    borderRadius: '50%', background: GOLD,
                                                                    display: 'flex', alignItems: 'center',
                                                                    justifyContent: 'center',
                                                                }}
                                                            >
                                                                <Check size={8} color="#0a0a14" strokeWidth={3} />
                                                            </motion.div>
                                                        )}
                                                        <span style={{ opacity: selected ? 1 : 0.6 }}>{bt.icon}</span>
                                                        <span style={{
                                                            fontSize: '10px', fontWeight: 600,
                                                            lineHeight: 1.2, textAlign: 'center',
                                                        }}>
                                                            {bt.label}
                                                        </span>
                                                    </motion.button>
                                                );
                                            })}
                                        </div>
                                    </div>

                                    {/* Error */}
                                    {error && (
                                        <motion.p
                                            initial={{ opacity: 0, y: -4 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            style={{
                                                color: '#f87171', fontSize: '13px', marginBottom: '16px',
                                                padding: '10px 14px', borderRadius: '10px',
                                                background: 'rgba(248,113,113,0.08)',
                                                border: '1px solid rgba(248,113,113,0.15)',
                                            }}
                                        >
                                            {error}
                                        </motion.p>
                                    )}

                                    {/* Submit */}
                                    <motion.button
                                        onClick={handleBusinessSubmit}
                                        disabled={loading || !businessName.trim()}
                                        whileHover={{ scale: 1.02, boxShadow: `0 12px 40px ${GOLD_GLOW}` }}
                                        whileTap={{ scale: 0.98 }}
                                        style={{
                                            width: '100%', padding: '15px', borderRadius: '14px',
                                            fontWeight: 700, fontSize: '14px', color: '#0a0a14',
                                            background: `linear-gradient(135deg, ${GOLD} 0%, ${GOLD_LIGHT} 100%)`,
                                            border: 'none',
                                            cursor: !businessName.trim() ? 'not-allowed' : loading ? 'not-allowed' : 'pointer',
                                            opacity: !businessName.trim() ? 0.4 : loading ? 0.6 : 1,
                                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                                            gap: '8px', boxShadow: `0 8px 30px ${GOLD_GLOW}`,
                                            transition: 'opacity 0.2s',
                                        }}
                                    >
                                        {loading ? (
                                            <Loader2 size={18} className="animate-spin" />
                                        ) : (
                                            <>Create My Business <ArrowRight size={16} /></>
                                        )}
                                    </motion.button>
                                </div>
                            </motion.div>
                        )}

                        {/* ═══ STEP 3: Welcome / Success ═══ */}
                        {currentStep === 2 && (
                            <motion.div
                                key="step-welcome"
                                custom={direction}
                                variants={slideVariants}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                                style={{ textAlign: 'center' }}
                            >
                                {/* Animated check circle */}
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.1 }}
                                    style={{
                                        width: '80px', height: '80px', borderRadius: '50%',
                                        background: `linear-gradient(135deg, ${GOLD}, ${GOLD_LIGHT})`,
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        margin: '0 auto 28px',
                                        boxShadow: `0 0 60px ${GOLD_GLOW}, 0 0 120px rgba(197,160,68,0.15)`,
                                    }}
                                >
                                    <motion.div
                                        initial={{ scale: 0, rotate: -45 }}
                                        animate={{ scale: 1, rotate: 0 }}
                                        transition={{ delay: 0.4, type: 'spring', stiffness: 300 }}
                                    >
                                        <Check size={36} color="#0a0a14" strokeWidth={3} />
                                    </motion.div>
                                </motion.div>

                                {/* Sparkle particles */}
                                {[...Array(6)].map((_, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, scale: 0 }}
                                        animate={{
                                            opacity: [0, 1, 0],
                                            scale: [0, 1, 0.5],
                                            x: [0, (i % 2 ? 1 : -1) * (30 + i * 15)],
                                            y: [0, -(20 + i * 12)],
                                        }}
                                        transition={{ delay: 0.3 + i * 0.08, duration: 1.2, ease: 'easeOut' }}
                                        style={{
                                            position: 'absolute',
                                            left: '50%', top: '40%',
                                            pointerEvents: 'none',
                                        }}
                                    >
                                        <Sparkles size={12 + i * 2} style={{ color: GOLD_LIGHT }} />
                                    </motion.div>
                                ))}

                                <motion.h1
                                    initial={{ opacity: 0, y: 12 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.5, duration: 0.5 }}
                                    style={{
                                        fontSize: 'clamp(26px, 5vw, 34px)',
                                        fontWeight: 800, letterSpacing: '-0.03em',
                                        marginBottom: '12px', lineHeight: 1.1,
                                    }}
                                >
                                    Welcome to{' '}
                                    <span style={{ color: GOLD_LIGHT }}>Guap</span>
                                </motion.h1>

                                <motion.p
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.65, duration: 0.4 }}
                                    style={{
                                        fontSize: '15px', color: 'rgba(255,255,255,0.6)',
                                        lineHeight: 1.6, maxWidth: '360px', margin: '0 auto 12px',
                                    }}
                                >
                                    <strong style={{ color: '#fff' }}>{businessName}</strong> is all set up.
                                    Head to your dashboard to start customizing.
                                </motion.p>

                                <motion.p
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.8, duration: 0.4 }}
                                    style={{
                                        fontSize: '12px', color: 'rgba(255,255,255,0.35)',
                                        marginBottom: '32px',
                                    }}
                                >
                                    Check your email to verify your account.
                                </motion.p>

                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.9, duration: 0.4 }}
                                    style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}
                                >
                                    <motion.button
                                        onClick={() => router.push('/dashboard')}
                                        whileHover={{ scale: 1.04 }}
                                        whileTap={{ scale: 0.97 }}
                                        style={{
                                            display: 'inline-flex', alignItems: 'center', gap: '10px',
                                            padding: '16px 40px', borderRadius: '14px',
                                            background: `linear-gradient(135deg, ${GOLD} 0%, ${GOLD_LIGHT} 100%)`,
                                            color: '#0a0a14', fontSize: '15px', fontWeight: 700,
                                            border: 'none', cursor: 'pointer',
                                            boxShadow: `0 8px 30px ${GOLD_GLOW}`,
                                            letterSpacing: '-0.01em',
                                        }}
                                    >
                                        Go to Dashboard
                                        <ArrowRight size={18} />
                                    </motion.button>

                                    <Link
                                        href="/"
                                        style={{
                                            fontSize: '13px', color: 'rgba(255,255,255,0.4)',
                                            textDecoration: 'none',
                                        }}
                                    >
                                        or go home
                                    </Link>
                                </motion.div>
                            </motion.div>
                        )}

                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}
