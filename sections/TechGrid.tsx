"use client";

import { motion } from "framer-motion";
import { TECH_LOGOS } from "@/constants/content";

/** Monochrome wall of the technologies behind the work; each lights up on hover. */
export default function TechGrid() {
  return (
    <section className="bg-black pb-8" aria-label="Technologies">
      <div className="px-4 py-4 md:py-10 md:px-6 2xl:px-24 grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 mb-40">
        {TECH_LOGOS.map((tech, i) => (
          <motion.div
            key={tech.name}
            className="flex items-center justify-center py-12 sm:py-16"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-5%" }}
            transition={{
              duration: 0.6,
              ease: [0.22, 1, 0.36, 1],
              delay: (i % 4) * 0.08,
            }}
          >
            <tech.icon
              title={tech.name}
              aria-label={tech.name}
              className="h-auto w-16 sm:w-20 md:w-24 text-slate-700 transition-colors duration-500 hover:text-tech-light"
            />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
