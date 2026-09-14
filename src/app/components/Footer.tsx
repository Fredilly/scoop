export default function Footer() {
  return (
    <>
      <section className="mx-auto max-w-[1500px] px-6 pb-12 pt-24 md:px-12 lg:px-16">
        <div className="grid gap-10 bg-[#1769FF] px-8 py-14 text-white lg:grid-cols-2 lg:px-16 lg:py-20">
          <h2 className="text-5xl font-black leading-[0.92] tracking-[-0.05em] md:text-7xl">Want to Scoop something?</h2>
          <p className="max-w-lg self-end text-lg leading-8 text-white/85">Scoop is still being built. Early testers will help us find what works, what misses, and what deserves to exist.</p>
        </div>
      </section>
      <footer className="mx-auto max-w-[1500px] px-6 py-12 md:px-12 lg:px-16">
        <div className="flex flex-wrap items-center justify-between gap-6 border-t border-[#dfe1e5] pt-8 text-sm">
          <p className="text-[#9a9da4]">Scoop is a product of Article6.</p>
          <div className="flex gap-6 font-medium"><a href="/privacy">Privacy</a><a href="/providers">Providers</a></div>
        </div>
      </footer>
    </>
  );
}
