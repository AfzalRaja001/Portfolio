"use client";

import { useEffect, useRef } from "react";
import { SKILLS } from "@/data/skills";

export function About() {
  const paneRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const pane = paneRef.current;
    if (!pane) return;
    let raf = 0;
    const cursor = { x: 0, y: 0, active: false };

    const onMove = (e: MouseEvent) => {
      const r = pane.getBoundingClientRect();
      cursor.x = e.clientX - (r.left + r.width / 2);
      cursor.y = e.clientY - (r.top + r.height / 2);
      cursor.active = true;
    };

    const onLeave = () => {
      cursor.active = false;
    };

    const tick = () => {
      raf = requestAnimationFrame(tick);
      const bubbles = pane.querySelectorAll<HTMLElement>(".bubble");
      bubbles.forEach((b, i) => {
        const factor = ((i % 5) / 5) * 0.5 + 0.2;
        const tx = cursor.active ? cursor.x * 0.015 * factor : 0;
        const ty = cursor.active ? cursor.y * 0.015 * factor : 0;
        b.style.setProperty("--px", `${tx}px`);
        b.style.setProperty("--py", `${ty}px`);
      });
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    pane.addEventListener("mouseleave", onLeave);
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      pane.removeEventListener("mouseleave", onLeave);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section id="about" className="screen" data-screen-label="02 About">
      <div className="about-head">
        <span className="num">01</span>
        <span className="label">About · Who&apos;s Behind the Keyboard</span>
      </div>

      <div className="about-grid">
        <div className="about-narrative">
          <h2>
            A student who treats code like a <em>craft</em> and problems
            like puzzles worth losing sleep over.
          </h2>

          <div className="about-para">
            <span className="idx">01</span>
            <p>
              I&apos;m <strong>Mohammed Afzal Raja</strong>, a pre-final year
              at <strong>IIIT Allahabad</strong> studying IT with a{" "}
              <em style={{ color: "var(--ink)" }}>Business Informatics</em>{" "}
              specialization. My day usually starts on Leetcode and ends
              inside a{" "}
              <span className="mark-accent"> model weight </span>
              or a half-written React component.
            </p>
          </div>

          <div className="about-para">
            <span className="idx">02</span>
            <p>
              I work where <strong>algorithms</strong>, <strong>AI</strong>,
              and <strong>good product craft</strong> overlap — tight Java for
              CP, full-stack apps that feel deliberate. Performance, clean
              abstractions, and interfaces that respect your time.
            </p>
          </div>

          <div className="about-para">
            <span className="idx">03</span>
            <p>
              Off-clock, I&apos;m reading LLM papers, tearing apart
              open-source repos, or mentoring juniors through DSA. Looking for
              a{" "}
              <span className="mark-accent"> summer &apos;27 internship </span>
              to do serious engineering alongside people who&apos;ve built
              real systems.
            </p>
          </div>

          <div className="about-signature">
            <span className="line" />
            <span>— Afzal</span>
          </div>
        </div>

        <div className="skill-pane" ref={paneRef}>
          <div className="skill-pane-head">
            <span className="dot" />
            <span>Toolkit · What I Reach For</span>
            <span className="line" />
          </div>

          <div className="skill-categories">
            {SKILLS.map((group, gi) => (
              <div key={group.cat} className="skill-cat">
                <div className="cat-head">
                  <span className="dot" />
                  <span>{group.cat}</span>
                  <span className="count">
                    {String(group.items.length).padStart(2, "0")}
                  </span>
                  <span className="line" />
                </div>
                <div className="bubbles">
                  {group.items.map((s, i) => (
                    <span
                      key={s.name}
                      className={`bubble ${s.size ?? ""}`.trim()}
                      style={
                        {
                          "--delay": `${gi * 0.4 + i * 0.15}s`,
                        } as React.CSSProperties
                      }
                    >
                      <span>{s.name}</span>
                      <span className="lvl">· {s.lvl}</span>
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
