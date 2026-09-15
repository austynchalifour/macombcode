import type { Metadata } from "next";
import { Oswald, Source_Sans_3 } from "next/font/google";
import "./lakeside-cpl.css";

const oswald = Oswald({
  subsets: ["latin"],
  variable: "--font-lcpl-display",
  weight: ["500", "600", "700"],
});

const sourceSans = Source_Sans_3({
  subsets: ["latin"],
  variable: "--font-lcpl-body",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Lakeside CPL | Michigan CPL Training Demo — Macomb Code",
  description:
    "Demo firearms training site for Lakeside CPL in Harrison Township — course pathfinder and enrollment that routes first-time CPL, renewal, private lessons, and basics.",
  alternates: {
    canonical: "/demos/lakeside-cpl",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function LakesideCplLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className={`lcpl-root ${oswald.variable} ${sourceSans.variable} min-h-full`}
    >
      {children}
    </div>
  );
}
