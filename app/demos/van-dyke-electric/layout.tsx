import type { Metadata } from "next";
import { IBM_Plex_Sans, Teko } from "next/font/google";
import "./van-dyke.css";

const teko = Teko({
  subsets: ["latin"],
  variable: "--font-vde-display",
  weight: ["500", "600", "700"],
});

const ibmPlex = IBM_Plex_Sans({
  subsets: ["latin"],
  variable: "--font-vde-body",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Van Dyke Electric | Electrical Demo — Macomb Code",
  description:
    "Demo electrical site for Van Dyke Electric in Warren — emergency triage that routes sparks vs. scheduled work, plus a quote form that hits the right dispatch queue.",
  alternates: {
    canonical: "/demos/van-dyke-electric",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function VanDykeElectricLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={`vde-root ${teko.variable} ${ibmPlex.variable} min-h-full`}>
      {children}
    </div>
  );
}
