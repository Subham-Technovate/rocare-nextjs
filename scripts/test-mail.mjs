// One-off SMTP connectivity test.
// Usage: node scripts/test-mail.mjs
// Reads .env.local manually (no dotenv dependency needed).

import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import nodemailer from 'nodemailer';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const envPath = path.resolve(__dirname, '..', '.env.local');

try {
  const raw = readFileSync(envPath, 'utf8');
  for (const line of raw.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const eq = trimmed.indexOf('=');
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    const value = trimmed.slice(eq + 1).trim();
    if (!(key in process.env)) process.env[key] = value;
  }
} catch (err) {
  console.error('Could not read .env.local:', err.message);
  process.exit(1);
}

const port = Number(process.env.SMTP_PORT || 465);
const transport = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port,
  secure: String(process.env.SMTP_SECURE) === 'true' || port === 465,
  auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
});

try {
  await transport.verify();
  console.log('✅ SMTP connection OK — credentials are valid.');
} catch (err) {
  console.error('❌ SMTP connection failed:');
  console.error(err.message);
  process.exitCode = 1;
}
