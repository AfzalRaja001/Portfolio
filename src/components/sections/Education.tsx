"use client";

import { useEffect, useRef, useState } from "react";
import { EDUCATION } from "@/data/education";
import type { CourseEntry } from "@/types";

function useEduInView<T extends HTMLElement>(
  ref: React.RefObject<T | null>,
  threshold = 0.18,
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

function CgpaCounter({
  to,
  scale,
  start,
}: {
  to: number;
  scale: number;
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
      const p = Math.min(1, (t - t0) / 1500);
      setV(ease(p) * to);
      if (p < 1) raf = requestAnimationFrame(step);
      else setV(to);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [to, start]);
  return (
    <>
      {v.toFixed(2)}
      <span className="edu-scale">/{scale}</span>
    </>
  );
}

function CourseRow({
  idx,
  course,
  max,
  visible,
}: {
  idx: number;
  course: CourseEntry;
  max: number;
  visible: boolean;
}) {
  const pct = (course.cg / max) * 100;
  const isPerfect = course.cg >= 10;
  return (
    <div
      className={`edu-course ${isPerfect ? "perfect" : ""}`.trim()}
      style={{ transitionDelay: `${idx * 60}ms` }}
    >
      <div className="edu-course-num">{String(idx + 1).padStart(2, "0")}</div>
      <div className="edu-course-code">{course.code}</div>
      <div className="edu-course-name">{course.name}</div>
      <div className="edu-course-track">
        <span
          className="edu-course-fill"
          style={{
            width: visible ? `${pct}%` : "0%",
            transitionDelay: `${300 + idx * 80}ms`,
          }}
        />
      </div>
      <div className="edu-course-cg">
        <span className="cg-v">{course.cg.toFixed(1)}</span>
        <span className="cg-of">/10</span>
      </div>
    </div>
  );
}

export function Education() {
  const ref = useRef<HTMLElement>(null);
  const seen = useEduInView(ref);
  const max = 10;
  const perfect = EDUCATION.coursework.filter((c) => c.cg >= 10).length;
  const avg =
    EDUCATION.coursework.reduce((a, b) => a + b.cg, 0) /
    EDUCATION.coursework.length;

  return (
    <section
      id="education"
      className="screen edu-screen"
      data-screen-label="06 Education"
      ref={ref}
    >
      <div className="edu-head-block">
        <div className="stub-label">
          <span className="num">05</span>
          <span>— Formal</span>
        </div>
        <h2 className="edu-title">
          The paperwork <em>version.</em>
        </h2>
        <p className="edu-sub">
          Engineering with a quiet obsession for the math underneath. Below —
          the institution, the headline number, and the courses that pulled the
          most weight.
        </p>
      </div>

      <div className="edu-grid">
        {/* LEFT: institute card */}
        <div className="edu-institute">
          <div className="edu-tape">
            <span>ENROLLED</span>
            <span className="dot" />
            <span>{EDUCATION.span}</span>
            <span className="dot" />
            <span className="status">{EDUCATION.status}</span>
          </div>

          <div className="edu-crest" aria-hidden="true">
            <span className="edu-crest-mark">
              <svg
                viewBox="0 0 60 60"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M30 6 L52 18 L52 38 C52 48 30 56 30 56 C30 56 8 48 8 38 L8 18 Z" />
                <path d="M22 28 L30 22 L38 28 L38 38 L22 38 Z" />
                <path d="M30 22 L30 38" />
                <path d="M22 32 L38 32" />
              </svg>
            </span>
          </div>

          <div className="edu-inst-body">
            <div className="edu-loc">{EDUCATION.location}</div>
            <h3 className="edu-inst-name">
              {EDUCATION.institute}
              <span className="edu-inst-short">{EDUCATION.shortName}</span>
            </h3>

            <div className="edu-degree">
              <div className="edu-degree-row">
                <span className="k">Degree</span>
                <span className="v">
                  <strong>{EDUCATION.degree}</strong> <em>in</em>{" "}
                  {EDUCATION.major}
                </span>
              </div>
              <div className="edu-degree-row">
                <span className="k">Minor</span>
                <span className="v">
                  <em>{EDUCATION.minor}</em>
                </span>
              </div>
              <div className="edu-degree-row">
                <span className="k">Period</span>
                <span className="v">{EDUCATION.span}</span>
              </div>
            </div>
          </div>

          <div className="edu-cgpa">
            <div className="edu-cgpa-k">Cumulative GPA</div>
            <div className="edu-cgpa-v">
              <CgpaCounter
                to={EDUCATION.cgpa}
                scale={EDUCATION.cgpaScale}
                start={seen}
              />
            </div>
            <div className="edu-cgpa-meter" aria-hidden="true">
              <span
                className="edu-cgpa-fill"
                style={{
                  width: seen
                    ? `${(EDUCATION.cgpa / EDUCATION.cgpaScale) * 100}%`
                    : "0%",
                }}
              />
              <span className="edu-cgpa-tick" style={{ left: "90%" }}>
                <span className="edu-tick-label">9.0</span>
              </span>
            </div>
            <div className="edu-cgpa-note">
              <span className="dot live" />
              <span>
                Updated end of last semester · {perfect} perfect-10 courses
              </span>
            </div>
          </div>
        </div>

        {/* RIGHT: coursework */}
        <div className="edu-coursework">
          <div className="edu-cw-head">
            <div className="edu-cw-title">
              <span className="edu-cw-kicker">Coursework</span>
              <h3>
                Subjects that <em>shaped the year.</em>
              </h3>
            </div>
            <div className="edu-cw-legend">
              <span>
                <span className="dot perfect" /> 10/10
              </span>
              <span>
                <span className="dot strong" /> 9/10
              </span>
            </div>
          </div>

          <div className="edu-course-list">
            <div className="edu-course-headrow">
              <div>#</div>
              <div>Code</div>
              <div>Course</div>
              <div>Performance</div>
              <div>CG</div>
            </div>
            {EDUCATION.coursework.map((c, i) => (
              <CourseRow
                key={c.code}
                idx={i}
                course={c}
                max={max}
                visible={seen}
              />
            ))}
          </div>

          <div className="edu-cw-foot">
            <span>
              {EDUCATION.coursework.length} courses · avg{" "}
              <em>{avg.toFixed(2)}</em>
            </span>
            <span className="edu-cw-rule" />
            <span>Selected highlights · full transcript on request</span>
          </div>
        </div>
      </div>
    </section>
  );
}
