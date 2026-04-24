# Afzal Raja — Portfolio

A Next.js + TypeScript portfolio built from a Claude Design handoff.

## Stack

- **Next.js 15** (App Router)
- **React 18** + **TypeScript**
- Plain CSS with custom properties (5 palettes, no CSS framework)
- Canvas-based cursor-reactive background field

## Sections

Implemented:

- **Home** — `src/components/sections/Hero.tsx`
- **About** — `src/components/sections/About.tsx`
- **Experience** — `src/components/sections/Experience.tsx`
- **Projects** — `src/components/sections/Projects.tsx`

Placeholder (designs pending):

- Coding, Education, Achievements, Leadership — rendered via `PlaceholderSection`

## Project structure

```
src/
├── app/
│   ├── layout.tsx          Root HTML + fonts + palette attribute
│   ├── page.tsx            Page assembly (sections + effects)
│   └── globals.css         Palettes + all section styles
├── components/
│   ├── layout/
│   │   ├── TopBar.tsx
│   │   ├── SideNav.tsx     Scroll-linked vertical nav with progress bead
│   │   ├── CornerTicks.tsx
│   │   └── Grain.tsx
│   ├── sections/
│   │   ├── Hero.tsx
│   │   ├── About.tsx
│   │   ├── Experience.tsx
│   │   ├── Projects.tsx
│   │   └── PlaceholderSection.tsx
│   └── effects/
│       └── CursorField.tsx Canvas particle field (constellation / ripples / gridwarp)
├── data/
│   ├── sections.ts         Nav sections
│   ├── skills.ts           About section toolkit bubbles
│   ├── experiences.ts      Experience entries + timeline rail stops
│   └── projects.ts         Project cards
└── types/
    └── index.ts            Shared TS types
```

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Scripts

- `npm run dev` — dev server
- `npm run build` — production build
- `npm run start` — serve production build
- `npm run typecheck` — TypeScript check
- `npm run lint` — Next lint
