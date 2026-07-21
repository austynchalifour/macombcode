import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createBooking, formatBookingWhen } from "@/lib/bookings";
import type { BookingPreference } from "@/data/booking-config";
import { sendBookingEmails } from "@/lib/email";
import { REFERRAL_COOKIE, getReferrerBySlug } from "@/lib/referrals";

type BookBody = {
  name?: string;
  email?: string;
  phone?: string;
  preference?: BookingPreference;
  note?: string;
  startsAt?: string;
};

export async function POST(request: Request) {
  let body: BookBody;

  try {
    body = (await request.json()) as BookBody;
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid request." },
      { status: 400 },
    );
  }

  const cookieStore = await cookies();
  const rawRef = cookieStore.get(REFERRAL_COOKIE)?.value ?? "";
  const referrer = rawRef ? await getReferrerBySlug(rawRef) : null;

  const result = await createBooking({
    name: body.name ?? "",
    email: body.email ?? "",
    phone: body.phone ?? "",
    preference: body.preference === "video" ? "video" : "phone",
    note: body.note ?? null,
    startsAt: body.startsAt ?? "",
    referralSlug: referrer?.slug ?? null,
  });

  if (!result.ok) {
    return NextResponse.json(
      { ok: false, error: result.error },
      { status: 400 },
    );
  }

  try {
    const emailResult = await sendBookingEmails(result.booking);
    if (!emailResult.ok) {
      console.error("Booking email failed:", emailResult.error);
    }
  } catch (error) {
    console.error("Booking email failed:", error);
  }

  return NextResponse.json({
    ok: true,
    booking: result.booking,
    whenLabel: formatBookingWhen(result.booking.startsAt),
  });
}
