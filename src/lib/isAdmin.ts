// ─── Admin Role Helper ──────────────────────────────────────────
// Single source of truth for admin access.
// Add or remove emails here to control who gets admin privileges.

export const ADMIN_EMAILS = [
    'amiritate03@gmail.com',
];

export function isAdmin(email: string | undefined | null): boolean {
    if (!email) return false;
    return ADMIN_EMAILS.includes(email.toLowerCase());
}
