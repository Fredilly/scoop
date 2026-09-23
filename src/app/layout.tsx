import type { Metadata } from "next";
import { Caveat, Manrope, Geist_Mono } from "next/font/google";
import "./globals.css";

const manrope = Manrope({ variable: "--font-scoop-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });
const caveat = Caveat({ variable: "--font-scoop-script", subsets: ["latin"], weight: ["600", "700"] });

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
    <html lang="en" className={`${manrope.variable} ${geistMono.variable} ${caveat.variable} antialiased`}>
      <head>
        <meta name="verification" content="f1577d03ea48681de6213e9cfd9e139f" />
      </head>
      <body>{children}</body>
    </html>
  );
}
