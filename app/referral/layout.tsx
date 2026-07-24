import type { Metadata } from "next";
import { business } from "@/data/business";

export const metadata: Metadata = {
  title: "Referral Program",
  description:
    "Earn 35% of a referred client's first paid invoice. Claim a custom macombcode.com/r/ link and share it with local businesses.",
  alternates: {
    canonical: "/referral",
  },
  openGraph: {
    title: "Referral Program | Macomb Code",
    description:
      "Earn 35% of a referred client's first paid invoice with a custom referral link.",
    type: "website",
    images: [{ url: business.ogImage, alt: business.name }],
  },
};

export default function ReferralLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
