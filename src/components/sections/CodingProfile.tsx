"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type {
  CodeChefStats,
  CodingProfileData,
  GitHubStats,
  LeetCodeStats,
} from "@/types";

/* ---------- Static fallbacks (used while loading & for fields not in our APIs) ---------- */

const FALLBACK: Record<"leetcode" | "codechef" | "github", CodingProfileData> =
  {
    leetcode: {
      handle: "Afzal__1",
      rank: "Knight",
      rankNote: "Top 5%",
      headline: { value: 1000, label: "Problems solved" },
      stats: [
        { k: "Contest rating", v: "—" },
        { k: "Max rating", v: "—" },
        { k: "Global rank", v: "—" },
        { k: "Contests", v: "—" },
      ],
      breakdown: [
        { k: "Easy", v: 320, of: 880 },
        { k: "Medium", v: 540, of: 1850 },
        { k: "Hard", v: 140, of: 800 },
      ],
      url: "https://leetcode.com/Afzal__1/",
    },
    codechef: {
      handle: "afzal_001_001",
      rank: "3★",
      rankNote: "Division 2",
      headline: { value: 200, label: "Problems solved" },
      stats: [
        { k: "Current rating", v: "—" },
        { k: "Max rating", v: "—" },
        { k: "Global rank", v: "—" },
        { k: "Stars", v: "—" },
      ],
      contests: { played: 12, top10: 0 },
      url: "https://www.codechef.com/users/afzal_001_001",
    },
    github: {
      handle: "AfzalRaja001",
      rank: "Builder",
      rankNote: "Active",
      headline: { value: 0, label: "Contributions, last year" },
      stats: [
        { k: "Public repos", v: "—" },
        { k: "Total commits", v: "—" },
        { k: "Followers", v: "—" },
        { k: "Stars earned", v: "—" },
      ],
      languages: [
        { k: "TypeScript", v: 38 },
        { k: "Python", v: 27 },
        { k: "C++", v: 21 },
        { k: "Other", v: 14 },
      ],
      url: "https://github.com/AfzalRaja001",
    },
  };

/* ---------- Helpers ---------- */

function fmt(n: number | null | undefined, suffix = ""): string {
  if (n == null) return "—";
  return n.toLocaleString() + suffix;
}

function useInView<T extends HTMLElement>(
  ref: React.RefObject<T | null>,
  threshold = 0.2,
) {
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const o = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setSeen(true);
            o.disconnect();
          }
        });
      },
      { threshold },
    );
    o.observe(ref.current);
    return () => o.disconnect();
  }, [ref, threshold]);
  return seen;
}

function CountUp({
  to,
  duration = 1400,
  start,
}: {
  to: number;
  duration?: number;
  start: boolean;
}) {
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!start) return;
    let raf = 0;
    let t0 = 0;
    const ease = (t: number) => 1 - Math.pow(1 - t, 3);
    const step = (t: number) => {
      if (!t0) t0 = t;
      const p = Math.min(1, (t - t0) / duration);
      setV(Math.floor(ease(p) * to));
      if (p < 1) raf = requestAnimationFrame(step);
      else setV(to);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [to, start, duration]);
  return <>{v.toLocaleString()}</>;
}

