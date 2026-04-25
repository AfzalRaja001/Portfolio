import { NextResponse } from "next/server";
import type { CodeChefStats } from "@/types";

export const revalidate = 3600;

const CODECHEF_USERNAME = process.env.CODECHEF_USERNAME || "";

function starsFromRating(r: number | null): number {
  if (r == null) return 0;
  if (r < 1400) return 1;
  if (r < 1600) return 2;
  if (r < 1800) return 3;
  if (r < 2000) return 4;
  if (r < 2200) return 5;
  if (r < 2500) return 6;
  return 7;
}

function toInt(s: string | undefined): number | null {
  if (!s) return null;
  const n = parseInt(s.replace(/,/g, ""), 10);
  return Number.isFinite(n) ? n : null;
}

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
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
          Accept:
            "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
          "Accept-Language": "en-US,en;q=0.9",
          "Accept-Encoding": "gzip, deflate, br",
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

    const currentRating = toInt(
      html.match(/class="rating-number"[^>]*>\s*(\d+)/)?.[1],
    );
    const highestRating = toInt(html.match(/Highest Rating\s*(\d+)/i)?.[1]);
    const globalRank = toInt(
      html.match(/rating-ranks[\s\S]{0,200}?(\d+)\s*Global Rank/i)?.[1],
    );

    const stars = starsFromRating(currentRating);

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
