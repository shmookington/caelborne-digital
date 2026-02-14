import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

const ADMIN_EMAIL = 'amiritate03@gmail.com';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { name, email, phone, businessType, summary, source } = body;

        const subject = source === 'schedule'
            ? `📅 New Call Request from ${name || 'a client'}`
            : `🆕 New Project Inquiry from ${name || 'someone'}`;

        const htmlContent = `
            <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 560px; margin: 0 auto; padding: 32px 24px; color: #1a1a2e;">
                <div style="background: linear-gradient(135deg, #C5A044 0%, #DAC06A 100%); height: 4px; border-radius: 4px; margin-bottom: 24px;"></div>

                <h1 style="font-size: 20px; font-weight: 700; margin: 0 0 4px 0; color: #1a1a2e;">
                    ${source === 'schedule' ? '📅 New Scheduled Call' : '🆕 New Project Inquiry'}
                </h1>
                <p style="font-size: 13px; color: #6b7280; margin: 0 0 24px 0;">
                    ${new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                </p>

                <div style="background: #f9fafb; border-radius: 12px; padding: 20px; margin-bottom: 20px; border: 1px solid #e5e7eb;">
                    <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
                        ${name ? `<tr><td style="padding: 6px 0; color: #6b7280; width: 100px;">Name</td><td style="padding: 6px 0; font-weight: 600;">${name}</td></tr>` : ''}
                        ${email ? `<tr><td style="padding: 6px 0; color: #6b7280;">Email</td><td style="padding: 6px 0;"><a href="mailto:${email}" style="color: #C5A044; text-decoration: none;">${email}</a></td></tr>` : ''}
                        ${phone ? `<tr><td style="padding: 6px 0; color: #6b7280;">Phone</td><td style="padding: 6px 0;">${phone}</td></tr>` : ''}
                        ${businessType ? `<tr><td style="padding: 6px 0; color: #6b7280;">Type</td><td style="padding: 6px 0;">${businessType}</td></tr>` : ''}
                    </table>
                </div>

                ${summary ? `
                <div style="background: #f9fafb; border-radius: 12px; padding: 20px; border: 1px solid #e5e7eb;">
                    <p style="font-size: 12px; font-weight: 600; letter-spacing: 0.05em; color: #C5A044; margin: 0 0 8px 0;">SUMMARY</p>
                    <pre style="font-family: inherit; font-size: 13px; color: #374151; white-space: pre-wrap; margin: 0; line-height: 1.6;">${summary}</pre>
                </div>
                ` : ''}

                <div style="margin-top: 24px; padding-top: 16px; border-top: 1px solid #e5e7eb;">
                    <a href="https://caelborne.com/admin/requests" style="display: inline-block; background: linear-gradient(135deg, #C5A044, #DAC06A); color: #0a0a14; font-size: 13px; font-weight: 700; padding: 10px 24px; border-radius: 8px; text-decoration: none;">
                        View in Admin Panel →
                    </a>
                </div>
            </div>
        `;

        const { error } = await resend.emails.send({
            from: 'Caelborne <onboarding@resend.dev>',
            to: [ADMIN_EMAIL],
            subject,
            html: htmlContent,
        });

        if (error) {
            console.error('Resend error:', error);
            return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
        }

        return NextResponse.json({ success: true });
    } catch (err) {
        console.error('Notification route error:', err);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
