'use client';

import { useState, type FormEvent } from 'react';

export type WaitlistPersona = 'CREATOR' | 'SHOPPER' | 'BRAND_RETAILER' | 'OTHER';
export type CreatorPlatform = 'YOUTUBE' | 'TIKTOK' | 'INSTAGRAM' | 'OTHER';

type WaitlistFormProps = {
  persona: WaitlistPersona;
  onPersonaChange: (persona: WaitlistPersona) => void;
};

export default function WaitlistForm({ persona, onPersonaChange }: WaitlistFormProps) {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');
  const [platform, setPlatform] = useState<CreatorPlatform>('YOUTUBE');

  const showChannelFields = persona === 'CREATOR' || persona === 'BRAND_RETAILER';

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    setStatus('submitting');
    setMessage('');

    const payload = {
      name: String(form.get('name') || ''),
      email: String(form.get('email') || ''),
      persona,
      platform: showChannelFields ? platform : '',
      handle: String(form.get('handle') || ''),
      organization: String(form.get('organization') || ''),
      companyWebsite: String(form.get('companyWebsite') || ''),
      source: 'scoop_site',
      sourcePage: 'homepage',
      campaign: 'alpha_waitlist',
    };

    try {
      const response = await fetch('https://article6.org/api/scoop-waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(data?.error || 'Could not join the waitlist.');

      setStatus('success');
      setMessage("You're on the list.");
      event.currentTarget.reset();
      setPlatform('YOUTUBE');
    } catch (error) {
      setStatus('error');
      setMessage(error instanceof Error ? error.message : 'Could not join the waitlist.');
    }
  }

  const glassField =
    'h-12 w-full rounded-2xl border border-white/45 bg-white/10 px-4 font-normal text-[#111318] outline-none shadow-[inset_0_1px_0_rgba(255,255,255,0.55),0_10px_30px_rgba(43,69,112,0.04)] backdrop-blur-2xl backdrop-saturate-150 transition focus:border-[#1769FF]/55 focus:bg-white/18 focus:ring-4 focus:ring-[#1769FF]/10';

  return (
    <form onSubmit={handleSubmit} className="mx-auto grid w-full max-w-md gap-4 sm:max-w-none" noValidate>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="grid gap-2 text-left text-sm font-semibold">
          Name
          <input required name="name" autoComplete="name" className={glassField} />
        </label>
        <label className="grid gap-2 text-left text-sm font-semibold">
          Email
          <input required type="email" name="email" autoComplete="email" className={glassField} />
        </label>
      </div>

      <label className="grid gap-2 text-left text-sm font-semibold">
        I&apos;m joining as
        <select
          value={persona}
          onChange={(event) => onPersonaChange(event.target.value as WaitlistPersona)}
          className={glassField}
        >
          <option value="CREATOR">Creator / Influencer</option>
          <option value="SHOPPER">Shopper</option>
          <option value="BRAND_RETAILER">Brand / Retailer</option>
          <option value="OTHER">Other</option>
        </select>
      </label>

      {persona === 'BRAND_RETAILER' && (
        <label className="grid gap-2 text-left text-sm font-semibold">
          Brand or company <span className="font-normal text-[#7a7e87]">optional</span>
          <input name="organization" autoComplete="organization" className={glassField} />
        </label>
      )}

      {showChannelFields && (
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="grid gap-2 text-left text-sm font-semibold">
            Primary platform
            <select
              name="platform"
              value={platform}
              onChange={(event) => setPlatform(event.target.value as CreatorPlatform)}
              className={glassField}
            >
              <option value="YOUTUBE">YouTube</option>
              <option value="TIKTOK">TikTok</option>
              <option value="INSTAGRAM">Instagram</option>
              <option value="OTHER">Other</option>
            </select>
          </label>
          <label className="grid gap-2 text-left text-sm font-semibold">
            {persona === 'CREATOR' ? 'Channel URL or @handle' : 'Brand channel URL or @handle'}{' '}
            <span className="font-normal text-[#7a7e87]">optional</span>
            <input
              name="handle"
              placeholder={platform === 'YOUTUBE' ? 'youtube.com/@channel or @channel' : '@yourhandle'}
              className={`${glassField} placeholder:text-[#8d929b]`}
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
        disabled={status === 'submitting' || status === 'success'}
        className="mt-2 inline-flex h-12 w-full items-center justify-center rounded-2xl bg-[#1769FF] px-6 text-sm font-bold text-white shadow-[0_12px_34px_rgba(23,105,255,0.28)] transition hover:bg-[#111318] disabled:cursor-default disabled:opacity-60 sm:w-auto sm:justify-self-start"
      >
        {status === 'submitting' ? 'Joining…' : status === 'success' ? 'Joined' : 'Join the waitlist'}
      </button>

      {message && (
        <p className={`text-center text-sm sm:text-left ${status === 'error' ? 'text-red-600' : 'text-[#1769FF]'}`} role="status">
          {message}
        </p>
      )}

      <p className="text-center text-xs leading-5 text-[#737780] sm:text-left">
        We&apos;ll only use this to contact you about Scoop testing and launch access.
      </p>
    </form>
  );
}
