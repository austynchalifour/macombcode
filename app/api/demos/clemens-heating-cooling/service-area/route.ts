import { NextResponse } from "next/server";
import { lookupZip } from "@/lib/demos/clemens-heating-cooling/data";

export async function POST(request: Request) {
  let body: { zip?: string };

  try {
    body = (await request.json()) as { zip?: string };
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid request." },
      { status: 400 },
    );
  }

  const digits = (body.zip ?? "").replace(/\D/g, "");

  if (digits.length !== 5) {
    return NextResponse.json(
      { ok: false, error: "Enter a 5-digit ZIP code." },
      { status: 400 },
    );
  }

  const match = lookupZip(digits);

  if (!match) {
    return NextResponse.json({
      ok: true,
      covered: false,
      zip: digits,
      message:
        "We're not booking that ZIP yet — but Macomb County is our home base. Call us and we'll see what we can do.",
    });
  }

  return NextResponse.json({
    ok: true,
    covered: true,
    zip: match.zip,
    city: match.city,
    response: match.response,
    message: `Yes — we cover ${match.city} (${match.zip}). Typical dispatch: ${match.response.toLowerCase()}.`,
  });
}
