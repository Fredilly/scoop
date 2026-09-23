import type { Metadata } from "next";
import AlphaClient from "./AlphaClient";

export const metadata: Metadata = {
  title: "Scoop Alpha",
  description: "Private Founding Alpha access for Scoop.",
  robots: { index: false, follow: false },
};

// Keep this route statically exportable for Cloudflare assets hosting.
// The invite code is read from the URL in the client after hydration.
export default function AlphaPage() {
  return <AlphaClient />;
}
