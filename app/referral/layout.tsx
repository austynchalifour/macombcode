import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Referral Program | Macomb Code",
  description:
    "Earn 35% of a referred client's first paid invoice. Claim a custom macombcode.com/r/ link and share it with local businesses.",
  alternates: {
    canonical: "/referral",
  },
};

export default function ReferralLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
