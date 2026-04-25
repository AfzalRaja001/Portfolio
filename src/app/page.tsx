import { CursorField } from "@/components/effects/CursorField";
import { CornerTicks } from "@/components/layout/CornerTicks";
import { Grain } from "@/components/layout/Grain";
import { SideNav } from "@/components/layout/SideNav";
import { TopBar } from "@/components/layout/TopBar";
import { About } from "@/components/sections/About";
import { Achievements } from "@/components/sections/Achievements";
import { CodingProfile } from "@/components/sections/CodingProfile";
import { Education } from "@/components/sections/Education";
import { Experience } from "@/components/sections/Experience";
import { Hero } from "@/components/sections/Hero";
import { Positions } from "@/components/sections/Positions";
import { Projects } from "@/components/sections/Projects";
import { SECTIONS } from "@/data/sections";

export default function Home() {
  return (
    <>
      <CursorField mode="ripples" />
      <Grain />
      <CornerTicks />
      <TopBar />
      <SideNav sections={SECTIONS} />

      <main>
        <Hero />
        <About />
        <Experience />
        <Projects />
        <CodingProfile />
        <Education />
        <Achievements />
        <Positions />
      </main>
    </>
  );
}
