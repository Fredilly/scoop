const logo = 'https://assets.scoop.article6.org/brand/scoop-logo.png';
const mark = 'https://assets.scoop.article6.org/extension/scoop-extension-128.png';

const principles = [
  {
    title: 'You call it.',
    body: 'Scoop analyzes a video only when you explicitly invoke it. Opening a page or watching a video does not start analysis.',
  },
  {
    title: 'No browsing-history tracking.',
    body: 'Scoop is not designed to build a record of what you watch or where you browse. There is no continuous video monitoring or background frame collection.',
  },
  {
    title: 'No raw video archive.',
    body: 'The default flow is capture, crop, process, discard. Scoop does not keep full videos or build a library of screenshots from what you watch.',
  },
  {
    title: 'No sensitive frame logging by default.',
    body: 'Operational telemetry may record things such as request IDs, timing and provider errors. Sensitive frame content is not logged by default.',
  },
  {
    title: 'Objects, not people.',
    body: 'Scoop is built to identify products and visible objects. It is not designed to infer sensitive personal attributes from people in video.',
  },
  {
    title: 'Only what is needed.',
    body: 'When analysis requires a server or provider, Scoop sends the minimum useful crop or structured product query rather than the whole viewing session.',
  },
  {
    title: 'Minimum permissions.',
    body: 'The extension should request only the browser permissions needed for the action you asked it to perform, with capture permission explained when required.',
  },
  {
    title: 'Protected means unsupported.',
    body: 'Scoop does not bypass DRM, decrypt protected streams or defeat browser and platform access controls. If a permitted capture path is unavailable, Scoop stops.',
  },
] as const;

export default function Privacy() {
  return (
    <main className="min-h-screen bg-white text-[#111318]">
      <nav className="mx-auto flex w-full max-w-[1200px] items-center justify-between px-5 py-6 sm:px-8 md:py-8">
        <a href="/" aria-label="Scoop home">
          <img src={logo} alt="Scoop" className="h-8 w-auto md:h-9" />
        </a>
        <a href="/" className="nav-link text-sm font-semibold text-[#545962]">Back home</a>
      </nav>

      <section className="mx-auto w-full max-w-[1120px] px-5 pb-20 pt-14 sm:px-8 md:pb-28 md:pt-20">
        <div className="grid gap-10 border-b border-[#e3e5e9] pb-14 md:grid-cols-[180px_1fr] md:items-center md:gap-14 md:pb-20">
          <div className="relative mx-auto flex h-36 w-36 items-center justify-center rounded-[2rem] border border-white/70 bg-[linear-gradient(145deg,rgba(255,255,255,.72),rgba(235,242,255,.38))] shadow-[0_24px_70px_rgba(23,105,255,.12),inset_0_1px_0_rgba(255,255,255,.95)] backdrop-blur-2xl md:mx-0 md:h-40 md:w-40">
            <div className="absolute inset-3 rounded-[1.55rem] border border-[#1769FF]/10" />
            <img src={mark} alt="" className="relative h-16 w-16 md:h-[4.5rem] md:w-[4.5rem]" />
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#1769FF]">Privacy by design</p>
            <h1 className="mt-4 max-w-3xl text-4xl font-extrabold leading-[1.02] tracking-[-0.045em] sm:text-5xl md:text-6xl">
              Scoop looks when you ask.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-[#62666f]">
              A click is permission for one visual search. It is not permission to watch what you watch.
            </p>
          </div>
        </div>

        <div className="grid gap-x-12 md:grid-cols-2">
          {principles.map((item) => (
            <article key={item.title} className="border-b border-[#e3e5e9] py-9 md:py-11">
              <h2 className="text-xl font-bold tracking-[-0.02em] text-[#111318]">{item.title}</h2>
              <p className="mt-3 max-w-xl text-[15px] leading-7 text-[#666b74] sm:text-base">{item.body}</p>
            </article>
          ))}
        </div>

        <div className="mt-16 grid gap-8 rounded-[1.5rem] border border-[#e3e5e9] bg-[#f8f9fb] p-6 sm:p-8 md:grid-cols-[0.75fr_1.25fr] md:p-10">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#1769FF]">The waitlist is different</p>
            <h2 className="mt-3 text-2xl font-bold tracking-[-0.03em]">If you give us your details, we keep them.</h2>
          </div>
          <p className="text-base leading-7 text-[#62666f]">
            If you join the Scoop waitlist, the name, email, role and channel or company information you submit are stored so we can contact you about testing and launch access. That information is separate from video analysis.
          </p>
        </div>

        <div className="mt-16 flex flex-col gap-5 border-t border-[#e3e5e9] pt-8 text-sm leading-6 text-[#737780] sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <p>This page describes the intended privacy behavior of the current Scoop alpha. As the product changes, we will update it rather than silently widening what Scoop collects.</p>
            <p className="mt-3">Questions: <a className="font-semibold text-[#111318] underline decoration-[#1769FF]/40 underline-offset-4" href="mailto:contact@article6.org">contact@article6.org</a></p>
          </div>
          <p className="shrink-0">Updated September 15, 2026</p>
        </div>
      </section>
    </main>
  );
}
