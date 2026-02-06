"use client";

import { motion, HTMLMotionProps } from "framer-motion";
import { ReactNode, RefObject, useEffect, useRef, useState } from "react";

interface FadeInProps extends HTMLMotionProps<"div"> {
  children: ReactNode;
  delay?: number;
  duration?: number;
  threshold?: number;
  once?: boolean;
  y?: number;
  x?: number;
}

/**
 * Fade-in component with scroll-triggered animation
 *
 * @param children - Content to fade in
 * @param delay - Animation delay in seconds (default: 0)
 * @param duration - Animation duration in seconds (default: 0.8)
 * @param threshold - Intersection threshold (0-1, default: 0.1)
 * @param once - Whether to animate only once (default: true)
 * @param y - Y-axis movement in pixels (default: 30)
 * @param x - X-axis movement in pixels (default: 0)
 */
export function FadeIn({
  children,
  delay = 0,
  duration = 0.8,
  threshold = 0.1,
  once = true,
  y = 30,
  x = 0,
  className = "",
  ...props
}: FadeInProps) {
  const [isInView, setIsInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          if (once) {
            observer.disconnect();
          }
        } else if (!once) {
          setIsInView(false);
        }
      },
      { threshold }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [once, threshold]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y, x }}
      animate={isInView ? { opacity: 1, y: 0, x: 0 } : { opacity: 0, y, x }}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.4, 0.25, 1], // Cubic bezier for smooth easing
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}
