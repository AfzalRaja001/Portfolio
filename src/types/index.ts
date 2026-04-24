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
