"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";

const ParticleField = dynamic(
  () => import("@/components/canvas/ParticleField"),
  { ssr: false },
);

/** Interactive particle interlude between the hero and the projects manifesto. */
export default function Interlude() {
  return (
    <section className="w-full bg-black">
      <section className="px-4 py-4 md:py-10 md:px-6 2xl:px-10">
        <div className="sticky top-0 cursor-move">
          <motion.div
            className="relative h-[70vh] md:h-screen"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-15%" }}
            transition={{ duration: 1 }}
          >
            <ParticleField />
            <p className="pointer-events-none absolute bottom-6 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-[0.4em] text-slate-600">
              ( move your cursor )
            </p>
          </motion.div>
        </div>
      </section>
    </section>
  );
}
