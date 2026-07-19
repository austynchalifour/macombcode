import { NextResponse } from "next/server";
import {
  serviceLabels,
  type ServiceType,
} from "@/lib/demos/clemens-heating-cooling/data";

const VALID_SERVICES = new Set<ServiceType>([
  "heating",
  "cooling",
  "plumbing",
  "maintenance",
  "emergency",
]);

type QuoteBody = {
  name?: string;
  phone?: string;
  email?: string;
  zip?: string;
  service?: string;
  details?: string;
};

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/** Routes the lead by service type — demo stand-in for CRM / dispatch queues */
function routeQueue(service: ServiceType): string {
  switch (service) {
    case "emergency":
      return "priority-dispatch";
    case "maintenance":
      return "membership-team";
    case "plumbing":
      return "plumbing-desk";
    case "heating":
    case "cooling":
      return "hvac-estimators";
  }
}

export async function POST(request: Request) {
  let body: QuoteBody;

  try {
    body = (await request.json()) as QuoteBody;
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
  const service = body.service?.trim() as ServiceType | undefined;
  const details = body.details?.trim() ?? "";

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

  if (!service || !VALID_SERVICES.has(service)) {
    return NextResponse.json(
      { ok: false, error: "Please choose a service type." },
      { status: 400 },
    );
  }

  const ticketId = `CHC-${Date.now().toString(36).toUpperCase()}`;
  const queue = routeQueue(service);

  return NextResponse.json({
    ok: true,
    ticketId,
    queue,
    service: serviceLabels[service],
    message:
      service === "emergency"
        ? "Routed to priority dispatch. In production this would page the on-call tech."
        : `Routed to the ${serviceLabels[service].toLowerCase()} queue for a callback.`,
  });
}
