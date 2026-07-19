import { NextResponse } from "next/server";
import {
  timeSlots,
  visitLabels,
  type VisitType,
} from "@/lib/demos/harbor-point-dental/data";

const VALID_VISITS = new Set<VisitType>([
  "cleaning",
  "checkup",
  "new-patient",
  "emergency",
  "cosmetic",
  "kids",
]);

const VALID_TIMES = new Set(timeSlots.map((t) => t.value));

type AppointmentBody = {
  visitType?: string;
  date?: string;
  time?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  dateOfBirth?: string;
  isNewPatient?: boolean | string;
  insuranceProvider?: string;
  allergies?: string;
  medications?: string;
  reason?: string;
};

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(request: Request) {
  let body: AppointmentBody;

  try {
    body = (await request.json()) as AppointmentBody;
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid request." },
      { status: 400 },
    );
  }

  const visitType = body.visitType?.trim() as VisitType | undefined;
  const date = body.date?.trim() ?? "";
  const time = body.time?.trim() ?? "";
  const firstName = body.firstName?.trim() ?? "";
  const lastName = body.lastName?.trim() ?? "";
  const email = body.email?.trim() ?? "";
  const phone = body.phone?.trim() ?? "";
  const dateOfBirth = body.dateOfBirth?.trim() ?? "";
  const insuranceProvider = body.insuranceProvider?.trim() ?? "";
  const allergies = body.allergies?.trim() ?? "";
  const medications = body.medications?.trim() ?? "";
  const reason = body.reason?.trim() ?? "";
  const isNewPatient =
    body.isNewPatient === true ||
    body.isNewPatient === "true" ||
    body.isNewPatient === "yes";

  if (!visitType || !VALID_VISITS.has(visitType)) {
    return NextResponse.json(
      { ok: false, error: "Please choose a visit type." },
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

  if (!firstName || !lastName) {
    return NextResponse.json(
      { ok: false, error: "Please enter the patient's full name." },
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

  if (!dateOfBirth) {
    return NextResponse.json(
      { ok: false, error: "Please enter date of birth." },
      { status: 400 },
    );
  }

  if (!reason || reason.length < 3) {
    return NextResponse.json(
      { ok: false, error: "Please share a short reason for the visit." },
      { status: 400 },
    );
  }

  // Demo: accept booking + intake as one record.
  // Production would sync to practice management software (Open Dental, Dentrix, etc.).
  const confirmationId = `HP-${Date.now().toString(36).toUpperCase()}`;
  const timeLabel = timeSlots.find((t) => t.value === time)?.label ?? time;

  return NextResponse.json({
    ok: true,
    confirmationId,
    appointment: {
      visitType: visitLabels[visitType],
      date,
      time,
      timeLabel,
      patientName: `${firstName} ${lastName}`,
      email,
      phone,
      dateOfBirth,
      isNewPatient,
      insuranceProvider: insuranceProvider || "Self-pay / none listed",
      allergies: allergies || "None listed",
      medications: medications || "None listed",
      reason,
    },
    message:
      "Appointment requested and intake saved. In production this lands in the office schedule and patient chart before you arrive.",
  });
}
