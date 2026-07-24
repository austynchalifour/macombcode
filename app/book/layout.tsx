import type { Metadata } from "next";
import { business } from "@/data/business";

export const metadata: Metadata = {
  title: "Book a Free 15-Minute Walkthrough",
  description:
    "Schedule a free 15-minute call to see the Macomb Code website and live demos in action.",
  alternates: {
    canonical: "/book",
  },
  openGraph: {
    title: "Book a Free 15-Minute Walkthrough | Macomb Code",
    description:
      "Schedule a free 15-minute call to see Macomb Code demos and talk through your website goals.",
    type: "website",
    images: [{ url: business.ogImage, alt: business.name }],
  },
};

export default function BookLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
