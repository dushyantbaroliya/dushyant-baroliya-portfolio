"use client";

import { motion, useScroll } from "framer-motion";
import { useRef } from "react";
import WordReveal from "@/components/motion/WordReveal";
import SectionLabel from "@/components/SectionLabel";
import type { StatementSegment } from "@/types";

interface StatementSectionProps {
  statement: StatementSegment[];
  label: string;
  blurb: StatementSegment[];
  chips: readonly string[];
  id?: string;
}

/**
 * 200vh scroll chamber: a pinned manifesto whose words light up with scroll,
 * followed by the section label, blurb, and topic chips.
 */
export default function StatementSection({
  statement,
  label,
  blurb,
  chips,
  id,
}: StatementSectionProps) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  return (
    <section id={id} className="flex mb-10 2xl:px-32 2xl:mb-20 scroll-mt-4">
      <section ref={ref} className="px-4 py-4 md:py-10 md:px-6 2xl:px-10 h-[200vh] w-full">
        <div className="sticky top-0 pt-32 text-tech-light">
          <WordReveal segments={statement} progress={scrollYProgress} />

          <div>
            <SectionLabel label={label} />

            <motion.div
              className="mb-6"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            >
              <p className="sm:text-lg xl:text-xl text-slate-200 font-light">
                {blurb.map((segment, i) =>
                  segment.bold ? (
                    <strong key={i} className="font-medium text-tech-light">
                      {segment.text}
                    </strong>
                  ) : (
                    <span key={i}>{segment.text}</span>
                  ),
                )}
              </p>
            </motion.div>

            <div className="flex flex-wrap gap-4">
              {chips.map((chip, i) => (
                <motion.span
                  key={chip}
                  className="text-xs sm:text-sm xl:text-base border border-solid border-slate-500 rounded-md px-4 py-2 text-slate-200"
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-10%" }}
                  transition={{
                    duration: 0.5,
                    ease: [0.22, 1, 0.36, 1],
                    delay: 0.15 + i * 0.06,
                  }}
                >
                  {chip}
                </motion.span>
              ))}
            </div>
          </div>
        </div>
      </section>
    </section>
  );
}
