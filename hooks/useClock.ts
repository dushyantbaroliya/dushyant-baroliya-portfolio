"use client";

import { useEffect, useState } from "react";

/** Live HH:MM:SS clock in the given IANA time zone. Empty until mounted (hydration-safe). */
export function useClock(timeZone: string) {
  const [time, setTime] = useState("");

  useEffect(() => {
    const formatter = new Intl.DateTimeFormat("en-GB", {
      timeZone,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    });
    const update = () => setTime(formatter.format(new Date()));
    update();
    const id = window.setInterval(update, 1000);
    return () => window.clearInterval(id);
  }, [timeZone]);

  return time;
}
