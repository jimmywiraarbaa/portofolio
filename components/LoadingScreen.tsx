"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";

interface LoadingScreenProps {
  progress: number;
  isLoaded: boolean;
  onComplete?: () => void;
}

/**
 * Minimal loading screen with percentage progress display
 *
 * Features:
 * - Animated percentage counter
 * - Smooth exit transition
 * - Minimal editorial typography
 * - Optional completion callback
 *
 * @param progress - Loading progress (0-100)
 * @param isLoaded - Whether all assets are loaded
 * @param onComplete - Callback when loading completes
 */
export function LoadingScreen({
  progress,
  isLoaded,
  onComplete,
}: LoadingScreenProps) {
  useEffect(() => {
    if (isLoaded && onComplete) {
      // Immediate exit for better performance
      onComplete();
    }
  }, [isLoaded, onComplete]);

  return (
    <AnimatePresence>
      {!isLoaded && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-[var(--background)]"
        >
          <div className="flex flex-col items-center">
            {/* Simple percentage display */}
            <div className="text-[12vw] md:text-[8vw] font-sans tracking-tighter tabular-nums text-[var(--foreground)]">
              {Math.floor(progress)}
              <span className="text-[4vw] md:text-[2vw] align-top opacity-50">%</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
