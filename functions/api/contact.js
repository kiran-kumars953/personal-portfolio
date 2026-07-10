// Cloudflare Pages Function — POST /api/contact
// Receives the contact form, sends a styled email via MailerSend to your Proton inbox.
// Set these in the Cloudflare Pages dashboard (Settings > Environment variables):
//   MAILERSEND_API_KEY  (secret)  e.g. mlsn.xxxxxxxx
//   MAILERSEND_FROM     (var)     a verified/trial sender, e.g. contact@test-xxxx.mlsender.net
//   CONTACT_TO_EMAIL    (var)     your Proton address, e.g. you@proton.me

export async function onRequestPost({ request, env }) {
  try {
    const data = await request.json();
    const firstName = (data.firstName || '').trim();
    const lastName = (data.lastName || '').trim();
    const email = (data.email || '').trim();
    const phone = (data.phone || '').trim();
    const message = (data.message || '').trim();

    if (!firstName || !email || !message) {
      return json({ error: 'Please fill in your name, email, and message.' }, 400);
    }
    if (!env.MAILERSEND_API_KEY || !env.MAILERSEND_FROM || !env.CONTACT_TO_EMAIL) {
      return json({ error: 'Email service is not configured on the server.' }, 500);
    }

    const fullName = `${firstName} ${lastName}`.trim();
    const submittedAt = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
    const html = buildHtml({ fullName, email, phone, message, submittedAt });
    const text = buildText({ fullName, email, phone, message, submittedAt });

    const res = await fetch('https://api.mailersend.com/v1/email', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${env.MAILERSEND_API_KEY}`,
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
      },
      body: JSON.stringify({
        from: { email: env.MAILERSEND_FROM, name: 'Portfolio Contact' },
        to: [{ email: env.CONTACT_TO_EMAIL }],
        reply_to: { email, name: fullName },
        subject: `New Portfolio Message from ${fullName}`,
        html,
        text,
      }),
    });

    // MailerSend returns 202 Accepted on success
    if (!res.ok) {
      const detail = await res.text();
      return json({ error: 'Failed to send email.', detail }, 502);
    }
    return json({ ok: true }, 200);
  } catch (err) {
    return json({ error: 'Server error.', detail: String(err) }, 500);
  }
}

function json(obj, status) {
  return new Response(JSON.stringify(obj), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

// Escape user input so it can't break/inject the HTML email
function esc(value = '') {
  return String(value).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
}

function buildText({ fullName, email, phone, message, submittedAt }) {
  return `New portfolio message\n\nName: ${fullName}\nEmail: ${email}\nPhone: ${phone || '-'}\nReceived: ${submittedAt}\n\nMessage:\n${message}\n`;
}

function buildHtml({ fullName, email, phone, message, submittedAt }) {
  return `
  <div style="margin:0;padding:0;background:#0a0a0a;font-family:Arial,Helvetica,sans-serif;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#0a0a0a;padding:32px 12px;">
      <tr><td align="center">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#141414;border:1px solid #262626;border-radius:16px;overflow:hidden;">
          <tr><td style="background:#ff2a2a;padding:28px 32px;">
            <div style="color:#ffffff;font-size:12px;font-weight:bold;letter-spacing:3px;text-transform:uppercase;opacity:0.9;">New Message</div>
            <div style="color:#ffffff;font-size:24px;font-weight:800;margin-top:6px;">Portfolio Contact</div>
          </td></tr>
          <tr><td style="padding:28px 32px 8px 32px;">
            <p style="color:#e5e5e5;font-size:15px;line-height:1.6;margin:0;">You received a new enquiry from your portfolio website. Details are below.</p>
          </td></tr>
          <tr><td style="padding:12px 32px 8px 32px;">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td style="padding:12px 0;border-bottom:1px solid #262626;color:#888;font-size:12px;text-transform:uppercase;letter-spacing:1px;width:120px;vertical-align:top;">Name</td>
                <td style="padding:12px 0;border-bottom:1px solid #262626;color:#ffffff;font-size:15px;font-weight:bold;">${esc(fullName)}</td>
              </tr>
              <tr>
                <td style="padding:12px 0;border-bottom:1px solid #262626;color:#888;font-size:12px;text-transform:uppercase;letter-spacing:1px;vertical-align:top;">Email</td>
                <td style="padding:12px 0;border-bottom:1px solid #262626;color:#ffffff;font-size:15px;"><a href="mailto:${esc(email)}" style="color:#ff6b6b;text-decoration:none;">${esc(email)}</a></td>
              </tr>
              <tr>
                <td style="padding:12px 0;border-bottom:1px solid #262626;color:#888;font-size:12px;text-transform:uppercase;letter-spacing:1px;vertical-align:top;">Phone</td>
                <td style="padding:12px 0;border-bottom:1px solid #262626;color:#ffffff;font-size:15px;"><a href="tel:${esc(phone)}" style="color:#ff6b6b;text-decoration:none;">${esc(phone) || '—'}</a></td>
              </tr>
              <tr>
                <td style="padding:12px 0;color:#888;font-size:12px;text-transform:uppercase;letter-spacing:1px;vertical-align:top;">Received</td>
                <td style="padding:12px 0;color:#bbbbbb;font-size:14px;">${esc(submittedAt)}</td>
              </tr>
            </table>
          </td></tr>
          <tr><td style="padding:8px 32px 28px 32px;">
            <div style="color:#888;font-size:12px;text-transform:uppercase;letter-spacing:1px;margin-bottom:10px;">Message</div>
            <div style="background:#0f0f0f;border:1px solid #262626;border-left:3px solid #ff2a2a;border-radius:8px;padding:18px 20px;color:#e5e5e5;font-size:15px;line-height:1.7;white-space:pre-wrap;">${esc(message)}</div>
          </td></tr>
          <tr><td style="padding:0 32px 32px 32px;">
            <a href="mailto:${esc(email)}" style="display:inline-block;background:#ff2a2a;color:#ffffff;text-decoration:none;font-weight:bold;font-size:14px;padding:12px 28px;border-radius:999px;">Reply to ${esc(fullName)}</a>
          </td></tr>
          <tr><td style="background:#0f0f0f;padding:20px 32px;border-top:1px solid #262626;">
            <p style="color:#666;font-size:12px;margin:0;">Sent automatically from the Kiran Kumar S portfolio contact form.</p>
          </td></tr>
        </table>
      </td></tr>
    </table>
  </div>`;
}
