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

  const inquiries = await readInquiries();
  return NextResponse.json({ ok: true, inquiries });
}
