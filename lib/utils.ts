import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type { StatementSegment } from "@/types";

/** shadcn/ui-style class combiner. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface WordToken {
  word: string;
  bold: boolean;
}

/**
 * Splits statement segments into animatable word tokens. Segment boundaries
 * without whitespace (e.g. a trailing "?" or ",") merge into the previous
 * word so punctuation never floats on its own.
 */
export function tokenizeSegments(segments: StatementSegment[]): WordToken[] {
  const tokens: WordToken[] = [];
  let previousEndedWithSpace = true;

  for (const segment of segments) {
    const parts = segment.text.split(" ");
    parts.forEach((part, i) => {
      if (!part) return;
      const continuesPreviousWord =
        i === 0 && !previousEndedWithSpace && tokens.length > 0;
      if (continuesPreviousWord) {
        tokens[tokens.length - 1].word += part;
      } else {
        tokens.push({ word: part, bold: !!segment.bold });
      }
    });
    previousEndedWithSpace = segment.text.endsWith(" ");
  }
  return tokens;
}
