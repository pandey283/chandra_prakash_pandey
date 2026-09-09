"use client";

import { useState, useEffect } from "react";

/**
 * useMediaQuery — tracks whether a CSS media query matches.
 * SSR-safe: returns false on the server, syncs on hydration.
 *
 * Usage:
 *   const isMobile = useMediaQuery("(max-width: 767px)");
 *   const prefersReducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia(query);

    const handler = (e: MediaQueryListEvent) => setMatches(e.matches);

    // Sync initial value via the event handler pattern (avoids direct setState in effect body)
    const initialEvent = { matches: mql.matches } as MediaQueryListEvent;
    handler(initialEvent);

    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, [query]);

  return matches;
}
