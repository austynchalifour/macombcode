import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Website In A Day — $500 | Macomb Code",
  description:
    "Get a professional business website built and live in one day for $500. A focused Macomb Code offer for local businesses that need to get online fast.",
  alternates: {
    canonical: "/offer",
  },
};

export default function OfferLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
