'use client';

import { FormEvent, useState } from 'react';

export type WaitlistPersona = 'CREATOR' | 'SHOPPER' | 'BRAND_RETAILER' | 'OTHER';

type WaitlistFormProps = {
  persona: WaitlistPersona;
  onPersonaChange: (persona: WaitlistPersona) => void;
};

export default function WaitlistForm({ persona, onPersonaChange }: WaitlistFormProps) {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    setStatus('submitting');
    setMessage('');

    const payload = {
      name: String(form.get('name') || ''),
      email: String(form.get('email') || ''),
      persona,
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
    } catch (error) {
      setStatus('error');
      setMessage(error instanceof Error ? error.message : 'Could not join the waitlist.');
    }
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-4" noValidate>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="grid gap-2 text-left text-sm font-semibold">
          Name
          <input
            required
            name="name"
            autoComplete="name"
            className="h-12 rounded-xl border border-[#dfe1e5] bg-white px-4 font-normal outline-none transition focus:border-[#1769FF] focus:ring-2 focus:ring-[#1769FF]/10"
          />
        </label>
        <label className="grid gap-2 text-left text-sm font-semibold">
          Email
          <input
            required
            type="email"
            name="email"
            autoComplete="email"
            className="h-12 rounded-xl border border-[#dfe1e5] bg-white px-4 font-normal outline-none transition focus:border-[#1769FF] focus:ring-2 focus:ring-[#1769FF]/10"
          />
        </label>
      </div>

      <label className="grid gap-2 text-left text-sm font-semibold">
        I&apos;m joining as
        <select
          value={persona}
          onChange={(event) => onPersonaChange(event.target.value as WaitlistPersona)}
          className="h-12 rounded-xl border border-[#dfe1e5] bg-white px-4 font-normal outline-none transition focus:border-[#1769FF] focus:ring-2 focus:ring-[#1769FF]/10"
        >
          <option value="CREATOR">Creator / Influencer</option>
          <option value="SHOPPER">Shopper</option>
          <option value="BRAND_RETAILER">Brand / Retailer</option>
          <option value="OTHER">Other</option>
        </select>
      </label>

      {persona === 'CREATOR' && (
        <label className="grid gap-2 text-left text-sm font-semibold">
          Main channel or handle <span className="font-normal text-[#7a7e87]">optional</span>
          <input
            name="handle"
            placeholder="@yourhandle"
            className="h-12 rounded-xl border border-[#dfe1e5] bg-white px-4 font-normal outline-none transition placeholder:text-[#a1a4aa] focus:border-[#1769FF] focus:ring-2 focus:ring-[#1769FF]/10"
          />
        </label>
      )}

      {persona === 'BRAND_RETAILER' && (
        <label className="grid gap-2 text-left text-sm font-semibold">
          Brand or company <span className="font-normal text-[#7a7e87]">optional</span>
          <input
            name="organization"
            autoComplete="organization"
            className="h-12 rounded-xl border border-[#dfe1e5] bg-white px-4 font-normal outline-none transition focus:border-[#1769FF] focus:ring-2 focus:ring-[#1769FF]/10"
          />
        </label>
      )}

      <label className="sr-only" aria-hidden="true">
        Company website
        <input name="companyWebsite" tabIndex={-1} autoComplete="off" />
      </label>

      <button
        type="submit"
        disabled={status === 'submitting' || status === 'success'}
        className="mt-2 inline-flex h-12 items-center justify-center rounded-xl bg-[#1769FF] px-6 text-sm font-bold text-white transition hover:bg-[#111318] disabled:cursor-default disabled:opacity-60"
      >
        {status === 'submitting' ? 'Joining…' : status === 'success' ? 'Joined' : 'Join the waitlist'}
      </button>

      {message && (
        <p className={`text-sm ${status === 'error' ? 'text-red-600' : 'text-[#1769FF]'}`} role="status">
          {message}
        </p>
      )}

      <p className="text-xs leading-5 text-[#858991]">
        We&apos;ll only use this to contact you about Scoop testing and launch access.
      </p>
    </form>
  );
}
