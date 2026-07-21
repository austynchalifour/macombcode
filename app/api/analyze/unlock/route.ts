import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { addLead } from "@/lib/analyze/leads";
import type { AnalyzeResult } from "@/lib/analyze/metrics";
import { saveReport } from "@/lib/analyze/reports";
import { REFERRAL_COOKIE, getReferrerBySlug } from "@/lib/referrals";

type UnlockBody = {
  email?: string;
  url?: string;
  focusTopic?: string | null;
  scanStatus?: "ok" | "failed";
  result?: AnalyzeResult | null;
};

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(request: Request) {
  let body: UnlockBody;

  try {
    body = (await request.json()) as UnlockBody;
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid request." },
      { status: 400 },
    );
  }

  const email = body.email?.trim() || "";
  const url = body.url?.trim() || "";
  const focusTopic = body.focusTopic?.trim() || null;
  const scanStatus = body.scanStatus === "failed" ? "failed" : "ok";
  const result = body.result ?? null;

  if (!email || !isValidEmail(email)) {
    return NextResponse.json(
      { ok: false, error: "Enter a valid email address." },
      { status: 400 },
    );
  }

  if (!url) {
    return NextResponse.json(
      { ok: false, error: "Missing website URL." },
      { status: 400 },
    );
  }

  if (scanStatus === "ok" && !result) {
    return NextResponse.json(
      { ok: false, error: "Missing scan result." },
      { status: 400 },
    );
  }

  const cookieStore = await cookies();
  const rawRef = cookieStore.get(REFERRAL_COOKIE)?.value ?? "";
  const referrer = rawRef ? await getReferrerBySlug(rawRef) : null;

  try {
    let reportSlug: string | null = null;

    if (scanStatus === "ok" && result) {
      const report = await saveReport({ email, result });
      reportSlug = report.slug;
    }

    const lead = await addLead({
      email,
      url,
      focusTopic,
      result: scanStatus === "ok" ? result : null,
      scanStatus,
      reportSlug,
      referralSlug: referrer?.slug ?? null,
    });

    return NextResponse.json({
      ok: true,
      reportSlug,
      reportUrl: reportSlug ? `/analyze/${reportSlug}` : null,
      leadId: lead.id,
    });
  } catch (error) {
    console.error("Analyze unlock failed:", error);
    return NextResponse.json(
      {
        ok: false,
        error: "Could not save your report request. Please try again.",
      },
      { status: 502 },
    );
  }
}
