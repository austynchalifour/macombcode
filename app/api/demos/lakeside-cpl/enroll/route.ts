import { NextResponse } from "next/server";
import {
  courseLabels,
  type CourseType,
} from "@/lib/demos/lakeside-cpl/data";

const VALID_COURSES = new Set<CourseType>([
  "first-time",
  "renewal",
  "private",
  "basics",
]);

type EnrollBody = {
  name?: string;
  phone?: string;
  email?: string;
  zip?: string;
  course?: string;
  classDate?: string;
  notes?: string;
};

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/** Routes the enrollment by course type — demo stand-in for CRM queues */
function routeQueue(course: CourseType): string {
  switch (course) {
    case "first-time":
      return "cpl-intake";
    case "renewal":
      return "renewal-desk";
    case "private":
      return "private-lessons";
    case "basics":
      return "fundamentals-board";
  }
}

export async function POST(request: Request) {
  let body: EnrollBody;

  try {
    body = (await request.json()) as EnrollBody;
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid request." },
      { status: 400 },
    );
  }

  const name = body.name?.trim() ?? "";
  const phone = body.phone?.trim() ?? "";
  const email = body.email?.trim() ?? "";
  const zip = (body.zip ?? "").replace(/\D/g, "").slice(0, 5);
  const course = body.course?.trim() as CourseType | undefined;
  const classDate = body.classDate?.trim() ?? "";
  const notes = body.notes?.trim() ?? "";

  if (!name || name.length < 2) {
    return NextResponse.json(
      { ok: false, error: "Please enter your name." },
      { status: 400 },
    );
  }

  if (!phone || phone.replace(/\D/g, "").length < 10) {
    return NextResponse.json(
      { ok: false, error: "Please enter a valid phone number." },
      { status: 400 },
    );
  }

  if (!email || !isValidEmail(email)) {
    return NextResponse.json(
      { ok: false, error: "Please enter a valid email." },
      { status: 400 },
    );
  }

  if (zip.length !== 5) {
    return NextResponse.json(
      { ok: false, error: "Please enter a 5-digit ZIP." },
      { status: 400 },
    );
  }

  if (!course || !VALID_COURSES.has(course)) {
    return NextResponse.json(
      { ok: false, error: "Please choose a course." },
      { status: 400 },
    );
  }

  const ticketId = `LCPL-${Date.now().toString(36).toUpperCase()}`;
  const queue = routeQueue(course);

  return NextResponse.json({
    ok: true,
    ticketId,
    queue,
    course: courseLabels[course],
    classDate: classDate || null,
    message:
      course === "private"
        ? "Routed to private lessons. In production this books a 1:1 slot with an instructor."
        : `Routed to the ${courseLabels[course].toLowerCase()} queue — we'll confirm your seat by email.`,
    notesLength: notes.length,
  });
}
