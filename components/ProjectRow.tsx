"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, ArrowUpRight } from "lucide-react";
import { FaGithub } from "react-icons/fa6";
import ImagePlaceholder from "@/components/ImagePlaceholder";
import MagneticButton from "@/components/motion/MagneticButton";
import { buttonVariants } from "@/components/ui/button";
import type { Project } from "@/types";
import { cn } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as const;

interface ProjectRowProps {
  project: Project;
  index: number;
  open: boolean;
  onToggle: () => void;
}

/** Numbered index row that inverts on hover and expands into full project details. */
export default function ProjectRow({
  project,
  index,
  open,
  onToggle,
}: ProjectRowProps) {
  const number = String(index + 1).padStart(2, "0");

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-8%" }}
      transition={{ duration: 0.8, ease: EASE, delay: (index % 3) * 0.08 }}
    >
      {/* Row header */}
      <motion.button
        type="button"
        id={`project-${index}`}
        onClick={onToggle}
        aria-expanded={open}
        aria-controls={`project-panel-${index}`}
        initial={false}
        animate={{
          backgroundColor: open ? "#02a9f7" : "rgba(0,0,0,0)",
          color: open ? "#000000" : "#ffffff",
        }}
        whileHover={{
          backgroundColor: "#02a9f7",
          color: "#000000",
        }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className={cn(
          "group w-full cursor-pointer text-left",
          "py-6 px-2 text-3xl sm:text-5xl xl:text-6xl",
          "flex items-center gap-4 sm:gap-6 md:gap-8 lg:gap-10 xl:gap-12 2xl:gap-20 2xl:py-8 2xl:px-7",
          "border-y border-dashed border-white mt-[-1px]",
        )}
      >
        <div
          className={cn(
            "pt-3 font-extralight tracking-tighter transition-colors duration-300",
            open ? "text-tech-deepest" : "text-tech-medium group-hover:text-tech-deepest",
          )}
        >
          <span>{number}</span>
        </div>
        <div className="w-full">
          <div className="ml-1 flex items-center gap-3 text-sm font-extralight tracking-wider xl:text-base">
            <span>{project.category}</span>
            {project.status && (
              <span className="inline-flex items-center gap-1.5 rounded-full border border-current/40 px-2.5 py-0.5 text-[10px] uppercase tracking-widest xl:text-xs">
                <span className="h-1.5 w-1.5 rounded-full bg-current" aria-hidden />
                {project.status}
              </span>
            )}
          </div>
          <div className="mb-2 font-light">{project.title}</div>
        </div>
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.4, ease: EASE }}
          className="shrink-0"
          aria-hidden
        >
          <ChevronDown className="h-6 w-6 sm:h-9 sm:w-9" strokeWidth={1.5} />
        </motion.span>
      </motion.button>

      {/* Expanded details */}
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={`project-panel-${index}`}
            role="region"
            aria-label={`${project.title} details`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.55, ease: EASE }}
            className="overflow-hidden"
          >
            <div className="grid gap-8 px-2 py-10 md:grid-cols-2 md:items-center 2xl:px-7">
              <div>
                <p className="max-w-xl text-base font-light leading-relaxed text-slate-300 sm:text-lg">
                  {project.description}
                </p>
                <ul className="mt-6 flex flex-wrap gap-2" aria-label="Tech stack">
                  {project.stack.map((tech) => (
                    <li
                      key={tech}
                      className="rounded-md border border-slate-700 px-3 py-1 text-[11px] uppercase tracking-wider text-slate-400"
                    >
                      {tech}
                    </li>
                  ))}
                </ul>
                <div className="mt-8 flex flex-wrap items-center gap-3">
                  {project.liveUrl && (
                    <MagneticButton>
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${project.title} — live demo`}
                        className={buttonVariants()}
                      >
                        Live Demo
                        <ArrowUpRight aria-hidden />
                      </a>
                    </MagneticButton>
                  )}
                  {project.githubUrl && (
                    <MagneticButton>
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${project.title} — source on GitHub`}
                        className={buttonVariants({ variant: "outline" })}
                      >
                        GitHub
                        <FaGithub aria-hidden />
                      </a>
                    </MagneticButton>
                  )}
                  {!project.liveUrl && !project.githubUrl && (
                    <span className="text-sm font-light text-slate-400">
                      In active development — demo and source coming soon.
                    </span>
                  )}
                </div>
              </div>
              <ImagePlaceholder index={index} title={project.title} src={project.image} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
