import { randomUUID } from "crypto";
import { bookingConfig, type BookingPreference } from "@/data/booking-config";
import { readJsonFile, writeJsonFile } from "@/lib/json-store";

export type BookingStatus = "scheduled" | "canceled";

export type Booking = {
  id: string;
  name: string;
  email: string;
  phone: string;
  preference: BookingPreference;
  note: string | null;
  startsAt: string;
  endsAt: string;
  timezone: string;
  status: BookingStatus;
  createdAt: string;
  referralSlug: string | null;
};

const BOOKINGS_PATH = "data/bookings.json";

function getZonedParts(date: Date, timeZone: string) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hourCycle: "h23",
    weekday: "short",
  }).formatToParts(date);

  const map: Record<string, string> = {};
  for (const part of parts) {
    if (part.type !== "literal") map[part.type] = part.value;
  }
  return map;
}

/** Wall-clock time in `timeZone` → UTC Date */
export function zonedLocalToUtc(
  year: number,
  month: number,
  day: number,
  hour: number,
  minute: number,
  timeZone: string,
): Date {
  const utcGuess = Date.UTC(year, month - 1, day, hour, minute, 0);
  let instant = new Date(utcGuess);

  for (let i = 0; i < 3; i++) {
    const parts = getZonedParts(instant, timeZone);
    const asLocal = Date.UTC(
      Number(parts.year),
      Number(parts.month) - 1,
      Number(parts.day),
      Number(parts.hour),
      Number(parts.minute),
      Number(parts.second || "0"),
    );
    const desired = Date.UTC(year, month - 1, day, hour, minute, 0);
    const diff = desired - asLocal;
    if (diff === 0) break;
    instant = new Date(instant.getTime() + diff);
  }

  return instant;
}

export function formatInTimezone(
  iso: string,
  options: Intl.DateTimeFormatOptions = {},
) {
  return new Intl.DateTimeFormat("en-US", {
    timeZone: bookingConfig.timezone,
    ...options,
  }).format(new Date(iso));
}

export function formatBookingWhen(iso: string) {
  return formatInTimezone(iso, {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    timeZoneName: "short",
  });
}

function weekdayInZone(date: Date): number {
  const map: Record<string, number> = {
    Sun: 0,
    Mon: 1,
    Tue: 2,
    Wed: 3,
    Thu: 4,
    Fri: 5,
    Sat: 6,
  };
  const parts = getZonedParts(date, bookingConfig.timezone);
  return map[parts.weekday] ?? -1;
}

function ymdInZone(date: Date): string {
  const parts = getZonedParts(date, bookingConfig.timezone);
  return `${parts.year}-${parts.month}-${parts.day}`;
}

function parseYmd(ymd: string): { year: number; month: number; day: number } | null {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(ymd);
  if (!match) return null;
  return {
    year: Number(match[1]),
    month: Number(match[2]),
    day: Number(match[3]),
  };
}

export async function readBookings(): Promise<Booking[]> {
  const bookings = await readJsonFile<Booking[]>(BOOKINGS_PATH, []);
  if (!Array.isArray(bookings)) return [];
  return bookings.sort(
    (a, b) => new Date(a.startsAt).getTime() - new Date(b.startsAt).getTime(),
  );
}

export async function writeBookings(bookings: Booking[]) {
  await writeJsonFile(BOOKINGS_PATH, bookings);
}

/** Bookable calendar dates (YYYY-MM-DD) in Eastern, weekdays only. */
export function listBookableDates(now = new Date()): string[] {
  const dates: string[] = [];
  const todayYmd = ymdInZone(now);
  const todayParts = parseYmd(todayYmd);
  if (!todayParts) return dates;

  const startOfToday = zonedLocalToUtc(
    todayParts.year,
    todayParts.month,
    todayParts.day,
    0,
    0,
    bookingConfig.timezone,
  );

  for (let dayOffset = bookingConfig.minLeadDays; dayOffset <= bookingConfig.bookableDays; dayOffset++) {
    const probe = new Date(startOfToday.getTime() + dayOffset * 86_400_000 + 12 * 3_600_000);
    const ymd = ymdInZone(probe);
    const parsed = parseYmd(ymd);
    if (!parsed) continue;

    const noon = zonedLocalToUtc(
      parsed.year,
      parsed.month,
      parsed.day,
      12,
      0,
      bookingConfig.timezone,
    );
    const weekday = weekdayInZone(noon);
    if (!(bookingConfig.weekdays as readonly number[]).includes(weekday)) {
      continue;
    }
    dates.push(ymd);
  }

  return dates;
}

