"use client";

import {
  AnimatePresence,
  motion,
  useScroll,
  useTransform,
} from "framer-motion";
import { ArrowDown, Download, Mail } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { usePreloaderDone } from "@/components/providers/Providers";
import { useLenis } from "@/components/providers/SmoothScroll";
import MagneticButton from "@/components/motion/MagneticButton";
import { Button, buttonVariants } from "@/components/ui/button";
import { HERO, SITE } from "@/constants/content";
import { cn } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as const;

/** Overflow-clipped line that slides up into view once the preloader ends. */
function RevealLine({
  children,
  delay,
  done,
  className,
}: {
  children: React.ReactNode;
  delay: number;
  done: boolean;
  className?: string;
}) {
  return (
    <div className={cn("overflow-hidden", className)}>
      <motion.div
        initial={{ y: "110%" }}
        animate={done ? { y: 0 } : {}}
        transition={{ duration: 1, ease: EASE, delay }}
      >
        {children}
      </motion.div>
    </div>
  );
}

function RotatingTitles({ done }: { done: boolean }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!done) return;
    const id = window.setInterval(
      () => setIndex((i) => (i + 1) % HERO.rotatingTitles.length),
      2600,
    );
    return () => window.clearInterval(id);
  }, [done]);

  return (
    <div className="h-6 overflow-hidden whitespace-nowrap text-[10px] sm:text-sm uppercase tracking-[0.2em] sm:tracking-[0.3em] text-slate-400">
      <AnimatePresence mode="wait">
        <motion.span
          key={index}
          className="inline-block"
          initial={{ y: 18, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -18, opacity: 0 }}
          transition={{ duration: 0.45, ease: EASE }}
        >
          {HERO.rotatingTitles[index]}
        </motion.span>
      </AnimatePresence>
    </div>
  );
}

export default function Hero() {
  const done = usePreloaderDone();
  const lenis = useLenis();
  const ref = useRef<HTMLElement>(null);

  // Subtle parallax exit while the next section scrolls over the pinned hero.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const titleY = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const scrollTo = useCallback(
    (hash: string) => () => {
      if (lenis) lenis.scrollTo(hash, { duration: 1.4 });
      else document.querySelector(hash)?.scrollIntoView({ behavior: "smooth" });
    },
    [lenis],
  );

  return (
    <section ref={ref} className="w-full h-screen xl:h-[150vh]" aria-label="Intro">
      <div className="px-4 py-4 md:py-10 md:px-6 2xl:px-10 pt-20 md:pt-28 sticky top-0 overflow-hidden h-screen flex items-center">
        <motion.div
          style={{ y: titleY, opacity: fade }}
          className="grid w-full grid-cols-1 place-items-center"
        >
          {/* Stacked display titles */}
          <div className="text-left">
            <RevealLine delay={0.1} done={done}>
              <p className="font-display text-sm md:text-lg lg:text-2xl text-slate-400 ml-1 lg:ml-2">
                {SITE.name}
              </p>
            </RevealLine>
            <RevealLine delay={0.2} done={done}>
              <h1
                className={cn(
                  "font-display uppercase tracking-[-0.05em] whitespace-nowrap",
                  "text-[min(3rem,11.5vw)] sm:text-7xl md:text-8xl lg:text-9xl xl:text-[min(10rem,17.5vh)] leading-[1.1] sm:leading-none",
                  "-mt-2 sm:-mt-1 md:-mt-2",
                  HERO.titleLines[0].tone,
                )}
              >
                {HERO.titleLines[0].text}
              </h1>
            </RevealLine>
          </div>
          <RevealLine delay={0.32} done={done}>
            <h1
              className={cn(
                "font-display uppercase tracking-[-0.05em] whitespace-nowrap",
                "text-[min(3rem,11.5vw)] sm:text-7xl md:text-8xl lg:text-9xl xl:text-[min(10rem,17.5vh)] leading-[1.1] sm:leading-none",
                "-mt-3 sm:-mt-2 md:-mt-3 lg:-mt-4 xl:-mt-5",
                HERO.titleLines[1].tone,
              )}
            >
              {HERO.titleLines[1].text}
            </h1>
          </RevealLine>
          <RevealLine delay={0.44} done={done}>
            <h1
              className={cn(
                "font-display uppercase tracking-[-0.05em] whitespace-nowrap",
                "text-[min(3rem,11.5vw)] sm:text-7xl md:text-8xl lg:text-9xl xl:text-[min(10rem,17.5vh)] leading-[1.1] sm:leading-none",
                "-mt-3 sm:-mt-2 md:-mt-3 lg:-mt-4 xl:-mt-5",
                HERO.titleLines[2].tone,
              )}
            >
              {HERO.titleLines[2].text}
            </h1>
          </RevealLine>

          {/* Rotating role + description + CTAs */}
          <motion.div
            className="mt-6 w-10/12 text-center md:w-8/12 2xl:w-6/12 xl:translate-x-24"
            initial={{ opacity: 0, y: 30 }}
            animate={done ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, ease: EASE, delay: 0.75 }}
          >
            <RotatingTitles done={done} />
            <p className="mt-4 text-base font-light text-tech-lighter sm:text-lg xl:text-xl">
              {HERO.description.map((segment, i) =>
                segment.bold ? (
                  <strong key={i} className="font-medium text-tech-light">
                    {segment.text}
                  </strong>
                ) : (
                  <span key={i}>{segment.text}</span>
                ),
              )}
            </p>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
              <MagneticButton>
                <Button onClick={scrollTo("#work")}>
                  View Projects
                  <ArrowDown aria-hidden />
                </Button>
              </MagneticButton>
              <MagneticButton>
                <a
                  href={SITE.resumeUrl}
                  download
                  className={buttonVariants({ variant: "outline" })}
                >
                  Download Resume
                  <Download aria-hidden />
                </a>
              </MagneticButton>
              <MagneticButton>
                <Button variant="ghost" onClick={scrollTo("#contact")}>
                  Contact
                  <Mail aria-hidden />
                </Button>
              </MagneticButton>
            </div>
          </motion.div>
        </motion.div>

        {/* Scroll hint */}
        <motion.div
          className="absolute bottom-5 left-1/2 -translate-x-1/2 text-slate-500"
          initial={{ opacity: 0 }}
          animate={done ? { opacity: 1 } : {}}
          transition={{ delay: 1.6, duration: 0.8 }}
          aria-hidden
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className="flex flex-col items-center gap-2"
          >
            <span className="text-[10px] uppercase tracking-[0.4em]">Scroll</span>
            <ArrowDown className="h-4 w-4" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
