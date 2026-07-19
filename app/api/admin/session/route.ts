import { NextResponse } from "next/server";
import { isAdminAuthenticated, isAdminConfigured } from "@/lib/admin-auth";

export async function GET() {
  if (!isAdminConfigured()) {
    return NextResponse.json({
      ok: true,
      authenticated: false,
      configured: false,
    });
  }

  const authenticated = await isAdminAuthenticated();
  return NextResponse.json({
    ok: true,
    authenticated,
    configured: true,
  });
}
