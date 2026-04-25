"use client";

import { useEffect, useState } from "react";

type Theme = "light" | "dark";
const THEME_TO_PALETTE: Record<Theme, string> = {
  light: "sage",
  dark: "plum",
};

function applyTheme(theme: Theme) {
  document.body.setAttribute("data-theme", theme);
  document.body.setAttribute("data-palette", THEME_TO_PALETTE[theme]);
  try {
    localStorage.setItem("portfolio-theme", theme);
  } catch {
    /* ignore */
  }
  // Notify the cursor-field canvas to re-read CSS palette vars
  (window as unknown as { __refreshPalette?: () => void }).__refreshPalette?.();
}

function SunIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}

export function TopBar() {
  const [theme, setTheme] = useState<Theme>("light");

  // Sync local state with what the inline init script wrote to <body>
  useEffect(() => {
    const current =
      (document.body.getAttribute("data-theme") as Theme | null) ?? "light";
    setTheme(current);
  }, []);

  const toggle = () => {
    const next: Theme = theme === "dark" ? "light" : "dark";
    setTheme(next);
    applyTheme(next);
  };

  return (
    <header className="topbar">
      <a href="#home" className="mark">
        <span className="glyph">A</span>
        Afzal <em>/ Raja</em>
      </a>
      <div className="right">
        <div className="meta">
          <span>
            <span className="live-dot" />
            Open to Summer &apos;27
          </span>
          <span>IIIT Allahabad · IN</span>
          <span>25.43°N · 81.84°E</span>
        </div>
        <button
          type="button"
          className="theme-toggle"
          aria-label="Toggle light or dark mode"
          title="Toggle theme"
          onClick={toggle}
        >
          <span className="track-icon left" aria-hidden="true">
            <SunIcon />
          </span>
          <span className="track-icon right" aria-hidden="true">
            <MoonIcon />
          </span>
          <span className="knob" aria-hidden="true">
            <span className="sun">
              <SunIcon />
            </span>
            <span className="moon">
              <MoonIcon />
            </span>
          </span>
        </button>
      </div>
    </header>
  );
}
