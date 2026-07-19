import { NextResponse } from "next/server";

type ReservationBody = {
  name?: string;
  email?: string;
  phone?: string;
  date?: string;
  time?: string;
  partySize?: string | number;
  notes?: string;
};

const VALID_TIMES = new Set([
  "17:00",
  "17:30",
  "18:00",
  "18:30",
  "19:00",
  "19:30",
  "20:00",
  "20:30",
  "21:00",
]);

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(request: Request) {
  let body: ReservationBody;

  try {
    body = (await request.json()) as ReservationBody;
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid request body." },
      { status: 400 },
    );
  }

  const name = body.name?.trim() ?? "";
  const email = body.email?.trim() ?? "";
  const phone = body.phone?.trim() ?? "";
  const date = body.date?.trim() ?? "";
  const time = body.time?.trim() ?? "";
  const notes = body.notes?.trim() ?? "";
  const partySize = Number(body.partySize);

  if (!name || name.length < 2) {
    return NextResponse.json(
      { ok: false, error: "Please enter a name." },
      { status: 400 },
    );
  }

  if (!email || !isValidEmail(email)) {
    return NextResponse.json(
      { ok: false, error: "Please enter a valid email." },
      { status: 400 },
    );
  }

  if (!phone || phone.replace(/\D/g, "").length < 10) {
    return NextResponse.json(
      { ok: false, error: "Please enter a valid phone number." },
      { status: 400 },
    );
  }

  if (!date) {
    return NextResponse.json(
      { ok: false, error: "Please choose a date." },
      { status: 400 },
    );
  }

  const requested = new Date(`${date}T12:00:00`);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  if (Number.isNaN(requested.getTime()) || requested < today) {
    return NextResponse.json(
      { ok: false, error: "Please choose a future date." },
      { status: 400 },
    );
  }

  if (!VALID_TIMES.has(time)) {
    return NextResponse.json(
      { ok: false, error: "Please choose an available time." },
      { status: 400 },
    );
  }

  if (!Number.isFinite(partySize) || partySize < 1 || partySize > 12) {
    return NextResponse.json(
      { ok: false, error: "Party size must be between 1 and 12." },
      { status: 400 },
    );
  }

  // Demo: accept the reservation and return a confirmation.
  // Production would write to a booking system, CRM, or email inbox.
  const confirmationId = `RV-${Date.now().toString(36).toUpperCase()}`;

  return NextResponse.json({
    ok: true,
    confirmationId,
    reservation: {
      name,
      email,
      phone,
      date,
      time,
      partySize,
      notes: notes || undefined,
    },
  });
}
