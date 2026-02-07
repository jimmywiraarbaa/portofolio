"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useRef, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

interface Video {
  webm: string;
  mp4: string;
  poster: string;
}

interface HeroProps {
  videos: Video[];
  currentIndex: number;
  title: string;
  tagline: string;
}

/**
 * Full-screen video hero section with auto-rotating videos
 *
 * Features:
 * - Autoplay, muted, loop video with WebM + MP4 fallback
 * - Auto-rotates through multiple videos
 * - Smooth crossfade transitions between videos
 * - Dark gradient overlay for text readability
 * - Optimized for web (lazy loading, poster image)
 * - Mobile responsive
 */
export function Hero({ videos, currentIndex, title, tagline }: HeroProps) {
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const { t } = useLanguage();

  // Play video when it becomes active
  useEffect(() => {
    const video = videoRefs.current[currentIndex];
    if (!video) return;

    const playVideo = () => {
      video.play().catch(() => {
        // Autoplay prevented - silently fail
      });
    };

    // Play immediately if ready
    if (video.readyState >= 2) {
      playVideo();
    } else {
      video.addEventListener("canplay", playVideo, { once: true });
    }

    return () => {
      video.removeEventListener("canplay", playVideo);
    };
  }, [currentIndex]);

  return (
    <section className="relative h-screen w-full overflow-hidden flex items-center justify-center">
      {/* Video Background */}
      <div className="absolute inset-0 w-full h-full">
        <AnimatePresence mode="wait">
          {videos.map((video, index) => (
            index === currentIndex && (
              <motion.video
                key={video.webm}
                ref={(el) => {
                  videoRefs.current[index] = el;
                }}
                src={video.webm}
                poster={video.poster}
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0 w-full h-full object-cover"
              >
                <source src={video.webm} type="video/webm" />
                <source src={video.mp4} type="video/mp4" />
              </motion.video>
            )
          ))}
        </AnimatePresence>

        {/* Dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />

        {/* Subtle vignette effect */}
        <div className="absolute inset-0 shadow-[inset_0_0_150px_rgba(0,0,0,0.5)]" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 text-center px-6 max-w-6xl mx-auto">
        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-[12vw] md:text-[8vw] lg:text-[7vw] font-material-symbols font-light tracking-tighter text-white leading-[0.9]"
        >
          {t('hero.title')}
        </motion.h1>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mt-6 md:mt-8 text-lg md:text-xl lg:text-2xl text-white/80 font-light tracking-wide max-w-2xl mx-auto"
        >
          {t('hero.tagline')}
        </motion.p>
      </div>
    </section>
  );
}
