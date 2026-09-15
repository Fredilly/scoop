const logo = 'https://assets.scoop.article6.org/brand/scoop-logo.png';
const mark = 'https://assets.scoop.article6.org/extension/scoop-extension-128.png';

const principles = [
  {
    title: 'You start it.',
    body: 'Scoop analyzes video only when you explicitly call it. Watching a video, opening a page or leaving a tab open does not start analysis.',
  },
  {
    title: 'Then it stops.',
    body: 'Scoop is not a background watcher. There is no continuous frame collection and no always-on analysis loop running behind the page.',
  },
  {
    title: 'No browsing-history profile.',
    body: 'Scoop is not designed to build a record of what you watch, where you browse or what you looked at over time.',
  },
  {
    title: 'Frames are temporary.',
    body: 'The default flow is capture, crop, process, discard. Scoop does not keep full videos or build a screenshot archive of what you watch.',
  },
  {
    title: 'No sensitive visual logging by default.',
    body: 'Operational telemetry may include request IDs, timing and provider errors. Sensitive frame content is not logged by default.',
  },
  {
    title: 'Objects, not people.',
    body: 'Scoop is built to identify products and visible objects. It is not designed to infer sensitive personal attributes from people in video.',
  },
  {
    title: 'Only what is needed.',
    body: 'When a server or provider is needed, Scoop sends the minimum useful crop or structured product query rather than the whole viewing session.',
  },
  {
    title: 'Minimum permissions.',
    body: 'The extension should request only the browser permissions needed for the action you asked it to perform, with capture permission explained when required.',
  },
  {
    title: 'Protected means protected.',
    body: 'Scoop does not bypass DRM, decrypt protected streams or defeat browser and platform access controls. If a permitted capture path is unavailable, Scoop stops.',
  },
  {
    title: 'No hidden shopping behavior.',
    body: 'Scoop does not silently open merchant pages, manufacture clicks or turn a match into a purchase action without you choosing to continue.',
  },
  {
    title: 'Sponsored stays labeled.',
    body: 'Paid placement never gets to masquerade as an Exact match. Commercial relationships do not override match truth.',
  },
] as const;

export default function Privacy() {
  return (
    <main className="min-h-screen bg-white text-[#111318]">
      <nav className="mx-auto flex w-full max-w-[1180px] items-center justify-between px-5 py-6 sm:px-8 md:py-8">
        <a href="/" aria-label="Scoop home">
          <img src={logo} alt="Scoop" className="h-8 w-auto md:h-9" />
        </a>
        <a href="/" className="nav-link text-sm font-semibold text-[#545962]">Back home</a>
      </nav>

      <section className="mx-auto w-full max-w-[1080px] px-5 pb-20 pt-12 sm:px-8 md:pb-28 md:pt-16">
        <div className="border-b border-[#e3e5e9] pb-14 md:pb-16">
          <div className="flex items-center gap-4">
            <div className="relative flex h-14 w-14 items-center justify-center overflow-hidden rounded-[1.1rem] border border-[#1769FF]/10 bg-[linear-gradient(145deg,rgba(255,255,255,.92),rgba(235,242,255,.7))] shadow-[0_12px_34px_rgba(23,105,255,.10),inset_0_1px_0_rgba(255,255,255,.98)]">
              <div className="absolute inset-1.5 rounded-[.85rem] border border-white/80" />
              <img src={mark} alt="" className="relative h-7 w-7" />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#1769FF]">Privacy by design</p>
              <p className="mt-1 text-sm font-semibold text-[#747983]">Private by default. Active only when called.</p>
            </div>
          </div>

          <h1 className="mt-10 max-w-3xl text-[clamp(2.4rem,5vw,4.5rem)] font-extrabold leading-[0.98] tracking-[-0.045em]">
            You point. Scoop looks. Then it stops.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-[#62666f]">
            A visual search should be a deliberate action, not an excuse to watch everything around it.
          </p>
        </div>

        <div className="grid gap-x-14 md:grid-cols-2">
          {principles.map((item) => (
            <article key={item.title} className="border-b border-[#e3e5e9] py-8 md:py-9">
              <h2 className="text-[1.05rem] font-bold tracking-[-0.018em] text-[#111318]">{item.title}</h2>
              <p className="mt-3 max-w-xl text-[15px] leading-7 text-[#666b74]">{item.body}</p>
            </article>
          ))}
        </div>

        <div className="mt-14 grid gap-7 border-y border-[#dfe3ea] bg-[#f8faff] px-6 py-7 sm:px-8 md:grid-cols-[0.8fr_1.2fr] md:px-9 md:py-8">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#1769FF]">The waitlist is different</p>
            <h2 className="mt-3 text-xl font-bold tracking-[-0.025em]">You submit it. We store it.</h2>
          </div>
          <p className="text-[15px] leading-7 text-[#62666f]">
            If you join the Scoop waitlist, the name, email, role and channel or company information you submit are stored so we can contact you about testing and launch access. That information is separate from video analysis.
          </p>
        </div>

        <div className="mt-14 border-t border-[#e3e5e9] pt-8">
          <div className="flex items-start gap-4">
            <div className="mt-1 h-8 w-8 shrink-0 opacity-55">
              <img src={mark} alt="" className="h-full w-full" />
            </div>
            <p className="max-w-3xl text-base leading-7 text-[#565b64]">
              Scoop is designed to notice the thing you chose, not everything around you.
            </p>
          </div>

          <div className="mt-10 flex flex-col gap-4 text-sm leading-6 text-[#7b8089] sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-2xl">
              <p>This page describes the intended privacy behavior of the current Scoop alpha. If the product changes, this page should change with it rather than silently widening what Scoop collects.</p>
              <p className="mt-3">Questions: <a className="font-semibold text-[#111318] underline decoration-[#1769FF]/40 underline-offset-4" href="mailto:contact@article6.org">contact@article6.org</a></p>
            </div>
            <p className="shrink-0">Updated September 15, 2026</p>
          </div>
        </div>
      </section>
    </main>
  );
}
