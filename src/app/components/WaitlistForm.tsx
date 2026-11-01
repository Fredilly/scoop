'use client';

import { useState, type FormEvent } from 'react';

export type WaitlistPersona = 'CREATOR' | 'SHOPPER' | 'BRAND_RETAILER' | 'DEVELOPER' | 'OTHER';

type WaitlistFormProps = {
  persona: WaitlistPersona;
  onPersonaChange: (persona: WaitlistPersona) => void;
};

const personas: Array<{ value: WaitlistPersona; label: string; detail: string }> = [
  { value: 'SHOPPER', label: 'Viewer', detail: 'I see things I want in video.' },
  { value: 'CREATOR', label: 'Creator', detail: 'My audience asks where things are from.' },
  { value: 'BRAND_RETAILER', label: 'Brand', detail: 'I sell or market products.' },
  { value: 'DEVELOPER', label: 'Developer', detail: 'I build commerce or AI products.' },
];

export default function WaitlistForm({ persona, onPersonaChange }: WaitlistFormProps) {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('Could not join the waitlist. Please try again.');
  const emphasizeSocials = persona === 'CREATOR' || persona === 'BRAND_RETAILER';

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formElement = event.currentTarget;
    const form = new FormData(formElement);

    setErrorMessage('Could not join the waitlist. Please try again.');
    setStatus('submitting');

    const payload = {
      name: String(form.get('name') || ''),
      email: String(form.get('email') || ''),
      persona,
      youtubeUrl: String(form.get('youtubeUrl') || ''),
      instagramUrl: String(form.get('instagramUrl') || ''),
      tiktokUrl: String(form.get('tiktokUrl') || ''),
      organization: String(form.get('organization') || ''),
      companyWebsite: String(form.get('companyWebsite') || ''),
      source: 'scoop_site',
      sourcePage: 'homepage',
      campaign: 'founding_100',
    };

    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) {
        throw new Error(typeof data?.error === 'string' ? data.error : 'Could not join the waitlist. Please try again.');
      }
      const metaWindow = window as typeof window & { fbq?: (...args: unknown[]) => void };
      metaWindow.fbq?.('track', 'Lead');
      setStatus('success');
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Could not join the waitlist. Please try again.');
      setStatus('error');
    }
  }

  const field =
    'h-12 w-full rounded-xl border border-[#d9dde3] bg-white px-4 text-[0.95rem] font-medium text-[#111318] outline-none transition placeholder:text-[#8a919c] hover:border-[#b9bfc8] focus:border-[#1769FF] focus:ring-4 focus:ring-[#1769FF]/10';

  if (status === 'success') {
    return (
      <div className="grid min-h-[20rem] content-center gap-4 py-6" role="status">
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#1769FF] text-white" aria-hidden="true">
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12.5l4.5 4.5L19 7.5" />
          </svg>
        </span>
        <p className="text-sm font-semibold text-[#1769FF]">Founding 100 confirmed</p>
        <h3 className="text-4xl font-semibold leading-[1] tracking-[-0.04em] text-[#111318] sm:text-5xl">You’re in.</h3>
        <p className="max-w-xl text-lg font-medium leading-7 text-[#303846]">Your application is confirmed.</p>
        <p className="max-w-xl text-base leading-7 text-[#62666f]">
          Check your inbox for confirmation. We’re opening Scoop in small groups. If your spot opens, you’ll get a separate personal invite with the install link.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mx-auto grid w-full gap-5">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="grid gap-2 text-left text-sm font-semibold text-[#111318]">
          Name
          <input required name="name" autoComplete="name" placeholder="Your name" className={field} />
        </label>
        <label className="grid gap-2 text-left text-sm font-semibold text-[#111318]">
          Email
          <input required type="email" name="email" autoComplete="email" placeholder="you@example.com" className={field} />
        </label>
      </div>

      <fieldset className="grid gap-2 border-0 p-0">
        <legend className="mb-2 p-0 text-left text-sm font-semibold text-[#111318]">I’m joining as</legend>
        <div className="grid gap-2 sm:grid-cols-2">
          {personas.map((item) => (
            <label key={item.value} className="relative block cursor-pointer">
              <input
                type="radio"
                name="persona-choice"
                value={item.value}
                checked={persona === item.value}
                onChange={() => onPersonaChange(item.value)}
                className="peer sr-only"
              />
              <span className="block rounded-xl border border-[#d9dde3] bg-white p-3.5 text-left transition hover:border-[#b9bfc8] peer-checked:border-[#1769FF] peer-checked:ring-4 peer-checked:ring-[#1769FF]/10 peer-focus-visible:ring-2 peer-focus-visible:ring-[#1769FF]">
                <span className="block text-sm font-semibold text-[#111318]">{item.label}</span>
                <span className="mt-1 block text-xs leading-5 text-[#62666f]">{item.detail}</span>
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      {persona === 'BRAND_RETAILER' && (
        <label className="grid gap-2 text-left text-sm font-semibold text-[#111318]">
          Brand or company <span className="font-normal text-[#62666f]">optional</span>
          <input name="organization" autoComplete="organization" placeholder="Company name" className={field} />
        </label>
      )}

      <details
        key={persona}
        open={emphasizeSocials}
        className="group rounded-xl border border-[#d9dde3] bg-white px-4 py-3"
      >
        <summary className="flex cursor-pointer list-none items-center justify-between gap-3 text-left text-sm font-semibold text-[#111318] [&::-webkit-details-marker]:hidden">
          <span>
            Social profiles <span className="font-normal text-[#62666f]">optional</span>
          </span>
          <span className="text-xs font-semibold text-[#1769FF] group-open:hidden">Add</span>
          <span className="hidden text-xs font-semibold text-[#1769FF] group-open:inline">Hide</span>
        </summary>
        <p className="mt-2 text-left text-xs leading-5 text-[#62666f]">
          Add any you use. One is enough; all three are welcome.
        </p>
        <div className="mt-3 grid gap-3 lg:grid-cols-3">
          <label className="grid gap-2 text-left text-sm font-semibold text-[#111318]">
            YouTube
            <input
              name="youtubeUrl"
              inputMode="url"
              autoCapitalize="none"
              autoCorrect="off"
              placeholder="youtube.com/@channel"
              className={field}
            />
          </label>
          <label className="grid gap-2 text-left text-sm font-semibold text-[#111318]">
            Instagram
            <input
              name="instagramUrl"
              inputMode="url"
              autoCapitalize="none"
              autoCorrect="off"
              placeholder="@handle or profile URL"
              className={field}
            />
          </label>
          <label className="grid gap-2 text-left text-sm font-semibold text-[#111318]">
            TikTok
            <input
              name="tiktokUrl"
              inputMode="url"
              autoCapitalize="none"
              autoCorrect="off"
              placeholder="@handle or profile URL"
              className={field}
            />
          </label>
        </div>
      </details>

      <label className="sr-only" aria-hidden="true">
        Company website
        <input name="companyWebsite" tabIndex={-1} autoComplete="off" />
      </label>

      <button
        type="submit"
        disabled={status === 'submitting'}
        className="inline-flex h-12 w-full items-center justify-center rounded-xl bg-[#1769FF] px-7 text-sm font-semibold text-white transition hover:bg-[#111318] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1769FF] disabled:cursor-default disabled:opacity-60 sm:w-auto sm:justify-self-start"
      >
        {status === 'submitting' ? 'Joining…' : 'Join the First 100'}
      </button>

      {status === 'error' && (
        <p className="text-sm text-red-600" role="alert">{errorMessage}</p>
      )}

      <p className="text-xs leading-5 text-[#62666f]">
        Private beta. We’ll only use this to contact you about Scoop testing and launch access.
      </p>
    </form>
  );
}
