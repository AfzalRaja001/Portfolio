import type { EducationData } from "@/types";

export const EDUCATION: EducationData = {
  institute: "Indian Institute of Information Technology",
  shortName: "IIIT Allahabad",
  location: "Prayagraj, India",
  degree: "B.Tech",
  major: "Information Technology",
  minor: "Business Informatics",
  span: "2024 — 2028",
  status: "Currently in 2nd year",
  cgpa: 9.35,
  cgpaScale: 10,
  // Sorted desc by CGPA, then alpha
  coursework: [
    { code: "IT2001", name: "Object-Oriented Methodologies", cg: 10 },
    { code: "IT2004", name: "Software Engineering", cg: 10 },
    { code: "IT2007", name: "Design and Analysis of Algorithms", cg: 10 },
    { code: "IT2009", name: "Database Management Systems", cg: 10 },
    { code: "IT1003", name: "Data Structures and Algorithms", cg: 9 },
    { code: "IT2003", name: "Operating Systems", cg: 9 },
    { code: "CS308", name: "Computer Networks", cg: 9 },
  ],
};
