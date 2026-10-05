import type { Metadata } from "next";
import Script from "next/script";
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
        <script
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '1505765104709236');
              fbq('track', 'PageView');
            `,
          }}
        />
      </head>
      <body>
        {children}
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=1505765104709236&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>
        <Script
          src="https://static.cloudflareinsights.com/beacon.min.js"
          data-cf-beacon='{"token":"1feae9a914394fff9bf7c5d349cd5c4b"}'
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
