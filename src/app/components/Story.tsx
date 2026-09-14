export default function Story() {
  return (
    <>
      <section className="mx-auto max-w-[1500px] px-6 py-32 md:px-12 lg:px-16 lg:py-44">
        <p className="text-[clamp(3.2rem,7vw,7.5rem)] font-black leading-[0.9] tracking-[-0.06em]">
          Don&apos;t screenshot it.<br />Don&apos;t hunt through comments.<br />
          <span className="text-[#1769FF]">Scoop it.</span>
        </p>
      </section>
      <section id="how" className="mx-auto max-w-[1500px] px-6 py-28 md:px-12 lg:px-16">
        <h2 className="mb-14 border-b border-[#dfe1e5] pb-7 text-5xl font-black tracking-[-0.05em] md:text-7xl">How it works</h2>
        <div className="step-row"><span>01</span><strong>SEE</strong><p>You notice something worth having.</p></div>
        <div className="step-row"><span>02</span><strong>POINT</strong><p>Click the thing you actually mean.</p></div>
        <div className="step-row"><span>03</span><strong>SCOOP</strong><p>Get the closest credible product matches.</p></div>
        <div className="step-row"><span>04</span><strong>GO</strong><p>Choose where you want to buy it.</p></div>
      </section>
    </>
  );
}
