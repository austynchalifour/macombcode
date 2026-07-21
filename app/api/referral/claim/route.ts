import { NextResponse } from "next/server";
import { claimReferrer, normalizeSlug, referralLink } from "@/lib/referrals";

type ClaimBody = {
  name?: string;
  email?: string;
  slug?: string;
};

export async function POST(request: Request) {
  let body: ClaimBody;

  try {
    body = (await request.json()) as ClaimBody;
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid request." },
      { status: 400 },
    );
  }

  const result = await claimReferrer({
    name: body.name ?? "",
    email: body.email ?? "",
    slug: body.slug ?? "",
  });

  if (!result.ok) {
    return NextResponse.json(
      { ok: false, error: result.error },
      { status: 400 },
    );
  }

  const origin = new URL(request.url).origin;
  return NextResponse.json({
    ok: true,
    referrer: result.referrer,
    link: referralLink(result.referrer.slug, origin),
    slug: normalizeSlug(result.referrer.slug),
  });
}
