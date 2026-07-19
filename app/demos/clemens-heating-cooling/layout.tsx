import type { Metadata } from "next";
import { Barlow_Condensed, Source_Sans_3 } from "next/font/google";
import "./clemens.css";

const barlow = Barlow_Condensed({
  subsets: ["latin"],
  variable: "--font-chc-display",
  weight: ["600", "700", "800"],
});

const sourceSans = Source_Sans_3({
  subsets: ["latin"],
  variable: "--font-chc-body",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Clemens Heating & Cooling | HVAC Demo — Macomb Code",
  description:
    "Demo HVAC site for Clemens Heating & Cooling in Mount Clemens — ZIP service-area checker and quote form that routes by service type.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function ClemensLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={`chc-root ${barlow.variable} ${sourceSans.variable} min-h-full`}>
      {children}
    </div>
  );
}
