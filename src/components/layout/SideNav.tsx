"use client";

import { useEffect, useState } from "react";
import type { Section } from "@/types";

const ROW_HEIGHT = 36;

interface Props {
  sections: Section[];
}

export function SideNav({ sections }: Props) {
  const [active, setActive] = useState<string>(sections[0].id);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let raf = 0;
    const tick = () => {
      raf = requestAnimationFrame(tick);
      const vh = window.innerHeight;
      const gaze = window.scrollY + vh * 0.35;
      let cur = sections[0].id;
      let curStart = 0;
      let curEnd = vh;
      for (const s of sections) {
        const el = document.getElementById(s.id);
        if (!el) continue;
        const top = el.offsetTop;
        const h = el.offsetHeight;
        if (gaze >= top) {
          cur = s.id;
          curStart = top;
          curEnd = top + h;
        }
      }
      setActive(cur);
      setProgress(
        Math.max(0, Math.min(1, (gaze - curStart) / Math.max(1, curEnd - curStart))),
      );
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [sections]);

  return (
    <nav className="sidenav" aria-label="Sections">
      <ul
        style={{
          listStyle: "none",
          margin: 0,
          padding: 0,
          display: "flex",
          flexDirection: "column",
          gap: 0,
        }}
      >
        {sections.map((s, i) => {
          const isActive = s.id === active;
          return (
            <li
              key={s.id}
              style={{
                height: ROW_HEIGHT,
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
                gap: 14,
              }}
            >
              <a
                href={`#${s.id}`}
                style={{
                  textDecoration: "none",
                  fontFamily: "var(--mono)",
                  fontSize: 10,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: isActive ? "var(--ink)" : "var(--ink-3)",
                  transition: "all .35s cubic-bezier(.2,.85,.2,1)",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 10,
                  opacity: isActive ? 1 : 0.7,
                }}
              >
                <span
                  style={{
                    fontSize: 9,
                    color: isActive ? "var(--accent)" : "var(--ink-4)",
                    minWidth: 14,
                    textAlign: "right",
                    fontWeight: 500,
                    transition: "color .3s ease",
                  }}
                >
                  {String(i).padStart(2, "0")}
                </span>
                <span
                  style={{
                    minWidth: 84,
                    textAlign: "right",
                    color: isActive ? "var(--ink)" : "inherit",
                    fontWeight: isActive ? 500 : 400,
                    transition: "color .3s ease",
                  }}
                >
                  {s.label}
                </span>
              </a>

              <div
                style={{
                  position: "relative",
                  width: 42,
                  height: 2,
                  background: isActive
                    ? "color-mix(in oklab, var(--ink) 10%, transparent)"
                    : "color-mix(in oklab, var(--ink) 8%, transparent)",
                  borderRadius: 2,
                  overflow: "visible",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    left: 0,
                    top: 0,
                    bottom: 0,
                    width: isActive ? `${6 + progress * 36}px` : "6px",
                    background: isActive
                      ? "var(--accent)"
                      : "color-mix(in oklab, var(--ink) 30%, transparent)",
                    borderRadius: 2,
                    boxShadow: isActive
                      ? "0 0 10px color-mix(in oklab, var(--accent) 60%, transparent)"
                      : "none",
                    transition: "all .45s cubic-bezier(.2,.85,.2,1)",
                  }}
                />
                {isActive && (
                  <div
                    style={{
                      position: "absolute",
                      left: `${6 + progress * 36 - 4}px`,
                      top: "50%",
                      width: 8,
                      height: 8,
                      marginTop: -4,
                      borderRadius: "50%",
                      background: "var(--accent)",
                      boxShadow:
                        "0 0 14px color-mix(in oklab, var(--accent) 80%, transparent)",
                      transition: "left .18s linear",
                    }}
                  />
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
