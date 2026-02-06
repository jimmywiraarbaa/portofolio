"use client";

import { motion, HTMLMotionProps, Variants } from "framer-motion";
import { ReactNode } from "react";

interface StaggerChildrenProps extends HTMLMotionProps<"div"> {
  children: ReactNode;
  staggerDelay?: number;
  delay?: number;
  duration?: number;
  y?: number;
  variants?: Variants;
}

/**
 * Container component that staggers animation of its children
 *
 * @param children - Child elements to stagger
 * @param staggerDelay - Delay between each child (default: 0.1)
 * @param delay - Initial delay before first child (default: 0)
 * @param duration - Animation duration (default: 0.6)
 * @param y - Y-axis movement per child (default: 20)
 * @param variants - Custom animation variants (optional)
 */
export function StaggerChildren({
  children,
  staggerDelay = 0.1,
  delay = 0,
  duration = 0.6,
  y = 20,
  className = "",
  variants,
  ...props
}: StaggerChildrenProps) {
  const defaultVariants: Variants = {
    hidden: {
      opacity: 0,
      y,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration,
        delay,
        staggerChildren: staggerDelay,
        when: "beforeChildren",
      },
    },
  };

  const childVariants: Variants = {
    hidden: { opacity: 0, y },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration,
        ease: [0.25, 0.4, 0.25, 1],
      },
    },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={variants || defaultVariants}
      className={className}
      {...props}
    >
      {Array.isArray(children)
        ? children.map((child, index) => (
            <motion.div
              key={index}
              variants={variants ? undefined : childVariants}
            >
              {child}
            </motion.div>
          ))
        : children}
    </motion.div>
  );
}
