import { EXPERIENCES, RAIL_STOPS } from "@/data/experiences";
import type { Experience, RailStop } from "@/types";

function RailStopRow({ stop }: { stop: RailStop }) {
  return (
    <div className={`rail-stop ${stop.className ?? ""}`.trim()}>
      <div className="date">
        {stop.year ? <b>{stop.year}</b> : null}
        <span>{stop.when}</span>
      </div>
      <div className="marker">
        <span className="ring" />
      </div>
      <div className="stop-label">{stop.label}</div>
    </div>
  );
}

function ExperienceEntry({ exp }: { exp: Experience }) {
  return (
    <div className="exp-pane">
      <div className="exp-year">
        <span style={{ fontSize: "150.48px" }}>{exp.year}</span>
        {exp.yearEm ? <em>{exp.yearEm}</em> : null}
        <span className="season">{exp.season}</span>
      </div>

      <div className="exp-masthead">
        <div className="exp-company-mark">
          <span>{exp.mark}</span>
        </div>
        <div className="exp-company-info">
          <div className="co-name">
            <span>{exp.company}</span>
            <span className="out">↗ {exp.handle}</span>
          </div>
          <div className="co-tag">
            <span>{exp.engagement}</span>
            <span className="sep">·</span>
            <span>{exp.location}</span>
          </div>
        </div>
      </div>

      <h3 className="exp-role" style={{ fontSize: "60.616px" }}>
        {exp.role} <em>{exp.roleEm}</em>
      </h3>

      <div className="exp-meta-row">
        <span className="exp-chip primary">
          <svg
            className="ico"
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <circle cx="8" cy="8" r="6" />
            <path d="M8 4v4l2.5 2" strokeLinecap="round" />
          </svg>
          <span className="k">Dates</span>
          <span>
            {exp.start} → {exp.end}
          </span>
        </span>
        <span className="exp-chip">
          <svg
            className="ico"
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <path d="M8 14s5-4.5 5-8.5A5 5 0 0 0 3 5.5C3 9.5 8 14 8 14z" />
            <circle cx="8" cy="5.5" r="1.8" />
          </svg>
          <span className="k">Deployed</span>
          <span>{exp.deployment}</span>
        </span>
        <span className="exp-chip">
          <svg
            className="ico"
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <path d="M3 13V7l5-3 5 3v6" strokeLinejoin="round" />
            <path d="M6.5 13V9.5h3V13" />
          </svg>
          <span className="k">Base</span>
          <span>{exp.base}</span>
        </span>
      </div>

      <div className="exp-narr">
        <div className="exp-block">
          <span className="idx">01 · Brief</span>
          <div className="body">
            <h3>
              Prepare 100+ pre-final students for placement season — in four
              weeks.
            </h3>
            <p>
              Talentio deployed me to{" "}
              <strong>Mohan Babu University, Tirupati</strong> as a contracted
              trainer for their <em className="ink">fourth-year</em> cohort. The
              brief was simple on paper and hard in practice: take students with
              uneven exposure to data structures and get them interview-ready
              before recruiters arrived on campus.
            </p>
          </div>
        </div>

        <div className="exp-block">
          <span className="idx">02 · What I did</span>
          <div className="body">
            <h3>Rebuilt the fundamentals with problem-first sessions.</h3>
            <p>
              I ran daily classroom sessions covering arrays, strings, linked
              lists, trees, graphs, and DP — each built around a{" "}
              <strong>live problem</strong> pulled from actual interview sets.
              Students coded alongside, and we dissected mistakes on the board
              as they happened. The goal wasn&apos;t coverage; it was{" "}
              <em className="ink">muscle memory</em>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export function Experience() {
  const exp = EXPERIENCES[0];

  return (
    <section
      id="experience"
      className="screen"
      data-screen-label="03 Experience"
    >
      <div className="exp-head">
        <span className="num">02</span>
        <span className="label">Experience · Trajectory So Far</span>
        <span className="count">
          <b>01</b> role on record · more en route
        </span>
      </div>

      <div className="exp-grid">
        <div className="exp-rail">
          {RAIL_STOPS.map((s, i) => (
            <RailStopRow key={i} stop={s} />
          ))}
          <div className="rail-legend">
            <span className="arrow-down">↓</span> to be written
          </div>
        </div>

        <ExperienceEntry exp={exp} />
      </div>
    </section>
  );
}
