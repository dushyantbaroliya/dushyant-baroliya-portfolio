"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useCallback, useMemo } from "react";
import { useLenis } from "@/components/providers/SmoothScroll";
import { usePreloaderDone } from "@/components/providers/Providers";
import { useClock } from "@/hooks/useClock";
import { useActiveSection } from "@/hooks/useActiveSection";
import FlipText from "@/components/motion/FlipText";
import { NAV_ITEMS, SITE } from "@/constants/content";
import { cn } from "@/lib/utils";

export default function Header() {
  const lenis = useLenis();
  const done = usePreloaderDone();
  const time = useClock(SITE.timeZone);
  const sectionIds = useMemo(
    () => NAV_ITEMS.map((item) => item.href.slice(1)),
    [],
  );
  const active = useActiveSection(sectionIds);

  const scrollTo = useCallback(
    (hash: string) => (e: React.MouseEvent) => {
      e.preventDefault();
      const target = document.querySelector(hash);
      if (!target) return;
      if (lenis) {
        lenis.scrollTo(hash, { offset: 0, duration: 1.4 });
      } else {
        target.scrollIntoView({ behavior: "smooth" });
      }
    },
    [lenis],
  );

  return (
    <motion.header
      className="fixed z-50 w-full px-4 py-4 md:py-10 md:px-6 2xl:px-10 text-slate-200 mix-blend-normal"
      initial={{ y: -24, opacity: 0 }}
      animate={done ? { y: 0, opacity: 1 } : {}}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    >
      <nav aria-label="Primary" className="flex place-items-center justify-between">
        {/* Identity + local time */}
        <Link href="/" className="inline-block" aria-label={`${SITE.name} — home`}>
          <div className="flex items-center gap-3 md:gap-4">
            <span className="font-display text-xl md:text-3xl leading-none text-tech-light">
              {SITE.initials}
              <span className="text-tech-medium">.</span>
            </span>
            <span className="whitespace-nowrap text-xs sm:text-sm md:text-lg font-light tabular-nums">
              {SITE.location}
              {time && <span className="text-slate-400"> {time}</span>}
            </span>
          </div>
        </Link>

        {/* Section links */}
        <ul className="flex gap-4 md:gap-8 text-right text-xs md:text-lg text-tech-light uppercase font-semibold">
          {NAV_ITEMS.map((item) => (
            <li key={item.href} className="cursor-pointer">
              <a
                href={item.href}
                onClick={scrollTo(item.href)}
                className="group relative inline-block"
                aria-current={active === item.href.slice(1) ? "true" : undefined}
              >
                <FlipText>{item.label}</FlipText>
                <span
                  className={cn(
                    "absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-tech-medium transition-transform duration-300 ease-out group-hover:scale-x-100",
                    active === item.href.slice(1) && "scale-x-100",
                  )}
                />
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </motion.header>
  );
}
