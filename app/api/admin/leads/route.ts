import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { readLeads, setLeadContacted } from "@/lib/analyze/leads";

export async function GET() {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json(
      { ok: false, error: "Unauthorized." },
      { status: 401 },
    );
  }

  try {
    const leads = await readLeads();
    return NextResponse.json({ ok: true, leads });
  } catch (error) {
    console.error("Failed to read analyzer leads:", error);
    const message =
      error instanceof Error ? error.message : "Could not load analyzer leads.";
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
      contacted?: boolean;
    };
    if (!body.id || typeof body.contacted !== "boolean") {
      return NextResponse.json(
        { ok: false, error: "id and contacted are required." },
        { status: 400 },
      );
    }

    const lead = await setLeadContacted(body.id, body.contacted);
    if (!lead) {
      return NextResponse.json(
        { ok: false, error: "Lead not found." },
        { status: 404 },
      );
    }

    return NextResponse.json({ ok: true, lead });
  } catch (error) {
    console.error("Failed to update analyzer lead:", error);
    const message =
      error instanceof Error ? error.message : "Could not update lead.";
    return NextResponse.json({ ok: false, error: message }, { status: 502 });
  }
}
