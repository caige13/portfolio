// Cloudflare Worker: handles POST /api/contact by relaying the message through
// Resend. Also serves the built site as static assets when deployed via
// wrangler (see wrangler.jsonc); in the GitHub Pages setup only /api/contact
// is used, cross-origin from caigemiddaugh.com — hence the CORS handling.
//
// Secrets/vars:
//   RESEND_API_KEY  — wrangler secret put RESEND_API_KEY
//   DRY_RUN         — "true" in .dev.vars to skip the real Resend call locally

const TO_ADDRESS = 'caige.middaugh@hotmail.com';
const FROM_ADDRESS = 'Portfolio <onboarding@resend.dev>';

const ALLOWED_ORIGINS = [
  'https://caigemiddaugh.com',
  'https://www.caigemiddaugh.com',
  'http://localhost:3000',
];

const corsHeaders = (request) => {
  const origin = request.headers.get('Origin');
  if (!origin || !ALLOWED_ORIGINS.includes(origin)) return {};
  return {
    'Access-Control-Allow-Origin': origin,
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Max-Age': '86400',
    Vary: 'Origin',
  };
};

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const cors = corsHeaders(request);
    const json = (status, body) =>
      new Response(JSON.stringify(body), {
        status,
        headers: { 'Content-Type': 'application/json', ...cors },
      });

    if (url.pathname !== '/api/contact') {
      return json(404, { ok: false, error: 'Not found' });
    }
    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: cors });
    }
    if (request.method !== 'POST') {
      return json(405, { ok: false, error: 'Method not allowed' });
    }

    let body;
    try {
      body = await request.json();
    } catch {
      return json(400, { ok: false, error: 'Invalid JSON' });
    }

    const name = (body.name || '').trim();
    const email = (body.email || '').trim();
    const message = (body.message || '').trim();
    const honeypot = (body.website || '').trim();

    // Bots fill the hidden field; pretend success so they move on.
    if (honeypot) return json(200, { ok: true });

    if (!name || name.length > 100) return json(400, { ok: false, error: 'Invalid name' });
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254) {
      return json(400, { ok: false, error: 'Invalid email' });
    }
    if (message.length < 10 || message.length > 5000) {
      return json(400, { ok: false, error: 'Message must be 10–5000 characters' });
    }

    if (env.DRY_RUN === 'true') {
      console.log('DRY_RUN contact submission:', { name, email, message });
      return json(200, { ok: true, dryRun: true });
    }

    const resendRes = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: FROM_ADDRESS,
        to: [TO_ADDRESS],
        reply_to: email,
        subject: `Portfolio contact from ${name}`,
        text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
      }),
    });

    if (!resendRes.ok) {
      console.error('Resend error', resendRes.status, await resendRes.text());
      return json(502, { ok: false, error: 'Email delivery failed' });
    }

    return json(200, { ok: true });
  },
};
