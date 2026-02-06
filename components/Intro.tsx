"use client";

import { FadeIn, ParallaxText } from "./motion";

interface IntroProps {
  heading: string;
  text: string[];
}

/**
 * Intro section with parallax text and fade-in animations
 *
 * Features:
 * - Large editorial typography
 * - Generous whitespace
 * - Scroll-triggered animations
 */
export function Intro({ heading, text }: IntroProps) {
  return (
    <section className="relative min-h-screen flex items-center py-32 md:py-48">
      <div className="max-w-4xl md:max-w-6xl mx-auto px-6 md:px-12">
        <FadeIn>
          <h2 className="text-[8vw] md:text-[5vw] lg:text-[4vw] font-sans leading-[1.1] tracking-tight text-[var(--foreground)]">
            {heading}
          </h2>
        </FadeIn>

        <div className="mt-16 md:mt-24 space-y-8 md:space-y-12">
          {text.map((paragraph, index) => (
            <FadeIn key={index} delay={index * 0.15}>
              <p className="text-xl md:text-2xl lg:text-3xl font-light leading-relaxed text-[var(--muted)] max-w-3xl">
                {paragraph}
              </p>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
