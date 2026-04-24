import { CursorField } from "@/components/effects/CursorField";
import { CornerTicks } from "@/components/layout/CornerTicks";
import { Grain } from "@/components/layout/Grain";
import { SideNav } from "@/components/layout/SideNav";
import { TopBar } from "@/components/layout/TopBar";
import { About } from "@/components/sections/About";
import { Experience } from "@/components/sections/Experience";
import { Hero } from "@/components/sections/Hero";
import { PlaceholderSection } from "@/components/sections/PlaceholderSection";
import { Projects } from "@/components/sections/Projects";
import { SECTIONS } from "@/data/sections";

export default function Home() {
  return (
    <>
      <CursorField mode="constellation" />
      <Grain />
      <CornerTicks />
      <TopBar />
      <SideNav sections={SECTIONS} />

      <main>
        <Hero />
        <About />
        <Experience />
        <Projects />

        <PlaceholderSection
          id="coding"
          num="04"
          label="Competitive"
          screen="05 Coding Profile"
          title="Problems solved, at"
          titleEm="some cost to sleep."
          sub="Live stats from LeetCode and the occasional ICPC. Dashboard designed next."
        />
        <PlaceholderSection
          id="education"
          num="05"
          label="Formal"
          screen="06 Education"
          title="The paperwork"
          titleEm="version."
          sub="Schools, coursework, GPA, highlighted subjects. Cleaner layout dropping here soon."
        />
        <PlaceholderSection
          id="achievements"
          num="06"
          label="Milestones"
          screen="07 Achievements"
          title="Rankings, wins,"
          titleEm="odd badges."
          sub="Contest placements, hackathon wins, and other assorted gold stars. Coming together in the next pass."
        />
        <PlaceholderSection
          id="positions"
          num="07"
          label="Leadership"
          screen="08 Positions of Responsibility"
          title="Communities I've"
          titleEm="helped run."
          sub="Clubs, chapters, and mentorship roles where I've been more than a member."
        />
      </main>
    </>
  );
}
