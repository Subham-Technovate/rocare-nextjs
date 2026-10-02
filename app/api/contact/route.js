import { NextResponse } from 'next/server';
import { getTransporter, getAdminEmail, getFromAddress } from '@/app/lib/mailer';
import { buildLeadEmail } from '@/app/lib/emailTemplates';

/**
 * POST /api/contact
 * Accepts lead form submissions from the hero section / quote modal.
 *
 * Validates the payload, then delivers it to the admin inbox over SMTP
 * (Gmail by default). SMTP settings come from .env.local — see mailer.js.
 */
export const runtime = 'nodejs';

const REQUIRED = ['name', 'email', 'phone', 'location'];
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^[+()\-\s\d]{7,20}$/;

function clean(value) {
  return typeof value === 'string' ? value.trim() : '';
}

export async function POST(request) {
  let payload;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 });
  }

  const data = {
    name: clean(payload.name),
    email: clean(payload.email),
    phone: clean(payload.phone),
    location: clean(payload.location),
    message: clean(payload.message),
  };

  // Validate required fields.
  const missing = REQUIRED.filter((field) => !data[field]);
  if (missing.length > 0) {
    return NextResponse.json(
      { error: `Please fill in: ${missing.join(', ')}.` },
      { status: 422 }
    );
  }

  if (!EMAIL_RE.test(data.email)) {
    return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 422 });
  }

  if (!PHONE_RE.test(data.phone)) {
    return NextResponse.json({ error: 'Please enter a valid phone number.' }, { status: 422 });
  }

  const record = {
    ...data,
    receivedAt: new Date().toISOString(),
  };

  try {
    const { subject, text, html } = buildLeadEmail(record);

    await getTransporter().sendMail({
      from: getFromAddress(),
      to: getAdminEmail(),
      replyTo: data.email,
      subject,
      text,
      html,
    });

    console.log('[contact] lead emailed to admin:', {
      name: data.name,
      email: data.email,
      receivedAt: record.receivedAt,
    });

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (err) {
    console.error('[contact] failed to send lead email:', err);
    return NextResponse.json(
      { error: 'We could not submit your request. Please call us instead.' },
      { status: 500 }
    );
  }
}
