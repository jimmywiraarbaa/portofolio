"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, ReactNode } from "react";

interface ParallaxTextProps {
  children: ReactNode;
  speed?: number;
  className?: string;
  offset?: [string, string];
}

/**
 * Parallax text component that moves at different speeds during scroll
 *
 * @param children - Text content to parallax
 * @param speed - Parallax speed multiplier (default: 0.5)
 * @param className - Additional CSS classes
 * @param offset - Scroll offset for animation trigger
 */
export function ParallaxText({
  children,
  speed = 0.5,
  className = "",
  offset = ["start end", "end start"],
}: ParallaxTextProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset,
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, speed * 100]);

  return (
    <div ref={ref} className={className}>
      <motion.div style={{ y }}>{children}</motion.div>
    </div>
  );
}
