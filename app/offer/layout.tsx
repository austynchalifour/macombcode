import type { Metadata } from "next";
import { business } from "@/data/business";

export const metadata: Metadata = {
  title: "Website In A Day — $500",
  description:
    "Get a professional business website built and live in one day for $500. A focused Macomb Code offer for local businesses that need to get online fast.",
  alternates: {
    canonical: "/offer",
  },
  openGraph: {
    title: "Website In A Day — $500 | Macomb Code",
    description:
      "Get a professional business website built and live in one day for $500.",
    type: "website",
    images: [{ url: business.ogImage, alt: business.name }],
  },
};

export default function OfferLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
