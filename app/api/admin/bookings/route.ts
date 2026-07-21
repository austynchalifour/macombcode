import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { cancelBooking, readBookings } from "@/lib/bookings";

export async function GET() {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json(
      { ok: false, error: "Unauthorized." },
      { status: 401 },
    );
  }

  try {
    const bookings = await readBookings();
    return NextResponse.json({
      ok: true,
      bookings: [...bookings].sort(
        (a, b) =>
          new Date(b.startsAt).getTime() - new Date(a.startsAt).getTime(),
      ),
    });
  } catch (error) {
    console.error("Failed to read bookings:", error);
    const message =
      error instanceof Error ? error.message : "Could not load bookings.";
    return NextResponse.json({ ok: false, error: message }, { status: 502 });
  }
}

export async function PATCH(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json(
      { ok: false, error: "Unauthorized." },
      { status: 401 },
    );
  }

  try {
    const body = (await request.json()) as {
      id?: string;
      status?: "canceled";
    };

    if (!body.id || body.status !== "canceled") {
      return NextResponse.json(
        { ok: false, error: "id and status=canceled are required." },
        { status: 400 },
      );
    }

    const booking = await cancelBooking(body.id);
    if (!booking) {
      return NextResponse.json(
        { ok: false, error: "Booking not found." },
        { status: 404 },
      );
    }

    return NextResponse.json({ ok: true, booking });
  } catch (error) {
    console.error("Failed to cancel booking:", error);
    const message =
      error instanceof Error ? error.message : "Could not cancel booking.";
    return NextResponse.json({ ok: false, error: message }, { status: 502 });
  }
}
