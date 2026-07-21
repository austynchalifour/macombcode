import { NextResponse } from "next/server";
import {
  getReferrerBySlug,
  REFERRAL_COOKIE,
  REFERRAL_COOKIE_MAX_AGE,
} from "@/lib/referrals";

type Context = {
  params: Promise<{ slug: string }>;
};

export async function GET(request: Request, context: Context) {
  const { slug } = await context.params;
  const referrer = await getReferrerBySlug(slug);

  if (!referrer) {
    return NextResponse.redirect(new URL("/referral", request.url), 302);
  }

  const response = NextResponse.redirect(new URL("/", request.url), 302);
  response.cookies.set({
    name: REFERRAL_COOKIE,
    value: referrer.slug,
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: REFERRAL_COOKIE_MAX_AGE,
    secure: process.env.NODE_ENV === "production",
  });

  return response;
}
