/**
 * recaptcha.js — server-side verification for Google reCAPTCHA v2.
 *
 * The browser widget produces a token which the client sends to
 * /api/contact. We verify it against Google's siteverify endpoint using
 * the secret key (RECAPTCHA_SECRET_KEY). Only a successful verification
 * allows the lead email to be sent.
 *
 * Docs: https://developers.google.com/recaptcha/docs/verify
 */

const VERIFY_URL = 'https://www.google.com/recaptcha/api/siteverify';

/**
 * Verify a reCAPTCHA token with Google.
 * Returns true only when Google confirms the token is valid.
 *
 * @param {string} token   - the g-recaptcha-response value from the client
 * @param {string} [ip]    - optional visitor IP to include in verification
 * @returns {Promise<boolean>}
 */
export async function verifyRecaptcha(token, ip) {
  const secret = process.env.RECAPTCHA_SECRET_KEY;

  if (!secret) {
    console.error('[recaptcha] RECAPTCHA_SECRET_KEY is not set.');
    return false;
  }

  if (!token || typeof token !== 'string') {
    return false;
  }

  const params = new URLSearchParams({ secret, response: token });
  if (ip) params.append('remoteip', ip);

  try {
    const res = await fetch(VERIFY_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: params.toString(),
      // Fail fast if Google is slow — the user is waiting on this.
      signal: AbortSignal.timeout(10000),
    });

    if (!res.ok) {
      console.error('[recaptcha] verification request failed:', res.status);
      return false;
    }

    const data = await res.json();
    return data?.success === true;
  } catch (err) {
    console.error('[recaptcha] verification error:', err);
    return false;
  }
}
