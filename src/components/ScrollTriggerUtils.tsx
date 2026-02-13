'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugin
if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

interface ScrollSectionProps {
    children: React.ReactNode;
    className?: string;
    pin?: boolean;
    scrub?: boolean | number;
    start?: string;
    end?: string;
    markers?: boolean;
}

/**
 * ScrollSection - GSAP ScrollTrigger wrapper for premium scroll experiences
 * Implements Mission Control-style pinning and scroll-scrubbing
 */
export const ScrollSection: React.FC<ScrollSectionProps> = ({
    children,
    className = '',
    pin = false,
    scrub = true,
    start = 'top top',
    end = '+=100%',
    markers = false,
}) => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const triggerRef = useRef<ScrollTrigger | null>(null);

    useEffect(() => {
        if (!sectionRef.current) return;

        // Create ScrollTrigger
        triggerRef.current = ScrollTrigger.create({
            trigger: sectionRef.current,
            start,
            end,
            pin,
            scrub: typeof scrub === 'boolean' ? (scrub ? 1 : false) : scrub,
            markers,
        });

        return () => {
            triggerRef.current?.kill();
        };
    }, [pin, scrub, start, end, markers]);

    return (
        <div ref={sectionRef} className={className}>
            {children}
        </div>
    );
};

interface ScrollAnimatedProps {
    children: React.ReactNode;
    className?: string;
    animation?: 'fadeUp' | 'fadeIn' | 'scaleUp' | 'slideLeft' | 'slideRight';
    delay?: number;
    duration?: number;
    scrub?: boolean | number;
    start?: string;
    end?: string;
}

/**
 * ScrollAnimated - Individual element with scroll-triggered animation
 * Uses GSAP for premium "weighted" feel
 */
export const ScrollAnimated: React.FC<ScrollAnimatedProps> = ({
    children,
    className = '',
    animation = 'fadeUp',
    delay = 0,
    duration = 1,
    scrub = 1.5, // Damped, smooth scrubbing
    start = 'top 85%',
    end = 'top 30%',
}) => {
    const elementRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!elementRef.current) return;

        // Define animation presets
        const animations: Record<string, gsap.TweenVars> = {
            fadeUp: { y: 80, opacity: 0 },
            fadeIn: { opacity: 0 },
            scaleUp: { scale: 0.85, opacity: 0 },
            slideLeft: { x: 100, opacity: 0 },
            slideRight: { x: -100, opacity: 0 },
        };

        const fromVars = animations[animation] || animations.fadeUp;

        // Set initial state
        gsap.set(elementRef.current, fromVars);

        // Create scroll-triggered animation
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: elementRef.current,
                start,
                end,
                scrub,
                toggleActions: 'play none none reverse',
            },
        });

        tl.to(elementRef.current, {
            ...Object.fromEntries(
                Object.keys(fromVars).map(key => [key, key === 'opacity' ? 1 : 0])
            ),
            scale: 1,
            duration,
            delay,
            ease: 'power3.out',
        });

        return () => {
            tl.kill();
        };
    }, [animation, delay, duration, scrub, start, end]);

    return (
        <div ref={elementRef} className={className}>
            {children}
        </div>
    );
};

interface PinnedHeroProps {
    children: React.ReactNode;
    className?: string;
    pinDuration?: string; // e.g., '+=50%' means pin for 50% of viewport height of scroll
}

/**
 * PinnedHero - Creates a pinned hero section with scroll-driven content reveals
 * Implements Mission Control-style "scroll to unveil" experience
 */
export const PinnedHero: React.FC<PinnedHeroProps> = ({
    children,
    className = '',
    pinDuration = '+=80%',
}) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!containerRef.current || !contentRef.current) return;

        // Pin the hero section
        const st = ScrollTrigger.create({
            trigger: containerRef.current,
            start: 'top top',
            end: pinDuration,
            pin: true,
            pinSpacing: true,
            scrub: 1,
        });

        // Animate content based on scroll progress within pinned section
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: 'top top',
                end: pinDuration,
                scrub: 1.5,
            },
        });

        // Hero content convergence effect
        const heroElements = contentRef.current.querySelectorAll('[data-hero-animate]');
        heroElements.forEach((el, i) => {
            const direction = el.getAttribute('data-hero-animate');

            if (direction === 'scale-down') {
                tl.to(el, {
                    scale: 0.95,
                    opacity: 0.5,
                    duration: 1,
                }, 0);
            } else if (direction === 'fade-out') {
                tl.to(el, {
                    opacity: 0,
                    y: -30,
                    duration: 1,
                }, 0);
            }
        });

        return () => {
            st.kill();
            tl.kill();
        };
    }, [pinDuration]);

    return (
        <div ref={containerRef} className={className}>
            <div ref={contentRef}>
                {children}
            </div>
        </div>
    );
};

/**
 * useScrollProgress - Hook for scroll-driven value interpolation
 * Returns a value from 0 to 1 based on scroll position
 */
export const useScrollProgress = (
    start: string = 'top bottom',
    end: string = 'bottom top'
) => {
    const ref = useRef<HTMLDivElement>(null);
    const progressRef = useRef(0);

    useEffect(() => {
        if (!ref.current) return;

        const st = ScrollTrigger.create({
            trigger: ref.current,
            start,
            end,
            scrub: true,
            onUpdate: (self) => {
                progressRef.current = self.progress;
            },
        });

        return () => st.kill();
    }, [start, end]);

    return { ref, progress: progressRef };
};

/**
 * initSmoothScroll - Initialize smooth scrolling for the entire page
 * Creates that "heavy, weighted" feel
 */
export const initSmoothScroll = () => {
    if (typeof window === 'undefined') return;

    // Configure GSAP defaults for premium feel
    gsap.defaults({
        ease: 'power2.out',
        duration: 0.8,
    });

    // Set up smooth scroll defaults
    ScrollTrigger.defaults({
        toggleActions: 'play none none reverse',
        markers: false,
    });
};
