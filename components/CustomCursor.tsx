'use client';

import { motion } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';

/**
 * Custom cursor with circle shape and hue blend effect
 *
 * Features:
 * - Circle shape following mouse
 * - mix-blend-mode: hue for color inversion effect
 * - Smooth movement animation
 * - Hover state expansion
 * - Performance optimized with requestAnimationFrame
 */
export function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const rafRef = useRef<number | undefined>(undefined);
  const positionRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Store position immediately
      positionRef.current = { x: e.clientX, y: e.clientY };

      // Throttle state updates using requestAnimationFrame
      if (!rafRef.current) {
        rafRef.current = requestAnimationFrame(() => {
          setMousePosition(positionRef.current);
          rafRef.current = undefined;
        });
      }
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') ||
        target.closest('button')
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseover', handleMouseOver, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  // Hide default cursor on desktop
  useEffect(() => {
    const handleMouseEnter = () => {
      document.body.style.cursor = 'none';
    };

    const handleMouseLeave = () => {
      document.body.style.cursor = 'auto';
    };

    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);

    // Set initial cursor
    document.body.style.cursor = 'none';

    return () => {
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.body.style.cursor = 'auto';
    };
  }, []);

  return (
    <>
      {/* Main cursor circle filled */}
      <motion.div
        className="fixed top-0 left-0 w-6 h-6 rounded-full bg-white pointer-events-none z-[9998] hidden md:block"
        style={{
          mixBlendMode: 'difference',
          x: mousePosition.x - 12,
          y: mousePosition.y - 12,
        }}
        animate={{
          scale: isHovering ? 1.5 : 1,
        }}
        transition={{
          type: 'spring',
          stiffness: 500,
          damping: 28,
          scale: {
            type: 'spring',
            stiffness: 300,
            damping: 20,
          },
        }}
      />
    </>
  );
}
