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
 * - Handles anchor link clicks for smooth scrolling
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
      smooth: true,
      smoothTouch: false,
      infinite: false,
      root,
    } as any);

    lenisRef.current = lenis;

    // Handle anchor link clicks for smooth scrolling
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLAnchorElement;
      if (
        target.tagName === "A" &&
        target.hash &&
        target.origin === window.location.origin
      ) {
        e.preventDefault();
        const id = target.hash.slice(1);
        const element = document.getElementById(id);
        if (element) {
          lenis.scrollTo(element);
        }
      }
    };

    document.addEventListener("click", handleClick);

    // Sync with Framer Motion's scroll tracking
    let rafId: number;

    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    rafId = requestAnimationFrame(raf);

    // Cleanup
    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      document.removeEventListener("click", handleClick);
    };
  }, [root, duration, easing]);

  return lenisRef;
}
