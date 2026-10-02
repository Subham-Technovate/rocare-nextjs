import { escapeHtml } from './mailer';

/**
 * Builds the admin-notification email for a new contact-form submission.
 * Returns { subject, text, html } ready for nodemailer's sendMail().
 */
export function buildLeadEmail(data) {
  const { name, email, phone, location, message, receivedAt } = data;

  const subject = `New Lead: ${name}${location ? ` — ${location}` : ''}`;

  const text = [
    'New enquiry from the RO Care website',
    '',
    `Name     : ${name}`,
    `Email    : ${email}`,
    `Phone    : ${phone}`,
    `Location : ${location || '—'}`,
    '',
    'Message:',
    message || '(none)',
    '',
    `Received : ${receivedAt}`,
  ].join('\n');

  const row = (label, value) => `
    <tr>
      <td style="padding:10px 16px;background:#F4F8FC;border:1px solid #E1EAF3;font-weight:700;color:#0A2540;width:140px;">${escapeHtml(
        label
      )}</td>
      <td style="padding:10px 16px;border:1px solid #E1EAF3;color:#20374B;">${escapeHtml(
        value || '—'
      )}</td>
    </tr>`;

  const html = `
  <div style="font-family:Arial,Helvetica,sans-serif;background:#EEF4FA;padding:24px;">
    <div style="max-width:600px;margin:0 auto;background:#FFFFFF;border-radius:12px;overflow:hidden;border:1px solid #E1EAF3;">
      <div style="background:#0B63B6;padding:20px 24px;">
        <h1 style="margin:0;font-size:18px;color:#FFFFFF;">New Lead — RO Care Website</h1>
      </div>
      <table style="width:100%;border-collapse:collapse;font-size:14px;">
        ${row('Name', name)}
        ${row('Email', email)}
        ${row('Phone', phone)}
        ${row('Location', location)}
      </table>
      <div style="padding:20px 24px;">
        <h2 style="margin:0 0 8px;font-size:14px;color:#0A2540;">Message</h2>
        <p style="margin:0;font-size:14px;color:#20374B;white-space:pre-wrap;line-height:1.6;">${escapeHtml(
          message || '(none provided)'
        )}</p>
      </div>
      <div style="padding:12px 24px 20px;border-top:1px solid #E1EAF3;">
        <p style="margin:0;font-size:12px;color:#7A8CA0;">Received: ${escapeHtml(
          receivedAt
        )}</p>
      </div>
    </div>
  </div>`;

  return { subject, text, html };
}
