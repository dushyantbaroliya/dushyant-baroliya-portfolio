"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as const;
const STAGGER = 0.025;

interface FlipTextProps {
  children: string;
  className?: string;
}

/**
 * Per-letter vertical flip on hover: the visible line slides up
 * while a duplicate rises from below.
 */
export default function FlipText({ children, className }: FlipTextProps) {
  const letters = children.split("");

  return (
    <motion.span
      initial="rest"
      whileHover="hover"
      className={cn(
        "relative block overflow-hidden whitespace-nowrap uppercase",
        className,
      )}
      style={{ lineHeight: 1.2 }}
    >
      <span aria-hidden className="block">
        {letters.map((letter, i) => (
          <motion.span
            key={i}
            className="inline-block"
            variants={{ rest: { y: 0 }, hover: { y: "-100%" } }}
            transition={{ duration: 0.3, ease: EASE, delay: STAGGER * i }}
          >
            {letter === " " ? " " : letter}
          </motion.span>
        ))}
      </span>
      <span className="absolute inset-0 block" aria-hidden>
        {letters.map((letter, i) => (
          <motion.span
            key={i}
            className="inline-block"
            variants={{ rest: { y: "100%" }, hover: { y: 0 } }}
            transition={{ duration: 0.3, ease: EASE, delay: STAGGER * i }}
          >
            {letter === " " ? " " : letter}
          </motion.span>
        ))}
      </span>
      <span className="sr-only">{children}</span>
    </motion.span>
  );
}
