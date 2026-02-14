'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { SplashScreen } from '@/components/SplashScreen';
import { CosmicBackground } from '@/components/CosmicBackground';
import {
  ArrowRight,
  ChevronRight,
  Sparkles,
  Target,
  Eye,
  Lightbulb,
  ArrowUpRight,
} from 'lucide-react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';

// ─── Design Tokens ──────────────────────────────────────────────

const GOLD = '#8B7332';
const GOLD_LIGHT = '#BFA265';
const GOLD_DIM = 'rgba(139, 115, 50, 0.2)';
const GOLD_BORDER = 'rgba(139, 115, 50, 0.35)';
const GLASS_BG = 'rgba(12, 12, 20, 0.6)';
const GLASS_BORDER = 'rgba(255, 255, 255, 0.06)';
const GLASS_HIGHLIGHT = 'rgba(255, 255, 255, 0.03)';

// ─── Main Page ──────────────────────────────────────────────────

export default function Home() {
  const [showSplash, setShowSplash] = useState(true);
  const [user, setUser] = useState<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);

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

  return (
    <>
      <CosmicBackground />

      <AnimatePresence>
        {showSplash && <SplashScreen onComplete={() => setShowSplash(false)} />}
      </AnimatePresence>

      <motion.div
        ref={containerRef}
        className="min-h-screen text-white relative"
        initial={{ opacity: 0 }}
        animate={{ opacity: showSplash ? 0 : 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* ═════════════════════════════════════════════════
                    HERO — Brand Introduction
                ═════════════════════════════════════════════════ */}
        <section
          className="relative z-10 flex flex-col justify-center items-center px-6"
          style={{
            minHeight: '100vh',
            paddingTop: '80px',
            paddingBottom: '80px',
          }}
        >
          {/* Subtle studio badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: showSplash ? 0 : 1, y: showSplash ? 20 : 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              padding: '10px 24px',
              borderRadius: '100px',
              background: GOLD_DIM,
              border: `1px solid ${GOLD_BORDER}`,
              marginBottom: '48px',
              fontSize: '12px',
              fontWeight: 600,
              color: GOLD,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
            }}
          >
            <Sparkles size={13} />
            Est. 2026
          </motion.div>

          {/* Glow orb behind hero text */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: showSplash ? 0 : 1, scale: showSplash ? 0.8 : 1 }}
            transition={{ delay: 0.4, duration: 1.2 }}
            style={{
              position: 'absolute',
              width: 'clamp(300px, 50vw, 600px)',
              height: 'clamp(200px, 30vw, 400px)',
              borderRadius: '50%',
              background: `radial-gradient(ellipse, rgba(201, 169, 110, 0.08) 0%, rgba(201, 169, 110, 0.03) 40%, transparent 70%)`,
              filter: 'blur(60px)',
              pointerEvents: 'none',
              zIndex: -1,
            }}
          />

          {/* Brand name — large, confident */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: showSplash ? 0 : 1, y: showSplash ? 40 : 0 }}
            transition={{ delay: 0.5, duration: 0.9 }}
            style={{
              fontSize: 'clamp(52px, 10vw, 110px)',
              fontWeight: 700,
              lineHeight: 0.95,
              letterSpacing: '-0.05em',
              textAlign: 'center',
              marginBottom: '16px',
              background: `linear-gradient(
                90deg,
                #A08030 0%,
                #ffffff 18%,
                #D4B86A 36%,
                #ffffff 50%,
                #C5A044 65%,
                #ffffff 82%,
                #A08030 100%
              )`,
              backgroundSize: '200% 100%',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              animation: 'caelborneShimmer 4s ease-in-out infinite',
              filter: 'drop-shadow(0 0 30px rgba(197, 160, 68, 0.5)) drop-shadow(0 4px 24px rgba(139, 115, 50, 0.4))',
            }}
          >
            Caelborne
          </motion.h1>

          {/* Keyframe injection for shimmer */}
          <style>{`
            @keyframes caelborneShimmer {
              0% { background-position: 100% 50%; }
              100% { background-position: -100% 50%; }
            }
          `}</style>

          {/* Animated sweeping gold underline */}
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: showSplash ? 0 : 1, opacity: showSplash ? 0 : 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            style={{
              width: '120px',
              height: '2px',
              marginBottom: '32px',
              position: 'relative',
              overflow: 'hidden',
              borderRadius: '2px',
            }}
          >
            <div style={{
              position: 'absolute',
              inset: 0,
              background: `linear-gradient(90deg, transparent, ${GOLD}, ${GOLD_LIGHT}, ${GOLD}, transparent)`,
            }} />
            <div style={{
              position: 'absolute',
              inset: 0,
              background: `linear-gradient(90deg, transparent 20%, rgba(255,255,255,0.6) 50%, transparent 80%)`,
              backgroundSize: '200% 100%',
              animation: 'goldSweep 3s ease-in-out infinite',
            }} />
            <style dangerouslySetInnerHTML={{
              __html: `
              @keyframes goldSweep {
                0% { background-position: -200% center; }
                100% { background-position: 200% center; }
              }
            `}} />
          </motion.div>

          {/* One-liner */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: showSplash ? 0 : 1, y: showSplash ? 20 : 0 }}
            transition={{ delay: 1.0, duration: 0.8 }}
            style={{
              fontSize: 'clamp(18px, 3vw, 26px)',
              fontWeight: 400,
              lineHeight: 1.5,
              color: 'rgba(255, 255, 255, 0.85)',
              maxWidth: '600px',
              textAlign: 'center',
              letterSpacing: '-0.01em',
            }}
          >
            We build digital experiences that
            <br />
            <span style={{ color: GOLD_LIGHT }}>move businesses forward.</span>
          </motion.p>

          {/* Scroll indicator */}
          <motion.div
            className="absolute bottom-10 left-1/2 -translate-x-1/2"
            initial={{ opacity: 0 }}
            animate={{ opacity: showSplash ? 0 : 0.4 }}
            transition={{ delay: 2 }}
          >
            <motion.div
              className="w-5 h-8 rounded-full border border-white/15 flex justify-center pt-1.5"
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            >
              <div className="w-0.5 h-1.5 bg-white/25 rounded-full" />
            </motion.div>
          </motion.div>
        </section>

        {/* ═════════════════════════════════════════════════
                    PHILOSOPHY — What We Believe
                ═════════════════════════════════════════════════ */}
        <section
          className="relative z-10"
          style={{ padding: '80px 24px 120px', maxWidth: '900px', margin: '0 auto' }}
        >
          {/* Section intro */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            style={{ textAlign: 'center', marginBottom: '80px' }}
          >
            <p
              style={{
                fontSize: 'clamp(18px, 2.5vw, 24px)',
                lineHeight: 1.8,
                color: 'rgba(255, 255, 255, 0.75)',
                maxWidth: '640px',
                margin: '0 auto',
                fontWeight: 400,
                letterSpacing: '-0.01em',
              }}
            >
              Every business deserves a digital presence that reflects who they are — not a template
              that looks like everyone else. We design, build, and manage technology that&apos;s
              <span style={{ color: '#fff' }}> uniquely yours.</span>
            </p>
          </motion.div>

          {/* Three pillars */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '24px',
          }}>
            {[
              {
                icon: Eye,
                title: 'Crafted, Not Templated',
                desc: 'Every pixel is intentional. We don\'t use templates — we design from the ground up for your brand.',
              },
              {
                icon: Target,
                title: 'Built to Perform',
                desc: 'Fast, accessible, and conversion-focused. Beautiful design that actually drives results.',
              },
              {
                icon: Lightbulb,
                title: 'Future-Ready',
                desc: 'Modern technology stack, automated workflows, and systems designed to scale with you.',
              },
            ].map((pillar, i) => (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.6 }}
                whileHover={{ y: -4, transition: { duration: 0.3 } }}
                style={{
                  background: GLASS_BG,
                  backdropFilter: 'blur(40px)',
                  WebkitBackdropFilter: 'blur(40px)',
                  border: `1px solid ${GLASS_BORDER}`,
                  borderRadius: '24px',
                  padding: '36px',
                  boxShadow: `0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 ${GLASS_HIGHLIGHT}`,
                }}
              >
                <div style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '12px',
                  background: GOLD_DIM,
                  border: `1px solid ${GOLD_BORDER}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '20px',
                }}>
                  <pillar.icon size={20} color={GOLD} />
                </div>
                <h3 style={{
                  fontSize: '18px',
                  fontWeight: 700,
                  marginBottom: '10px',
                  letterSpacing: '-0.02em',
                }}>
                  {pillar.title}
                </h3>
                <p style={{
                  fontSize: '14px',
                  lineHeight: 1.7,
                  color: 'rgba(255, 255, 255, 0.75)',
                }}>
                  {pillar.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ═════════════════════════════════════════════════
                    CTA STRIP — Two Clear Paths
                ═════════════════════════════════════════════════ */}
        <section
          className="relative z-10"
          style={{ padding: '40px 24px 120px', maxWidth: '900px', margin: '0 auto' }}
        >
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '20px',
          }}>
            {/* Services CTA */}
            <Link href="/business/saas" style={{ textDecoration: 'none' }}>
              <motion.div
                whileHover={{ y: -4, borderColor: GOLD_BORDER }}
                transition={{ duration: 0.3 }}
                style={{
                  background: GLASS_BG,
                  backdropFilter: 'blur(40px)',
                  WebkitBackdropFilter: 'blur(40px)',
                  border: `1px solid ${GLASS_BORDER}`,
                  borderRadius: '24px',
                  padding: '36px',
                  cursor: 'pointer',
                  height: '100%',
                }}
              >
                <div style={{
                  fontSize: '11px',
                  fontWeight: 600,
                  color: GOLD,
                  textTransform: 'uppercase',
                  letterSpacing: '0.12em',
                  marginBottom: '16px',
                }}>
                  What We Do
                </div>
                <h3 style={{
                  fontSize: '24px',
                  fontWeight: 700,
                  letterSpacing: '-0.02em',
                  marginBottom: '10px',
                  color: '#fff',
                }}>
                  Explore Our Services
                </h3>
                <p style={{
                  fontSize: '14px',
                  lineHeight: 1.6,
                  color: 'rgba(255,255,255,0.75)',
                  marginBottom: '20px',
                }}>
                  Custom websites, digital modernization, and the Guap loyalty platform — with transparent pricing.
                </p>
                <div style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  color: GOLD,
                  fontSize: '14px',
                  fontWeight: 600,
                }}>
                  View services & pricing
                  <ArrowRight size={15} />
                </div>
              </motion.div>
            </Link>

            {/* Guap CTA */}
            <Link href="/wallet" style={{ textDecoration: 'none' }}>
              <motion.div
                whileHover={{ y: -4, borderColor: 'rgba(255,255,255,0.12)' }}
                transition={{ duration: 0.3 }}
                style={{
                  background: GLASS_BG,
                  backdropFilter: 'blur(40px)',
                  WebkitBackdropFilter: 'blur(40px)',
                  border: `1px solid ${GLASS_BORDER}`,
                  borderRadius: '24px',
                  padding: '36px',
                  cursor: 'pointer',
                  height: '100%',
                }}
              >
                <div style={{
                  fontSize: '11px',
                  fontWeight: 600,
                  color: '#8E95A0',
                  textTransform: 'uppercase',
                  letterSpacing: '0.12em',
                  marginBottom: '16px',
                }}>
                  Our Product
                </div>
                <h3 style={{
                  fontSize: '24px',
                  fontWeight: 700,
                  letterSpacing: '-0.02em',
                  marginBottom: '10px',
                  color: '#fff',
                }}>
                  Guap Loyalty
                </h3>
                <p style={{
                  fontSize: '14px',
                  lineHeight: 1.6,
                  color: 'rgba(255,255,255,0.75)',
                  marginBottom: '20px',
                }}>
                  Digital loyalty cards, tiered rewards, and real-time analytics — built by Caelborne for modern businesses.
                </p>
                <div style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  color: '#B0B8C4',
                  fontSize: '14px',
                  fontWeight: 600,
                }}>
                  Open Guap
                  <ArrowUpRight size={15} />
                </div>
              </motion.div>
            </Link>
          </div>
        </section>

        {/* ═════════════════════════════════════════════════
                    BOTTOM — Simple Contact CTA
                ═════════════════════════════════════════════════ */}
        <section
          className="relative z-10"
          style={{ padding: '0 24px 120px', textAlign: 'center' }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div style={{
              width: '40px',
              height: '2px',
              background: `linear-gradient(90deg, transparent, ${GOLD}, transparent)`,
              margin: '0 auto 28px',
            }} />
            <p style={{
              fontSize: '15px',
              color: '#fff',
              marginBottom: '24px',
              textShadow: '0 2px 8px rgba(0,0,0,0.5)',
            }}>
              Ready to start a project?
            </p>
            <Link href="/business" style={{ textDecoration: 'none' }}>
              <motion.button
                whileHover={{
                  scale: 1.03,
                  boxShadow: `0 16px 48px rgba(201, 169, 110, 0.2)`,
                }}
                whileTap={{ scale: 0.97 }}
                style={{
                  padding: '16px 40px',
                  borderRadius: '14px',
                  background: `linear-gradient(135deg, ${GOLD}, #9a7f3d)`,
                  color: '#0a0a14',
                  fontSize: '15px',
                  fontWeight: 700,
                  border: 'none',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  boxShadow: `0 8px 32px rgba(201, 169, 110, 0.15)`,
                }}
              >
                Get in Touch
                <ArrowRight size={16} />
              </motion.button>
            </Link>
          </motion.div>
        </section>

        {/* ═════════════════════════════════════════════════
                    FOOTER — Branded
                ═════════════════════════════════════════════════ */}
        <footer className="relative z-10" style={{ padding: '0 24px 40px' }}>
          {/* Divider */}
          <div style={{
            maxWidth: '900px',
            margin: '0 auto 48px',
            height: '1px',
            background: `linear-gradient(90deg, transparent, ${GOLD_BORDER}, transparent)`,
          }} />

          <div style={{
            maxWidth: '900px',
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
            gap: '32px',
          }}>
            {/* Company */}
            <div>
              <p style={{ fontSize: '11px', fontWeight: 700, color: GOLD, textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '16px' }}>Company</p>
              {['About', 'Services', 'Contact'].map(item => (
                <Link key={item} href={item === 'Contact' ? '/business' : `/${item.toLowerCase()}`} style={{ display: 'block', fontSize: '13px', color: '#8E95A0', textDecoration: 'none', marginBottom: '10px', transition: 'color 0.2s' }}>
                  {item}
                </Link>
              ))}
            </div>

            {/* Product */}
            <div>
              <p style={{ fontSize: '11px', fontWeight: 700, color: GOLD, textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '16px' }}>Product</p>
              {[{ label: 'Guap', href: '/guap' }, { label: 'Discover', href: '/discover' }, { label: 'Wallet', href: '/wallet' }].map(item => (
                <Link key={item.label} href={item.href} style={{ display: 'block', fontSize: '13px', color: '#8E95A0', textDecoration: 'none', marginBottom: '10px', transition: 'color 0.2s' }}>
                  {item.label}
                </Link>
              ))}
            </div>

            {/* Brand */}
            <div>
              <p style={{ fontSize: '11px', fontWeight: 700, color: GOLD, textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '16px' }}>Legal</p>
              <p style={{ fontSize: '13px', color: '#8E95A0', marginBottom: '10px' }}>Privacy Policy</p>
              <p style={{ fontSize: '13px', color: '#8E95A0', marginBottom: '10px' }}>Terms of Service</p>
            </div>
          </div>

          {/* Copyright */}
          <p style={{
            fontSize: '11px',
            color: 'rgba(255, 255, 255, 0.12)',
            letterSpacing: '0.04em',
            textAlign: 'center',
            marginTop: '48px',
          }}>
            © 2026 Caelborne Digital. All rights reserved.
          </p>
        </footer>
      </motion.div>
    </>
  );
}
