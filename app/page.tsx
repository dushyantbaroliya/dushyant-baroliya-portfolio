import Background from "@/components/layout/Background";
import Hero from "@/sections/Hero";
import Interlude from "@/sections/Interlude";
import StatementSection from "@/sections/StatementSection";
import Projects from "@/sections/Projects";
import TechGrid from "@/sections/TechGrid";
import Skills from "@/sections/Skills";
import Contact from "@/sections/Contact";
import {
  ABOUT_INTRO,
  ABOUT_STATEMENT,
  PROJECTS_INTRO,
  PROJECTS_STATEMENT,
} from "@/constants/content";

export default function Home() {
  return (
    <>
      <Background />
      <main id="main">
        <Hero />
        <Interlude />
        <StatementSection
          id="work"
          statement={PROJECTS_STATEMENT}
          label={PROJECTS_INTRO.label}
          blurb={PROJECTS_INTRO.blurb}
          chips={PROJECTS_INTRO.chips}
        />
        <Projects />
        <TechGrid />
        <StatementSection
          id="about"
          statement={ABOUT_STATEMENT}
          label={ABOUT_INTRO.label}
          blurb={ABOUT_INTRO.blurb}
          chips={ABOUT_INTRO.chips}
        />
        <Skills />
      </main>
      <Contact />
    </>
  );
}
