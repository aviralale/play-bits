import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  title: "PlayBits - Made for Nepal by Ctrl Bits",
  description:
    "Interactive games based on Nepali market prices and culture. Test your knowledge of everyday Nepal!",
  keywords: [
    "Nepal",
    "games",
    "prices",
    "interactive",
    "Kathmandu",
    "fun",
    "ctrl bits",
    "ctrlbits",
  ],
  icons: {
    icon: "/favicon.svg",
  },
  verification: {
    google: "7Mn7JkmxPMsIUERIK_Fy2Y27EeaDnRx6LvoawjCSIW0",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2967783814418016"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </head>
      <body>
        <div className="min-h-screen">{children}</div>
      </body>
    </html>
  );
}
