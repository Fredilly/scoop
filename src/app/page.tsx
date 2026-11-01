'use client';

import { useEffect, useRef, useState } from 'react';
import WaitlistForm, { type WaitlistPersona } from './components/WaitlistForm';

const logo = 'https://assets.scoop.article6.org/brand/scoop-logo.png';
const mark = 'https://assets.scoop.article6.org/extension/scoop-extension-128.png';
const heroClean = 'https://assets.scoop.article6.org/website/hero/hero-clean-tv.png';
const heroSelectedJacket = 'https://assets.scoop.article6.org/website/hero/hero-selected-tv.png';
const heroPanelJacket = 'https://assets.scoop.article6.org/website/hero/hero-results-panel.png';
const heroSelectedPants = 'https://assets.scoop.article6.org/website/hero/hero-pants-selected-tv.png';
const heroPanelPants = 'https://assets.scoop.article6.org/website/hero/hero-pants-results-panel.png';
const heroSelectedVase = 'https://assets.scoop.article6.org/website/hero/hero-vase-selected-tv.png';
const heroPanelVase = 'https://assets.scoop.article6.org/website/hero/hero-vase-results-panel.png?v=3';
const foundingFocus = 'https://assets.scoop.article6.org/website/founding-100/sneaker-jacket-focus.png';

const steps = [
  ['01', 'See', 'Spot something you actually want in the video.'],
  ['02', 'Point', 'Click the specific item, not the whole scene.'],
  ['03', 'Scoop', 'Get Exact, Likely, and Similar results clearly separated.'],
  ['04', 'Go', 'Choose where you want to buy it.'],
] as const;

const matchLevels = [
  ['Exact', 'The product shown, identified with confidence.', 'bg-[#1769FF]'],
  ['Likely', 'Probably the product, but not confirmed.', 'border-2 border-[#1769FF] bg-white'],
  ['Similar', 'A close alternative, never passed off as the original.', 'border-2 border-[#b9bfc8] bg-white'],
] as const;

type DemoPhase = 'idle' | 'selected' | 'resolved';
type HeroItem = 'jacket' | 'pants' | 'vase';

