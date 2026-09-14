const logo = "https://assets.scoop.article6.org/brand/scoop-logo.png";

export default function Hero() {
  return (
    <>
      <nav className="mx-auto flex max-w-[1500px] items-center justify-between px-6 py-8 md:px-12 lg:px-16">
        <a href="#top" aria-label="Scoop home"><img src={logo} alt="Scoop" className="h-9 w-auto" /></a>
        <div className="flex gap-6 text-sm font-medium">
          <a href="#how">How it works</a>
          <a href="/privacy">Privacy</a>
          <a href="/providers">Providers</a>
        </div>
      </nav>
      <section id="top" className="mx-auto grid min-h-[82vh] max-w-[1500px] items-center gap-14 px-6 py-16 md:px-12 lg:grid-cols-2 lg:px-16">
        <div>
          <p className="mb-7 text-xs font-semibold uppercase tracking-[0.24em] text-[#1769FF]">Private alpha</p>
          <h1 className="text-[clamp(4.6rem,10vw,10rem)] font-black leading-[0.8] tracking-[-0.07em]">SEE IT.<br /><span className="text-[#1769FF]">SCOOP IT.</span></h1>
          <p className="mt-10 max-w-xl text-xl leading-8 text-[#5b5f67]">See something you want in a video? Point at it. Scoop helps identify the product and where to get it.</p>
        </div>
        <div className="relative aspect-video overflow-hidden border border-[#e4e6e9] bg-[#f3f4f6]">
          <div className="absolute left-[8%] top-[12%] h-[72%] w-[34%] bg-[#d9dde4]" />
          <div className="absolute right-[9%] top-[17%] h-[62%] w-[33%] bg-[#111318]" />
          <div className="absolute left-[33%] top-[24%] h-[48%] w-[28%] rounded-[40%_40%_15%_15%] bg-[#1769FF]" />
          <div className="selection-corners absolute left-[31%] top-[21%] h-[54%] w-[33%]" />
          <div className="cursor-mark absolute left-[57%] top-[57%] h-12 w-12 bg-[#111318] [clip-path:polygon(0_0,100%_58%,58%_67%,42%_100%)]" />
          <div className="absolute bottom-5 left-5 bg-white px-4 py-2 text-[11px] font-bold uppercase tracking-[0.18em] text-[#1769FF]">Scooped</div>
        </div>
      </section>
    </>
  );
}
