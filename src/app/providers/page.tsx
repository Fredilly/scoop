const logo = 'https://assets.scoop.article6.org/brand/scoop-logo.png';

export default function Providers() {
  return (
    <main className="min-h-screen bg-white text-[#111318]">
      <nav className="mx-auto flex w-full max-w-[1500px] items-center justify-between px-5 py-5 sm:px-6 sm:py-7 md:px-10 lg:px-16">
        <a href="/" aria-label="Scoop home"><img src={logo} alt="Scoop" className="h-8 w-auto md:h-10" /></a>
        <div className="flex items-center gap-4 text-xs font-medium sm:gap-5 sm:text-sm md:gap-8">
          <a href="/" className="nav-link">Back home</a>
        </div>
      </nav>

      <section className="mx-auto max-w-5xl px-6 py-24">
        <p className="text-xs font-bold uppercase tracking-[.22em] text-[#1769FF]">Providers</p>
        <h1 className="mt-6 text-[clamp(3.5rem,8vw,7rem)] font-black leading-[.88] tracking-[-.06em]">One product.<br />More than one path to it.</h1>
        <p className="mt-10 max-w-2xl text-xl leading-8 text-zinc-600">Scoop may use multiple product, marketplace and search sources. No single provider decides what an object is.</p>

        <div className="mt-20 border-t border-zinc-200 pt-10">
          <h2 className="text-4xl font-black">Etsy</h2>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-600">Etsy is an optional commerce source for relevant categories. When Etsy product information is shown, Scoop links users back to the relevant Etsy listing.</p>
        </div>

        <div className="mt-20 bg-zinc-100 p-6 text-sm leading-6 text-zinc-600">The term &apos;Etsy&apos; is a trademark of Etsy, Inc. This application uses the Etsy API but is not endorsed or certified by Etsy, Inc.</div>
      </section>
    </main>
  );
}
