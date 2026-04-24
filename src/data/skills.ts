import type { SkillGroup } from "@/types";

export const SKILLS: SkillGroup[] = [
  {
    cat: "Languages",
    items: [
      { name: "C++", lvl: "primary", size: "xl" },
      { name: "Python", lvl: "primary", size: "l" },
      { name: "JavaScript", lvl: "primary", size: "l" },
      { name: "TypeScript", lvl: "daily" },
      { name: "Java", lvl: "proficient" },
      { name: "SQL", lvl: "proficient" },
    ],
  },
  {
    cat: "AI / ML",
    items: [
      { name: "PyTorch", lvl: "hands-on", size: "l" },
      { name: "Transformers", lvl: "hands-on" },
      { name: "LangChain", lvl: "projects" },
      { name: "RAG", lvl: "projects" },
      { name: "Vector DBs", lvl: "projects" },
      { name: "OpenAI API", lvl: "daily" },
      { name: "scikit-learn", lvl: "proficient" },
      { name: "NumPy / Pandas", lvl: "daily" },
      { name: "Matplotlib", lvl: "proficient" },
    ],
  },
  {
    cat: "Full-Stack",
    items: [
      { name: "React", lvl: "daily", size: "l" },
      { name: "Next.js", lvl: "daily" },
      { name: "Node.js", lvl: "daily" },
      { name: "Express", lvl: "proficient" },
      { name: "FastAPI", lvl: "projects" },
      { name: "MongoDB", lvl: "proficient" },
      { name: "PostgreSQL", lvl: "proficient" },
      { name: "MySQL", lvl: "proficient" },
      { name: "Tailwind", lvl: "daily" },
      { name: "Prisma", lvl: "projects" },
    ],
  },
  {
    cat: "CP / DSA",
    items: [
      { name: "LeetCode", lvl: "Knight · 1931", size: "l" },
      { name: "Problems", lvl: "1000+" },
      { name: "Algorithms", lvl: "deep-dive" },
      { name: "Graph Theory", lvl: "strong" },
      { name: "DP", lvl: "strong" },
      { name: "Segment Trees", lvl: "comfortable" },
    ],
  },
  {
    cat: "Tooling",
    items: [
      { name: "Git", lvl: "daily" },
      { name: "GitHub", lvl: "daily" },
      { name: "Docker", lvl: "projects" },
      { name: "n8n", lvl: "projects" },
      { name: "Linux", lvl: "daily" },
      { name: "Vim", lvl: "daily" },
      { name: "Figma", lvl: "projects" },
      { name: "AWS", lvl: "exploring" },
    ],
  },
];
