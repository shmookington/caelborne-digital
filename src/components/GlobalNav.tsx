'use client';

import { useState, useEffect, useRef } from 'react';
import { Outfit } from 'next/font/google';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { User, Menu, X, Wallet, Compass, Globe, LogOut, UserCircle, Store, ArrowRight, Info } from 'lucide-react';
import { supabase } from '@/lib/supabase';

const outfit = Outfit({ subsets: ['latin'], weight: ['400', '500', '600', '700'] });

const GOLD = '#8B7332';
const GOLD_LIGHT = '#BFA265';

// ─── Nav Link with animated gold underline ──────────────────────

function NavLink({ href, label, isActive }: { href: string; label: string; isActive: boolean }) {
    const [hovered, setHovered] = useState(false);

    return (
        <Link
            href={href}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{
                position: 'relative',
                fontSize: '13px',
                fontWeight: 500,
                color: isActive ? '#fff' : hovered ? 'rgba(255,255,255,0.95)' : 'rgba(245, 245, 247, 0.8)',
                textDecoration: 'none',
                letterSpacing: '0.01em',
                padding: '6px 0',
                transition: 'color 0.25s ease',
            }}
        >
            {label}
            {/* Animated underline */}
            <span
                style={{
                    position: 'absolute',
                    bottom: '0px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: hovered || isActive ? '100%' : '0%',
                    height: '1.5px',
                    background: `linear-gradient(90deg, transparent, ${GOLD}, transparent)`,
                    transition: 'width 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                    borderRadius: '1px',
                }}
            />
        </Link>
    );
}

// ─── CTA Button ─────────────────────────────────────────────────

function CTAButton({ mobile = false }: { mobile?: boolean }) {
    const [hovered, setHovered] = useState(false);

    return (
        <Link
            href="/business"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: mobile ? '14px 28px' : '7px 18px',
                borderRadius: '100px',
                background: hovered
                    ? `linear-gradient(135deg, ${GOLD_LIGHT}, ${GOLD})`
                    : `linear-gradient(135deg, ${GOLD}, #9a7f3d)`,
                color: '#0a0a14',
                fontSize: mobile ? '15px' : '12px',
                fontWeight: 700,
                textDecoration: 'none',
                letterSpacing: '0.01em',
                transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                boxShadow: hovered
                    ? `0 4px 20px rgba(139,115,50,0.35), 0 0 0 1px rgba(139,115,50,0.1)`
                    : `0 2px 10px rgba(139,115,50,0.15)`,
                transform: hovered ? 'translateY(-1px)' : 'translateY(0)',
                whiteSpace: 'nowrap',
            }}
        >
            Get Started
            <ArrowRight size={mobile ? 15 : 12} strokeWidth={2.5} />
        </Link>
    );
}

// ─── Main Nav Component ─────────────────────────────────────────

