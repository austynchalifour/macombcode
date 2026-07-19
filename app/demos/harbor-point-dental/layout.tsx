import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./harbor.css";

const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-hp",
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Harbor Point Family Dental | Booking Demo — Macomb Code",
  description:
    "Demo dental site for Harbor Point Family Dental in St. Clair Shores — online appointment booking integrated with patient intake.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function HarborPointLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className={`hp-root ${nunito.variable} min-h-full`}>{children}</div>;
}
