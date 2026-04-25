"use client";

import { useEffect, useRef, useState } from "react";
import { ACHIEVEMENTS } from "@/data/achievements";
import type { Achievement } from "@/types";

function useAchInView<T extends HTMLElement>(
  ref: React.RefObject<T | null>,
  threshold = 0.15,
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

function AchCard({
  ach,
  idx,
  total,
  visible,
}: {
  ach: Achievement;
  idx: number;
  total: number;
  visible: boolean;
}) {
  const ref = useRef<HTMLElement>(null);
  const seen = useAchInView(ref);
  const active = visible && seen;
  return (
    <article
      ref={ref}
      className={`ach-card ${active ? "in" : ""} accent-${ach.accent}`.trim()}
      style={{ transitionDelay: `${idx * 80}ms` }}
    >
      <div className="ach-bg-num" aria-hidden="true">
        {String(idx + 1).padStart(2, "0")}
      </div>

      <header className="ach-head">
        <span className="ach-kind">{ach.kind}</span>
        <span className="ach-rule" />
        <span className="ach-year">{ach.year}</span>
      </header>

      <div className="ach-title-row">
        <h3 className="ach-title">{ach.title}</h3>
      </div>

      <div className="ach-headline">
        <div className="ach-headline-v">{ach.headline}</div>
        <div className="ach-headline-note">
          <span className="ach-dot" />
          {ach.headlineNote}
        </div>
      </div>

      <p className="ach-sub">{ach.sub}</p>

      <div className="ach-metric">
        <div className="ach-metric-v">{ach.metric.v}</div>
        <div className="ach-metric-k">{ach.metric.k}</div>
        <div className="ach-metric-bar" aria-hidden="true">
          <span style={{ width: active ? `${ach.weight * 100}%` : "0%" }} />
        </div>
      </div>

      <footer className="ach-foot">
        <span className="ach-foot-idx">
          {String(idx + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </span>
        <span className="ach-foot-mark" aria-hidden="true">
          <svg
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M3 8l3 3 7-7" />
          </svg>
        </span>
      </footer>
    </article>
  );
}

export function Achievements() {
  const ref = useRef<HTMLElement>(null);
  const seen = useAchInView(ref, 0.05);
  return (
    <section
      id="achievements"
      className="screen ach-screen"
      data-screen-label="07 Achievements"
      ref={ref}
    >
      <div className="ach-head-block">
        <div className="stub-label">
          <span className="num">06</span>
          <span>— Milestones</span>
        </div>
        <h2 className="ach-title-h">
          Rankings, wins, <em>odd badges.</em>
        </h2>
        <p className="ach-sub-h">
          Numbers that took late nights to earn. National exams, hackathons, and
          a daily habit that out-stubborned a full semester.
        </p>
      </div>

      <div className="ach-grid">
        {ACHIEVEMENTS.map((a, i) => (
          <AchCard
            key={a.id}
            ach={a}
            idx={i}
            total={ACHIEVEMENTS.length}
            visible={seen}
          />
        ))}
      </div>
    </section>
  );
}