export default function GlobalNav() {
    const router = useRouter();
    const pathname = usePathname();
    const [user, setUser] = useState<any>(null);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [accountDropdownOpen, setAccountDropdownOpen] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    useEffect(() => {
        const checkAuth = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            setUser(session?.user ?? null);
        };
        checkAuth();

        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user ?? null);
        });

        return () => subscription.unsubscribe();
    }, []);

    const navLinks = [
        { href: '/about', label: 'About' },
        { href: '/business/saas', label: 'Services' },
        { href: '/guap', label: 'Guap' },
    ];

    const mobileNavLinks = [
        { href: '/about', label: 'About', icon: Info },
        { href: '/business/saas', label: 'Services', icon: Globe },
        { href: '/guap', label: 'Guap', icon: Wallet },
    ];

    const handleSignOut = async () => {
        await supabase.auth.signOut();
        setAccountDropdownOpen(false);
        setMobileMenuOpen(false);
        router.push('/');
    };

    const isActive = (href: string) => {
        if (href === '/') return pathname === '/';
        return pathname.startsWith(href);
    };

    // ─── DESKTOP / TABLET ───────────────────────────────────────

    if (!isMobile) {
        return (
            <nav
                className={outfit.className}
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    zIndex: 9999,
                    height: '48px',
                    background: 'rgba(22, 22, 28, 0.72)',
                    backdropFilter: 'saturate(180%) blur(20px)',
                    WebkitBackdropFilter: 'saturate(180%) blur(20px)',
                    borderBottom: '1px solid rgba(255,255,255,0.04)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0 24px',
                }}
            >
                {/* ── Logo ──────────────────────────────────── */}
                <Link href="/" style={{
                    flexShrink: 0,
                    display: 'flex',
                    alignItems: 'center',
                    textDecoration: 'none',
                    gap: '8px',
                }}>
                    <span
                        style={{
                            fontSize: '16px',
                            fontWeight: 700,
                            letterSpacing: '-0.03em',
                            background: `linear-gradient(135deg, ${GOLD_LIGHT} 0%, ${GOLD} 100%)`,
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                        }}
                    >
                        Caelborne
                    </span>
                </Link>

                {/* ── Center Links ──────────────────────────── */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
                    {navLinks.map((link) => (
                        <NavLink
                            key={link.href}
                            href={link.href}
                            label={link.label}
                            isActive={isActive(link.href)}
                        />
                    ))}
                </div>

                {/* ── Right Side: CTA + Account ────────────── */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexShrink: 0 }}>
                    <CTAButton />

                    {/* Account Icon with Dropdown */}
                    <div
                        style={{ position: 'relative' }}
                        onMouseEnter={() => setAccountDropdownOpen(true)}
                        onMouseLeave={() => setAccountDropdownOpen(false)}
                    >
                        {user ? (
                            <button
                                style={{
                                    background: 'none',
                                    border: 'none',
                                    cursor: 'pointer',
                                    color: 'rgba(245, 245, 247, 0.7)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    padding: '8px',
                                    borderRadius: '50%',
                                    transition: 'all 0.25s ease',
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.color = '#fff';
                                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.color = 'rgba(245, 245, 247, 0.7)';
                                    e.currentTarget.style.background = 'none';
                                }}
                            >
                                <User size={16} strokeWidth={1.5} />
                            </button>
                        ) : (
                            <Link
                                href="/signin"
                                style={{
                                    color: 'rgba(245, 245, 247, 0.7)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    padding: '8px',
                                    borderRadius: '50%',
                                    transition: 'all 0.25s ease',
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.color = '#fff';
                                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.color = 'rgba(245, 245, 247, 0.7)';
                                    e.currentTarget.style.background = 'none';
                                }}
                            >
                                <User size={16} strokeWidth={1.5} />
                            </Link>
                        )}

                        {/* Dropdown Menu */}
                        {user && accountDropdownOpen && (
                            <div
                                style={{
                                    position: 'absolute',
                                    top: 'calc(100% + 8px)',
                                    right: 0,
                                    minWidth: '210px',
                                    background: 'rgba(18, 18, 22, 0.92)',
                                    backdropFilter: 'saturate(180%) blur(24px)',
                                    WebkitBackdropFilter: 'saturate(180%) blur(24px)',
                                    borderRadius: '14px',
                                    border: '1px solid rgba(255, 255, 255, 0.08)',
                                    boxShadow: '0 12px 40px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255,255,255,0.04)',
                                    overflow: 'hidden',
                                    animation: 'navDropdownIn 0.2s ease-out',
                                }}
                            >
                                {/* Gold accent bar */}
                                <div
                                    style={{
                                        height: '1.5px',
                                        background: `linear-gradient(90deg, transparent, ${GOLD}, ${GOLD_LIGHT}, ${GOLD}, transparent)`,
                                    }}
                                />

                                {/* User info */}
                                <div
                                    style={{
                                        padding: '14px 16px',
                                        borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
                                    }}
                                >
                                    <div style={{ fontSize: '13px', fontWeight: 600, color: 'rgba(255, 255, 255, 0.9)' }}>
                                        {user?.email?.split('@')[0] || 'User'}
                                    </div>
                                    <div style={{ fontSize: '11px', color: 'rgba(255, 255, 255, 0.4)', marginTop: '3px' }}>
                                        {user?.email || ''}
                                    </div>
                                </div>

                                {/* Menu items */}
                                <div style={{ padding: '6px 0' }}>
                                    {[
                                        { href: '/account', label: 'My Account', icon: UserCircle },
                                        { href: '/dashboard', label: 'Business Dashboard', icon: Store },
                                    ].map((item) => (
                                        <Link
                                            key={item.href}
                                            href={item.href}
                                            onClick={() => setAccountDropdownOpen(false)}
                                            style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '12px',
                                                padding: '10px 16px',
                                                fontSize: '13px',
                                                fontWeight: 500,
                                                color: 'rgba(255, 255, 255, 0.8)',
                                                textDecoration: 'none',
                                                transition: 'all 0.15s ease',
                                            }}
                                            onMouseEnter={(e) => {
                                                e.currentTarget.style.background = 'rgba(139, 115, 50, 0.1)';
                                                e.currentTarget.style.color = '#fff';
                                            }}
                                            onMouseLeave={(e) => {
                                                e.currentTarget.style.background = 'transparent';
                                                e.currentTarget.style.color = 'rgba(255, 255, 255, 0.8)';
                                            }}
                                        >
                                            <item.icon size={15} strokeWidth={1.5} style={{ color: GOLD, opacity: 0.8 }} />
                                            {item.label}
                                        </Link>
                                    ))}

                                    <div style={{ height: '1px', background: 'rgba(255,255,255,0.06)', margin: '4px 0' }} />

                                    <button
                                        onClick={handleSignOut}
                                        style={{
                                            width: '100%',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '12px',
                                            padding: '10px 16px',
                                            fontSize: '13px',
                                            fontWeight: 500,
                                            color: 'rgba(255, 255, 255, 0.7)',
                                            background: 'transparent',
                                            border: 'none',
                                            cursor: 'pointer',
                                            textAlign: 'left',
                                            transition: 'all 0.15s ease',
                                        }}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.background = 'rgba(239, 68, 68, 0.1)';
                                            e.currentTarget.style.color = '#ef4444';
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.background = 'transparent';
                                            e.currentTarget.style.color = 'rgba(255, 255, 255, 0.7)';
                                        }}
                                    >
                                        <LogOut size={15} strokeWidth={1.5} style={{ color: '#ef4444', opacity: 0.8 }} />
                                        Sign Out
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Keyframes */}
                <style jsx global>{`
                    @keyframes navDropdownIn {
                        from { opacity: 0; transform: translateY(-6px) scale(0.97); }
                        to { opacity: 1; transform: translateY(0) scale(1); }
                    }
                `}</style>
            </nav>
        );
    }

    // ─── MOBILE ─────────────────────────────────────────────────

    return (
        <nav className={outfit.className} style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 9999 }}>
            {/* Top bar */}
            <div
                style={{
                    height: '48px',
                    background: mobileMenuOpen ? 'rgba(10, 10, 14, 0.98)' : 'rgba(22, 22, 28, 0.72)',
                    backdropFilter: 'saturate(180%) blur(20px)',
                    WebkitBackdropFilter: 'saturate(180%) blur(20px)',
                    borderBottom: '1px solid rgba(255,255,255,0.04)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0 16px',
                    transition: 'background 0.3s ease',
                }}
            >
                {/* Logo */}
                <Link href="/" onClick={() => setMobileMenuOpen(false)} style={{
                    display: 'flex', alignItems: 'center', textDecoration: 'none',
                }}>
                    <span style={{
                        fontSize: '15px',
                        fontWeight: 700,
                        letterSpacing: '-0.03em',
                        background: `linear-gradient(135deg, ${GOLD_LIGHT} 0%, ${GOLD} 100%)`,
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                    }}>
                        Caelborne
                    </span>
                </Link>

                {/* Right icons */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                    <Link href={user ? '/account' : '/signin'} style={{
                        color: 'rgba(245, 245, 247, 0.7)', display: 'flex',
                    }}>
                        <User size={16} strokeWidth={1.5} />
                    </Link>
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        style={{
                            color: 'rgba(245, 245, 247, 0.8)',
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            display: 'flex',
                            padding: 0,
                        }}
                    >
                        {mobileMenuOpen ? <X size={20} strokeWidth={1.5} /> : <Menu size={20} strokeWidth={1.5} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <div
                style={{
                    position: 'absolute',
                    top: '48px',
                    left: 0,
                    right: 0,
                    background: 'rgba(10, 10, 14, 0.98)',
                    backdropFilter: 'saturate(180%) blur(20px)',
                    WebkitBackdropFilter: 'saturate(180%) blur(20px)',
                    minHeight: 'calc(100vh - 48px)',
                    borderTop: '1px solid rgba(255, 255, 255, 0.06)',
                    display: 'flex',
                    flexDirection: 'column',
                    transform: mobileMenuOpen ? 'translateY(0)' : 'translateY(-10px)',
                    opacity: mobileMenuOpen ? 1 : 0,
                    pointerEvents: mobileMenuOpen ? 'auto' : 'none',
                    transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.25s ease',
                }}
            >
                {/* Links */}
                <div style={{ padding: '12px 0', flex: 1 }}>
                    {mobileNavLinks.map((link, index) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            onClick={() => setMobileMenuOpen(false)}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '16px',
                                padding: '16px 24px',
                                fontSize: '17px',
                                fontWeight: isActive(link.href) ? 600 : 400,
                                color: isActive(link.href) ? '#fff' : 'rgba(255, 255, 255, 0.85)',
                                textDecoration: 'none',
                                borderBottom: index < mobileNavLinks.length - 1 ? '1px solid rgba(255, 255, 255, 0.05)' : 'none',
                                transition: 'all 0.2s ease',
                            }}
                        >
                            <link.icon size={20} strokeWidth={1.5} style={{
                                color: isActive(link.href) ? GOLD : 'rgba(201,169,110,0.6)',
                            }} />
                            {link.label}
                            {isActive(link.href) && (
                                <span style={{
                                    marginLeft: 'auto',
                                    width: '5px',
                                    height: '5px',
                                    borderRadius: '50%',
                                    background: GOLD,
                                }} />
                            )}
                        </Link>
                    ))}

                    {/* Sign out for logged-in users */}
                    {user && (
                        <>
                            <div style={{ height: '1px', background: 'rgba(255,255,255,0.06)', margin: '8px 0' }} />
                            <button
                                onClick={handleSignOut}
                                style={{
                                    width: '100%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '16px',
                                    padding: '16px 24px',
                                    fontSize: '17px',
                                    fontWeight: 400,
                                    color: 'rgba(255, 255, 255, 0.6)',
                                    background: 'transparent',
                                    border: 'none',
                                    cursor: 'pointer',
                                    textAlign: 'left',
                                }}
                            >
                                <LogOut size={20} strokeWidth={1.5} style={{ color: '#ef4444', opacity: 0.7 }} />
                                Sign Out
                            </button>
                        </>
                    )}
                </div>

                {/* CTA at bottom */}
                <div style={{
                    padding: '20px 24px 40px',
                    borderTop: '1px solid rgba(255,255,255,0.06)',
                }}>
                    <CTAButton mobile />
                </div>
            </div>
        </nav>
    );
}
