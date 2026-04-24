import { NextResponse, type NextRequest } from "next/server";

export const config = {
  matcher: "/api/coding/:path*",
};

function hostOf(value: string): string {
  try {
    return new URL(value).host;
  } catch {
    return value.trim();
  }
}

export function middleware(req: NextRequest) {
  if (process.env.NODE_ENV !== "production") {
    return NextResponse.next();
  }

  const apiKey = process.env.CODING_API_KEY;
  if (apiKey && req.headers.get("x-api-key") === apiKey) {
    return NextResponse.next();
  }

  const allowedHosts = (process.env.ALLOWED_ORIGINS || "")
    .split(",")
    .map((s) => hostOf(s))
    .filter(Boolean);

  const reqOrigin =
    req.headers.get("origin") || req.headers.get("referer") || "";
  const reqHost = reqOrigin ? hostOf(reqOrigin) : "";

  if (reqHost && allowedHosts.includes(reqHost)) {
    return NextResponse.next();
  }

  return NextResponse.json({ error: "Forbidden" }, { status: 403 });
}