export default function Home() {
  const [demoPhase, setDemoPhase] = useState<DemoPhase>('idle');
  const [activeItem, setActiveItem] = useState<HeroItem>('jacket');
  const [waitlistPersona, setWaitlistPersona] = useState<WaitlistPersona>('CREATOR');
  const timeouts = useRef<number[]>([]);

  const clearDemoTimers = () => {
    timeouts.current.forEach((timeout) => window.clearTimeout(timeout));
    timeouts.current = [];
  };

  const playDemo = (item: HeroItem) => {
    clearDemoTimers();
    setActiveItem(item);
    setDemoPhase('idle');
    timeouts.current.push(
      window.setTimeout(() => setDemoPhase('selected'), 120),
      window.setTimeout(() => setDemoPhase('resolved'), 820),
    );
  };

  useEffect(() => {
    const media = window.matchMedia('(max-width: 767px)');
    const items: HeroItem[] = ['jacket', 'pants', 'vase'];
    let index = 0;
    let starter: number | undefined;
    let cycleTimer: number | undefined;

    const stopCycle = () => {
      if (starter !== undefined) window.clearTimeout(starter);
      if (cycleTimer !== undefined) window.clearInterval(cycleTimer);
      starter = undefined;
      cycleTimer = undefined;
    };

    const startCycle = () => {
      stopCycle();
      if (!media.matches) return;

      index = 0;
      starter = window.setTimeout(() => {
        playDemo(items[index]);
        index = (index + 1) % items.length;
        cycleTimer = window.setInterval(() => {
          playDemo(items[index]);
          index = (index + 1) % items.length;
        }, 3400);
      }, 350);
    };

    startCycle();
    media.addEventListener('change', startCycle);

    return () => {
      media.removeEventListener('change', startCycle);
      stopCycle();
      clearDemoTimers();
    };
  }, []);

  const showSelection = demoPhase === 'selected' || demoPhase === 'resolved';
  const showPanel = demoPhase === 'resolved';
  const selectedHero = activeItem === 'jacket' ? heroSelectedJacket : activeItem === 'pants' ? heroSelectedPants : heroSelectedVase;
  const selectedPanel = activeItem === 'jacket' ? heroPanelJacket : activeItem === 'pants' ? heroPanelPants : heroPanelVase;
  const mobilePanelStyle = activeItem === 'pants'
    ? { top: '3%', right: '2%', width: '34%', maxWidth: '180px' }
    : activeItem === 'jacket'
      ? { bottom: '2%', right: '2%', width: '34%', maxWidth: '180px' }
      : { top: '18%', right: '2%', width: '34%', maxWidth: '180px' };

  return (
    <main className="min-h-screen overflow-x-hidden bg-white text-[#111318]">
      <header className="mx-auto flex w-full max-w-[1280px] items-center justify-between px-5 py-5 sm:px-8 md:py-6 lg:px-12">
        <a href="#top" aria-label="Scoop home"><img src={logo} alt="Scoop" className="h-8 w-auto md:h-9" /></a>
        <nav aria-label="Main" className="flex items-center gap-5 text-sm font-medium text-[#62666f] sm:gap-7">
          <a className="nav-link hidden sm:inline" href="#how">How it works</a>
          <a className="nav-link" href="/privacy">Privacy</a>
          <a className="nav-link hidden sm:inline" href="/providers">Providers</a>
          <a href="#waitlist" onClick={() => setWaitlistPersona('SHOPPER')} style={{ color: '#ffffff' }} className="inline-flex h-10 items-center rounded-[10px] bg-[#111318] px-4 text-sm font-semibold transition hover:bg-[#1769FF]">Join the First 100</a>
        </nav>
      </header>

      <section id="top" className="mx-auto w-full max-w-[1280px] px-5 pb-20 pt-8 sm:px-8 sm:pt-12 lg:px-12 lg:pb-28 lg:pt-16">
        <div className="mx-auto max-w-[1180px] text-center">
          <h1 className="text-[clamp(2.75rem,7vw,5.5rem)] font-semibold leading-[0.95] tracking-[-0.045em] text-[#111318]">
            See it. <span className={`text-[#1769FF] sm:transition-colors sm:duration-500 ${showPanel ? 'sm:text-[#1769FF]' : 'sm:text-[#111318]'}`}>Scoop it.</span>
          </h1>
          <p className="mx-auto mt-5 max-w-3xl text-base leading-7 text-[#62666f] sm:text-lg"><span className="sm:hidden">Watch Scoop cycle through the jacket, pants, and vase.</span><span className="hidden sm:inline">Hover or tap the jacket, pants, or vase to see item-specific results.</span></p>

          <div className="mt-10">
            <div className="mx-auto w-full max-w-[1180px]">
              <div className="relative isolate mx-auto w-full">
                <img src={heroClean} alt="TV showing a woman in a denim jacket and cream pants inside a living room" className="mx-auto block h-auto w-full drop-shadow-[0_28px_90px_rgba(17,19,24,0.08)]" loading="eager" fetchPriority="high" />
                <img src={selectedHero} alt="" aria-hidden="true" className={`hero-layer-selected pointer-events-none absolute inset-0 block h-full w-full transition-opacity duration-500 ${showSelection ? 'opacity-100' : 'opacity-0'}`} />
                <img src={selectedPanel} alt="" aria-hidden="true" style={mobilePanelStyle} className={`hero-layer-panel-mobile pointer-events-none absolute block h-auto transition-all duration-500 md:hidden ${showPanel ? 'translate-x-0 translate-y-0 opacity-100' : 'translate-x-2 translate-y-2 opacity-0'}`} />
                <img src={selectedPanel} alt="" aria-hidden="true" className={`pointer-events-none absolute right-[-1%] top-[14%] hidden h-auto w-[37%] max-w-[430px] transition-all duration-500 md:block ${showPanel ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0'}`} />
                <button type="button" aria-label="Show jacket results" onMouseEnter={() => playDemo('jacket')} onFocus={() => playDemo('jacket')} onClick={() => playDemo('jacket')} className="absolute left-[37%] top-[31%] h-[37%] w-[35%] rounded-[2rem] bg-transparent focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1769FF] focus-visible:ring-offset-2" />
                <button type="button" aria-label="Show pants results" onMouseEnter={() => playDemo('pants')} onFocus={() => playDemo('pants')} onClick={() => playDemo('pants')} className="absolute left-[34%] top-[56%] h-[27%] w-[50%] rounded-[2rem] bg-transparent focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1769FF] focus-visible:ring-offset-2" />
                <button type="button" aria-label="Show vase results" onMouseEnter={() => playDemo('vase')} onFocus={() => playDemo('vase')} onClick={() => playDemo('vase')} className="absolute left-[6%] top-[31%] h-[24%] w-[14%] rounded-[1.5rem] bg-transparent focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1769FF] focus-visible:ring-offset-2" />
              </div>
            </div>
          </div>

          <p className="mx-auto mt-10 max-w-[34rem] text-lg leading-8 text-[#62666f]">See something you want in a video? Point at it. Scoop helps identify the product and where to get it.</p>
          <div className="mx-auto mt-8 flex w-full max-w-sm flex-col items-center justify-center gap-3 sm:max-w-none sm:flex-row sm:gap-4">
            <a href="#waitlist" onClick={() => setWaitlistPersona('SHOPPER')} style={{ color: '#ffffff' }} className="inline-flex h-12 w-full items-center justify-center rounded-xl bg-[#1769FF] px-7 text-sm font-semibold transition hover:bg-[#111318] sm:w-auto">Join the First 100</a>
            <a href="#waitlist" onClick={() => setWaitlistPersona('CREATOR')} className="inline-flex h-12 w-full items-center justify-center rounded-xl border border-[#d9dde3] bg-white px-7 text-sm font-semibold text-[#111318] transition hover:border-[#1769FF] sm:w-auto">I&apos;m a creator</a>
            <a href="#how" className="nav-link px-3 py-3 text-sm font-medium text-[#62666f]">See how it works</a>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-[1280px] px-5 py-20 sm:px-8 lg:px-12 lg:py-32">
        <p className="max-w-[20ch] text-[clamp(2.25rem,5.6vw,4.75rem)] font-semibold leading-[1.02] tracking-[-0.04em]">
          <span className="block text-[#6b717b]">Don&apos;t screenshot it.</span>
          <span className="block text-[#6b717b]">Don&apos;t hunt through comments.</span>
          <span className="mt-2 block text-[#1769FF]">Scoop it.</span>
        </p>
      </section>

      <section id="how" className="mx-auto w-full max-w-[1280px] scroll-mt-6 px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
        <h2 className="text-[clamp(2rem,4.4vw,3.5rem)] font-semibold leading-[1.05] tracking-[-0.04em]">How it works</h2>
        <ol className="mt-12 grid list-none gap-10 p-0 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {steps.map(([n, title, body]) => (
            <li key={n} className="border-t border-[#111318] pt-5">
              <span className="text-sm font-medium tabular-nums text-[#62666f]">{n}</span>
              <h3 className="mt-3 text-2xl font-semibold tracking-[-0.03em]">{title}</h3>
              <p className="mt-2 max-w-[28ch] text-base leading-7 text-[#62666f]">{body}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="mx-auto w-full max-w-[1280px] px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
        <div className="grid gap-10 lg:grid-cols-[5fr_7fr] lg:items-start lg:gap-20">
          <div>
            <h2 className="text-[clamp(2rem,4.4vw,3.5rem)] font-semibold leading-[1.05] tracking-[-0.04em]">Exact means exact.</h2>
            <p className="mt-5 max-w-[34rem] text-lg leading-8 text-[#62666f]">Scoop separates Exact, Likely and Similar results, and can use nearby permitted frames when they materially improve identification. Sponsored never means exact.</p>
          </div>
          <ul className="m-0 list-none p-0">
            {matchLevels.map(([label, note, marker]) => (
              <li key={label} className="flex items-center justify-between gap-6 border-t border-[#e6e8ec] py-5 last:border-b">
                <span className="flex items-center gap-3 text-xl font-semibold tracking-[-0.02em]">
                  <span aria-hidden="true" className={`h-3 w-3 shrink-0 rounded-full ${marker}`} />
                  {label}
                </span>
                <span className="text-right text-sm leading-6 text-[#62666f] sm:text-base">{note}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="waitlist" className="border-t border-[#e6e8ec] bg-[#f6f8fb]">
        <div className="mx-auto grid w-full max-w-[1280px] gap-12 px-5 py-20 sm:px-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,34rem)] lg:gap-20 lg:px-12 lg:py-28">
          <div className="max-w-[34rem]">
            <h2 className="text-[clamp(2.5rem,5.4vw,4.5rem)] font-semibold leading-none tracking-[-0.045em]">Join the First 100.</h2>
            <p className="mt-6 text-lg leading-8 text-[#62666f]">
              Be among the first to use Scoop in the wild. Help us make visual shopping faster, smarter, and more accurate.
            </p>
            <p className="mt-4 text-sm font-medium text-[#62666f]">100 founding members. Private beta. Built with you.</p>
            <img src={foundingFocus} alt="" aria-hidden="true" className="mt-10 hidden h-auto w-full max-w-[420px] md:block" />
          </div>

          <div className="rounded-3xl border border-[#e6e8ec] bg-white p-6 sm:p-8">
            <div className="mb-6">
              <h3 className="text-2xl font-semibold tracking-[-0.03em]">Tell us who you are</h3>
              <p className="mt-2 text-sm leading-6 text-[#62666f]">We’ll bring the first cohort in gradually.</p>
            </div>
            <WaitlistForm persona={waitlistPersona} onPersonaChange={setWaitlistPersona} />
          </div>
        </div>
      </section>

      <footer className="mx-auto w-full max-w-[1280px] px-5 pb-12 pt-14 sm:px-8 lg:px-12">
        <div className="grid gap-10 border-t border-[#e6e8ec] pt-8 md:grid-cols-[1fr_auto] md:items-start">
          <div>
            <img src={mark} alt="" className="mb-5 h-10 w-10" />
            <p className="max-w-3xl text-xs leading-5 text-[#737780]">The term &apos;Etsy&apos; is a trademark of Etsy, Inc. This application uses the Etsy API but is not endorsed or certified by Etsy, Inc.</p>
            <p className="mt-4 text-xs text-[#737780]">Scoop is a product of Article6.</p>
          </div>
          <div className="flex flex-wrap gap-x-6 gap-y-3 text-sm font-medium text-[#62666f]">
            <a className="nav-link" href="/privacy">Privacy</a>
            <a className="nav-link" href="/providers">Providers</a>
            <a className="nav-link" href="https://article6.org">Article6</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
