import { NextResponse } from "next/server";
import { getNotifyPhone, sendSms } from "@/lib/sentdm";

type ContactBody = {
  name?: string;
  email?: string;
  message?: string;
};

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function truncate(value: string, max: number) {
  if (value.length <= max) return value;
  return `${value.slice(0, max - 1)}…`;
}

function buildSmsBody(name: string, email: string, message: string) {
  return [
    "Macomb Code inquiry",
    `Name: ${name}`,
    `Email: ${email}`,
    `Message: ${truncate(message, 280)}`,
  ].join("\n");
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

  const notifyPhone = getNotifyPhone();
  if (!notifyPhone) {
    console.error("CONTACT_NOTIFY_PHONE / SENT_DM_NOTIFY_PHONE is not set.");
    return NextResponse.json(
      { ok: false, error: "Messaging is not configured yet." },
      { status: 500 },
    );
  }

  const text = buildSmsBody(name, email, message);
  const result = await sendSms({
    to: notifyPhone,
    text,
    parameters: {
      name: truncate(name, 80),
      email: truncate(email, 120),
      message: truncate(message, 280),
    },
  });

  if (!result.ok) {
    console.error("SentDM contact notify failed:", result.error);
    return NextResponse.json(
      { ok: false, error: "Could not send your message. Please email us instead." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
