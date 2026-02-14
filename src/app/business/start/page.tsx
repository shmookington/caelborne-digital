'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CosmicBackground } from '@/components/CosmicBackground';
import { supabase } from '@/lib/supabase';
import {
    ArrowRight,
    ArrowLeft,
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
    Palette,
    Zap,
    Sun,
    Moon,
    Heart,
    Shield,
    Globe,
    Gift,
    CalendarDays,
    ShoppingCart,
    Megaphone,
    Paintbrush,
    Clock,
    Rocket,
    Coffee,
    Send,
    Phone,
    Mail,
    Copy,
    CheckCheck,
    Timer,
} from 'lucide-react';
import { Outfit } from 'next/font/google';
import Link from 'next/link';

const outfit = Outfit({ subsets: ['latin'], weight: ['400', '500', '600', '700', '800'] });

// ─── Design Tokens ──────────────────────────────────────────────
const GOLD = '#C5A044';
const GOLD_LIGHT = '#DAC06A';
const GLASS_BG = 'rgba(12, 12, 20, 0.82)';
const GLASS_BORDER = 'rgba(255, 255, 255, 0.08)';

// ─── Types ──────────────────────────────────────────────────────
interface Option {
    id: string;
    label: string;
    icon: React.ReactNode;
    emoji?: string;
}

interface Step {
    id: string;
    question: string;
    subtitle: string;
    options: Option[];
    multiSelect?: boolean;
}

// ─── Steps Config ───────────────────────────────────────────────
const STEPS: Step[] = [
    {
        id: 'business_type',
        question: "What type of business do you have?",
        subtitle: "This helps us tailor the experience to your industry.",
        options: [
            { id: 'restaurant', label: 'Restaurant / Café', icon: <ChefHat size={24} /> },
            { id: 'barbershop', label: 'Barbershop', icon: <Scissors size={24} /> },
            { id: 'salon', label: 'Salon / Spa', icon: <Sparkles size={24} /> },
            { id: 'fitness', label: 'Fitness / Gym', icon: <Dumbbell size={24} /> },
            { id: 'retail', label: 'Retail / Shop', icon: <ShoppingBag size={24} /> },
            { id: 'realestate', label: 'Real Estate', icon: <Home size={24} /> },
            { id: 'medical', label: 'Medical / Health', icon: <Stethoscope size={24} /> },
            { id: 'auto', label: 'Auto / Detailing', icon: <Car size={24} /> },
            { id: 'other', label: 'Other', icon: <Building2 size={24} /> },
        ],
    },
    {
        id: 'vibe',
        question: "What vibe are you going for?",
        subtitle: "Think about how you want customers to feel.",
        options: [
            { id: 'modern', label: 'Modern & Minimal', icon: <Zap size={24} /> },
            { id: 'bold', label: 'Bold & Vibrant', icon: <Rocket size={24} /> },
            { id: 'luxury', label: 'Elegant & Luxury', icon: <Sparkles size={24} /> },
            { id: 'warm', label: 'Warm & Friendly', icon: <Sun size={24} /> },
            { id: 'dark', label: 'Dark & Edgy', icon: <Moon size={24} /> },
            { id: 'clean', label: 'Clean & Professional', icon: <Shield size={24} /> },
        ],
    },
    {
        id: 'services',
        question: "What do you need?",
        subtitle: "Select all that apply — we'll build a custom package.",
        multiSelect: true,
        options: [
            { id: 'website', label: 'Website', icon: <Globe size={24} /> },
            { id: 'loyalty', label: 'Loyalty Program', icon: <Gift size={24} /> },
            { id: 'booking', label: 'Booking System', icon: <CalendarDays size={24} /> },
            { id: 'ordering', label: 'Online Ordering', icon: <ShoppingCart size={24} /> },
            { id: 'social', label: 'Social Media', icon: <Megaphone size={24} /> },
            { id: 'branding', label: 'Branding / Logo', icon: <Paintbrush size={24} /> },
        ],
    },
    {
        id: 'current_presence',
        question: "Do you have a website currently?",
        subtitle: "No wrong answer — we meet you where you are.",
        options: [
            { id: 'no_site', label: 'No, starting fresh', icon: <Rocket size={24} /> },
            { id: 'needs_update', label: 'Yes, but it needs work', icon: <Paintbrush size={24} /> },
            { id: 'has_site', label: "Yes, and it's okay", icon: <Check size={24} /> },
        ],
    },
    {
        id: 'timeline',
        question: "How soon do you need this?",
        subtitle: "We'll match our pace to yours.",
        options: [
            { id: 'asap', label: 'ASAP', icon: <Zap size={24} /> },
            { id: '2weeks', label: '1 – 2 Weeks', icon: <Clock size={24} /> },
            { id: '1month', label: 'Within a Month', icon: <CalendarDays size={24} /> },
            { id: 'no_rush', label: 'No Rush', icon: <Coffee size={24} /> },
        ],
    },
    {
        id: 'priority',
        question: "What matters most to you?",
        subtitle: "Pick the one that resonates the most.",
        options: [
            { id: 'aesthetics', label: 'Looking Premium', icon: <Palette size={24} /> },
            { id: 'conversions', label: 'Getting More Customers', icon: <Heart size={24} /> },
            { id: 'automation', label: 'Saving Time', icon: <Zap size={24} /> },
            { id: 'trust', label: 'Building Trust', icon: <Shield size={24} /> },
        ],
    },
];

