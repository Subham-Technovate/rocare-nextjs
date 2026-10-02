import nodemailer from 'nodemailer';

/**
 * mailer.js — shared Nodemailer transport for the site.
 *
 * Reads SMTP settings from environment variables (see .env.local):
 *   SMTP_HOST, SMTP_PORT, SMTP_SECURE, SMTP_USER, SMTP_PASS,
 *   ADMIN_EMAIL, SMTP_FROM_NAME
 *
 * The transporter is created lazily and cached on the module so that
 * Next.js dev hot-reloads don't open a new connection pool each time.
 */

let cachedTransporter = null;

function requiredEnv(name) {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

export function getTransporter() {
  if (cachedTransporter) return cachedTransporter;

  const host = requiredEnv('SMTP_HOST');
  const port = Number(process.env.SMTP_PORT || 465);
  const secure =
    typeof process.env.SMTP_SECURE === 'string'
      ? process.env.SMTP_SECURE === 'true'
      : port === 465;

  cachedTransporter = nodemailer.createTransport({
    host,
    port,
    secure,
    auth: {
      user: requiredEnv('SMTP_USER'),
      pass: requiredEnv('SMTP_PASS'),
    },
    connectionTimeout: 10000,
    greetingTimeout: 10000,
    socketTimeout: 15000,
  });

  return cachedTransporter;
}

/**
 * Escape user-supplied strings before embedding them in HTML emails
 * to avoid HTML/script injection in the admin inbox.
 */
export function escapeHtml(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export function getAdminEmail() {
  return requiredEnv('ADMIN_EMAIL');
}

export function getFromAddress() {
  const user = requiredEnv('SMTP_USER');
  const name = process.env.SMTP_FROM_NAME || 'Website';
  return `"${name}" <${user}>`;
}
