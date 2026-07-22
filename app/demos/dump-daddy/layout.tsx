import type { Metadata } from "next";
import { Bebas_Neue, DM_Sans } from "next/font/google";
import "./dump-daddy.css";

const bebas = Bebas_Neue({
  subsets: ["latin"],
  variable: "--font-dd-display",
  weight: "400",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dd-body",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Dump Daddy Junk Removal | Demo — Macomb Code",
  description:
    "Private demo homepage for Dump Daddy Junk Removal — junk removal in St. Clair Shores and Macomb County.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function DumpDaddyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={`dd-root ${bebas.variable} ${dmSans.variable} min-h-full`}>
      {children}
    </div>
  );
}
