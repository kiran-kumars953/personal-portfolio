// Cloudflare Pages Function — POST /api/contact
// Receives the contact form and sends it via Web3Forms.
// Web3Forms doesn't require domain verification, making it perfect for free/simple setups.
// 
// Setup:
// 1. Go to https://web3forms.com/ and enter your email to get an Access Key.
// 2. Set the following environment variable in Cloudflare Pages (Settings > Environment variables):
//    WEB3FORMS_ACCESS_KEY (e.g., xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx)

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
    
    if (!env.WEB3FORMS_ACCESS_KEY) {
      return json({ error: 'Email service is not configured (Missing WEB3FORMS_ACCESS_KEY).' }, 500);
    }

    const fullName = `${firstName} ${lastName}`.trim();

    // Send request to Web3Forms API
    const res = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        access_key: env.WEB3FORMS_ACCESS_KEY,
        name: fullName,
        email: email,
        phone: phone || 'Not provided',
        message: message,
        subject: `New Portfolio Message from ${fullName}`,
        from_name: 'Portfolio Contact Form'
      }),
    });

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
