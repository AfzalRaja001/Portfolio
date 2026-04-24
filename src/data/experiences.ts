import type { Experience, RailStop } from "@/types";

export const EXPERIENCES: Experience[] = [
  {
    id: "talentio",
    company: "Talentio",
    mark: "T",
    handle: "talentio",
    role: "DSA Trainer",
    roleEm: "& Mentor.",
    engagement: "Freelance · Contract",
    year: "2025",
    season: "Summer '25",
    start: "Jun 2025",
    end: "Jul 2025",
    location: "Hyderabad → Tirupati",
    deployment: "On-site · Mohan Babu University",
    base: "Hyderabad, IN",
    stopLabel: "DSA Trainer · On-site",
  },
];

export const RAIL_STOPS: RailStop[] = [
  {
    className: "now",
    when: "Now",
    label: "Pre-final year · Open to Summer '26",
  },
  {
    className: "active",
    when: "Jun – Jul",
    year: "2025",
    label: "DSA Trainer · On-site",
  },
  {
    className: "future",
    when: "Soon",
    label: "Next chapter — writing itself",
  },
  {
    className: "future",
    when: "——",
    label: "and the one after that",
  },
];
