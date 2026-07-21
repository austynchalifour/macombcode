import { NextResponse } from "next/server";
import { listBookableDates, listOpenSlots } from "@/lib/bookings";
import { bookingConfig } from "@/data/booking-config";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const date = searchParams.get("date")?.trim() || "";

  if (!date) {
    return NextResponse.json({
      ok: true,
      dates: listBookableDates(),
      timezone: bookingConfig.timezone,
      timezoneLabel: bookingConfig.timezoneLabel,
      durationMinutes: bookingConfig.durationMinutes,
    });
  }

  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return NextResponse.json(
      { ok: false, error: "Invalid date." },
      { status: 400 },
    );
  }

  try {
    const slots = await listOpenSlots(date);
    return NextResponse.json({
      ok: true,
      date,
      slots,
      timezone: bookingConfig.timezone,
      timezoneLabel: bookingConfig.timezoneLabel,
    });
  } catch (error) {
    console.error("Failed to list slots:", error);
    return NextResponse.json(
      { ok: false, error: "Could not load times." },
      { status: 502 },
    );
  }
}
