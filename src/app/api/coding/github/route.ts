import { NextResponse } from "next/server";
import type { GitHubStats } from "@/types";

export const revalidate = 3600;

const GITHUB_USERNAME = process.env.GITHUB_USERNAME || "AfzalRaja001";
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

function authHeaders(accept: string): Record<string, string> {
  const headers: Record<string, string> = {
    Accept: accept,
    "User-Agent": "portfolio-app",
  };
  if (GITHUB_TOKEN) headers.Authorization = `Bearer ${GITHUB_TOKEN}`;
  return headers;
}

async function fetchContributions(username: string): Promise<number | null> {
  try {
    const res = await fetch(
      `https://github.com/users/${username}/contributions`,
      {
        headers: { "User-Agent": "portfolio-app" },
        next: { revalidate: 3600 },
      },
    );
    if (!res.ok) return null;
    const html = await res.text();
    const m = html.match(/([\d,]+)\s+contributions?\s+in\s+the\s+last\s+year/i);
    return m ? parseInt(m[1].replace(/,/g, ""), 10) : null;
  } catch {
    return null;
  }
}

async function fetchCommitCount(username: string): Promise<number | null> {
  try {
    const res = await fetch(
      `https://api.github.com/search/commits?q=author:${encodeURIComponent(
        username,
      )}&per_page=1`,
      {
        headers: authHeaders("application/vnd.github.cloak-preview+json"),
        next: { revalidate: 3600 },
      },
    );
    if (!res.ok) return null;
    const json = await res.json();
    return typeof json.total_count === "number" ? json.total_count : null;
  } catch {
    return null;
  }
}

export async function GET() {
  try {
    const userRes = await fetch(
      `https://api.github.com/users/${GITHUB_USERNAME}`,
      {
        headers: authHeaders("application/vnd.github+json"),
        next: { revalidate: 3600 },
      },
    );

    if (!userRes.ok) {
      return NextResponse.json(
        { error: `GitHub returned ${userRes.status}` },
        { status: 502 },
      );
    }

    const user = await userRes.json();

    const [contributions, commits] = await Promise.all([
      fetchContributions(GITHUB_USERNAME),
      fetchCommitCount(GITHUB_USERNAME),
    ]);

    const data: GitHubStats = {
      username: user.login,
      profileUrl: user.html_url,
      publicRepos: user.public_repos ?? 0,
      followers: user.followers ?? 0,
      contributions,
      commits,
    };

    return NextResponse.json(data);
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch GitHub stats" },
      { status: 500 },
    );
  }
}
