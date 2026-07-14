"use client";

import { motion } from "framer-motion";
import { ArrowDownRight } from "lucide-react";

/** "/ Section" heading with the trailing down-right arrow. */
export default function SectionLabel({ label }: { label: string }) {
  return (
    <motion.div
      className="flex flex-row place-items-center gap-2 mt-20 sm:mb-4"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      <h5 className="font-display text-sm sm:text-2xl md:text-3xl xl:text-4xl uppercase text-tech-medium">
        {label}
      </h5>
      <ArrowDownRight
        aria-hidden
        strokeWidth={2}
        className="text-tech-medium w-5 sm:w-7 xl:w-10 h-auto"
      />
    </motion.div>
  );
}
