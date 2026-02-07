"use client";

import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { useRef, useEffect, useState } from "react";
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
 * - Parallax effect on title
 * - Optimized for web (lazy loading, poster image)
 * - Mobile responsive
 */
export function Hero({ videos, currentIndex, title, tagline }: HeroProps) {
  const ref = useRef<HTMLElement>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const { t } = useLanguage();

  const { scrollY } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Enhanced parallax effects
  const yVideo = useTransform(scrollY, [0, 1000], [0, 200]);
  const scaleVideo = useTransform(scrollY, [0, 1000], [1, 1.2]);
  const yTitle = useTransform(scrollY, [0, 500], [0, 200]);
  const yTagline = useTransform(scrollY, [0, 500], [0, 120]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);
  const scaleTitle = useTransform(scrollY, [0, 500], [1, 0.9]);

  // Play video when it becomes active
  useEffect(() => {
    const video = videoRefs.current[currentIndex];
    if (!video) return;

    const playVideo = () => {
      video.play().catch((err) => {
        console.log("Autoplay prevented:", err);
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
    <section
      ref={ref}
      className="relative h-screen w-full overflow-hidden flex items-center justify-center"
    >
      {/* Video Background with parallax */}
      <motion.div
        style={{ y: yVideo, scale: scaleVideo }}
        className="absolute inset-0 w-full h-full will-change-transform"
      >
        <AnimatePresence mode="crossfade">
          {videos.map((video, index) => (
            index === currentIndex && (
              <motion.video
                key={video.webm}
                ref={(el) => (videoRefs.current[index] = el)}
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
                transition={{ duration: 1.5, ease: [0.25, 0.4, 0.25, 1] }}
                className="absolute inset-0 w-full h-full object-cover"
              >
                <source src={video.webm} type="video/webm" />
                <source src={video.mp4} type="video/mp4" />
              </motion.video>
            )
          ))}
        </AnimatePresence>

        {/* Dark gradient overlay with parallax */}
        <motion.div
          style={{ y: useTransform(scrollY, [0, 1000], [0, 100]) }}
          className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70 will-change-transform"
        />

        {/* Subtle vignette effect */}
        <div className="absolute inset-0 shadow-[inset_0_0_150px_rgba(0,0,0,0.5)]" />
      </motion.div>

      {/* Hero Content */}
      <motion.div
        style={{ opacity }}
        className="relative z-10 text-center px-6 max-w-6xl mx-auto"
      >
        {/* Title with enhanced parallax */}
        <motion.h1
          style={{ y: yTitle, scale: scaleTitle }}
          className="text-[12vw] md:text-[8vw] lg:text-[7vw] font-material-symbols font-light tracking-tighter text-white leading-[0.9] will-change-transform"
        >
          {t('hero.title')}
        </motion.h1>

        {/* Tagline with parallax and delay */}
        <motion.p
          style={{ y: yTagline }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1, ease: [0.25, 0.4, 0.25, 1] }}
          className="mt-6 md:mt-8 text-lg md:text-xl lg:text-2xl text-white/80 font-light tracking-wide max-w-2xl mx-auto will-change-transform"
        >
          {t('hero.tagline')}
        </motion.p>
      </motion.div>
    </section>
  );
}
