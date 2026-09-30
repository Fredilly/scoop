'use client';

import { useEffect } from 'react';

export default function WaitlistCallbackPage() {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const joined = params.get('joined') === '1';
    window.parent.postMessage(
      { type: 'SCOOP_WAITLIST_RESULT', ok: joined },
      'https://scoop.article6.org',
    );
  }, []);

  return null;
}
