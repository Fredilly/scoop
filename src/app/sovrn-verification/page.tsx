import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sovrn Verification | Scoop",
  robots: {
    index: false,
    follow: false,
  },
};

export default function SovrnVerificationPage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
        padding: "2rem",
        fontFamily: "system-ui, sans-serif",
      }}
    >
      <section style={{ maxWidth: 640, textAlign: "center" }}>
        <h1>Scoop commerce verification</h1>
        <p>
          Temporary public link used to verify Scoop&apos;s Sovrn Commerce
          setup.
        </p>
        <p>
          <a
            href="https://sovrn.co/2t6ii47"
            rel="nofollow sponsored noopener noreferrer"
          >
            Open verified merchant link
          </a>
        </p>
      </section>
    </main>
  );
}
