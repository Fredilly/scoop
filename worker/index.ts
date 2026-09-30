const WAITLIST_UPSTREAM = 'https://article6.org/api/scoop-waitlist';

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'no-store',
    },
  });
}

export default {
  async fetch(request: Request): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname !== '/api/waitlist') {
      return json({ error: 'Not found.' }, 404);
    }

    if (request.method !== 'POST') {
      return json({ error: 'Method not allowed.' }, 405);
    }

    const contentType = request.headers.get('content-type') || '';
    if (!contentType.toLowerCase().includes('application/json')) {
      return json({ error: 'Expected JSON.' }, 415);
    }

    const contentLength = Number(request.headers.get('content-length') || '0');
    if (Number.isFinite(contentLength) && contentLength > 16_384) {
      return json({ error: 'Request too large.' }, 413);
    }

    let body: string;
    try {
      body = await request.text();
      if (body.length > 16_384) return json({ error: 'Request too large.' }, 413);
      JSON.parse(body);
    } catch {
      return json({ error: 'Invalid JSON.' }, 400);
    }

    try {
      const upstream = await fetch(WAITLIST_UPSTREAM, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body,
        redirect: 'manual',
      });

      const payload = await upstream.json().catch(() => null) as Record<string, unknown> | null;

      if (!upstream.ok) {
        return json(
          { error: typeof payload?.error === 'string' ? payload.error : 'Could not join the waitlist.' },
          upstream.status,
        );
      }

      return json({
        ok: true,
        email_sent: payload?.email_sent === true,
        email_skipped: payload?.email_skipped === true,
      });
    } catch (error) {
      console.error('[waitlist-proxy] upstream request failed', error);
      return json({ error: 'Could not join the waitlist. Please try again.' }, 502);
    }
  },
};
