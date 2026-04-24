import { NextResponse } from "next/server";
import type { CodeChefStats } from "@/types";

export const revalidate = 3600;

const CODECHEF_USERNAME = process.env.CODECHEF_USERNAME || "";

export async function GET() {
  if (!CODECHEF_USERNAME) {
    return NextResponse.json(
      { error: "CODECHEF_USERNAME env var is not set" },
      { status: 500 },
    );
  }

  try {
    const res = await fetch(
      `https://www.codechef.com/users/${CODECHEF_USERNAME}`,
      {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (compatible; PortfolioBot/1.0; +https://github.com/)",
        },
        next: { revalidate: 3600 },
      },
    );

    if (!res.ok) {
      return NextResponse.json(
        { error: `CodeChef returned ${res.status}` },
        { status: 502 },
      );
    }

    const html = await res.text();

    const currentRating =
      parseInt(html.match(/<div class="rating-number"[^>]*>(\d+)/)?.[1] ?? "", 10) ||
      null;

    const highestRating =
      parseInt(html.match(/\(Highest Rating\s*(\d+)\)/i)?.[1] ?? "", 10) || null;

    const stars = (html.match(/<span class="rating"[^>]*>([★]+)<\/span>/)?.[1] ?? "")
      .length;

    const globalRankRaw =
      html.match(
        /<strong>([\d,]+|-)<\/strong>\s*<span[^>]*>\s*Global Rank/i,
      )?.[1] ?? "";
    const globalRank =
      globalRankRaw && globalRankRaw !== "-"
        ? parseInt(globalRankRaw.replace(/,/g, ""), 10)
        : null;

    const data: CodeChefStats = {
      username: CODECHEF_USERNAME,
      profileUrl: `https://www.codechef.com/users/${CODECHEF_USERNAME}`,
      currentRating,
      highestRating,
      globalRank,
      title: stars > 0 ? `${stars}★` : null,
      stars,
    };

    return NextResponse.json(data);
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch CodeChef stats" },
      { status: 500 },
    );
  }
}
