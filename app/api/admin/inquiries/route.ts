import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { readInquiries } from "@/lib/inquiries";

export async function GET() {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json(
      { ok: false, error: "Unauthorized." },
      { status: 401 },
    );
  }

  try {
    const inquiries = await readInquiries();
    return NextResponse.json({ ok: true, inquiries });
  } catch (error) {
    console.error("Failed to read inquiries:", error);
    const message =
      error instanceof Error
        ? error.message
        : "Could not load inquiries.";
    return NextResponse.json({ ok: false, error: message }, { status: 502 });
  }
}
