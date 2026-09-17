'use client';

import { useState, type FormEvent } from 'react';

export type WaitlistPersona = 'CREATOR' | 'SHOPPER' | 'BRAND_RETAILER' | 'DEVELOPER' | 'OTHER';
export type CreatorPlatform = 'YOUTUBE' | 'TIKTOK' | 'INSTAGRAM' | 'OTHER';

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
  const [message, setMessage] = useState('');
  const [platform, setPlatform] = useState<CreatorPlatform>('YOUTUBE');
  const [submitted, setSubmitted] = useState<{ name: string; email: string } | null>(null);
  const [feedbackStatus, setFeedbackStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const showChannelFields = persona === 'CREATOR' || persona === 'BRAND_RETAILER';

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formElement = event.currentTarget;
    const form = new FormData(formElement);
    setStatus('submitting');
    setMessage('');

    const name = String(form.get('name') || '');
    const email = String(form.get('email') || '');
    const payload = {
      name,
      email,
      persona,
      platform: showChannelFields ? platform : '',
      handle: String(form.get('handle') || ''),
      organization: String(form.get('organization') || ''),
      companyWebsite: String(form.get('companyWebsite') || ''),
      source: 'scoop_site',
      sourcePage: 'homepage',
      campaign: 'founding_100',
    };

    try {
      const response = await fetch('https://article6.org/api/scoop-waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(data?.error || 'Could not join the waitlist.');

      setSubmitted({ name, email });
      setStatus('success');
      setMessage('');
      formElement.reset();
      setPlatform('YOUTUBE');
    } catch (error) {
      setStatus('error');
      setMessage(error instanceof Error ? error.message : 'Could not join the waitlist.');
    }
  }

  async function handleFeedback(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!submitted) return;

    const form = new FormData(event.currentTarget);
    const trigger = String(form.get('triggerForTrying') || '').trim();
    if (!trigger) return;

    setFeedbackStatus('submitting');

    try {
      const response = await fetch('https://article6.org/api/scoop-waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          feedbackOnly: true,
          name: submitted.name,
          email: submitted.email,
          persona,
          triggerForTrying: trigger,
          source: 'scoop_site',
          sourcePage: 'homepage',
          campaign: 'founding_100',
        }),
      });
      if (!response.ok) throw new Error('Could not save your answer.');
      setFeedbackStatus('success');
    } catch {
      setFeedbackStatus('error');
    }
  }

  const field =
    'h-13 w-full rounded-2xl border border-white/28 bg-white/[0.08] px-4 text-[0.95rem] font-medium text-white outline-none shadow-[inset_0_1px_0_rgba(255,255,255,0.22)] backdrop-blur-2xl backdrop-saturate-150 transition placeholder:text-white/45 hover:bg-white/[0.11] focus:border-white/60 focus:bg-white/[0.13] focus:ring-4 focus:ring-white/10';

  if (status === 'success') {
    return (
      <div className="grid min-h-[28rem] content-center gap-7">
        <div>
          <div className="text-xs font-bold uppercase tracking-[0.22em] text-white/55">Founding 100</div>
          <h3 className="mt-4 text-4xl font-black tracking-[-0.05em] text-white sm:text-5xl">You’re in.</h3>
          <p className="mt-4 max-w-xl text-base leading-7 text-white/72">
            We’re bringing the first 100 into Scoop in small groups. We’ll be in touch when your spot opens.
          </p>
        </div>

        {feedbackStatus !== 'success' ? (
          <form onSubmit={handleFeedback} className="grid gap-3">
            <label className="grid gap-2 text-left text-sm font-semibold text-white">
              What made you want to try Scoop?
              <textarea
                name="triggerForTrying"
                rows={4}
                placeholder="Optional. One sentence is perfect."
                className="w-full resize-none rounded-2xl border border-white/28 bg-white/[0.08] px-4 py-3 text-[0.95rem] font-medium leading-6 text-white outline-none backdrop-blur-2xl transition placeholder:text-white/45 focus:border-white/60 focus:bg-white/[0.13] focus:ring-4 focus:ring-white/10"
              />
            </label>
            <div className="flex flex-wrap items-center gap-3">
              <button
                type="submit"
                disabled={feedbackStatus === 'submitting'}
                className="inline-flex h-11 items-center justify-center rounded-xl border border-white/30 bg-white/10 px-5 text-sm font-bold text-white transition hover:bg-white/18 disabled:opacity-60"
              >
                {feedbackStatus === 'submitting' ? 'Saving…' : 'Share why →'}
              </button>
              <span className="text-xs text-white/50">Optional</span>
            </div>
            {feedbackStatus === 'error' && (
              <p className="text-sm text-white/70" role="status">Your spot is saved. The optional answer did not save.</p>
            )}
          </form>
        ) : (
          <p className="text-sm font-semibold text-white/75" role="status">Thanks. That helps us build the right thing.</p>
        )}
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mx-auto grid w-full gap-6" noValidate>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="grid gap-2 text-left text-sm font-semibold text-white">
          Name
          <input required name="name" autoComplete="name" placeholder="Your name" className={field} />
        </label>
        <label className="grid gap-2 text-left text-sm font-semibold text-white">
          Email
          <input required type="email" name="email" autoComplete="email" placeholder="you@example.com" className={field} />
        </label>
      </div>

      <fieldset className="grid gap-3">
        <legend className="mb-1 text-left text-sm font-semibold text-white">I’m joining as</legend>
        <div className="grid gap-2 sm:grid-cols-2">
          {personas.map((item) => {
            const active = persona === item.value;
            return (
              <button
                key={item.value}
                type="button"
                aria-pressed={active}
                onClick={() => onPersonaChange(item.value)}
                className={`rounded-2xl border p-4 text-left transition ${
                  active
                    ? 'border-white/70 bg-white text-[#111318] shadow-[0_14px_40px_rgba(6,28,72,0.18)]'
                    : 'border-white/20 bg-white/[0.06] text-white hover:border-white/40 hover:bg-white/[0.10]'
                }`}
              >
                <span className="block text-sm font-extrabold">{item.label}</span>
                <span className={`mt-1 block text-xs leading-5 ${active ? 'text-[#5e6470]' : 'text-white/55'}`}>{item.detail}</span>
              </button>
            );
          })}
        </div>
      </fieldset>

      {persona === 'BRAND_RETAILER' && (
        <label className="grid gap-2 text-left text-sm font-semibold text-white">
          Brand or company <span className="font-normal text-white/50">optional</span>
          <input name="organization" autoComplete="organization" placeholder="Company name" className={field} />
        </label>
      )}

      {showChannelFields && (
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="grid gap-2 text-left text-sm font-semibold text-white">
            Primary platform
            <select
              name="platform"
              value={platform}
              onChange={(event) => setPlatform(event.target.value as CreatorPlatform)}
              className={field}
            >
              <option value="YOUTUBE">YouTube</option>
              <option value="TIKTOK">TikTok</option>
              <option value="INSTAGRAM">Instagram</option>
              <option value="OTHER">Other</option>
            </select>
          </label>
          <label className="grid gap-2 text-left text-sm font-semibold text-white">
            {persona === 'CREATOR' ? 'Channel URL or @handle' : 'Brand channel URL or @handle'}{' '}
            <span className="font-normal text-white/50">optional</span>
            <input
              name="handle"
              placeholder={platform === 'YOUTUBE' ? 'youtube.com/@channel' : '@yourhandle'}
              className={field}
            />
          </label>
        </div>
      )}

      <label className="sr-only" aria-hidden="true">
        Company website
        <input name="companyWebsite" tabIndex={-1} autoComplete="off" />
      </label>

      <button
        type="submit"
        disabled={status === 'submitting'}
        className="mt-1 inline-flex h-14 w-full items-center justify-center rounded-2xl bg-white px-7 text-sm font-extrabold text-[#111318] shadow-[0_16px_48px_rgba(3,27,78,0.24)] transition hover:-translate-y-0.5 hover:shadow-[0_20px_54px_rgba(3,27,78,0.3)] disabled:translate-y-0 disabled:cursor-default disabled:opacity-60 sm:w-auto sm:justify-self-start"
      >
        {status === 'submitting' ? 'Joining…' : 'Join the First 100 →'}
      </button>

      {message && (
        <p className="text-sm text-white" role="status">{message}</p>
      )}

      <p className="text-xs leading-5 text-white/50">
        Private beta. We’ll only use this to contact you about Scoop testing and launch access.
      </p>
    </form>
  );
}
