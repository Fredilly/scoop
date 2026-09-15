'use client';

import { useEffect, useRef, useState } from 'react';

const logo = 'https://assets.scoop.article6.org/brand/scoop-logo.png';
const mark = 'https://assets.scoop.article6.org/extension/scoop-extension-128.png';
const heroClean = 'https://assets.scoop.article6.org/website/hero/hero-clean-tv.png';
const heroSelected = 'https://assets.scoop.article6.org/website/hero/hero-selected-tv.png';
const heroPanel = 'https://assets.scoop.article6.org/website/hero/hero-results-panel.png';

const steps = [
  ['01', 'SEE', 'Spot something you actually want in the video.'],
  ['02', 'POINT', 'Click the item itself, not a vague category.'],
  ['03', 'SCOOP', 'Get Exact, Likely, and Similar results clearly separated.'],
  ['04', 'GO', 'Choose where you want to buy it.'],
] as const;

type DemoPhase = 'idle' | 'selected' | 'resolved';

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
      window.setTimeout(() => setDemoPhase('selected'), 650),
      window.setTimeout(() => setDemoPhase('resolved'), 1450)
    );
  };

  useEffect(() => {
    const starter = window.setTimeout(() => {
      playDemo();
    }, 450);

    return () => {
      window.clearTimeout(starter);
      clearDemoTimers();
    };
  }, []);

  const showSelection = demoPhase === 'selected' || demoPhase === 'resolved';
  const showPanel = demoPhase === 'resolved';

  return (
    <main className="min-h-screen overflow-x-hidden bg-white text-[#111318]">
      <nav className="mx-auto flex w-full max-w-[1500px] items-center justify-between px-5 py-5 sm:px-6 sm:py-7 md:px-10 lg:px-16">
        <a href="#top" aria-label="Scoop home">
          <img src={logo} alt="Scoop" className="h-8 w-auto md:h-10" />
        </a>
        <div className="flex items-center gap-4 text-xs font-medium sm:gap-5 sm:text-sm md:gap-8">
          <a className="nav-link hidden sm:inline" href="#how">
            How it works
          </a>
          <a className="nav-link" href="/privacy">
            Privacy
          </a>
          <a className="nav-link hidden sm:inline" href="/providers">
            Providers
          </a>
        </div>
      </nav>

      <section
        id="top"
        className="mx-auto w-full max-w-[1500px] px-5 pb-24 pt-10 sm:px-6 sm:pb-28 sm:pt-12 md:px-10 lg:min-h-[92vh] lg:px-16 lg:pb-32 lg:pt-14"
      >
        <div className="mx-auto max-w-[1260px] text-center">
          <div className="mb-6 inline-flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#1769FF] sm:mb-8 sm:text-xs sm:tracking-[0.24em]">
            <span className="h-2 w-2 rounded-full bg-[#FF6A1A]" />
            Private alpha
          </div>

          <img src={logo} alt="Scoop" className="mx-auto h-10 w-auto sm:h-11 md:h-12" />

          <h1 className="mt-6 text-[clamp(2.6rem,7vw,5.75rem)] font-black leading-[0.9] tracking-[-0.065em] text-[#111318]">
            SEE IT.{' '}
            <span className={`transition-colors duration-500 ${showPanel ? 'text-[#1769FF]' : 'text-[#111318]'}`}>
              SCOOP IT.
            </span>
          </h1>

          <p className="mx-auto mt-5 max-w-3xl text-base leading-7 text-[#686d76] sm:text-lg">
            A tiny demo. Watch the jacket get selected, then the results appear. Tap the hero to replay.
          </p>

          <button
            type="button"
            aria-label="Replay Scoop hero demo"
            onClick={playDemo}
            className="mt-10 block w-full cursor-pointer rounded-[2rem] bg-transparent text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1769FF] focus-visible:ring-offset-4"
          >
            <div className="mx-auto w-full max-w-[1180px]">
              <div className="relative isolate">
                <img
                  src={heroClean}
                  alt="TV showing a woman in a denim jacket inside a living room"
                  className="mx-auto block h-auto w-full drop-shadow-[0_28px_90px_rgba(17,19,24,0.08)]"
                  loading="eager"
                  fetchPriority="high"
                />
                <img
                  src={heroSelected}
                  alt=""
                  aria-hidden="true"
                  className={`pointer-events-none absolute inset-0 block h-full w-full transition-opacity duration-700 ${
                    showSelection ? 'opacity-100' : 'opacity-0'
                  }`}
                />
                <img
                  src={heroPanel}
                  alt=""
                  aria-hidden="true"
                  className={`pointer-events-none absolute right-[-1%] top-[14%] hidden h-auto w-[37%] max-w-[430px] transition-all duration-700 md:block ${
                    showPanel ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0'
                  }`}
                />
              </div>

              <div className="md:hidden">
                <img
                  src={heroPanel}
                  alt=""
                  aria-hidden="true"
                  className={`mx-auto mt-4 h-auto w-[84%] max-w-[420px] transition-all duration-700 ${
                    showPanel ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                  }`}
                />
              </div>
            </div>
          </button>

          <p className="mx-auto mt-8 max-w-[46rem] text-lg leading-[1.6] text-[#565a63] sm:mt-10 sm:text-xl md:text-[1.45rem] md:leading-[1.6]">
            See something you want in a video? Point at it. Scoop helps identify the product and where to get it.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:mt-10 sm:flex-row sm:flex-wrap sm:gap-5">
            <a
              href="mailto:contact@article6.org?subject=Scoop%20alpha"
              className="inline-flex w-full items-center justify-center bg-[#111318] px-6 py-4 text-sm font-semibold text-white transition hover:bg-[#1769FF] sm:w-auto sm:px-7"
            >
              Join the alpha
            </a>
            <a href="#how" className="nav-link text-sm font-semibold">
              See how it works ↓
            </a>
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
            <div
              key={n}
              className="grid gap-4 border-b border-[#dfe1e5] py-8 sm:gap-5 md:grid-cols-[120px_1fr_1fr] md:items-baseline lg:py-12"
            >
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
            <p className="mt-6">
              Supported YouTube and ordinary non-protected HTML5 video come first. Protected or DRM-restricted playback is not currently supported.
            </p>
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
            <p className="max-w-lg text-lg leading-8 text-white/85">
              Scoop is still being built. Early testers will help us find what works, what misses, and what deserves to exist.
            </p>
            <a
              href="mailto:contact@article6.org?subject=Scoop%20alpha"
              className="mt-8 inline-flex w-full items-center justify-center bg-white px-6 py-4 text-sm font-bold text-[#111318] transition hover:bg-[#111318] hover:text-white sm:w-auto sm:py-3.5"
            >
              Join the alpha
            </a>
          </div>
        </div>
      </section>

      <footer className="mx-auto w-full max-w-[1500px] px-5 pb-12 pt-14 sm:px-6 md:px-10 lg:px-16">
        <div className="grid gap-10 border-t border-[#dfe1e5] pt-8 md:grid-cols-[1fr_auto] md:items-start">
          <div>
            <img src={mark} alt="" className="mb-5 h-10 w-10" />
            <p className="max-w-3xl text-xs leading-5 text-[#737780]">
              The term &apos;Etsy&apos; is a trademark of Etsy, Inc. This application uses the Etsy API but is not endorsed or certified by Etsy, Inc.
            </p>
            <p className="mt-4 text-xs text-[#9a9da4]">Scoop is a product of Article6.</p>
          </div>
          <div className="flex flex-wrap gap-x-6 gap-y-3 text-sm font-medium">
            <a className="nav-link" href="/privacy">
              Privacy
            </a>
            <a className="nav-link" href="/providers">
              Providers
            </a>
            <a className="nav-link" href="https://article6.org">
              Article6
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
