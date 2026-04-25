"use client";

import { Fragment, useEffect, useRef, useState } from "react";
import { POSITIONS } from "@/data/positions";
import type { Position } from "@/types";

function usePosInView<T extends HTMLElement>(
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

function PositionCard({
  pos,
  idx,
  total,
}: {
  pos: Position;
  idx: number;
  total: number;
}) {
  const ref = useRef<HTMLElement>(null);
  const seen = usePosInView(ref, 0.08);
  const roleSegments = pos.role.split("·");
  return (
    <article
      ref={ref}
      className={`pos-card ${seen ? "in" : ""} accent-${pos.accent}`.trim()}
      style={{ transitionDelay: `${idx * 90}ms` }}
    >
      <div className="pos-bg-num" aria-hidden="true">
        {String(idx + 1).padStart(2, "0")}
      </div>

      <div className="pos-card-inner">
        <div className="pos-tape">
          <span className="pos-tape-idx">
            {String(idx + 1).padStart(2, "0")} /{" "}
            {String(total).padStart(2, "0")}
          </span>
          <span className="pos-tape-dot" />
          <span className="pos-tape-kind">{pos.kind}</span>
          <span className="pos-tape-rule" />
          <span className="pos-tape-period">{pos.period}</span>
        </div>

        <div className="pos-head">
          <div className="pos-mark">
            <span>{pos.orgGlyph}</span>
          </div>

          <div className="pos-head-body">
            <div className="pos-org-line">
              <span className="pos-org">{pos.org}</span>
              <span className="pos-sep">·</span>
              <span className="pos-where">{pos.where}</span>
              <span className="pos-sep">·</span>
              <span className="pos-wing">{pos.wing}</span>
            </div>
            <h3 className="pos-role">
              {roleSegments.map((seg, i) =>
                i === 0 ? (
                  <em key={i}>{seg.trim()}</em>
                ) : (
                  <Fragment key={i}>
                    <span className="pos-role-dot">·</span>
                    {seg.trim()}
                  </Fragment>
                ),
              )}
            </h3>

            <div className="pos-chips">
              <span className="pos-chip primary">
                <span className="pos-chip-k">Domain</span>
                {pos.domain}
              </span>
              <span className="pos-chip">
                <span className="pos-chip-k">Term</span>
                {pos.periodShort}
              </span>
              <span className="pos-chip">
                <span className="pos-chip-k">At</span>
                {pos.where}
              </span>
            </div>
          </div>
        </div>

        <p className="pos-summary">{pos.summary}</p>

        <div className="pos-body">
          <ol className="pos-points">
            {pos.points.map((p, i) => (
              <li key={i} className="pos-point">
                <span className="pos-point-k">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="pos-point-arrow" aria-hidden="true">
                  <svg
                    viewBox="0 0 16 16"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M3 8h10M9 4l4 4-4 4" />
                  </svg>
                </span>
                <div className="pos-point-body">
                  <h4>{p.head}</h4>
                  <p>{p.body}</p>
                </div>
              </li>
            ))}
          </ol>

          <aside className="pos-aside">
            <div className="pos-stats">
              {pos.stats.map((s, i) => (
                <div key={i} className="pos-stat">
                  <div className="pos-stat-v">{s.v}</div>
                  <div className="pos-stat-k">{s.k}</div>
                </div>
              ))}
            </div>
            <div className="pos-meta">
              <div className="pos-meta-row">
                <span className="k">Role</span>
                <span className="v">{roleSegments[0].trim()}</span>
              </div>
              <div className="pos-meta-row">
                <span className="k">Body</span>
                <span className="v">{pos.org}</span>
              </div>
              <div className="pos-meta-row">
                <span className="k">Wing</span>
                <span className="v">{pos.wing}</span>
              </div>
              <div className="pos-meta-row last">
                <span className="k">Year</span>
                <span className="v num">{pos.period}</span>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </article>
  );
}

export function Positions() {
  const ref = useRef<HTMLElement>(null);
  const seen = usePosInView(ref, 0.04);
  return (
    <section
      id="positions"
      className="screen pos-screen"
      data-screen-label="08 Leadership"
      ref={ref}
    >
      <div className="pos-head-block">
        <div className="stub-label">
          <span className="num">07</span>
          <span>— Leadership</span>
        </div>
        <h2 className="pos-title-h">
          Communities I&apos;ve <em>helped run.</em>
        </h2>
        <p className="pos-sub-h">
          Three roles where I&apos;ve been more than a member — running
          hackathons, designing schedules, and keeping events moving on the
          ground.
        </p>

        <div className="pos-meta-strip">
          <div className="pos-meta-strip-cell">
            <span className="k">Roles</span>
            <span className="v">{POSITIONS.length}</span>
          </div>
          <div className="pos-meta-strip-cell">
            <span className="k">Span</span>
            <span className="v">2024 — 25</span>
          </div>
          <div className="pos-meta-strip-cell">
            <span className="k">Reached</span>
            <span className="v">
              100<em>+</em> juniors
            </span>
          </div>
          <div className="pos-meta-strip-cell">
            <span className="k">Bodies</span>
            <span className="v">GDC · Fest · Summit</span>
          </div>
        </div>
      </div>

      <div className={`pos-stack ${seen ? "in" : ""}`.trim()}>
        {POSITIONS.map((p, i) => (
          <PositionCard key={p.id} pos={p} idx={i} total={POSITIONS.length} />
        ))}
      </div>
    </section>
  );
}
