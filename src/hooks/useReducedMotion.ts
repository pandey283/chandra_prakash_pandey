"use client";

import { useMediaQuery } from "./useMediaQuery";

/**
 * useReducedMotion — returns true when the user prefers reduced motion.
 * Use to gate or simplify animations for accessibility.
 *
 * Usage:
 *   const reduced = useReducedMotion();
 *   const duration = reduced ? 0 : 0.6;
 */
export function useReducedMotion(): boolean {
  return useMediaQuery("(prefers-reduced-motion: reduce)");
}
