"use client";

import { useEffect, useRef } from "react";
import Lenis from "@studio-freight/lenis";
import { useScroll } from "framer-motion";

/**
 * Custom hook to integrate Lenis smooth scrolling with Framer Motion
 *
 * This hook:
 * - Initializes Lenis smooth scrolling
 * - Syncs RAF with Framer Motion's scroll tracking
 * - Handles cleanup on unmount
 * - Respects prefers-reduced-motion
 *
 * @param root - Root element for scroll container (default: body)
 * @param duration - Smooth scroll duration in seconds (default: 1.5)
 */
export function useLenis({
  root,
  duration = 1.5,
  easing = (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
}: {
  root?: HTMLElement;
  duration?: number;
  easing?: (t: number) => number;
} = {}) {
  const lenisRef = useRef<Lenis | null>(null);
  const { scrollY } = useScroll();

  useEffect(() => {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      return;
    }

    // Initialize Lenis
    const lenis = new Lenis({
      duration,
      easing,
      direction: "vertical",
      gestureDirection: "vertical",
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
      root,
    });

    lenisRef.current = lenis;

    // Sync with Framer Motion's scroll tracking
    let rafId: number;

    function raf(time: number) {
      lenis.raf(time);
      // Sync scroll position for Framer Motion
      // scrollY.set(lenis.scroll); // This is handled by Lenis directly
      rafId = requestAnimationFrame(raf);
    }

    rafId = requestAnimationFrame(raf);

    // Cleanup
    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, [root, duration, easing]);

  return lenisRef;
}
