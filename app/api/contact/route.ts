import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { addInquiry } from "@/lib/inquiries";
import { REFERRAL_COOKIE, getReferrerBySlug } from "@/lib/referrals";

type ContactBody = {
  name?: string;
  email?: string;
  message?: string;
};

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(request: Request) {
  let body: ContactBody;

  try {
    body = (await request.json()) as ContactBody;
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid request." },
      { status: 400 },
    );
  }

  const name = body.name?.trim() ?? "";
  const email = body.email?.trim() ?? "";
  const message = body.message?.trim() ?? "";

  if (!name || name.length < 2) {
    return NextResponse.json(
      { ok: false, error: "Please enter your name." },
      { status: 400 },
    );
  }

  if (!email || !isValidEmail(email)) {
    return NextResponse.json(
      { ok: false, error: "Please enter a valid email." },
      { status: 400 },
    );
  }

  if (!message || message.length < 5) {
    return NextResponse.json(
      { ok: false, error: "Please enter a short message." },
      { status: 400 },
    );
  }

  const cookieStore = await cookies();
  const rawRef = cookieStore.get(REFERRAL_COOKIE)?.value ?? "";
  const referrer = rawRef ? await getReferrerBySlug(rawRef) : null;

  try {
    await addInquiry({
      name,
      email,
      message,
      referralSlug: referrer?.slug ?? null,
    });
  } catch (error) {
    console.error("Failed to store inquiry:", error);
    return NextResponse.json(
      {
        ok: false,
        error:
          "Could not save your message right now. Please email us instead.",
        detail:
          error instanceof Error ? error.message : "Unknown storage error",
      },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
