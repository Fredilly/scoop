'use client';

import { useEffect, useRef, useState } from 'react';

const logo = 'https://assets.scoop.article6.org/brand/scoop-logo.png';
const mark = 'https://assets.scoop.article6.org/extension/scoop-extension-128.png';
const hero = 'https://assets.scoop.article6.org/website/hero/hero-scoop-interactive-master.png';

const steps = [
  ['01', 'SEE', 'Something catches your eye.'],
  ['02', 'POINT', 'Click the thing you actually mean.'],
  ['03', 'SCOOP', 'Get the closest credible matches.'],
  ['04', 'GO', 'Choose where you want to buy it.'],
] as const;

type DemoPhase = 'idle' | 'select' | 'resolve' | 'settled';

export default function Home() {
  const [demoPhase, setDemoPhase] = useState<DemoPhase>('idle');
  const timeouts = useRef<number[]>([]);

  const clearDemoTimers = () => {
    timeouts.current.forEach((timeout) => window.clearTimeout(timeout));
    timeouts.current = [];
  };

  const playDemo = () => {
    clearDemoTimers();
    setDemoPhase('idle');

    timeouts.current.push(
      window.setTimeout(() => setDemoPhase('select'), 80),
      window.setTimeout(() => setDemoPhase('resolve'), 760),
      window.setTimeout(() => setDemoPhase('settled'), 1700)
    );
  };

  useEffect(() => {
    const starter = window.setTimeout(() => setDemoPhase('select'), 550);
    const resolver = window.setTimeout(() => setDemoPhase('resolve'), 1230);
    const settler = window.setTimeout(() => setDemoPhase('settled'), 2170);

    return () => {
      window.clearTimeout(starter);
      window.clearTimeout(resolver);
      window.clearTimeout(settler);
      timeouts.current.forEach((timeout) => window.clearTimeout(timeout));
    };
  }, []);

  const isSelecting = demoPhase === 'select';
  const isResolved = demoPhase === 'resolve' || demoPhase === 'settled';

  return (
    <main className="min-h-screen overflow-x-hidden bg-white text-[#111318]">
      <nav className="mx-auto flex w-full max-w-[1500px] items-center justify-between px-5 py-5 sm:px-6 sm:py-7 md:px-10 lg:px-16">
        <a href="#top" aria-label="Scoop home">
          <img src={logo} alt="Scoop" className="h-8 w-auto md:h-10" />
        </a>
        <div className="flex items-center gap-4 text-xs font-medium sm:gap-5 sm:text-sm md:gap-8">
          <a className="nav-link hidden sm:inline" href="#how">How it works</a>
          <a className="nav-link" href="/privacy">Privacy</a>
          <a className="nav-link hidden sm:inline" href="/providers">Providers</a>
        </div>
      </nav>

      <section id="top" className="mx-auto w-full max-w-[1500px] px-5 pb-24 pt-8 sm:px-6 sm:pb-28 sm:pt-10 md:px-10 lg:min-h-[92vh] lg:px-16 lg:pb-32 lg:pt-14">
        <div className="mx-auto max-w-[1200px] text-center">
          <div className="mb-6 inline-flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#1769FF] sm:mb-8 sm:text-xs sm:tracking-[0.24em]">
            <span className="h-2 w-2 rounded-full bg-[#FF6A1A]" />
            Private alpha
          </div>

          <img src={logo} alt="Scoop" className="mx-auto h-10 w-auto sm:h-11 md:h-12" />

          <p className="mt-5 text-[clamp(2.35rem,7vw,5.5rem)] font-black leading-[0.94] tracking-[-0.06em] text-[#111318] sm:mt-6">
            SEE IT.{' '}
            <span className={`inline-block transition-colors duration-500 ${isResolved ? 'text-[#1769FF]' : 'text-[#111318]'}`}>
              SCOOP IT.
            </span>
          </p>

          <button
            type="button"
            aria-label="Replay the Scoop demo"
            onClick={playDemo}
            className="relative mt-7 block w-full cursor-pointer rounded-[2rem] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1769FF] focus-visible:ring-offset-4 sm:mt-9"
          >
            <img
              src={hero}
              alt="Scoop selecting a jacket in a video and showing purchase matches"
              className={`mx-auto block h-auto w-full drop-shadow-[0_28px_90px_rgba(17,19,24,0.14)] transition-transform duration-700 motion-reduce:transition-none ${isResolved ? 'scale-[1.01]' : 'scale-100'}`}
              loading="eager"
              fetchPriority="high"
            />

            <div
              className={`pointer-events-none absolute left-[21.5%] top-[20%] h-[48%] w-[18.5%] rounded-[1.4rem] transition-all duration-500 ${isSelecting || isResolved ? 'scale-100 opacity-100' : 'scale-[0.96] opacity-0'} ${isResolved ? 'bg-[#1769FF]/8' : 'bg-transparent'}`}
              aria-hidden="true"
            >
              <span className="absolute left-0 top-0 h-5 w-5 border-l-[3px] border-t-[3px] border-[#1769FF] sm:h-6 sm:w-6" />
              <span className="absolute right-0 top-0 h-5 w-5 border-r-[3px] border-t-[3px] border-[#1769FF] sm:h-6 sm:w-6" />
              <span className="absolute bottom-0 left-0 h-5 w-5 border-b-[3px] border-l-[3px] border-[#1769FF] sm:h-6 sm:w-6" />
              <span className="absolute bottom-0 right-0 h-5 w-5 border-b-[3px] border-r-[3px] border-[#1769FF] sm:h-6 sm:w-6" />
            </div>

            <div
              className={`pointer-events-none absolute left-[62.5%] top-[28%] h-[45%] w-[25.5%] rounded-[1.6rem] transition-all duration-500 ${isResolved ? 'scale-100 opacity-100 shadow-[0_0_0_1px_rgba(23,105,255,0.18),0_0_36px_rgba(23,105,255,0.2)]' : 'translate-y-2 opacity-0'}`}
              aria-hidden="true"
            />

            <div
              className={`pointer-events-none absolute left-[33%] top-[59%] flex h-9 w-9 items-center justify-center rounded-full border border-[#111318]/12 bg-white/95 shadow-[0_10px_30px_rgba(17,19,24,0.18)] transition-all duration-500 sm:h-11 sm:w-11 ${isSelecting || isResolved ? 'translate-x-0 translate-y-0 opacity-100' : 'translate-x-8 translate-y-6 opacity-0'}`}
              aria-hidden="true"
            >
              <span className="block h-3 w-3 rounded-full bg-[#1769FF] sm:h-3.5 sm:w-3.5" />
            </div>
          </button>

          <div className="mt-5 flex flex-wrap items-center justify-center gap-2.5 text-[10px] font-semibold uppercase tracking-[0.16em] sm:mt-6 sm:text-xs">
            <span className={`rounded-full border px-3 py-2 transition-all duration-300 ${isSelecting || isResolved ? 'border-[#1769FF]/25 bg-[#1769FF]/8 text-[#1769FF]' : 'border-[#dfe1e5] text-[#80848d]'}`}>
              click the item
            </span>
            <span className={`rounded-full border px-3 py-2 transition-all duration-300 ${isResolved ? 'border-[#1769FF]/25 bg-[#1769FF]/8 text-[#1769FF]' : 'border-[#dfe1e5] text-[#80848d]'}`}>
              exact • likely • similar
            </span>
            <span className="rounded-full border border-[#dfe1e5] px-3 py-2 text-[#80848d]">tap to replay</span>
          </div>

          <p className="mx-auto mt-8 max-w-[44rem] text-lg leading-[1.6] text-[#565a63] sm:mt-10 sm:text-xl md:text-[1.45rem] md:leading-[1.6]">
            See something you want in a video? Point at it. Scoop helps identify the product and where to get it.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:mt-10 sm:flex-row sm:flex-wrap sm:gap-5">
            <a href="mailto:contact@article6.org?subject=Scoop%20alpha" className="inline-flex w-full items-center justify-center bg-[#111318] px-6 py-4 text-sm font-semibold text-white transition hover:bg-[#1769FF] sm:w-auto sm:px-7">Join the alpha</a>
            <a href="#how" className="nav-link text-sm font-semibold">See how it works ↓</a>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-[1500px] px-5 py-24 sm:px-6 md:px-10 lg:px-16 lg:py-40">
        <p className="max-w-[1250px] text-[clamp(3rem,10vw,8rem)] font-black leading-[0.9] tracking-[-0.065em]">
          Don&apos;t screenshot it.<br />
          Don&apos;t hunt through comments.<br />
          <span className="text-[#1769FF]">Scoop it.</span>
        </p>
      </section>

      <section id="how" className="mx-auto w-full max-w-[1500px] px-5 py-24 sm:px-6 md:px-10 lg:px-16 lg:py-40">
        <div className="mb-12 flex items-end justify-between gap-8 border-b border-[#dfe1e5] pb-7 sm:mb-16">
          <h2 className="text-4xl font-black tracking-[-0.045em] md:text-6xl">How it works</h2>
          <span className="hidden text-xs uppercase tracking-[0.22em] text-[#7a7e87] md:block">See → Point → Scoop → Go</span>
        </div>
        <div>
          {steps.map(([n, title, body]) => (
            <div key={n} className="grid gap-4 border-b border-[#dfe1e5] py-8 sm:gap-5 md:grid-cols-[120px_1fr_1fr] md:items-baseline lg:py-12">
              <span className="text-sm font-semibold text-[#1769FF]">{n}</span>
              <h3 className="text-4xl font-black tracking-[-0.04em] md:text-6xl">{title}</h3>
              <p className="max-w-md text-lg leading-7 text-[#62666f]">{body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto grid w-full max-w-[1500px] gap-12 px-5 py-24 sm:px-6 md:px-10 lg:grid-cols-2 lg:px-16 lg:py-40">
        <div>
          <div className="text-xs font-semibold uppercase tracking-[0.22em] text-[#1769FF]">Trust is the product</div>
          <h2 className="mt-7 max-w-xl text-5xl font-black leading-[0.95] tracking-[-0.05em] md:text-7xl">Similar isn&apos;t exact.</h2>
        </div>
        <div className="max-w-xl self-end text-xl leading-8 text-[#5b5f67]">
          <p>Scoop separates Exact, Likely and Similar results instead of pretending every match is the original item.</p>
          <p className="mt-6 font-semibold text-[#111318]">Sponsored never means exact.</p>
        </div>
      </section>

      <section className="mx-auto w-full max-w-[1500px] px-5 py-24 sm:px-6 md:px-10 lg:px-16 lg:py-40">
        <div className="grid gap-12 border-y border-[#dfe1e5] py-12 lg:grid-cols-[1.1fr_.9fr] lg:py-20">
          <h2 className="max-w-3xl text-5xl font-black leading-[0.96] tracking-[-0.05em] md:text-7xl">A screenshot sees one frame.</h2>
          <div className="max-w-xl self-end text-lg leading-8 text-[#62666f]">
            <p>Scoop can use the moment around it when nearby frames are permitted and materially improve identification.</p>
            <p className="mt-6">Supported YouTube and ordinary non-protected HTML5 video come first. Protected or DRM-restricted playback is not currently supported.</p>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-[1500px] px-5 pb-10 pt-24 sm:px-6 md:px-10 lg:px-16 lg:pt-40">
        <div className="grid gap-10 bg-[#1769FF] px-6 py-10 text-white sm:px-7 sm:py-12 md:px-12 md:py-16 lg:grid-cols-[1.2fr_.8fr] lg:px-16 lg:py-20">
          <div>
            <div className="text-xs font-semibold uppercase tracking-[0.22em] text-white/70">Private alpha</div>
            <h2 className="mt-5 max-w-3xl text-5xl font-black leading-[0.92] tracking-[-0.055em] md:text-7xl">Want to Scoop something?</h2>
          </div>
          <div className="self-end">
            <p className="max-w-lg text-lg leading-8 text-white/85">Scoop is still being built. Early testers will help us find what works, what misses, and what deserves to exist.</p>
            <a href="mailto:contact@article6.org?subject=Scoop%20alpha" className="mt-8 inline-flex w-full items-center justify-center bg-white px-6 py-4 text-sm font-bold text-[#111318] transition hover:bg-[#111318] hover:text-white sm:w-auto sm:py-3.5">Join the alpha</a>
          </div>
        </div>
      </section>

      <footer className="mx-auto w-full max-w-[1500px] px-5 pb-12 pt-14 sm:px-6 md:px-10 lg:px-16">
        <div className="grid gap-10 border-t border-[#dfe1e5] pt-8 md:grid-cols-[1fr_auto] md:items-start">
          <div>
            <img src={mark} alt="" className="mb-5 h-10 w-10" />
            <p className="max-w-3xl text-xs leading-5 text-[#737780]">The term &apos;Etsy&apos; is a trademark of Etsy, Inc. This application uses the Etsy API but is not endorsed or certified by Etsy, Inc.</p>
            <p className="mt-4 text-xs text-[#9a9da4]">Scoop is a product of Article6.</p>
          </div>
          <div className="flex flex-wrap gap-x-6 gap-y-3 text-sm font-medium">
            <a className="nav-link" href="/privacy">Privacy</a>
            <a className="nav-link" href="/providers">Providers</a>
            <a className="nav-link" href="https://article6.org">Article6</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
