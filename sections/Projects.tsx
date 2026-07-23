"use client";

import { useState } from "react";
import ProjectRow from "@/components/ProjectRow";
import { PROJECTS } from "@/constants/content";

/** The numbered project index: one row per project, one open at a time. */
export default function Projects() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="pb-20 sm:pb-28 bg-black" aria-label="Selected projects">
      {PROJECTS.map((project, index) => (
        <ProjectRow
          key={project.id}
          project={project}
          index={index}
          open={openIndex === index}
          onToggle={() => setOpenIndex(openIndex === index ? null : index)}
        />
      ))}
    </section>
  );
}
