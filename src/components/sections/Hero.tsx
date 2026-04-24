"use client";

import { useEffect, useRef } from "react";

export function Hero() {
  const btnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const el = btnRef.current;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      el.style.setProperty("--mx", `${e.clientX - r.left}px`);
      el.style.setProperty("--my", `${e.clientY - r.top}px`);
    };
    el.addEventListener("mousemove", onMove);
    return () => el.removeEventListener("mousemove", onMove);
  }, []);

  const handlePrimary = () => {
    const el =
      document.getElementById("contact") || document.getElementById("positions");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const handleAbout = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="home" className="screen" data-screen-label="01 Home">
      <div className="hero">
        <div className="kicker">
          <span className="accent-sq" />
          <span>Portfolio · Vol. 01 · MMXXVI</span>
          <span className="rule" />
          <span>IIIT Allahabad</span>
        </div>

        <h1>
          <span className="line d1">
            <span>Hi,&nbsp;I&apos;m</span>
          </span>
          <span className="line d2">
            <span className="name">
              Afzal<span className="dot">.</span>
            </span>
          </span>
        </h1>

        <div className="role">
          <span>Pre-final year, B.Tech</span>
          <span className="sep" />
          <span>Information Technology · Business Informatics</span>
          <span className="sep" />
          <span style={{ color: "var(--accent)" }}>Class of 2028</span>
        </div>

        <p className="intro">
          I build things that are fast, thoughtful, and occasionally weird —
          systems that reason, interfaces that feel, and algorithms that land in
          the{" "}
          <span
            style={{
              color: "var(--accent)",
              fontFamily: "var(--display)",
              fontStyle: "italic",
              fontSize: "1.08em",
              fontWeight: 500,
            }}
          >
            top 1%
          </span>
          . Currently focused on competitive programming, GenAI / ML systems,
          and full-stack engineering.
        </p>

        <div className="cta-row">
          <button
            ref={btnRef}
            className="btn-primary"
            onClick={handlePrimary}
            type="button"
          >
            <span>Get in touch</span>
            <span className="arrow">
              <svg
                viewBox="0 0 12 12"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              >
                <path d="M2 6 H10" />
                <path d="M7 3 L10 6 L7 9" />
              </svg>
            </span>
          </button>

          <a className="btn-ghost" href="#about" onClick={handleAbout}>
            <span className="code">[ 01 ]</span>
            <span>A little about me</span>
          </a>
        </div>

        <div className="footprint" aria-hidden="true">
          <div>
            <span className="k">Focus</span>
            <b>GenAI · Systems · Interfaces</b>
          </div>
          <div>
            <span className="k">Currently</span>
            <b>Building — always</b>
          </div>
          <div>
            <span className="k">Status</span>
            <b>Open to Summer &apos;27</b>
          </div>
        </div>
      </div>
    </section>
  );
}
