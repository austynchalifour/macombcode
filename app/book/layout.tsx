import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Book a Free 15-Minute Walkthrough | Macomb Code",
  description:
    "Schedule a free 15-minute call to see the Macomb Code website and live demos in action.",
  alternates: {
    canonical: "/book",
  },
};

export default function BookLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
