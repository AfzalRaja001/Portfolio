export type SectionId =
  | "home"
  | "about"
  | "experience"
  | "projects"
  | "coding"
  | "education"
  | "achievements"
  | "positions";

export interface Section {
  id: SectionId;
  label: string;
}

export interface Skill {
  name: string;
  lvl: string;
  size?: "xl" | "l";
}

export interface SkillGroup {
  cat: string;
  items: Skill[];
}

export interface RailStop {
  className?: "now" | "active" | "future";
  when: string;
  year?: string;
  label: string;
}

export interface Experience {
  id: string;
  company: string;
  mark: string;
  handle: string;
  role: string;
  roleEm: string;
  engagement: string;
  year: string;
  yearEm?: string;
  season: string;
  start: string;
  end: string;
  location: string;
  deployment: string;
  base: string;
  stopLabel: string;
}

export interface ProjectHighlight {
  k: string;
  t: string;
  body: string;
}

export interface ProjectStat {
  k: string;
  v: string;
}

export interface ProjectLink {
  label: string;
  href: string;
  kind: "prim" | "ghost";
}

export interface Project {
  id: string;
  idx: string;
  name: string;
  tag: string;
  tagline: string;
  role: string;
  year: string;
  status: "live" | "wip";
  accent: "warm" | "cool";
  screenshot: string | null;
  links: ProjectLink[];
  stack: string[];
  stackPrim: string[];
  highlights: ProjectHighlight[];
  stats: ProjectStat[];
}

export interface LeetCodeStats {
  username: string;
  profileUrl: string;
  currentRating: number | null;
  highestRating: number | null;
  globalRank: number | null;
  title: string | null;
  contestsAttended: number;
}

export interface CodeChefStats {
  username: string;
  profileUrl: string;
  currentRating: number | null;
  highestRating: number | null;
  globalRank: number | null;
  title: string | null;
  stars: number;
}

export interface GitHubStats {
  username: string;
  profileUrl: string;
  publicRepos: number;
  followers: number;
  contributions: number | null;
  commits: number | null;
}

/* ===== Education ===== */
export interface CourseEntry {
  code: string;
  name: string;
  cg: number;
}

export interface EducationData {
  institute: string;
  shortName: string;
  location: string;
  degree: string;
  major: string;
  minor: string;
  span: string;
  status: string;
  cgpa: number;
  cgpaScale: number;
  coursework: CourseEntry[];
}

/* ===== Achievements ===== */
export interface AchievementMetric {
  v: string;
  k: string;
}

export interface Achievement {
  id: string;
  kind: string;
  year: string;
  title: string;
  headline: string;
  headlineNote: string;
  sub: string;
  metric: AchievementMetric;
  weight: number;
  accent: "warm" | "ink";
}

/* ===== Positions / Leadership ===== */
export interface PositionPoint {
  head: string;
  body: string;
}

export interface PositionStat {
  v: string;
  k: string;
}

export interface Position {
  id: string;
  org: string;
  orgShort: string;
  orgGlyph: string;
  where: string;
  wing: string;
  role: string;
  period: string;
  periodShort: string;
  kind: string;
  domain: string;
  summary: string;
  points: PositionPoint[];
  stats: PositionStat[];
  accent: "warm" | "ink";
}

/* ===== Coding profile (live + static merged) ===== */
export interface CodingBreakdown {
  k: string;
  v: number;
  of: number;
}

export interface CodingLanguage {
  k: string;
  v: number;
}

export interface CodingPlatformStat {
  k: string;
  v: string;
}

export interface CodingProfileData {
  handle: string;
  rank: string;
  rankNote: string;
  headline: { value: number; label: string };
  stats: CodingPlatformStat[];
  url: string;
  /* LeetCode-only */
  breakdown?: CodingBreakdown[];
  /* CodeChef-only */
  contests?: { played: number; top10: number };
  /* GitHub-only */
  languages?: CodingLanguage[];
}
