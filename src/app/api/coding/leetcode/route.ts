import { NextResponse } from "next/server";
import type { LeetCodeStats } from "@/types";

export const revalidate = 3600;

const LEETCODE_USERNAME = process.env.LEETCODE_USERNAME || "Afzal__1";

const QUERY = `
  query userData($username: String!) {
    matchedUser(username: $username) {
      username
      profile { ranking realName }
    }
    userContestRanking(username: $username) {
      attendedContestsCount
      rating
      globalRanking
      topPercentage
      badge { name }
    }
    userContestRankingHistory(username: $username) {
      attended
      rating
    }
  }
`;

export async function GET() {
  try {
    const res = await fetch("https://leetcode.com/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Referer: `https://leetcode.com/${LEETCODE_USERNAME}/`,
      },
      body: JSON.stringify({
        query: QUERY,
        variables: { username: LEETCODE_USERNAME },
      }),
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      return NextResponse.json(
        { error: `LeetCode API returned ${res.status}` },
        { status: 502 },
      );
    }

    const json = await res.json();
    const user = json.data?.matchedUser;
    const contest = json.data?.userContestRanking;
    const history: Array<{ attended: boolean; rating: number }> =
      json.data?.userContestRankingHistory ?? [];

    if (!user) {
      return NextResponse.json(
        { error: `LeetCode user "${LEETCODE_USERNAME}" not found` },
        { status: 404 },
      );
    }

    const attendedRatings = history
      .filter((h) => h.attended)
      .map((h) => Math.round(h.rating));
    const highestRating = attendedRatings.length
      ? Math.max(...attendedRatings)
      : null;

    const data: LeetCodeStats = {
      username: user.username,
      profileUrl: `https://leetcode.com/${user.username}/`,
      currentRating: contest ? Math.round(contest.rating) : null,
      highestRating,
      globalRank: contest?.globalRanking ?? null,
      title: contest?.badge?.name ?? null,
      contestsAttended: contest?.attendedContestsCount ?? 0,
    };

    return NextResponse.json(data);
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch LeetCode stats" },
      { status: 500 },
    );
  }
}
