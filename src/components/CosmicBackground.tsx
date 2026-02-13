'use client';

import React from 'react';

/**
 * CosmicBackground - Organic Lake-Flow Effect
 * Slow, fluid undulating motion like light playing on a lake surface
 */
export const CosmicBackground: React.FC = () => {
    const keyframeCSS = `
        @keyframes lakeFlow {
            0% {
                transform: translate(0%, 0%) scale(1.08) rotate(0deg);
                filter: hue-rotate(0deg) saturate(1.4);
            }
            20% {
                transform: translate(-1.5%, 1%) scale(1.06) rotate(0.3deg);
                filter: hue-rotate(45deg) saturate(1.5);
            }
            40% {
                transform: translate(0.5%, 2%) scale(1.09) rotate(-0.2deg);
                filter: hue-rotate(120deg) saturate(1.4);
            }
            60% {
                transform: translate(1.5%, 0.5%) scale(1.05) rotate(0.4deg);
                filter: hue-rotate(200deg) saturate(1.5);
            }
            80% {
                transform: translate(-0.5%, -0.5%) scale(1.07) rotate(-0.3deg);
                filter: hue-rotate(300deg) saturate(1.4);
            }
            100% {
                transform: translate(0%, 0%) scale(1.08) rotate(0deg);
                filter: hue-rotate(360deg) saturate(1.4);
            }
        }

        @keyframes lakeFlowSecondary {
            0% {
                transform: translate(0%, 0%) scale(1.12) rotate(0deg);
            }
            25% {
                transform: translate(2%, -1%) scale(1.10) rotate(-0.5deg);
            }
            50% {
                transform: translate(-1%, -2%) scale(1.14) rotate(0.3deg);
            }
            75% {
                transform: translate(-1.5%, 1.5%) scale(1.11) rotate(-0.2deg);
            }
            100% {
                transform: translate(0%, 0%) scale(1.12) rotate(0deg);
            }
        }

        @keyframes lakeRipple {
            0%, 100% {
                transform: translate(-50%, -50%) scale(1) skewX(0deg);
                opacity: 0.25;
            }
            33% {
                transform: translate(-48%, -52%) scale(1.08) skewX(0.5deg);
                opacity: 0.4;
            }
            66% {
                transform: translate(-52%, -48%) scale(0.95) skewX(-0.3deg);
                opacity: 0.3;
            }
        }
        
        @keyframes pinkGlowDrift {
            0%, 100% {
                transform: translate(0, 0) scale(1);
                opacity: 0.4;
            }
            33% {
                transform: translate(80px, 50px) scale(1.1);
                opacity: 0.6;
            }
            66% {
                transform: translate(-30px, 90px) scale(0.95);
                opacity: 0.45;
            }
        }
        
        @keyframes cyanGlowDrift {
            0%, 100% {
                transform: translate(0, 0) scale(1);
                opacity: 0.35;
            }
            33% {
                transform: translate(-70px, -40px) scale(1.05);
                opacity: 0.5;
            }
            66% {
                transform: translate(40px, -70px) scale(0.98);
                opacity: 0.38;
            }
        }
    `;

    return (
        <>
            {/* Embed keyframes directly in a style tag - guaranteed to load */}
            <style dangerouslySetInnerHTML={{ __html: keyframeCSS }} />

            <div
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    width: '100vw',
                    height: '100vh',
                    overflow: 'hidden',
                    pointerEvents: 'none',
                    zIndex: -1,
                }}
            >
                {/* Layer 0: Soft gradient base — warm neutral lake bed */}
                <div
                    style={{
                        position: 'absolute',
                        inset: 0,
                        background: 'linear-gradient(170deg, #0a0a0e 0%, #0e0c14 35%, #0c0a12 65%, #0a0810 100%)',
                    }}
                />

                {/* Layer 1: Primary holographic — warm-tinted, pulled back */}
                <div
                    style={{
                        position: 'absolute',
                        inset: '-12%',
                        backgroundImage: 'url(/foil-texture.png)',
                        backgroundSize: '160% 160%',
                        backgroundPosition: 'center',
                        opacity: 0.75,
                        mixBlendMode: 'lighten' as const,
                        animation: 'lakeFlow 11s ease-in-out infinite',
                        willChange: 'transform, filter',
                    }}
                />

                {/* Layer 2: Secondary — softer counter-drift */}
                <div
                    style={{
                        position: 'absolute',
                        inset: '-8%',
                        backgroundImage: 'url(/foil-texture.png)',
                        backgroundSize: '140% 140%',
                        backgroundPosition: 'center',
                        opacity: 0.25,
                        mixBlendMode: 'lighten' as const,
                        animation: 'lakeFlowSecondary 14s ease-in-out infinite',
                        willChange: 'transform',
                    }}
                />



                {/* Layer 3: Soft ripple texture overlay */}
                <div
                    style={{
                        position: 'absolute',
                        inset: 0,
                        backgroundImage: `repeating-linear-gradient(
                            90deg,
                            transparent,
                            transparent 2px,
                            rgba(180, 160, 200, 0.06) 2px,
                            rgba(180, 160, 200, 0.06) 3px
                        )`,
                        opacity: 0.4,
                    }}
                />

                {/* Subtle light shifts — same palette as the foil, barely visible */}
                {[
                    { w: '22vw', h: '20vh', top: '5%', left: '5%', color: 'rgba(168, 85, 247, 0.15)', blur: 45, anim: 'pinkGlowDrift', dur: '9s' },
                    { w: '18vw', h: '16vh', top: '15%', left: '65%', color: 'rgba(236, 72, 153, 0.12)', blur: 40, anim: 'cyanGlowDrift', dur: '12s' },
                    { w: '25vw', h: '22vh', top: '35%', left: '18%', color: 'rgba(99, 102, 241, 0.10)', blur: 50, anim: 'pinkGlowDrift', dur: '14s' },
                    { w: '20vw', h: '18vh', top: '55%', left: '72%', color: 'rgba(192, 80, 220, 0.12)', blur: 42, anim: 'cyanGlowDrift', dur: '11s' },
                    { w: '16vw', h: '14vh', top: '70%', left: '38%', color: 'rgba(139, 92, 246, 0.10)', blur: 38, anim: 'lakeRipple', dur: '10s' },
                    { w: '22vw', h: '18vh', top: '78%', left: '8%', color: 'rgba(217, 70, 239, 0.11)', blur: 45, anim: 'cyanGlowDrift', dur: '13s' },
                    { w: '18vw', h: '16vh', top: '42%', left: '50%', color: 'rgba(168, 85, 247, 0.09)', blur: 48, anim: 'pinkGlowDrift', dur: '15s' },
                ].map((b, i) => (
                    <div
                        key={i}
                        style={{
                            position: 'absolute',
                            width: b.w,
                            height: b.h,
                            top: b.top,
                            left: b.left,
                            background: `radial-gradient(ellipse, ${b.color} 0%, transparent 65%)`,
                            filter: `blur(${b.blur}px)`,
                            animation: `${b.anim} ${b.dur} ease-in-out infinite`,
                            willChange: 'transform, opacity',
                        }}
                    />
                ))}

                {/* Layer 7: Soft vignette — depth around edges */}
                <div
                    style={{
                        position: 'absolute',
                        inset: 0,
                        background: 'radial-gradient(ellipse 90% 80% at center, transparent 50%, rgba(0, 0, 0, 0.2) 90%)',
                    }}
                />
            </div>
        </>
    );
};
