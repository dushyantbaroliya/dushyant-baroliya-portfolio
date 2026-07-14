"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { SITE } from "@/constants/content";

const EXIT_EASE = [0.76, 0, 0.24, 1] as const;
const COUNT_DURATION = 1.5;

interface PreloaderProps {
  onComplete: () => void;
}

/** Fullscreen intro: staggered name reveal + progress counter, then a clean slide-away. */
export default function Preloader({ onComplete }: PreloaderProps) {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(true);
  const prefersReduced = useReducedMotion();
  const completed = useRef(false);

  // Lock scrolling while the loader is on screen.
  useEffect(() => {
    if (!visible) return;
    const { documentElement } = document;
    documentElement.style.overflow = "hidden";
    return () => {
      documentElement.style.overflow = "";
    };
  }, [visible]);

  useEffect(() => {
    if (prefersReduced) {
      setProgress(100);
      const id = window.setTimeout(() => {
        setVisible(false);
        if (!completed.current) {
          completed.current = true;
          onComplete();
        }
      }, 300);
      return () => window.clearTimeout(id);
    }

    let rafId: number;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min((now - start) / (COUNT_DURATION * 1000), 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setProgress(Math.round(eased * 100));
      if (t < 1) {
        rafId = requestAnimationFrame(tick);
      } else {
        window.setTimeout(() => setVisible(false), 350);
      }
    };
    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [prefersReduced, onComplete]);

  const letters = SITE.name.toUpperCase().split("");

  return (
    <AnimatePresence
      onExitComplete={() => {
        if (!completed.current) {
          completed.current = true;
          onComplete();
        }
      }}
    >
      {visible && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black"
          exit={{ y: "-100%" }}
          transition={{ duration: 0.8, ease: EXIT_EASE }}
          aria-hidden
        >
          <div className="px-4 text-center">
            <div className="overflow-hidden">
              <div className="font-display text-xl sm:text-3xl md:text-4xl uppercase tracking-[0.2em] text-tech-light whitespace-nowrap">
                {letters.map((letter, i) => (
                  <motion.span
                    key={`${letter}-${i}`}
                    className="inline-block"
                    initial={{ y: "110%", opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{
                      delay: 0.15 + i * 0.03,
                      duration: 0.6,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    {letter === " " ? " " : letter}
                  </motion.span>
                ))}
              </div>
            </div>
            <motion.p
              className="mt-4 text-[10px] sm:text-xs uppercase tracking-[0.5em] text-slate-500"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.6 }}
            >
              Portfolio · {new Date().getFullYear()}
            </motion.p>
          </div>

          {/* Counter */}
          <div className="absolute bottom-6 right-6 md:bottom-10 md:right-10 font-display text-5xl md:text-8xl text-tech-medium tabular-nums">
            {progress}
          </div>

          {/* Progress hairline */}
          <div className="absolute bottom-0 left-0 h-px w-full bg-slate-900">
            <motion.div
              className="h-full origin-left bg-tech-medium"
              style={{ scaleX: progress / 100 }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
