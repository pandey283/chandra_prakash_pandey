"use client";

import { useState, useEffect } from "react";

/**
 * useScrollY — tracks the vertical scroll position.
 * SSR-safe: returns 0 on the server.
 *
 * Usage:
 *   const scrollY = useScrollY();
 *   const isScrolled = scrollY > 80; // show sticky header shadow
 */
export function useScrollY(): number {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);

    // Attach listener first, then dispatch a synthetic call to sync initial value
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return scrollY;
}
