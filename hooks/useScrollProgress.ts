"use client";

import { useEffect, useState, useRef } from "react";
import { useScroll, useTransform, useSpring } from "framer-motion";

/**
 * Custom hook to track scroll progress and derive animation values
 *
 * Returns scroll-related values for animations:
 * - scrollYProgress: 0-1 value representing scroll position
 * - scrollY: Raw scroll position in pixels
 * - viewport progress: Entry/exit values for scroll-triggered animations
 *
 * @param container - Container element to measure (default: window)
 * @param offset - Scroll offset values [enter, exit] (default: ["start end", "end start"])
 */
export function useScrollProgress(
  container?: React.RefObject<HTMLElement>,
  offset: [string, string] = ["start end", "end start"]
) {
  // Get scroll values from Framer Motion
  const { scrollY, scrollYProgress } = useScroll({
    container: container || undefined,
    axis: "y",
  });

  // Create spring-animated scroll progress for smoother animations
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return {
    scrollY,
    scrollYProgress,
    smoothProgress,
  };
}

/**
 * Hook to create transform values based on scroll progress
 *
 * @param input - Input range for the transform
 * @param output - Output range for the transform
 * @param container - Optional container ref
 */
export function useScrollTransform<T>(
  input: number[],
  output: T[],
  container?: React.RefObject<HTMLElement>
) {
  const { scrollYProgress } = useScrollProgress(container);
  const transform = useTransform(scrollYProgress, input, output);
  return transform;
}

/**
 * Hook to detect when an element enters/exits the viewport
 *
 * @param ref - Element ref to observe
 * @param threshold - Visibility threshold (0-1)
 * @param rootMargin - Margin around the root element
 */
export function useInView(
  ref: React.RefObject<Element>,
  threshold = 0.1,
  rootMargin = "0px"
) {
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold, rootMargin }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [ref, threshold, rootMargin]);

  return isInView;
}
