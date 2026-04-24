"use client";

import { useEffect, useRef, useState } from "react";
import { PROJECTS } from "@/data/projects";
import type { Project } from "@/types";

const EXTERNAL_HREF_RE = /^https?:\/\//i;
const ALLOWED_LOCAL_HREF_RE = /^(#|\/|mailto:|tel:)/i;

function normalizeProjectHref(href: string) {
  const value = href.trim();
  if (!value || value === "#") return "#";
  if (EXTERNAL_HREF_RE.test(value) || ALLOWED_LOCAL_HREF_RE.test(value)) {
    return value;
  }
  return `https://${value}`;
}

function ScreenshotFrame({ project }: { project: Project }) {
  if (project.screenshot) {
    return (
      <div className="proj-shot">
        <div className="proj-shot-tilt">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={project.screenshot} alt={`${project.name} screenshot`} />
        </div>
      </div>
    );
  }
  return (
    <div className="proj-shot">
      <div className="proj-shot-tilt proj-shot-empty">
        <div className="proj-drop">
          <div className="proj-drop-grid">
            {Array.from({ length: 96 }).map((_, i) => (
              <span key={i} />
            ))}
          </div>
          <div className="proj-drop-body">
            <div className="proj-drop-icon">
              <svg
                viewBox="0 0 32 32"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.2"
              >
                <rect x="4" y="6" width="24" height="20" rx="2" />
                <path d="M4 22l7-7 5 5 4-4 8 8" />
                <circle cx="22" cy="12" r="1.6" fill="currentColor" />
              </svg>
            </div>
            <div className="proj-drop-label">Drop screenshot</div>
            <div className="proj-drop-slug">{project.id}.png</div>
            <div className="proj-drop-hint">1600 × 1000 · png / webp</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ProjectCard({
  project,
  active,
}: {
  project: Project;
  active: boolean;
}) {
  return (
    <article
      className={`proj-card accent-${project.accent} ${active ? "is-active" : ""}`.trim()}
      data-screen-label={`04 Projects · ${project.name}`}
    >
      <div className="proj-bg-idx">{project.idx}</div>

      <div className="proj-card-inner">
        <header className="proj-head">
          <div className="proj-index">
            <span className="idx">{project.idx}</span>
            <span className="of">
              / {String(PROJECTS.length).padStart(2, "0")}
            </span>
          </div>
          <div className="proj-head-meta">
            <span className={`proj-status ${project.status}`}>
              <span className="status-dot" />
              <span>{project.status === "live" ? "Live" : project.status}</span>
            </span>
            <span className="proj-year">{project.year}</span>
          </div>
        </header>

        <div className="proj-title-block">
          <div className="proj-kicker">{project.tag}</div>
          <h3 className="proj-title">{project.name}</h3>
          <p className="proj-tagline">{project.tagline}</p>
        </div>

        <ScreenshotFrame project={project} />

        <div className="proj-body">
          <div className="proj-highlights">
            {project.highlights.map((h) => (
              <div className="proj-hl" key={h.k}>
                <span className="proj-hl-k">{h.k}</span>
                <div className="proj-hl-body">
                  <h4>{h.t}</h4>
                  <p>{h.body}</p>
                </div>
              </div>
            ))}
          </div>

          <aside className="proj-aside">
            <div className="proj-aside-row">
              <span className="k">Role</span>
              <span className="v">{project.role}</span>
            </div>
            <div className="proj-aside-row">
              <span className="k">Shipped</span>
              <span className="v">{project.year}</span>
            </div>

            <div className="proj-stat-grid">
              {project.stats.map((s) => (
                <div className="proj-stat-cell" key={s.k}>
                  <div className="sv">{s.v}</div>
                  <div className="sk">{s.k}</div>
                </div>
              ))}
            </div>

            <div className="proj-stack">
              <div className="t">Stack</div>
              <div className="tags">
                {project.stack.map((t) => (
                  <span
                    key={t}
                    className={`proj-tag ${project.stackPrim.includes(t) ? "prim" : ""}`.trim()}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div className="proj-links">
              {project.links.map((l) => {
                const href = normalizeProjectHref(l.href);
                const isPlaceholder = href === "#";
                const isExternal = EXTERNAL_HREF_RE.test(href);

                return (
                  <a
                    key={l.label}
                    href={href}
                    className={`proj-link ${l.kind} ${isPlaceholder ? "is-disabled" : ""}`.trim()}
                    target={isExternal ? "_blank" : undefined}
                    rel={isExternal ? "noopener noreferrer" : undefined}
                    aria-disabled={isPlaceholder}
                    onClick={isPlaceholder ? (e) => e.preventDefault() : undefined}
                  >
                    <span>{l.label}</span>
                    <svg
                      viewBox="0 0 12 12"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.4"
                    >
                      <path
                        d="M3 9L9 3M4 3h5v5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </a>
                );
              })}
            </div>
          </aside>
        </div>
      </div>
    </article>
  );
}

function NextSlot() {
  return (
    <article className="proj-card proj-next">
      <div className="proj-next-inner">
        <div className="proj-next-mark">
          <svg
            viewBox="0 0 40 40"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.2"
          >
            <circle cx="20" cy="20" r="19" strokeDasharray="3 4" />
            <path d="M20 13v14M13 20h14" strokeLinecap="round" />
          </svg>
        </div>
        <div className="proj-next-copy">
          <div className="k">
            {String(PROJECTS.length + 1).padStart(2, "0")} · open slot
          </div>
          <h3>Next project, incoming.</h3>
          <p>
            Building something now. This slot fills in as the commits pile up —
            the rail expands to fit whatever ships next.
          </p>
        </div>
      </div>
    </article>
  );
}

export function Projects() {
  const railRef = useRef<HTMLDivElement>(null);
  const [activeIdx, setActiveIdx] = useState(0);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;

    const onScroll = () => {
      const cards = rail.querySelectorAll<HTMLElement>(
        ".proj-card:not(.proj-next)",
      );
      let best = 0;
      let bestDist = Infinity;
      const center = rail.scrollLeft + rail.clientWidth / 2;
      cards.forEach((c, i) => {
        const cc = c.offsetLeft + c.offsetWidth / 2;
        const d = Math.abs(cc - center);
        if (d < bestDist) {
          bestDist = d;
          best = i;
        }
      });
      setActiveIdx(best);
      setCanPrev(rail.scrollLeft > 20);
      setCanNext(rail.scrollLeft + rail.clientWidth < rail.scrollWidth - 20);
    };

    onScroll();
    rail.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      rail.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const scrollTo = (i: number) => {
    const rail = railRef.current;
    if (!rail) return;
    const cards = rail.querySelectorAll<HTMLElement>(".proj-card");
    const target = cards[Math.max(0, Math.min(cards.length - 1, i))];
    if (target) {
      rail.scrollTo({
        left: target.offsetLeft - 80,
        behavior: "smooth",
      });
    }
  };

  const nudge = (dir: 1 | -1) => scrollTo(activeIdx + dir);

  return (
    <section
      id="projects"
      className="screen proj-screen"
      data-screen-label="04 Projects"
    >
      <div className="proj-head-outer">
        <div className="exp-head" style={{ marginBottom: 40 }}>
          <span className="num">03</span>
          <span className="label">Projects · Selected Work</span>
          <span className="count">
            <b>{String(PROJECTS.length).padStart(2, "0")}</b> shipped · more in
            flight
          </span>
        </div>

        <div className="proj-intro">
          <h2>
            Things I&apos;ve built when <em>nobody asked me to.</em>
          </h2>
          <p>
            A horizontal shelf — scroll, flip, or use the pager. Each card is a
            miniature case study: what it is, what&apos;s under the hood, and
            where to see it running.
          </p>
        </div>

        <div className="proj-pager">
          <div className="proj-pager-dots">
            {PROJECTS.map((_, i) => (
              <button
                key={i}
                className={`proj-dot ${activeIdx === i ? "on" : ""}`.trim()}
                onClick={() => scrollTo(i)}
                aria-label={`Go to project ${i + 1}`}
                type="button"
              >
                <span>{String(i + 1).padStart(2, "0")}</span>
              </button>
            ))}
          </div>
          <div className="proj-pager-counter">
            <span className="cur">
              {String(activeIdx + 1).padStart(2, "0")}
            </span>
            <span className="sep">/</span>
            <span className="tot">
              {String(PROJECTS.length).padStart(2, "0")}
            </span>
          </div>
          <div className="proj-pager-btns">
            <button
              className="proj-nav"
              onClick={() => nudge(-1)}
              disabled={!canPrev}
              aria-label="Previous project"
              type="button"
            >
              <svg
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path
                  d="M10 3L5 8l5 5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <button
              className="proj-nav"
              onClick={() => nudge(1)}
              disabled={!canNext}
              aria-label="Next project"
              type="button"
            >
              <svg
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path
                  d="M6 3l5 5-5 5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div className="proj-rail-wrap">
        <div className="proj-rail" ref={railRef}>
          <div className="proj-rail-pad" aria-hidden="true" />
          {PROJECTS.map((p, i) => (
            <ProjectCard key={p.id} project={p} active={activeIdx === i} />
          ))}
          <NextSlot />
          <div className="proj-rail-pad" aria-hidden="true" />
        </div>
      </div>

      <div className="proj-rail-hint">
        <span>scroll</span>
        <svg
          viewBox="0 0 40 8"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
        >
          <path d="M0 4h38M34 1l4 3-4 3" strokeLinecap="round" />
        </svg>
        <span>drag · or ← →</span>
      </div>
    </section>
  );
}
