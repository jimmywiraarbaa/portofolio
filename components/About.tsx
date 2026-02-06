"use client";

import { motion } from "framer-motion";
import { FadeIn, StaggerChildren } from "./motion";

interface AboutProps {
  heading: string;
  description: string[];
  skills?: string[];
  stats?: {
    label: string;
    value: string;
  }[];
}

/**
 * About section with minimal design
 *
 * Features:
 * - Clean typography
 * - Optional skills/stats display
 * - Fade-in animations
 */
export function About({ heading, description, skills, stats }: AboutProps) {
  return (
    <section id="education" className="py-32 md:py-48 bg-[var(--background)]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid md:grid-cols-2 gap-16 md:gap-24">
          {/* Left: Description */}
          <div>
            <FadeIn>
              <h2 className="text-[8vw] md:text-[5vw] lg:text-[4vw] font-sans leading-[1.1] tracking-tight text-[var(--foreground)] mb-12">
                {heading}
              </h2>
            </FadeIn>

            <StaggerChildren staggerDelay={0.1} className="space-y-6">
              {description.map((paragraph, index) => (
                <p
                  key={index}
                  className="text-xl md:text-2xl text-[var(--muted)] leading-relaxed"
                >
                  {paragraph}
                </p>
              ))}
            </StaggerChildren>
          </div>

          {/* Right: Skills or Stats */}
          <div className="md:pt-32">
            {skills && (
              <FadeIn delay={0.3}>
                <h3 className="text-sm uppercase tracking-[0.2em] text-[var(--accent)] mb-8">
                  Expertise
                </h3>
                <ul className="space-y-4">
                  {skills.map((skill) => (
                    <li
                      key={skill}
                      className="text-lg md:text-xl text-[var(--foreground)] border-b border-[var(--muted)]/20 pb-4"
                    >
                      {skill}
                    </li>
                  ))}
                </ul>
              </FadeIn>
            )}

            {stats && (
              <FadeIn delay={0.3}>
                <div className="grid grid-cols-2 gap-8">
                  {stats.map((stat) => (
                    <div key={stat.label}>
                      <div className="text-4xl md:text-5xl font-sans text-[var(--foreground)] mb-2">
                        {stat.value}
                      </div>
                      <div className="text-sm uppercase tracking-[0.15em] text-[var(--muted)]">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>
              </FadeIn>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
