import type { Metadata } from "next";
import { Oswald, Source_Sans_3 } from "next/font/google";
import "./precision-paving.css";

const oswald = Oswald({
  subsets: ["latin"],
  variable: "--font-pp-display",
  weight: ["500", "600", "700"],
});

const sourceSans = Source_Sans_3({
  subsets: ["latin"],
  variable: "--font-pp-body",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Precision Paving & Sealing | Demo — Macomb Code",
  description:
    "Private demo homepage for Precision Paving & Sealing LLC — asphalt, concrete, sealing, and excavation in Waterford Township, MI.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function PrecisionPavingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className={`pp-root ${oswald.variable} ${sourceSans.variable} min-h-full`}
    >
      {children}
    </div>
  );
}
