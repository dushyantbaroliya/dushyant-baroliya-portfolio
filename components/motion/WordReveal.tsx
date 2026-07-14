"use client";

import { motion, useTransform, type MotionValue } from "framer-motion";
import { useMemo } from "react";
import type { StatementSegment } from "@/types";
import { cn, tokenizeSegments, type WordToken } from "@/lib/utils";

interface WordRevealProps {
  segments: StatementSegment[];
  progress: MotionValue<number>;
  className?: string;
  /** Portion of scroll progress over which words light up. */
  range?: [number, number];
}

function Word({
  token,
  start,
  end,
  progress,
}: {
  token: WordToken;
  start: number;
  end: number;
  progress: MotionValue<number>;
}) {
  const opacity = useTransform(progress, [start, end], [0.15, 1]);
  return (
    <motion.span
      style={{ opacity }}
      className={cn(
        "inline-block",
        token.bold && "font-semibold text-tech-lighter",
      )}
    >
      {token.word}
    </motion.span>
  );
}

/** Giant manifesto text whose words light up one by one as the user scrolls. */
export default function WordReveal({
  segments,
  progress,
  className,
  range = [0.05, 0.7],
}: WordRevealProps) {
  const tokens = useMemo(() => tokenizeSegments(segments), [segments]);

  const [rangeStart, rangeEnd] = range;
  const step = (rangeEnd - rangeStart) / tokens.length;

  return (
    <p
      className={cn(
        "text-4xl sm:text-6xl lg:text-7xl xl:text-8xl font-thin lg:leading-[5rem] 2xl:leading-[6rem] text-tech-light",
        className,
      )}
    >
      {tokens.map((token, i) => (
        <span key={i}>
          <Word
            token={token}
            start={rangeStart + step * i}
            end={rangeStart + step * (i + 1)}
            progress={progress}
          />{" "}
        </span>
      ))}
    </p>
  );
}
