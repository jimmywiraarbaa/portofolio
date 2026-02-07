"use client";

import { motion } from "framer-motion";
import { FadeIn, ParallaxText } from "./motion";
import Image from "next/image";
import { useLanguage } from "@/contexts/LanguageContext";

interface TechStack {
  name: string;
  icon: string;
}

interface IntroProps {
  heading: string;
  subHeading: string;
  techStack: TechStack[];
}

// Tech stack brand colors
const techColors: Record<string, string> = {
  laravel: "#F53002",
  react: "#57C4DC",
  golang: "#79D4FD",
  mysql: "#F29111",
  postgresql: "#336791",
  postman: "#FF6C37",
  flutter: "#17B9FD",
  nextjs: "#000000",
};

/**
 * Intro section with parallax text and fade-in animations
 *
 * Features:
 * - Large editorial typography
 * - Generous whitespace
 * - Scroll-triggered animations
 * - Tech stack logos grid
 */
export function Intro({ heading, subHeading, techStack }: IntroProps) {
  const { t } = useLanguage();

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center py-32 md:py-48">
      <div className="max-w-4xl md:max-w-6xl mx-auto px-6 md:px-12 text-center">
        <FadeIn>
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="relative">
              <span className="absolute -top-1 -right-1 flex h-4 w-4">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-4 w-4 bg-green-500"></span>
              </span>
            </div>
            <h2 className="text-[8vw] md:text-[5vw] lg:text-[4vw] font-sans leading-[1.1] tracking-tight text-[var(--foreground)]">
              {t('intro.heading')}
            </h2>
          </div>
        </FadeIn>

        <FadeIn delay={0.2}>
          <h3 className="text-2xl md:text-3xl font-light text-[var(--muted)] mb-16">
            {t('intro.subHeading')}
          </h3>
        </FadeIn>

        {/* Tech Stack Grid */}
        <FadeIn delay={0.4}>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-16 md:gap-40 max-w-3xl mx-auto">
            {techStack.map((tech, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 + index * 0.1, duration: 0.4 }}
                className="flex flex-col items-center gap-3 group"
              >
                <div className="w-16 h-16 md:w-[104px] md:h-[104px] relative flex items-center justify-center" style={{"--tech-color": techColors[tech.icon]} as React.CSSProperties}>
                  {/* Background color circle on hover */}
                  <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 scale-90 group-hover:scale-100" style={{backgroundColor: "var(--tech-color)"}} />
                  {/* Logo */}
                  <Image
                    src={`/logos/${tech.icon}.svg`}
                    alt={tech.name}
                    fill
                    className="object-contain brightness-0 invert opacity-60 group-hover:opacity-100 relative z-10 transition-all duration-300"
                  />
                </div>
                <span className="text-sm text-[var(--muted)] group-hover:text-[var(--foreground)] transition-colors duration-300">
                  {tech.name}
                </span>
              </motion.div>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
