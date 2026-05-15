"use client";

import { useEffect, useRef, useState } from "react";

const CONTACTS = [
  {
    k: "LinkedIn",
    v: "in/afzal-raja",
    href: "https://www.linkedin.com/in/afzalraja001",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.95v5.66H9.36V9h3.41v1.56h.05c.47-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zm1.78 13.02H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z" />
      </svg>
    ),
  },
  {
    k: "GitHub",
    v: "@AfzalRaja001",
    href: "https://github.com/AfzalRaja001",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 .3a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2c-3.3.7-4-1.6-4-1.6-.6-1.4-1.4-1.8-1.4-1.8-1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1.1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.8-1.6-2.7-.3-5.5-1.3-5.5-6 0-1.3.5-2.4 1.2-3.2-.1-.3-.5-1.5.1-3.2 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0c2.3-1.5 3.3-1.2 3.3-1.2.7 1.7.2 2.9.1 3.2.8.8 1.2 1.9 1.2 3.2 0 4.6-2.8 5.6-5.5 5.9.4.4.8 1.1.8 2.3v3.4c0 .3.2.7.8.6A12 12 0 0 0 12 .3" />
      </svg>
    ),
  },
  {
    k: "Email",
    v: "ajjuraja30@gmail.com",
    href: "mailto:ajjuraja30@gmail.com",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="m3 7 9 6 9-6" />
      </svg>
    ),
  },
];

export function Hero() {
  const btnRef = useRef<HTMLButtonElement>(null);
  const popRef = useRef<HTMLDivElement>(null);
  const [contactOpen, setContactOpen] = useState(false);

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

  useEffect(() => {
    if (!contactOpen) return;
    const onDown = (e: MouseEvent) => {
      const t = e.target as Node;
      if (popRef.current?.contains(t) || btnRef.current?.contains(t)) return;
      setContactOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setContactOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [contactOpen]);

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
          I build fast, thoughtful systems — algorithms that land in the{" "}
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
          , interfaces that feel deliberate. Currently into competitive
          programming, GenAI, and full-stack engineering.
        </p>

        <div className="cta-row">
          <div className="contact-wrap">
            <button
              ref={btnRef}
              className="btn-primary"
              onClick={() => setContactOpen((v) => !v)}
              aria-expanded={contactOpen}
              aria-haspopup="menu"
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

            {contactOpen && (
              <div ref={popRef} className="contact-pop" role="menu">
                <div className="contact-pop-head">
                  <span className="k">Reach me</span>
                  <button
                    className="contact-pop-close"
                    onClick={() => setContactOpen(false)}
                    aria-label="Close"
                    type="button"
                  >
                    <svg
                      viewBox="0 0 12 12"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                    >
                      <path d="M3 3l6 6M9 3l-6 6" />
                    </svg>
                  </button>
                </div>
                {CONTACTS.map((c) => {
                  const isExternal = c.href.startsWith("http");
                  return (
                    <a
                      key={c.k}
                      className="contact-pop-row"
                      href={c.href}
                      target={isExternal ? "_blank" : undefined}
                      rel={isExternal ? "noopener noreferrer" : undefined}
                      role="menuitem"
                    >
                      <span className="contact-pop-icon">{c.icon}</span>
                      <span className="contact-pop-text">
                        <span className="contact-pop-k">{c.k}</span>
                        <span className="contact-pop-v">{c.v}</span>
                      </span>
                      <span className="contact-pop-arrow" aria-hidden="true">
                        <svg
                          viewBox="0 0 12 12"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.6"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M3 9L9 3M4 3h5v5" />
                        </svg>
                      </span>
                    </a>
                  );
                })}
              </div>
            )}
          </div>

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
