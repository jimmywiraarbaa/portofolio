"use client";

import { motion, HTMLMotionProps } from "framer-motion";
import { ReactNode, useEffect, useRef, useState } from "react";

interface ScaleInProps extends HTMLMotionProps<"div"> {
  children: ReactNode;
  delay?: number;
  duration?: number;
  threshold?: number;
  once?: boolean;
  initialScale?: number;
}

/**
 * Scale-in component with scroll-triggered animation
 *
 * @param children - Content to scale in
 * @param delay - Animation delay in seconds (default: 0)
 * @param duration - Animation duration in seconds (default: 0.6)
 * @param threshold - Intersection threshold (0-1, default: 0.1)
 * @param once - Whether to animate only once (default: true)
 * @param initialScale - Initial scale value (default: 0.9)
 */
export function ScaleIn({
  children,
  delay = 0,
  duration = 0.6,
  threshold = 0.1,
  once = true,
  initialScale = 0.9,
  className = "",
  ...props
}: ScaleInProps) {
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
      initial={{ opacity: 0, scale: initialScale }}
      animate={
        isInView
          ? { opacity: 1, scale: 1 }
          : { opacity: 0, scale: initialScale }
      }
      transition={{
        duration,
        delay,
        ease: [0.25, 0.4, 0.25, 1],
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}
