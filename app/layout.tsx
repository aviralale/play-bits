import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://example.com";
const siteName = "PlayBits";
const siteDescription =
  "Interactive games based on Nepali market prices and culture. Test your knowledge of everyday Nepal!";

export const metadata: Metadata = {
  title: "PlayBits - Free Financial Literacy Games & Simulators",
  description:
    "Free interactive financial literacy games: Budget Master, Price Prediction, Shopping Simulator. Learn real-world economics through play. Perfect for students and educators.",
  keywords: [
    "financial literacy games",
    "budget simulator",
    "free educational games",
    "Nepal",
    "economics games",
    "price prediction",
    "money management",
    "student resources",
    "classroom games",
    "budgeting simulator",
  ],
  icons: {
    icon: "/favicon.svg",
  },
  verification: {
    google: "7Mn7JkmxPMsIUERIK_Fy2Y27EeaDnRx6LvoawjCSIW0",
  },
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: "./",
  },
  openGraph: {
    type: "website",
    url: "/",
    title: "PlayBits - Made for Nepal by Ctrl Bits",
    description:
      "Interactive games based on Nepali market prices and culture. Test your knowledge of everyday Nepal!",
    siteName: "PlayBits",
  },
  twitter: {
    card: "summary_large_image",
    title: "PlayBits - Made for Nepal by Ctrl Bits",
    description:
      "Interactive games based on Nepali market prices and culture. Test your knowledge of everyday Nepal!",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
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
        <link rel="sitemap" href="/sitemap.xml" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: siteName,
              url: siteUrl,
              logo: `${siteUrl}/favicon.svg`,
              description: siteDescription,
              contact: {
                "@type": "ContactPoint",
                contactType: "Customer Service",
                email: "info@ctrlbits.com",
              },
              sameAs: [
                "https://facebook.com/ctrlbits",
                "https://twitter.com/ctrlbits",
              ],
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: siteName,
              url: siteUrl,
              description: siteDescription,
              potentialAction: {
                "@type": "SearchAction",
                target: {
                  "@type": "EntryPoint",
                  urlTemplate: `${siteUrl}/search?q={search_term_string}`,
                },
                query_input: "required name=search_term_string",
              },
            }),
          }}
        />
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-HEXMKG32VJ"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());

gtag('config', 'G-HEXMKG32VJ');`}
        </Script>
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
