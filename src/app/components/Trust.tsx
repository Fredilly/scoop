export default function Trust() {
  return (
    <>
      <section className="mx-auto grid max-w-[1500px] gap-12 px-6 py-32 md:px-12 lg:grid-cols-2 lg:px-16 lg:py-44">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#1769FF]">Trust is the product</p>
          <h2 className="mt-6 text-5xl font-black leading-[0.95] tracking-[-0.05em] md:text-7xl">Similar isn&apos;t exact.</h2>
        </div>
        <div className="max-w-xl self-end text-xl leading-8 text-[#5b5f67]">
          <p>Scoop separates Exact, Likely and Similar results instead of pretending every match is the original item.</p>
          <p className="mt-6 font-semibold text-[#111318]">Sponsored never means exact.</p>
        </div>
      </section>
      <section className="mx-auto max-w-[1500px] px-6 py-24 md:px-12 lg:px-16">
        <div className="grid gap-10 border-y border-[#dfe1e5] py-14 lg:grid-cols-2">
          <h2 className="text-5xl font-black leading-[0.95] tracking-[-0.05em] md:text-7xl">A screenshot sees one frame.</h2>
          <p className="max-w-xl self-end text-lg leading-8 text-[#62666f]">Scoop can use the moment around it when nearby frames are permitted and materially improve identification. Protected or DRM-restricted playback is not currently supported.</p>
        </div>
      </section>
    </>
  );
}
