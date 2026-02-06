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
      // Small delay after 100% before exit animation
      const timer = setTimeout(onComplete, 500);
      return () => clearTimeout(timer);
    }
  }, [isLoaded, onComplete]);

  return (
    <AnimatePresence>
      {!isLoaded && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.4, 0.25, 1] }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-[var(--background)]"
        >
          <div className="flex flex-col items-center">
            {/* Percentage display with monospace font for consistent width */}
            <motion.div
              key={Math.floor(progress)}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="text-[12vw] md:text-[8vw] font-sans tracking-tighter tabular-nums text-[var(--foreground)]"
            >
              {Math.floor(progress)}
              <span className="text-[4vw] md:text-[2vw] align-top opacity-50">
                %
              </span>
            </motion.div>

            {/* Loading label */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              transition={{ delay: 0.3 }}
              className="mt-4 text-sm uppercase tracking-[0.2em] text-[var(--muted)]"
            >
              Loading
            </motion.p>

            {/* Optional: Minimal progress indicator bar */}
            <div className="mt-8 w-32 h-px bg-[var(--muted)]/20 overflow-hidden">
              <motion.div
                className="h-full bg-[var(--foreground)]"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
