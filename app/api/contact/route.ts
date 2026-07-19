import { NextResponse } from "next/server";
import { sendContactEmail } from "@/lib/email";

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

  const emailResult = await sendContactEmail({ name, email, message });
  if (!emailResult.ok) {
    console.error("Contact email failed:", emailResult.error);
    return NextResponse.json(
      {
        ok: false,
        error: "Could not send your message. Please email us instead.",
      },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
