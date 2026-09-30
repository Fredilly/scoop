'use client';

import { useEffect, useState } from 'react';

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
  const [platform, setPlatform] = useState<CreatorPlatform>('YOUTUBE');

  const showChannelFields = persona === 'CREATOR' || persona === 'BRAND_RETAILER';

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('joined') === '1') setStatus('success');
    else if (params.get('join_error') === '1') setStatus('error');
  }, []);

  useEffect(() => {
    if (status !== 'success') return;
    const timer = window.setTimeout(() => {
      document.getElementById('founding-success')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 80);
    return () => window.clearTimeout(timer);
  }, [status]);

  const field =
    'h-12 w-full rounded-[1.15rem] border border-white/70 bg-white/44 px-4 text-[0.95rem] font-medium text-[#111318] outline-none shadow-[inset_0_1px_0_rgba(255,255,255,0.98),0_8px_24px_rgba(32,83,164,0.06)] backdrop-blur-2xl backdrop-saturate-150 transition placeholder:text-[#7d8796] hover:bg-white/56 focus:border-[#1769FF]/45 focus:bg-white/62 focus:ring-4 focus:ring-[#1769FF]/10';

  if (status === 'success') {
    return (
      <div id="founding-success" className="relative grid min-h-[32rem] scroll-mt-24 content-center overflow-hidden">
        <div className="founding-confetti" aria-hidden="true">
          {Array.from({ length: 18 }, (_, index) => (
            <span
              key={index}
              className="founding-confetti-piece"
              style={{
                left: `${6 + ((index * 37) % 88)}%`,
                animationDelay: `${(index % 6) * 90}ms`,
                animationDuration: `${950 + (index % 5) * 110}ms`,
              }}
            />
          ))}
        </div>
        <div className="relative z-10 rounded-[2rem] border border-[#1769FF]/20 bg-white/66 p-7 shadow-[0_28px_80px_rgba(23,105,255,0.16)] backdrop-blur-2xl sm:p-10">
          <div className="inline-flex rounded-full bg-[#1769FF] px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-white">
            Founding 100 confirmed
          </div>
          <h3 className="mt-6 text-5xl font-black leading-[0.92] tracking-[-0.065em] text-[#111318] sm:text-7xl">
            You’re in.
          </h3>
          <p className="mt-6 max-w-xl text-lg font-semibold leading-8 text-[#303846] sm:text-xl">
            Your application is confirmed.
          </p>
          <p className="mt-3 max-w-xl text-base leading-7 text-[#5f6b7a]">
            Check your inbox for confirmation. We’re opening Scoop in small groups. If your spot opens, you’ll get a separate personal invite with the install link.
          </p>
          <div className="mt-7 border-t border-[#1769FF]/15 pt-5 text-sm font-bold text-[#1769FF]">
            See it. Scoop it.
          </div>
        </div>
      </div>
    );
  }

  return (
    <form
      action="https://article6.org/api/scoop-waitlist"
      method="post"
      acceptCharset="UTF-8"
      onSubmit={() => setStatus('submitting')}
      className="mx-auto grid w-full gap-4"
    >
      <input type="hidden" name="persona" value={persona} />
      <input type="hidden" name="source" value="scoop_site" />
      <input type="hidden" name="sourcePage" value="homepage" />
      <input type="hidden" name="campaign" value="founding_100" />
      {!showChannelFields && <input type="hidden" name="platform" value="" />}

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

      <fieldset className="grid gap-3">
        <legend className="mb-1 text-left text-sm font-semibold text-[#111318]">I’m joining as</legend>
        <div className="grid gap-2 sm:grid-cols-2">
          {personas.map((item) => {
            const active = persona === item.value;
            return (
              <button
                key={item.value}
                type="button"
                aria-pressed={active}
                onClick={() => onPersonaChange(item.value)}
                className={`rounded-2xl border p-3.5 text-left transition ${
                  active
                    ? 'border-[#1769FF]/55 bg-white/72 text-[#111318] shadow-[inset_0_1px_0_rgba(255,255,255,1),0_12px_30px_rgba(23,105,255,0.10)]'
                    : 'border-white/65 bg-white/32 text-[#111318] shadow-[inset_0_1px_0_rgba(255,255,255,0.88)] hover:border-[#1769FF]/28 hover:bg-white/52'
                }`}
              >
                <span className="block text-sm font-extrabold">{item.label}</span>
                <span className={`mt-1 block text-xs leading-5 ${active ? 'text-[#5e6470]' : 'text-[#718096]'}`}>{item.detail}</span>
              </button>
            );
          })}
        </div>
      </fieldset>

      {persona === 'BRAND_RETAILER' && (
        <label className="grid gap-2 text-left text-sm font-semibold text-[#111318]">
          Brand or company <span className="font-normal text-[#7d8796]">optional</span>
          <input name="organization" autoComplete="organization" placeholder="Company name" className={field} />
        </label>
      )}

      {showChannelFields && (
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="grid gap-2 text-left text-sm font-semibold text-[#111318]">
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
          <label className="grid gap-2 text-left text-sm font-semibold text-[#111318]">
            {persona === 'CREATOR' ? 'Channel URL or @handle' : 'Brand channel URL or @handle'}{' '}
            <span className="font-normal text-[#7d8796]">optional</span>
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
        className="mt-1 inline-flex h-12 w-full items-center justify-center rounded-[1.15rem] bg-[#1769FF] px-7 text-sm font-extrabold text-white shadow-[0_16px_38px_rgba(23,105,255,0.22)] transition hover:-translate-y-0.5 hover:bg-[#0f5fe9] hover:shadow-[0_20px_46px_rgba(23,105,255,0.28)] disabled:translate-y-0 disabled:cursor-default disabled:opacity-60 sm:w-auto sm:justify-self-start"
      >
        {status === 'submitting' ? 'Joining…' : 'Join the First 100 →'}
      </button>

      {status === 'error' && (
        <p className="text-sm text-red-600" role="status">Could not join the waitlist. Please try again.</p>
      )}

      <p className="text-xs leading-5 text-[#7d8796]">
        Private beta. We’ll only use this to contact you about Scoop testing and launch access.
      </p>
    </form>
  );
}
