'use client';

import Link from 'next/link';

export default function NavLogo() {
    return (
        <Link
            href="/"
            className="fixed top-6 left-6 z-[100] flex items-center"
            style={{ zIndex: 100, textDecoration: 'none' }}
        >
            <span
                style={{
                    fontSize: '18px',
                    fontWeight: 700,
                    letterSpacing: '-0.02em',
                    color: '#8B7332',
                    textShadow: '0 2px 4px rgba(201, 169, 110, 0.4)',
                }}
            >
                Caelborne
            </span>
        </Link>
    );
}
