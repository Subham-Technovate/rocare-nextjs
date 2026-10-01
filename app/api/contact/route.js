import { NextResponse } from 'next/server';

/**
 * POST /api/contact
 * Accepts lead form submissions from the hero section.
 *
 * Validates the payload, then (in the absence of a configured mail/CRM
 * provider) logs the lead and returns success. Wire a real transport here
 * — e.g. Resend, SendGrid, Nodemailer, or a CRM webhook — by reading the
 * relevant env vars.
 */
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

  try {
    // ── Delivery ──────────────────────────────────────────────────────────
    // No email provider is configured yet, so we log the lead server-side.
    // Replace this block with your transport of choice, e.g.:
    //
    //   await resend.emails.send({
    //     from: 'website@rocarcodisha.in',
    //     to: process.env.LEAD_INBOX,
    //     subject: `New lead: ${data.name}`,
    //     text: JSON.stringify(data),
    //   });
    //
    console.log('[contact] new lead:', {
      ...data,
      receivedAt: new Date().toISOString(),
    });

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (err) {
    console.error('[contact] failed to process lead:', err);
    return NextResponse.json(
      { error: 'We could not submit your request. Please call us instead.' },
      { status: 500 }
    );
  }
}