// ─── Label maps for the summary ─────────────────────────────────

const STEP_LABELS: Record<string, string> = {
    business_type: 'Business Type',
    vibe: 'Aesthetic Vibe',
    services: 'Services Needed',
    current_presence: 'Current Website',
    timeline: 'Timeline',
    priority: 'Top Priority',
};

function getOptionLabel(stepId: string, optionId: string): string {
    const step = STEPS.find((s) => s.id === stepId);
    const option = step?.options.find((o) => o.id === optionId);
    return option?.label ?? optionId;
}

// ─── Component ──────────────────────────────────────────────────

// ─── Intro icon set (preview of what's coming) ─────────────────
const INTRO_ICONS = [
    { icon: <ChefHat size={20} />, delay: 0 },
    { icon: <Palette size={20} />, delay: 0.06 },
    { icon: <Globe size={20} />, delay: 0.12 },
    { icon: <Rocket size={20} />, delay: 0.18 },
    { icon: <Gift size={20} />, delay: 0.24 },
    { icon: <Shield size={20} />, delay: 0.30 },
    { icon: <Megaphone size={20} />, delay: 0.36 },
    { icon: <Heart size={20} />, delay: 0.42 },
];

export default function StartPage() {
    const [started, setStarted] = useState(false);
    const [currentStep, setCurrentStep] = useState(0);
    const [answers, setAnswers] = useState<Record<string, string | string[]>>({});
    const [done, setDone] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [direction, setDirection] = useState(1); // 1 = forward, -1 = back
    const [contactName, setContactName] = useState('');
    const [contactPhone, setContactPhone] = useState('');
    const [contactEmail, setContactEmail] = useState('');
    const [copied, setCopied] = useState(false);

    const step = STEPS[currentStep];
    const progress = ((currentStep) / STEPS.length) * 100;

    const handleSelect = (optionId: string) => {
        if (step.multiSelect) {
            const current = (answers[step.id] as string[]) ?? [];
            const updated = current.includes(optionId)
                ? current.filter((id) => id !== optionId)
                : [...current, optionId];
            setAnswers({ ...answers, [step.id]: updated });
        } else {
            setAnswers({ ...answers, [step.id]: optionId });
            // Auto-advance after a brief moment for single-select
            setTimeout(() => {
                if (currentStep < STEPS.length - 1) {
                    setDirection(1);
                    setCurrentStep((s) => s + 1);
                } else {
                    setDone(true);
                }
            }, 350);
        }
    };

    const handleNext = () => {
        if (currentStep < STEPS.length - 1) {
            setDirection(1);
            setCurrentStep((s) => s + 1);
        } else {
            setDone(true);
        }
    };

    const handleBack = () => {
        if (done) {
            setDone(false);
        } else if (currentStep > 0) {
            setDirection(-1);
            setCurrentStep((s) => s - 1);
        } else {
            // Step 0 → go back to intro
            setStarted(false);
        }
    };

    const isSelected = (optionId: string) => {
        const val = answers[step?.id];
        if (Array.isArray(val)) return val.includes(optionId);
        return val === optionId;
    };

    const canAdvance = () => {
        const val = answers[step?.id];
        if (step?.multiSelect) return Array.isArray(val) && val.length > 0;
        return !!val;
    };

    // Build summary text for copying
    const buildSummaryText = () => {
        let text = '── CLIENT CHEAT SHEET ──\n\n';
        if (contactName) text += `Name: ${contactName}\n`;
        if (contactPhone) text += `Phone: ${contactPhone}\n`;
        if (contactEmail) text += `Email: ${contactEmail}\n`;
        if (contactName || contactPhone || contactEmail) text += '\n';
        for (const s of STEPS) {
            const val = answers[s.id];
            const label = STEP_LABELS[s.id] || s.id;
            if (Array.isArray(val)) {
                text += `${label}: ${val.map((v) => getOptionLabel(s.id, v)).join(', ')}\n`;
            } else if (val) {
                text += `${label}: ${getOptionLabel(s.id, val)}\n`;
            }
        }
        return text;
    };

    const handleSubmit = async () => {
        const payload = {
            name: contactName || null,
            phone: contactPhone || null,
            email: contactEmail || null,
            business_type: getOptionLabel('business_type', answers.business_type as string) || null,
            aesthetic_vibe: getOptionLabel('vibe', answers.vibe as string) || null,
            services: Array.isArray(answers.services)
                ? answers.services.map((s) => getOptionLabel('services', s))
                : null,
            current_website: getOptionLabel('current_presence', answers.current_presence as string) || null,
            timeline: getOptionLabel('timeline', answers.timeline as string) || null,
            top_priority: getOptionLabel('priority', answers.priority as string) || null,
            summary: buildSummaryText(),
        };

        const { error } = await supabase.from('tickets').insert([payload]);

        if (error) {
            console.error('Failed to submit ticket:', error);
            // Still show confirmation — we don't want to punish the user
        }

        // Fire email notification (non-blocking)
        fetch('/api/notify', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: contactName,
                email: contactEmail,
                phone: contactPhone,
                businessType: getOptionLabel('business_type', answers.business_type as string),
                summary: buildSummaryText(),
                source: 'questionnaire',
            }),
        }).catch(() => { }); // Silently ignore notification failures

        setSubmitted(true);
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(buildSummaryText());
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const slideVariants = {
        enter: (d: number) => ({ x: d > 0 ? 80 : -80, opacity: 0 }),
        center: { x: 0, opacity: 1 },
        exit: (d: number) => ({ x: d > 0 ? -80 : 80, opacity: 0 }),
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
                paddingTop: '80px',
                textShadow: '0 2px 8px rgba(0,0,0,0.5)',
            }}>

                {/* Progress bar — only show when quiz is active */}
                {started && !done && (
                    <div style={{
                        position: 'fixed',
                        top: '44px',
                        left: 0,
                        right: 0,
                        height: '3px',
                        background: 'rgba(255,255,255,0.06)',
                        zIndex: 100,
                    }}>
                        <motion.div
                            animate={{ width: `${progress}%` }}
                            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                            style={{
                                height: '100%',
                                background: `linear-gradient(90deg, ${GOLD}, ${GOLD_LIGHT})`,
                                borderRadius: '0 2px 2px 0',
                            }}
                        />
                    </div>
                )}

                {/* Main content area */}
                <div style={{
                    width: '100%',
                    maxWidth: '560px',
                    position: 'relative',
                }}>

                    <AnimatePresence mode="wait">
                        {!started ? (
                            /* ═══════════════════════════════════════
                               INTRO / WELCOME SCREEN
                            ═══════════════════════════════════════ */
                            <motion.div
                                key="intro"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0, y: -30 }}
                                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    textAlign: 'center',
                                }}
                            >
                                {/* Floating icon grid */}
                                <div style={{
                                    display: 'flex',
                                    gap: '12px',
                                    flexWrap: 'wrap',
                                    justifyContent: 'center',
                                    marginBottom: '32px',
                                    maxWidth: '280px',
                                }}>
                                    {INTRO_ICONS.map((item, i) => (
                                        <motion.div
                                            key={i}
                                            initial={{ opacity: 0, y: 16 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{
                                                delay: 0.2 + item.delay,
                                                duration: 0.5,
                                                ease: [0.16, 1, 0.3, 1],
                                            }}
                                            style={{
                                                width: '52px',
                                                height: '52px',
                                                borderRadius: '14px',
                                                background: GLASS_BG,
                                                border: `1px solid ${GLASS_BORDER}`,
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                color: GOLD_LIGHT,
                                            }}
                                        >
                                            {item.icon}
                                        </motion.div>
                                    ))}
                                </div>

                                {/* Headline */}
                                <motion.h1
                                    initial={{ opacity: 0, y: 16 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.5, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                                    style={{
                                        fontSize: 'clamp(28px, 5vw, 40px)',
                                        fontWeight: 800,
                                        letterSpacing: '-0.03em',
                                        lineHeight: 1.1,
                                        marginBottom: '14px',
                                        color: '#fff',
                                    }}
                                >
                                    Let&apos;s figure out{' '}
                                    <span style={{ color: GOLD_LIGHT }}>exactly</span>
                                    <br />what you need.
                                </motion.h1>

                                {/* Subtitle */}
                                <motion.p
                                    initial={{ opacity: 0, y: 12 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.65, duration: 0.5 }}
                                    style={{
                                        fontSize: 'clamp(14px, 2vw, 16px)',
                                        color: 'rgba(255,255,255,0.65)',
                                        lineHeight: 1.6,
                                        maxWidth: '380px',
                                        marginBottom: '32px',
                                    }}
                                >
                                    Answer a few quick questions and we&apos;ll put together a game plan tailored to your business. No typing — just tap.
                                </motion.p>

                                {/* CTA Button */}
                                <motion.button
                                    onClick={() => setStarted(true)}
                                    initial={{ opacity: 0, y: 12 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.8, duration: 0.5 }}
                                    whileHover={{ scale: 1.04 }}
                                    whileTap={{ scale: 0.97 }}
                                    style={{
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        gap: '10px',
                                        padding: '16px 40px',
                                        borderRadius: '14px',
                                        background: `linear-gradient(135deg, ${GOLD} 0%, ${GOLD_LIGHT} 100%)`,
                                        color: '#0a0a14',
                                        fontSize: '15px',
                                        fontWeight: 700,
                                        border: 'none',
                                        cursor: 'pointer',
                                        letterSpacing: '-0.01em',
                                        boxShadow: '0 8px 30px rgba(197, 160, 68, 0.35)',
                                        textShadow: 'none',
                                        marginBottom: '16px',
                                    }}
                                >
                                    Let&apos;s Go
                                    <ArrowRight size={18} />
                                </motion.button>

                                {/* Time estimate pill */}
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 1.0, duration: 0.5 }}
                                    style={{
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        gap: '6px',
                                        fontSize: '12px',
                                        color: 'rgba(255,255,255,0.35)',
                                        fontWeight: 500,
                                    }}
                                >
                                    <Timer size={12} />
                                    Takes under a minute
                                </motion.div>
                            </motion.div>
                        ) : (
                            /* ═══════════════════════════════════════
                               QUIZ CONTENT (existing)
                            ═══════════════════════════════════════ */
                            <motion.div
                                key="quiz"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                            >

                                <div style={{
                                    width: '100%',
                                    position: 'relative',
                                }}>

                                    {/* Back / Step counter */}
                                    {!done && (
                                        <div style={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                            marginBottom: '24px',
                                        }}>
                                            <button
                                                onClick={handleBack}
                                                style={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: '6px',
                                                    background: 'none',
                                                    border: 'none',
                                                    color: 'rgba(255,255,255,0.6)',
                                                    fontSize: '13px',
                                                    cursor: 'pointer',
                                                    padding: 0,
                                                    transition: 'color 0.2s ease',
                                                }}
                                            >
                                                <ArrowLeft size={14} />
                                                Back
                                            </button>
                                            <span style={{
                                                fontSize: '12px',
                                                fontWeight: 600,
                                                color: 'rgba(255,255,255,0.35)',
                                                letterSpacing: '0.1em',
                                            }}>
                                                {currentStep + 1} / {STEPS.length}
                                            </span>
                                        </div>
                                    )}

                                    <AnimatePresence mode="wait" custom={direction}>
                                        {!done ? (
                                            <motion.div
                                                key={step.id}
                                                custom={direction}
                                                variants={slideVariants}
                                                initial="enter"
                                                animate="center"
                                                exit="exit"
                                                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                                            >
                                                {/* Question */}
                                                <h1 style={{
                                                    fontSize: 'clamp(24px, 4vw, 32px)',
                                                    fontWeight: 800,
                                                    letterSpacing: '-0.03em',
                                                    marginBottom: '8px',
                                                    lineHeight: 1.15,
                                                }}>
                                                    {step.question}
                                                </h1>
                                                <p style={{
                                                    fontSize: '14px',
                                                    color: 'rgba(255,255,255,0.6)',
                                                    marginBottom: '32px',
                                                    lineHeight: 1.5,
                                                }}>
                                                    {step.subtitle}
                                                </p>

                                                {/* Options grid */}
                                                <div style={{
                                                    display: 'grid',
                                                    gridTemplateColumns: step.options.length <= 4
                                                        ? 'repeat(2, 1fr)'
                                                        : 'repeat(3, 1fr)',
                                                    gap: '12px',
                                                }}>
                                                    {step.options.map((option) => {
                                                        const selected = isSelected(option.id);
                                                        return (
                                                            <motion.button
                                                                key={option.id}
                                                                onClick={() => handleSelect(option.id)}
                                                                whileHover={{ scale: 1.03 }}
                                                                whileTap={{ scale: 0.97 }}
                                                                style={{
                                                                    display: 'flex',
                                                                    flexDirection: 'column',
                                                                    alignItems: 'center',
                                                                    justifyContent: 'center',
                                                                    gap: '10px',
                                                                    padding: '20px 12px',
                                                                    borderRadius: '16px',
                                                                    background: selected
                                                                        ? `linear-gradient(135deg, rgba(197,160,68,0.2), rgba(197,160,68,0.08))`
                                                                        : GLASS_BG,
                                                                    border: `1.5px solid ${selected ? GOLD : GLASS_BORDER}`,
                                                                    color: selected ? GOLD_LIGHT : '#fff',
                                                                    cursor: 'pointer',
                                                                    transition: 'all 0.2s ease',
                                                                    position: 'relative',
                                                                    overflow: 'hidden',
                                                                    textShadow: 'none',
                                                                }}
                                                            >
                                                                {/* Check badge */}
                                                                {selected && (
                                                                    <motion.div
                                                                        initial={{ scale: 0 }}
                                                                        animate={{ scale: 1 }}
                                                                        style={{
                                                                            position: 'absolute',
                                                                            top: '8px',
                                                                            right: '8px',
                                                                            width: '18px',
                                                                            height: '18px',
                                                                            borderRadius: '50%',
                                                                            background: GOLD,
                                                                            display: 'flex',
                                                                            alignItems: 'center',
                                                                            justifyContent: 'center',
                                                                        }}
                                                                    >
                                                                        <Check size={10} color="#0a0a14" strokeWidth={3} />
                                                                    </motion.div>
                                                                )}
                                                                <span style={{ opacity: selected ? 1 : 0.7 }}>
                                                                    {option.icon}
                                                                </span>
                                                                <span style={{
                                                                    fontSize: '12px',
                                                                    fontWeight: 600,
                                                                    lineHeight: 1.2,
                                                                    textAlign: 'center',
                                                                }}>
                                                                    {option.label}
                                                                </span>
                                                            </motion.button>
                                                        );
                                                    })}
                                                </div>

                                                {/* Next button for multi-select steps */}
                                                {step.multiSelect && (
                                                    <motion.button
                                                        onClick={handleNext}
                                                        disabled={!canAdvance()}
                                                        initial={{ opacity: 0, y: 10 }}
                                                        animate={{ opacity: canAdvance() ? 1 : 0.3, y: 0 }}
                                                        transition={{ delay: 0.1 }}
                                                        style={{
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            justifyContent: 'center',
                                                            gap: '8px',
                                                            width: '100%',
                                                            padding: '16px',
                                                            marginTop: '20px',
                                                            borderRadius: '14px',
                                                            background: canAdvance()
                                                                ? `linear-gradient(135deg, ${GOLD}, ${GOLD_LIGHT})`
                                                                : 'rgba(255,255,255,0.06)',
                                                            color: canAdvance() ? '#0a0a14' : 'rgba(255,255,255,0.3)',
                                                            fontSize: '14px',
                                                            fontWeight: 700,
                                                            border: 'none',
                                                            cursor: canAdvance() ? 'pointer' : 'default',
                                                            textShadow: 'none',
                                                        }}
                                                    >
                                                        Continue
                                                        <ArrowRight size={16} />
                                                    </motion.button>
                                                )}
                                            </motion.div>
                                        ) : (
                                            /* ─── SUMMARY / CHEAT SHEET ─── */
                                            <motion.div
                                                key="summary"
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                                            >
                                                {/* Header */}
                                                <div style={{ textAlign: 'center', marginBottom: '32px' }}>
                                                    <motion.div
                                                        initial={{ scale: 0 }}
                                                        animate={{ scale: 1 }}
                                                        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                                                        style={{
                                                            width: '56px',
                                                            height: '56px',
                                                            borderRadius: '50%',
                                                            background: `linear-gradient(135deg, ${GOLD}, ${GOLD_LIGHT})`,
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            justifyContent: 'center',
                                                            margin: '0 auto 16px',
                                                        }}
                                                    >
                                                        <Sparkles size={24} color="#0a0a14" />
                                                    </motion.div>
                                                    <h1 style={{
                                                        fontSize: 'clamp(22px, 4vw, 28px)',
                                                        fontWeight: 800,
                                                        letterSpacing: '-0.03em',
                                                        marginBottom: '8px',
                                                    }}>
                                                        You&apos;re all set!
                                                    </h1>
                                                    <p style={{
                                                        fontSize: '14px',
                                                        color: 'rgba(255,255,255,0.6)',
                                                        lineHeight: 1.5,
                                                    }}>
                                                        Here&apos;s what we&apos;ve got. Drop your info and we&apos;ll take it from here.
                                                    </p>
                                                </div>

                                                {/* Summary card */}
                                                <div style={{
                                                    borderRadius: '20px',
                                                    background: GLASS_BG,
                                                    border: `1px solid ${GLASS_BORDER}`,
                                                    padding: '24px',
                                                    marginBottom: '16px',
                                                }}>
                                                    {STEPS.map((s) => {
                                                        const val = answers[s.id];
                                                        if (!val) return null;
                                                        const label = STEP_LABELS[s.id] || s.id;
                                                        const display = Array.isArray(val)
                                                            ? val.map((v) => getOptionLabel(s.id, v)).join(', ')
                                                            : getOptionLabel(s.id, val);

                                                        return (
                                                            <div key={s.id} style={{
                                                                display: 'flex',
                                                                justifyContent: 'space-between',
                                                                alignItems: 'flex-start',
                                                                padding: '14px 0',
                                                                borderBottom: `1px solid rgba(255,255,255,0.06)`,
                                                            }}>
                                                                <span style={{
                                                                    fontSize: '12px',
                                                                    fontWeight: 600,
                                                                    color: 'rgba(255,255,255,0.4)',
                                                                    textTransform: 'uppercase',
                                                                    letterSpacing: '0.08em',
                                                                    flexShrink: 0,
                                                                    marginRight: '16px',
                                                                }}>
                                                                    {label}
                                                                </span>
                                                                <span style={{
                                                                    fontSize: '14px',
                                                                    fontWeight: 600,
                                                                    color: '#fff',
                                                                    textAlign: 'right',
                                                                }}>
                                                                    {display}
                                                                </span>
                                                            </div>
                                                        );
                                                    })}
                                                </div>

                                                {/* Contact info section */}
                                                {!submitted ? (
                                                    <>
                                                        <p style={{
                                                            fontSize: '11px',
                                                            fontWeight: 600,
                                                            color: GOLD_LIGHT,
                                                            letterSpacing: '0.12em',
                                                            textTransform: 'uppercase',
                                                            marginBottom: '12px',
                                                        }}>
                                                            Your Info
                                                        </p>

                                                        {/* Name */}
                                                        <div style={{
                                                            borderRadius: '14px',
                                                            background: 'rgba(255,255,255,0.04)',
                                                            border: '1px solid rgba(255,255,255,0.1)',
                                                            padding: '14px 16px',
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            gap: '12px',
                                                            marginBottom: '10px',
                                                        }}>
                                                            <Building2 size={16} style={{ color: GOLD_LIGHT, flexShrink: 0 }} />
                                                            <input
                                                                type="text"
                                                                value={contactName}
                                                                onChange={(e) => setContactName(e.target.value)}
                                                                placeholder="Your name or business name"
                                                                style={{
                                                                    flex: 1,
                                                                    background: 'none',
                                                                    border: 'none',
                                                                    outline: 'none',
                                                                    color: '#fff',
                                                                    fontSize: '14px',
                                                                    textShadow: 'none',
                                                                }}
                                                            />
                                                        </div>

                                                        {/* Phone */}
                                                        <div style={{
                                                            borderRadius: '14px',
                                                            background: 'rgba(255,255,255,0.04)',
                                                            border: '1px solid rgba(255,255,255,0.1)',
                                                            padding: '14px 16px',
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            gap: '12px',
                                                            marginBottom: '10px',
                                                        }}>
                                                            <Phone size={16} style={{ color: GOLD_LIGHT, flexShrink: 0 }} />
                                                            <input
                                                                type="tel"
                                                                value={contactPhone}
                                                                onChange={(e) => setContactPhone(e.target.value)}
                                                                placeholder="Phone number"
                                                                style={{
                                                                    flex: 1,
                                                                    background: 'none',
                                                                    border: 'none',
                                                                    outline: 'none',
                                                                    color: '#fff',
                                                                    fontSize: '14px',
                                                                    textShadow: 'none',
                                                                }}
                                                            />
                                                        </div>

                                                        {/* Email */}
                                                        <div style={{
                                                            borderRadius: '14px',
                                                            background: 'rgba(255,255,255,0.04)',
                                                            border: '1px solid rgba(255,255,255,0.1)',
                                                            padding: '14px 16px',
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            gap: '12px',
                                                            marginBottom: '16px',
                                                        }}>
                                                            <Mail size={16} style={{ color: GOLD_LIGHT, flexShrink: 0 }} />
                                                            <input
                                                                type="email"
                                                                value={contactEmail}
                                                                onChange={(e) => setContactEmail(e.target.value)}
                                                                placeholder="Email address (optional)"
                                                                style={{
                                                                    flex: 1,
                                                                    background: 'none',
                                                                    border: 'none',
                                                                    outline: 'none',
                                                                    color: '#fff',
                                                                    fontSize: '14px',
                                                                    textShadow: 'none',
                                                                }}
                                                            />
                                                        </div>

                                                        {/* Action buttons */}
                                                        <div style={{ display: 'flex', gap: '10px' }}>
                                                            <motion.button
                                                                onClick={handleCopy}
                                                                whileHover={{ scale: 1.02 }}
                                                                whileTap={{ scale: 0.98 }}
                                                                style={{
                                                                    flex: 1,
                                                                    display: 'flex',
                                                                    alignItems: 'center',
                                                                    justifyContent: 'center',
                                                                    gap: '8px',
                                                                    padding: '14px',
                                                                    borderRadius: '14px',
                                                                    background: 'rgba(255,255,255,0.06)',
                                                                    border: '1px solid rgba(255,255,255,0.12)',
                                                                    color: '#fff',
                                                                    fontSize: '13px',
                                                                    fontWeight: 600,
                                                                    cursor: 'pointer',
                                                                    textShadow: 'none',
                                                                }}
                                                            >
                                                                {copied ? <CheckCheck size={16} /> : <Copy size={16} />}
                                                                {copied ? 'Copied!' : 'Copy Summary'}
                                                            </motion.button>
                                                            <motion.button
                                                                onClick={handleSubmit}
                                                                whileHover={{ scale: 1.02 }}
                                                                whileTap={{ scale: 0.98 }}
                                                                style={{
                                                                    flex: 1,
                                                                    display: 'flex',
                                                                    alignItems: 'center',
                                                                    justifyContent: 'center',
                                                                    gap: '8px',
                                                                    padding: '14px',
                                                                    borderRadius: '14px',
                                                                    background: `linear-gradient(135deg, ${GOLD}, ${GOLD_LIGHT})`,
                                                                    color: '#0a0a14',
                                                                    fontSize: '13px',
                                                                    fontWeight: 700,
                                                                    border: 'none',
                                                                    cursor: 'pointer',
                                                                    textShadow: 'none',
                                                                }}
                                                            >
                                                                <Send size={14} />
                                                                Submit
                                                            </motion.button>
                                                        </div>

                                                        {/* Edit answers */}
                                                        <button
                                                            onClick={handleBack}
                                                            style={{
                                                                display: 'block',
                                                                width: '100%',
                                                                textAlign: 'center',
                                                                marginTop: '16px',
                                                                background: 'none',
                                                                border: 'none',
                                                                color: 'rgba(255,255,255,0.4)',
                                                                fontSize: '13px',
                                                                cursor: 'pointer',
                                                                padding: 0,
                                                            }}
                                                        >
                                                            ← Edit answers
                                                        </button>
                                                    </>
                                                ) : (
                                                    /* ─── SUBMITTED CONFIRMATION ─── */
                                                    <motion.div
                                                        initial={{ opacity: 0, scale: 0.95 }}
                                                        animate={{ opacity: 1, scale: 1 }}
                                                        style={{ textAlign: 'center', padding: '20px 0' }}
                                                    >
                                                        <div style={{
                                                            width: '56px',
                                                            height: '56px',
                                                            borderRadius: '50%',
                                                            background: 'rgba(34, 197, 94, 0.15)',
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            justifyContent: 'center',
                                                            margin: '0 auto 16px',
                                                        }}>
                                                            <Check size={28} style={{ color: '#22c55e' }} />
                                                        </div>
                                                        <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#fff', marginBottom: '8px' }}>
                                                            We&apos;ll be in touch!
                                                        </h3>
                                                        <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.6)', marginBottom: '20px' }}>
                                                            Our team will review your info and reach out within 24 hours.
                                                        </p>
                                                        <Link
                                                            href="/"
                                                            style={{
                                                                fontSize: '13px',
                                                                color: GOLD_LIGHT,
                                                                textDecoration: 'none',
                                                            }}
                                                        >
                                                            ← Back to Home
                                                        </Link>
                                                    </motion.div>
                                                )}
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>

                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}
