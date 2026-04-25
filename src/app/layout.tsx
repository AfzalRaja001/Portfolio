import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Afzal Raja — Portfolio",
  description:
    "Mohammed Afzal Raja — pre-final year B.Tech student at IIIT Allahabad. Building things at the intersection of GenAI, full-stack engineering, and competitive programming.",
};

/**
 * Inline blocking script that runs BEFORE the body paints.
 * Reads ?theme= URL param + localStorage to pick a theme, then sets
 * data-theme and data-palette on <body>. Without this, light/dark would
 * flicker on first paint while React mounts.
 */
const themeInitScript = `
(function () {
  var THEME_TO_PALETTE = { light: 'sage', dark: 'plum' };
  var theme = 'light';
  try {
    var url = new URL(location.href);
    var qp = url.searchParams.get('theme');
    var ls = localStorage.getItem('portfolio-theme');
    if (qp === 'light' || qp === 'dark') theme = qp;
    else if (ls === 'light' || ls === 'dark') theme = ls;
  } catch (e) {}
  document.body.setAttribute('data-theme', theme);
  document.body.setAttribute('data-palette', THEME_TO_PALETTE[theme]);
})();
`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,300;12..96,400;12..96,500;12..96,600;12..96,700&family=Fraunces:ital,wght@0,300;0,400;0,500;0,600;1,400;1,500&family=Space+Grotesk:wght@300;400;500;600&family=JetBrains+Mono:wght@300;400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body data-palette="sage" data-theme="light">
        <script
          dangerouslySetInnerHTML={{ __html: themeInitScript }}
        />
        {children}
      </body>
    </html>
  );
}
