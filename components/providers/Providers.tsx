"use client";

import { MotionConfig } from "framer-motion";
import {
  createContext,
  useCallback,
  useContext,
  useState,
  type ReactNode,
} from "react";
import dynamic from "next/dynamic";
import SmoothScroll from "@/components/providers/SmoothScroll";
import Preloader from "@/components/preloader/Preloader";

const CustomCursor = dynamic(() => import("@/components/cursor/CustomCursor"));

const PreloaderContext = createContext(false);

/** True once the intro preloader has finished — gates hero entrances. */
export function usePreloaderDone() {
  return useContext(PreloaderContext);
}

export default function Providers({ children }: { children: ReactNode }) {
  const [done, setDone] = useState(false);
  const handleComplete = useCallback(() => setDone(true), []);

  return (
    <MotionConfig reducedMotion="user">
      <PreloaderContext.Provider value={done}>
        <SmoothScroll>
          <Preloader onComplete={handleComplete} />
          <CustomCursor />
          {children}
        </SmoothScroll>
      </PreloaderContext.Provider>
    </MotionConfig>
  );
}
