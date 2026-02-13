import React from 'react';

interface SoftGlassLogoProps {
    className?: string;
    size?: number;
}

export default function SoftGlassLogo({ className = '', size = 128 }: SoftGlassLogoProps) {
    // 100x100 coordinate system
    // Refined Geometric 'G' path based on the chosen isometric crystal concept
    // It's a hexagon shape with a cut-out forming the G

    // A hexagon is roughly path(50 0, 93 25, 93 75, 50 100, 7 75, 7 25)
    // We'll modify it to create the G cut

    // Outer Hexagon: 
    // Top: 50,2 -> 93.3,27 -> 93.3,73 -> 50,98 -> 6.7,73 -> 6.7,27 -> close

    // Inner G Cutout logic:
    // It needs to look like a thick ribbon.

    const strokeWidth = 14;

    return (
        <div
            className={`relative flex items-center justify-center ${className}`}
            style={{ width: size, height: size }}
        >
            {/* Back Glow Layer - The "Soul" */}
            <div
                className="absolute inset-0 rounded-full opacity-60 blur-xl"
                style={{
                    background: 'radial-gradient(circle at 40% 40%, rgba(168, 85, 247, 0.8), rgba(59, 130, 246, 0.4))',
                    transform: 'scale(0.8)',
                }}
            />

            {/* SVG Logic */}
            <svg
                width="100%"
                height="100%"
                viewBox="0 0 100 100"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="relative z-10 drop-shadow-xl"
            >
                <defs>
                    {/* Soft Glass Filter */}
                    <filter id="glass-blur" x="-20%" y="-20%" width="140%" height="140%">
                        <feGaussianBlur in="SourceGraphic" stdDeviation="1.5" result="blur" />
                        <feComponentTransfer in="blur" result="glass">
                            <feFuncA type="linear" slope="0.9" />
                        </feComponentTransfer>
                        {/* Composite logic to keep edges semi-crisp but surface blurry is complex in SVG, 
                            so we'll layer multiple paths instead. This filter is just for the internal blur. */}
                    </filter>

                    {/* Inner Glow Gradient */}
                    <linearGradient id="glass-gradient" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
                        <stop offset="0%" stopColor="white" stopOpacity="0.4" />
                        <stop offset="50%" stopColor="white" stopOpacity="0.1" />
                        <stop offset="100%" stopColor="white" stopOpacity="0.05" />
                    </linearGradient>

                    {/* Stroke Gradient */}
                    <linearGradient id="stroke-gradient" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
                        <stop offset="0%" stopColor="white" stopOpacity="0.9" />
                        <stop offset="40%" stopColor="white" stopOpacity="0.2" />
                        <stop offset="100%" stopColor="white" stopOpacity="0.6" />
                    </linearGradient>
                </defs>

                {/* The Geometric G Path 
                    Constructed from an isometric grid.
                */}
                <g transform="translate(0, 0)">
                    {/* 
                        Main G Shape 
                        We'll envision a hexagonal ring with the right side cut and tucked in.
                     */}
                    <path
                        d="M50 5
                           L90 28
                           L90 48
                           L65 62
                           L65 52
                           L78 45
                           L78 35
                           L50 19
                           L22 35
                           L22 65
                           L50 81
                           L78 65
                           L78 72
                           L90 79
                           L90 72
                           L90 79 
                           L50 102 
                           L3 75 
                           L3 25 
                           Z"
                    // This path is a placeholder rough geometry, let's refine it to be a proper G
                    // Simpler Polygon points for a Hex G
                    />
                    <path
                        d="M50 10 
                           L85 30 
                           L85 55 
                           L60 70 
                           L60 58 
                           L73 50 
                           L73 38 
                           L50 25 
                           L27 38 
                           L27 62 
                           L50 75 
                           L73 62 
                           L73 75 
                           L50 88 
                           L15 68 
                           L15 32 
                           Z"
                        fill="url(#glass-gradient)"
                        style={{ backdropFilter: 'blur(4px)' }} // Note: SVG doesn't support backdrop-filter directly, we fake it with fill/opacity
                        stroke="url(#stroke-gradient)"
                        strokeWidth="1.5"
                        strokeLinejoin="round"
                    />

                    {/* Internal facets for 3D depth */}
                    <path
                        d="M15 32 L27 38 M50 25 L50 10 M85 30 L73 38"
                        stroke="white"
                        strokeOpacity="0.3"
                        strokeWidth="0.5"
                    />
                    <path
                        d="M15 68 L27 62 M50 88 L50 75 M73 62 L73 70" // Fixed endpoint for light handling
                        stroke="white"
                        strokeOpacity="0.1"
                        strokeWidth="0.5"
                    />

                    {/* Top Highlight - Softbox reflection */}
                    <path
                        d="M50 11 L84 30.5 L72 37 L50 26 L28 37.5 L16 31 Z"
                        fill="white"
                        fillOpacity="0.2"
                        className="mix-blend-overlay"
                    />
                </g>
            </svg>
        </div>
    );
}