function slotStartsForDay(ymd: string): Date[] {
  const parsed = parseYmd(ymd);
  if (!parsed) return [];

  const noon = zonedLocalToUtc(
    parsed.year,
    parsed.month,
    parsed.day,
    12,
    0,
    bookingConfig.timezone,
  );
  const weekday = weekdayInZone(noon);
  if (!(bookingConfig.weekdays as readonly number[]).includes(weekday)) {
    return [];
  }

  const slots: Date[] = [];
  const duration = bookingConfig.durationMinutes;
  const endMinutes = bookingConfig.endHour * 60;

  for (
    let minutes = bookingConfig.startHour * 60;
    minutes + duration <= endMinutes;
    minutes += duration
  ) {
    const hour = Math.floor(minutes / 60);
    const minute = minutes % 60;
    slots.push(
      zonedLocalToUtc(
        parsed.year,
        parsed.month,
        parsed.day,
        hour,
        minute,
        bookingConfig.timezone,
      ),
    );
  }

  return slots;
}

export async function listOpenSlots(ymd: string): Promise<string[]> {
  const bookable = listBookableDates();
  if (!bookable.includes(ymd)) return [];

  const bookings = await readBookings();
  const taken = new Set(
    bookings
      .filter((b) => b.status === "scheduled")
      .map((b) => new Date(b.startsAt).toISOString()),
  );

  return slotStartsForDay(ymd)
    .map((d) => d.toISOString())
    .filter((iso) => !taken.has(iso));
}

export async function createBooking(input: {
  name: string;
  email: string;
  phone: string;
  preference: BookingPreference;
  note?: string | null;
  startsAt: string;
  referralSlug?: string | null;
}): Promise<{ ok: true; booking: Booking } | { ok: false; error: string }> {
  const name = input.name.trim();
  const email = input.email.trim().toLowerCase();
  const phone = input.phone.trim();
  const note = input.note?.trim() || null;
  const startsAt = new Date(input.startsAt);

  if (name.length < 2) return { ok: false, error: "Enter your name." };
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { ok: false, error: "Enter a valid email." };
  }
  if (phone.length < 7) return { ok: false, error: "Enter a phone number." };
  if (input.preference !== "phone" && input.preference !== "video") {
    return { ok: false, error: "Choose phone or video." };
  }
  if (Number.isNaN(startsAt.getTime())) {
    return { ok: false, error: "Invalid time slot." };
  }

  const ymd = ymdInZone(startsAt);
  const open = await listOpenSlots(ymd);
  const startIso = startsAt.toISOString();
  if (!open.includes(startIso)) {
    return { ok: false, error: "That time is no longer available." };
  }

  const endsAt = new Date(
    startsAt.getTime() + bookingConfig.durationMinutes * 60_000,
  );

  const booking: Booking = {
    id: randomUUID(),
    name,
    email,
    phone,
    preference: input.preference,
    note,
    startsAt: startIso,
    endsAt: endsAt.toISOString(),
    timezone: bookingConfig.timezone,
    status: "scheduled",
    createdAt: new Date().toISOString(),
    referralSlug: input.referralSlug?.trim() || null,
  };

  const bookings = await readBookings();
  // Double-check race
  if (
    bookings.some(
      (b) => b.status === "scheduled" && b.startsAt === booking.startsAt,
    )
  ) {
    return { ok: false, error: "That time is no longer available." };
  }

  bookings.push(booking);
  await writeBookings(bookings);
  return { ok: true, booking };
}

export async function cancelBooking(id: string): Promise<Booking | null> {
  const bookings = await readBookings();
  const index = bookings.findIndex((b) => b.id === id);
  if (index === -1) return null;
  bookings[index] = { ...bookings[index], status: "canceled" };
  await writeBookings(bookings);
  return bookings[index];
}
