const logo = "https://assets.scoop.article6.org/brand/scoop-logo.png";

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-black">
      <img src={logo} alt="Scoop" className="h-10 w-auto" />
      <h1 className="text-6xl font-black">SEE IT. SCOOP IT.</h1>
    </main>
  );
}