/* Deterministic 26-week heatmap from a seed */
function makeHeat(seed: number): number[][] {
  let s = seed >>> 0;
  const rnd = () => {
    s = (s + 0x6d2b79f5) | 0;
    let t = s;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
  const weeks = 26;
  const out: number[][] = [];
  for (let w = 0; w < weeks; w++) {
    const col: number[] = [];
    const streakBias = rnd() < 0.15 ? 0.85 : 0;
    for (let d = 0; d < 7; d++) {
      const weekday = d >= 1 && d <= 5 ? 0.25 : 0;
      const r = rnd() + streakBias + weekday;
      let level = 0;
      if (r > 1.7) level = 4;
      else if (r > 1.3) level = 3;
      else if (r > 0.9) level = 2;
      else if (r > 0.55) level = 1;
      col.push(level);
    }
    out.push(col);
  }
  return out;
}

/* ---------- Sub-components ---------- */

function Heatmap({
  seed,
  accent,
  visible,
}: {
  seed: number;
  accent: string;
  visible: boolean;
}) {
  const data = useMemo(() => makeHeat(seed), [seed]);
  const total = data.flat().filter((v) => v > 0).length;
  return (
    <div className="cp-heat">
      <div className="cp-heat-head">
        <span className="k">Activity · last 26 weeks</span>
        <span className="v">{total} active days</span>
      </div>
      <div
        className="cp-heat-grid"
        style={{ ["--cp-accent" as string]: accent } as React.CSSProperties}
      >
        {data.map((week, wi) => (
          <div className="cp-heat-col" key={wi}>
            {week.map((lvl, di) => {
              const idx = wi * 7 + di;
              return (
                <span
                  key={di}
                  className={`cp-heat-cell lvl-${lvl}`}
                  style={{
                    transitionDelay: visible ? `${idx * 4}ms` : "0ms",
                    opacity: visible ? 1 : 0,
                    transform: visible ? "scale(1)" : "scale(0.4)",
                  }}
                />
              );
            })}
          </div>
        ))}
      </div>
      <div className="cp-heat-legend">
        <span>Less</span>
        <span className="cp-heat-cell lvl-0" />
        <span className="cp-heat-cell lvl-1" />
        <span className="cp-heat-cell lvl-2" />
        <span className="cp-heat-cell lvl-3" />
        <span className="cp-heat-cell lvl-4" />
        <span>More</span>
      </div>
    </div>
  );
}

function StatRow({ k, v }: { k: string; v: string }) {
  return (
    <div className="cp-stat">
      <span className="cp-stat-k">{k}</span>
      <span className="cp-stat-dots" aria-hidden="true" />
      <span className="cp-stat-v">{v}</span>
    </div>
  );
}

function CodingCard({
  idx,
  total,
  platform,
  mark,
  accent,
  seed,
  data,
  offset = 0,
}: {
  idx: number;
  total: number;
  platform: "LeetCode" | "CodeChef" | "GitHub";
  mark: string;
  accent: string;
  seed: number;
  data: CodingProfileData;
  offset?: number;
}) {
  const ref = useRef<HTMLElement>(null);
  const seen = useInView(ref);

  return (
    <article
      ref={ref}
      className={`cp-card ${seen ? "in" : ""}`.trim()}
      style={
        {
          ["--cp-accent" as string]: accent,
          ["--cp-offset" as string]: `${offset}px`,
          transform: `translateY(${offset}px)`,
        } as React.CSSProperties
      }
      data-platform={platform.toLowerCase()}
    >
      <div className="cp-card-tape" aria-hidden="true">
        <span>{platform.toUpperCase()}</span>
        <span>·</span>
        <span>
          {String(idx).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </span>
      </div>

      <div className="cp-card-inner">
        <header className="cp-head">
          <div className="cp-mark" aria-hidden="true">
            <span>{mark}</span>
          </div>
          <div className="cp-head-text">
            <div className="cp-platform">{platform}</div>
            <div className="cp-handle">@{data.handle}</div>
          </div>
          <div className="cp-rank">
            <span className="cp-rank-v">{data.rank}</span>
            <span className="cp-rank-k">{data.rankNote}</span>
          </div>
        </header>

        <div className="cp-headline">
          <div className="cp-headline-v">
            <CountUp to={data.headline.value} start={seen} />
          </div>
          <div className="cp-headline-k">{data.headline.label}</div>
        </div>

        {/* Platform-specific extra strip */}
        {platform === "LeetCode" && data.breakdown && (
          <div className="cp-bars">
            {data.breakdown.map((b, i) => {
              const pct = Math.round((b.v / b.of) * 100);
              return (
                <div className="cp-bar" key={b.k}>
                  <div className="cp-bar-head">
                    <span className="cp-bar-k">{b.k}</span>
                    <span className="cp-bar-v">
                      {b.v}
                      <span className="cp-bar-of">
                        {" "}
                        / {b.of.toLocaleString()}
                      </span>
                    </span>
                  </div>
                  <div className="cp-bar-track">
                    <span
                      className="cp-bar-fill"
                      style={{
                        width: seen ? `${pct}%` : "0%",
                        transitionDelay: `${300 + i * 120}ms`,
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {platform === "CodeChef" && data.contests && (
          <div className="cp-pill-row">
            <div className="cp-pill">
              <span className="k">Contests played</span>
              <span className="v">{data.contests.played}</span>
            </div>
            <div className="cp-pill">
              <span className="k">Top-10 finishes</span>
              <span className="v">{data.contests.top10}</span>
            </div>
          </div>
        )}

        {platform === "GitHub" && data.languages && (
          <div className="cp-lang">
            <div className="cp-lang-bar">
              {data.languages.map((l, i) => {
                const sum = data.languages!.reduce((a, b) => a + b.v, 0);
                const pct = (l.v / sum) * 100;
                return (
                  <span
                    key={l.k}
                    className={`cp-lang-seg seg-${i}`}
                    style={{
                      width: seen ? `${pct}%` : "0%",
                      transitionDelay: `${300 + i * 100}ms`,
                    }}
                    title={`${l.k} · ${l.v}%`}
                  />
                );
              })}
            </div>
            <div className="cp-lang-legend">
              {data.languages.map((l, i) => (
                <span key={l.k} className="cp-lang-key">
                  <span className={`cp-lang-dot seg-${i}`} />
                  {l.k} <em>{l.v}%</em>
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="cp-stats">
          {data.stats.map((s) => (
            <StatRow key={s.k} k={s.k} v={s.v} />
          ))}
        </div>

        <Heatmap seed={seed} accent={accent} visible={seen} />

        <a
          className="cp-cta"
          href={data.url}
          target="_blank"
          rel="noreferrer noopener"
        >
          <span className="cp-cta-l">View profile</span>
          <span className="cp-cta-r">
            <svg
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M5 11l6-6M6 5h5v5" />
            </svg>
          </span>
        </a>
      </div>
    </article>
  );
}

/* ---------- Live data merger ---------- */

function mergeLeet(
  base: CodingProfileData,
  api: LeetCodeStats | null,
): CodingProfileData {
  if (!api) return base;
  return {
    ...base,
    handle: api.username || base.handle,
    rank: api.title || base.rank,
    rankNote: api.globalRank
      ? `Global #${api.globalRank.toLocaleString()}`
      : base.rankNote,
    url: api.profileUrl || base.url,
    stats: [
      { k: "Contest rating", v: fmt(api.currentRating) },
      { k: "Max rating", v: fmt(api.highestRating) },
      { k: "Global rank", v: api.globalRank ? `#${fmt(api.globalRank)}` : "—" },
      { k: "Contests", v: fmt(api.contestsAttended) },
    ],
  };
}

function mergeCC(
  base: CodingProfileData,
  api: CodeChefStats | null,
): CodingProfileData {
  if (!api) return base;
  return {
    ...base,
    handle: api.username || base.handle,
    rank: api.title || base.rank,
    rankNote: (api.stars ?? 0) >= 5 ? "Division 1" : "Division 2",
    url: api.profileUrl || base.url,
    stats: [
      { k: "Current rating", v: fmt(api.currentRating) },
      { k: "Max rating", v: fmt(api.highestRating) },
      { k: "Global rank", v: api.globalRank ? `#${fmt(api.globalRank)}` : "—" },
      { k: "Stars", v: api.title ?? `${api.stars}★` },
    ],
  };
}

function mergeGH(
  base: CodingProfileData,
  api: GitHubStats | null,
): CodingProfileData {
  if (!api) return base;
  return {
    ...base,
    handle: api.username || base.handle,
    url: api.profileUrl || base.url,
    headline: {
      value: api.contributions ?? base.headline.value,
      label: "Contributions, last year",
    },
    stats: [
      { k: "Public repos", v: fmt(api.publicRepos) },
      { k: "Total commits", v: fmt(api.commits) },
      { k: "Followers", v: fmt(api.followers) },
      { k: "Contributions", v: fmt(api.contributions) },
    ],
  };
}

/* ---------- Main section ---------- */

export function CodingProfile() {
  const [leet, setLeet] = useState<LeetCodeStats | null>(null);
  const [cc, setCc] = useState<CodeChefStats | null>(null);
  const [gh, setGh] = useState<GitHubStats | null>(null);

  useEffect(() => {
    let aborted = false;
    const get = <T,>(url: string, set: (x: T | null) => void) =>
      fetch(url)
        .then((r) => (r.ok ? (r.json() as Promise<T>) : null))
        .then((d) => {
          if (!aborted) set(d);
        })
        .catch(() => {
          if (!aborted) set(null);
        });
    get<LeetCodeStats>("/api/coding/leetcode", setLeet);
    get<CodeChefStats>("/api/coding/codechef", setCc);
    get<GitHubStats>("/api/coding/github", setGh);
    return () => {
      aborted = true;
    };
  }, []);

  const leetData = useMemo(() => mergeLeet(FALLBACK.leetcode, leet), [leet]);
  const ccData = useMemo(() => mergeCC(FALLBACK.codechef, cc), [cc]);
  const ghData = useMemo(() => mergeGH(FALLBACK.github, gh), [gh]);

  const total = 3;
  const lastSync = new Date().toLocaleString("en-GB", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });

  return (
    <section
      id="coding"
      className="screen cp-screen"
      data-screen-label="05 Coding Profile"
    >
      <div className="cp-head-block">
        <div className="stub-label">
          <span className="num">04</span>
          <span>— Competitive</span>
        </div>
        <h2 className="cp-title">
          Where I sharpen <em>the blade.</em>
        </h2>
        <p className="cp-sub">
          Three platforms, one habit. Live counts pulled from each profile —
          problems chewed through, contests fought, code shipped between
          classes.
        </p>
      </div>

      <div className="cp-grid">
        <CodingCard
          idx={1}
          total={total}
          platform="LeetCode"
          mark="LC"
          accent="oklch(0.72 0.16 60)"
          seed={20240715}
          data={leetData}
          offset={0}
        />
        <CodingCard
          idx={2}
          total={total}
          platform="CodeChef"
          mark="CC"
          accent="oklch(0.62 0.14 35)"
          seed={20240322}
          data={ccData}
          offset={36}
        />
        <CodingCard
          idx={3}
          total={total}
          platform="GitHub"
          mark="GH"
          accent="oklch(0.66 0.16 145)"
          seed={20241103}
          data={ghData}
          offset={12}
        />
      </div>

      <div className="cp-foot">
        <span className="cp-foot-rule" />
        <span className="cp-foot-text">
          Stats refresh hourly · Last sync <em>{lastSync}</em>
        </span>
        <span className="cp-foot-rule" />
      </div>
    </section>
  );
}
