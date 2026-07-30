import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/** Prefer apex host so Google does not split crawl signals across www / non-www. */
export function middleware(request: NextRequest) {
  const host = request.headers.get("host")?.toLowerCase() ?? "";

  if (host === "www.macombcode.com") {
    const url = request.nextUrl.clone();
    url.hostname = "macombcode.com";
    url.protocol = "https:";
    return NextResponse.redirect(url, 308);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};
