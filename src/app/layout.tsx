import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Scoop — See it. Scoop it.",
  description: "See something you want in a video? Scoop helps you identify it and find where to get it.",
  icons: {
    icon: [
      {
        url: "https://assets.scoop.article6.org/brand/scoop-favicon-48.png",
        sizes: "48x48",
        type: "image/png",
      },
      {
        url: "https://assets.scoop.article6.org/brand/scoop-favicon-32.png",
        sizes: "32x32",
        type: "image/png",
      },
    ],
    apple: "https://assets.scoop.article6.org/brand/scoop-apple-touch-180.png",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
      <body>{children}</body>
    </html>
  );
}
