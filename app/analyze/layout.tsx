import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Website Analyzer",
  description:
    "Free website analysis for Macomb County businesses — reachability, conversion signals, and a shareable report from Macomb Code.",
  alternates: {
    canonical: "/analyze",
  },
  openGraph: {
    title: "Website Analyzer | Macomb Code",
    description:
      "Free website analysis for Macomb County businesses — reachability, conversion signals, and a shareable report.",
    url: "/analyze",
    images: [{ url: "/logo.png", alt: "Macomb Code" }],
  },
};

export default function AnalyzeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
