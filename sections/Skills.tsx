"use client";

import { motion } from "framer-motion";
import { SKILL_CATEGORIES } from "@/constants/content";

const EASE = [0.22, 1, 0.36, 1] as const;

/** Dashed-divider skill categories with grayscale icons that regain color on hover. */
export default function Skills() {
  return (
    <section className="bg-black pt-8 w-full overflow-hidden" aria-label="Skills">
      <section className="px-4 py-4 md:py-10 md:px-6 2xl:px-10">
        {SKILL_CATEGORIES.map((category) => (
          <div
            key={category.title}
            className="mb-20 sm:mb-28 border-t border-dashed border-slate-600 pt-4 md:pt-6 2xl:pt-8"
          >
            <motion.h5
              className="font-display text-3xl sm:text-4xl md:text-5xl text-tech-light mb-8"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-8%" }}
              transition={{ duration: 0.7, ease: EASE }}
            >
              {category.title}
            </motion.h5>
            <ul className="grid grid-cols-2 sm:grid-cols-4 text-center text-xs md:text-lg">
              {category.skills.map((skill, i) => (
                <motion.li
                  key={skill.name}
                  className="group mb-8 cursor-default"
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-5%" }}
                  transition={{ duration: 0.5, ease: EASE, delay: (i % 4) * 0.07 }}
                >
                  <skill.icon
                    aria-hidden
                    className="mx-auto h-auto w-16 md:w-20 transition-[filter,transform] duration-500 ease-out grayscale group-hover:grayscale-0 group-hover:scale-110"
                    style={{ color: skill.color }}
                  />
                  <div className="mt-4 text-slate-300">{skill.name}</div>
                </motion.li>
              ))}
            </ul>
          </div>
        ))}
      </section>
    </section>
  );
}
