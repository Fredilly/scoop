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

const steps = [
  ['01', 'SEE', 'Spot something you actually want in the video.'],
  ['02', 'POINT', 'Click the specific item, not the whole scene.'],
  ['03', 'SCOOP', 'Get Exact, Likely, and Similar results clearly separated.'],
  ['04', 'GO', 'Choose where you want to buy it.'],
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
      <nav className="mx-auto flex w-full max-w-[1500px] items-center justify-between px-5 py-5 sm:px-6 sm:py-7 md:px-10 lg:px-16">
        <a href="#top" aria-label="Scoop home"><img src={logo} alt="Scoop" className="h-8 w-auto md:h-10" /></a>
        <div className="flex items-center gap-4 text-xs font-medium sm:gap-5 sm:text-sm md:gap-8">
          <a className="nav-link hidden sm:inline" href="#how">How it works</a>
          <a className="nav-link" href="/privacy">Privacy</a>
          <a className="nav-link hidden sm:inline" href="/providers">Providers</a>
        </div>
      </nav>

      <section id="top" className="mx-auto w-full max-w-[1500px] px-5 pb-24 pt-10 sm:px-6 sm:pb-28 sm:pt-12 md:px-10 lg:min-h-[92vh] lg:px-16 lg:pb-32 lg:pt-14">
        <div className="mx-auto max-w-[1260px] text-center">
          <h1 className="mt-4 text-[clamp(2.6rem,7vw,5.75rem)] font-black leading-[0.9] tracking-[-0.065em] text-[#111318]">
            SEE IT. <span className={`text-[#1769FF] sm:transition-colors sm:duration-500 ${showPanel ? 'sm:text-[#1769FF]' : 'sm:text-[#111318]'}`}>SCOOP IT.</span>
          </h1>
          <p className="mx-auto mt-5 max-w-3xl text-base leading-7 text-[#686d76] sm:text-lg"><span className="sm:hidden">Watch Scoop cycle through the jacket, pants, and vase.</span><span className="hidden sm:inline">Hover or tap the jacket, pants, or vase to see item-specific results.</span></p>

          <div className="mt-10">
            <div className="mx-auto w-full max-w-[1180px]">
              <div className="relative isolate mx-auto w-full">
                <img src={heroClean} alt="TV showing a woman in a denim jacket and cream pants inside a living room" className="mx-auto block h-auto w-full drop-shadow-[0_28px_90px_rgba(17,19,24,0.08)]" loading="eager" fetchPriority="high" />
                <img src={selectedHero} alt="" aria-hidden="true" className={`pointer-events-none absolute inset-0 block h-full w-full transition-opacity duration-500 ${showSelection ? 'opacity-100' : 'opacity-0'}`} />
                <img src={selectedPanel} alt="" aria-hidden="true" style={mobilePanelStyle} className={`pointer-events-none absolute block h-auto transition-all duration-500 md:hidden ${showPanel ? 'translate-x-0 translate-y-0 opacity-100' : 'translate-x-2 translate-y-2 opacity-0'}`} />
                <img src={selectedPanel} alt="" aria-hidden="true" className={`pointer-events-none absolute right-[-1%] top-[14%] hidden h-auto w-[37%] max-w-[430px] transition-all duration-500 md:block ${showPanel ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0'}`} />
                <button type="button" aria-label="Show jacket results" onMouseEnter={() => playDemo('jacket')} onFocus={() => playDemo('jacket')} onClick={() => playDemo('jacket')} className="absolute left-[37%] top-[31%] h-[37%] w-[35%] rounded-[2rem] bg-transparent focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1769FF] focus-visible:ring-offset-2" />
                <button type="button" aria-label="Show pants results" onMouseEnter={() => playDemo('pants')} onFocus={() => playDemo('pants')} onClick={() => playDemo('pants')} className="absolute left-[34%] top-[56%] h-[27%] w-[50%] rounded-[2rem] bg-transparent focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1769FF] focus-visible:ring-offset-2" />
                <button type="button" aria-label="Show vase results" onMouseEnter={() => playDemo('vase')} onFocus={() => playDemo('vase')} onClick={() => playDemo('vase')} className="absolute left-[6%] top-[31%] h-[24%] w-[14%] rounded-[1.5rem] bg-transparent focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1769FF] focus-visible:ring-offset-2" />
              </div>
            </div>
          </div>

          <p className="mx-auto mt-8 max-w-[40rem] text-base leading-7 text-[#62666f] sm:mt-10 sm:text-lg md:text-xl md:leading-8">See something you want in a video? Point at it. Scoop helps identify the product and where to get it.</p>
          <div className="mx-auto mt-8 flex w-full max-w-sm flex-col items-center justify-center gap-3 sm:mt-10 sm:max-w-none sm:flex-row sm:flex-wrap sm:gap-4">
            <a href="#waitlist" onClick={() => setWaitlistPersona('SHOPPER')} style={{ color: '#ffffff' }} className="inline-flex w-full items-center justify-center rounded-xl bg-[#1769FF] px-7 py-4 text-sm font-bold text-white transition hover:bg-[#111318] sm:w-auto">Join the First 100</a>
            <a href="#waitlist" onClick={() => setWaitlistPersona('CREATOR')} className="inline-flex w-full items-center justify-center rounded-xl border border-[#dfe1e5] bg-white px-7 py-4 text-sm font-bold text-[#111318] transition hover:border-[#1769FF] hover:text-[#1769FF] sm:w-auto">I&apos;m a creator</a>
            <a href="#how" className="nav-link px-3 py-4 text-sm font-semibold">See how it works ↓</a>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-[1500px] px-5 py-24 text-center sm:px-6 md:px-10 md:text-left lg:px-16 lg:py-36">
        <p className="mx-auto max-w-[1050px] text-[clamp(2.8rem,7vw,6.25rem)] font-extrabold leading-[0.94] tracking-[-0.052em] md:mx-0"><span className="block">Don&apos;t screenshot it.</span><span className="block">Don&apos;t hunt through comments.</span><span className="mt-2 block text-[#1769FF]">Scoop it.</span></p>
      </section>

      <section id="waitlist" className="scroll-mt-8 text-white">
        <div className="founding-shell mx-auto w-full max-w-[1500px] px-5 py-24 sm:px-6 md:px-10 lg:px-16 lg:py-36">
          <div className="founding-grid mx-auto grid w-full max-w-[1280px] gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-20">
            <div className="mx-auto w-full max-w-xl text-center lg:mx-0 lg:text-left">
              <div className="founding-eyebrow inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-[0.68rem] font-bold uppercase tracking-[0.24em] text-white/85 backdrop-blur-xl">
                <span className="h-1.5 w-1.5 rounded-full bg-white shadow-[0_0_18px_rgba(255,255,255,0.9)]" />
                Founding 100
              </div>
              <h2 className="mx-auto mt-7 max-w-[9ch] text-[clamp(3.5rem,9vw,7rem)] font-black leading-[0.88] tracking-[-0.065em] lg:mx-0">
                Join the First 100.
              </h2>
              <p className="mx-auto mt-7 max-w-xl text-base leading-7 text-white/78 sm:text-lg sm:leading-8 lg:mx-0">
                Be among the first to use Scoop in the wild. Help us make visual shopping faster, smarter, and more accurate.
              </p>
              <p className="mx-auto mt-7 max-w-xl text-sm font-semibold tracking-[-0.01em] text-white lg:mx-0 sm:text-base">
                100 founding members. Private beta. Built with you.
              </p>
            </div>

            <div className="founding-glass mx-auto w-full max-w-2xl rounded-[2rem] p-5 sm:p-8 md:p-10 lg:max-w-none">
              <WaitlistForm persona={waitlistPersona} onPersonaChange={setWaitlistPersona} />
            </div>
          </div>
        </div>
      </section>

      <section id="how" className="mx-auto w-full max-w-[1500px] px-5 py-24 sm:px-6 md:px-10 lg:px-16 lg:py-40">
        <div className="mb-12 flex items-end justify-center gap-8 border-b border-[#dfe1e5] pb-7 text-center sm:mb-16 md:justify-between md:text-left"><h2 className="text-4xl font-black tracking-[-0.045em] md:text-6xl">How it works</h2><span className="hidden text-xs uppercase tracking-[0.22em] text-[#7a7e87] md:block">See → Point → Scoop → Go</span></div>
        <div>{steps.map(([n, title, body]) => <div key={n} className="grid justify-items-center gap-4 border-b border-[#dfe1e5] py-8 text-center sm:gap-5 md:grid-cols-[120px_1fr_1fr] md:items-baseline md:justify-items-stretch md:text-left lg:py-12"><span className="text-sm font-semibold text-[#1769FF]">{n}</span><h3 className="text-4xl font-black tracking-[-0.04em] md:text-6xl">{title}</h3><p className="mx-auto max-w-md text-lg leading-7 text-[#62666f] md:mx-0">{body}</p></div>)}</div>
      </section>

      <section className="mx-auto w-full max-w-[1500px] px-5 py-14 sm:px-6 md:px-10 lg:px-16 lg:py-20">
        <div className="grid justify-items-center gap-8 border-y border-[#dfe1e5] py-10 text-center md:grid-cols-[0.8fr_1.2fr] md:items-center md:justify-items-stretch md:text-left lg:py-14">
          <div><div className="text-xs font-semibold uppercase tracking-[0.22em] text-[#1769FF]">Trust the match</div><h2 className="mt-3 text-3xl font-extrabold tracking-[-0.035em] md:text-4xl">Exact means exact.</h2></div>
          <p className="mx-auto max-w-3xl text-base leading-7 text-[#62666f] sm:text-lg md:mx-0">Scoop separates Exact, Likely and Similar results, and can use nearby permitted frames when they materially improve identification. Sponsored never means exact.</p>
        </div>
      </section>

      <section className="w-full px-0 pb-10 pt-24 sm:px-6 md:px-10 lg:mx-auto lg:max-w-[1500px] lg:px-16 lg:pt-32">
        <div className="mx-auto flex w-[calc(100%-2rem)] max-w-[1320px] flex-col items-center gap-10 bg-[#1769FF] px-6 py-10 text-center text-white sm:w-full sm:px-7 sm:py-12 md:px-12 md:py-16 lg:grid lg:grid-cols-[1.2fr_.8fr] lg:items-end lg:justify-items-stretch lg:px-16 lg:py-20 lg:text-left">
          <div className="mx-auto flex w-full max-w-xl flex-col items-center lg:mx-0 lg:max-w-none lg:items-start"><div className="text-xs font-semibold uppercase tracking-[0.22em] text-white/70">Private alpha</div><h2 className="mx-auto mt-5 max-w-[8ch] text-[clamp(3rem,13vw,4.5rem)] font-black leading-[0.92] tracking-[-0.055em] lg:mx-0 lg:max-w-3xl lg:text-7xl">Want to Scoop something?</h2></div>
          <div className="mx-auto flex w-full max-w-sm flex-col items-center lg:mx-0 lg:max-w-lg lg:items-start"><p className="mx-auto max-w-lg text-lg leading-8 text-white/85 lg:mx-0">Scoop is still being built. Early testers will help us find what works, what misses, and what deserves to exist.</p><div className="mt-8 flex w-full flex-col items-center justify-center gap-3"><a href="#waitlist" onClick={() => setWaitlistPersona('SHOPPER')} style={{ color: '#111318' }} className="inline-flex w-full max-w-sm items-center justify-center rounded-xl bg-white px-6 py-4 text-center text-sm font-bold sm:py-3.5">Join the First 100</a><a href="#waitlist" onClick={() => setWaitlistPersona('CREATOR')} style={{ color: '#ffffff' }} className="inline-flex w-full max-w-sm items-center justify-center rounded-xl border border-white/35 px-6 py-4 text-center text-sm font-bold sm:py-3.5">Creator access →</a></div></div>
        </div>
      </section>

      <footer className="mx-auto w-full max-w-[1500px] px-5 pb-12 pt-14 sm:px-6 md:px-10 lg:px-16">
        <div className="grid gap-10 border-t border-[#dfe1e5] pt-8 text-center md:grid-cols-[1fr_auto] md:items-start md:text-left">
          <div><img src={mark} alt="" className="mx-auto mb-5 h-10 w-10 md:mx-0" /><p className="mx-auto max-w-3xl text-xs leading-5 text-[#737780] md:mx-0">The term &apos;Etsy&apos; is a trademark of Etsy, Inc. This application uses the Etsy API but is not endorsed or certified by Etsy, Inc.</p><p className="mt-4 text-xs text-[#9a9da4]">Scoop is a product of Article6.</p></div>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-3 text-sm font-medium md:justify-start"><a className="nav-link" href="/privacy">Privacy</a><a className="nav-link" href="/providers">Providers</a><a className="nav-link" href="https://article6.org">Article6</a></div>
        </div>
      </footer>
    </main>
  );
}
