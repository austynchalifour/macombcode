import type { Metadata } from "next";
import { Fraunces, Outfit } from "next/font/google";
import "./northside.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-ns-display",
  axes: ["SOFT", "opsz"],
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-ns-body",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Northside Supply Co. | Retail Demo — Macomb Code",
  description:
    "Demo retail site for Northside Supply Co. in Romeo — searchable in-stock product catalog with filters and call-to-order.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function NorthsideLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={`ns-root ${fraunces.variable} ${outfit.variable} min-h-full`}>
      {children}
    </div>
  );
}
