import type { Metadata } from "next";
import { Fraunces, Outfit } from "next/font/google";
import "./romeo.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-rv-display",
  axes: ["SOFT", "opsz"],
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-rv-body",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Romeo & Vine | Italian Wine Bar — Demo by Macomb Code",
  description:
    "Demo restaurant site for Romeo & Vine — a family-owned Italian wine bar in Romeo, Michigan. Live CMS menu, daily specials, and a working reservation widget.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function RomeoAndVineLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={`rv-root ${fraunces.variable} ${outfit.variable} min-h-full`}>
      {children}
    </div>
  );
}
