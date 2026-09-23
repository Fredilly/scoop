import type { Metadata } from "next";
import AlphaClient from "./AlphaClient";

export const metadata: Metadata = {
  title: "Scoop Alpha",
  description: "Private Founding Alpha access for Scoop.",
  robots: { index: false, follow: false },
};

export default async function AlphaPage({ searchParams }: { searchParams: Promise<{ code?: string }> }) {
  const params = await searchParams;
  return <AlphaClient code={typeof params.code === "string" ? params.code : ""} />;
}
