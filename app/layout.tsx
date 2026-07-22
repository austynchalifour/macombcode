import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { Bricolage_Grotesque, Newsreader } from "next/font/google";
import Script from "next/script";
import JsonLd from "@/components/JsonLd";
import { business } from "@/data/business";
import { sitewideJsonLd } from "@/lib/seo";
import "./globals.css";

const GA_MEASUREMENT_ID = "G-8G28DBKQ27";

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  metadataBase: new URL(business.url),
  title: {
    default: "Macomb Code | Websites & Software for Local Businesses",
    template: "%s | Macomb Code",
  },
  description: business.description,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: business.url,
    siteName: business.name,
    title: "Macomb Code | Websites & Software for Local Businesses",
    description: business.description,
    images: [
      {
        url: business.ogImage,
        alt: business.name,
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "Macomb Code | Websites & Software for Local Businesses",
    description: business.description,
    images: [business.ogImage],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${bricolage.variable} ${newsreader.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans text-navy">
        <JsonLd data={sitewideJsonLd()} />
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}');
          `}
        </Script>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
