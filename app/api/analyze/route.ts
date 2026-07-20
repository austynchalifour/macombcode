import { NextResponse } from "next/server";
import { analyzeWebsite } from "@/lib/analyze";

type AnalyzeBody = {
  url?: string;
  topic?: string;
};

export async function POST(request: Request) {
  let body: AnalyzeBody;

  try {
    body = (await request.json()) as AnalyzeBody;
  } catch {
    return NextResponse.json(
      { ok: false, softFail: false, error: "Invalid request." },
      { status: 400 },
    );
  }

  const url = body.url?.trim() || "";
  const topic = body.topic?.trim() || "";

  if (!url) {
    return NextResponse.json(
      { ok: false, softFail: false, error: "Enter a website URL." },
      { status: 400 },
    );
  }

  try {
    const result = await analyzeWebsite(url, topic || undefined);
    return NextResponse.json({ ok: true, result });
  } catch (error) {
    console.error("Website analyze failed:", error);
    return NextResponse.json({
      ok: false,
      softFail: true,
      url,
      focusTopic: topic || null,
      error:
        error instanceof Error
          ? error.message
          : "Could not analyze that website.",
      message:
        "We couldn't auto-scan this one, but we'll take a personal look if you leave your email.",
    });
  }
}
