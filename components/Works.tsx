'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { FadeIn, ScaleIn } from './motion';
import Image from 'next/image';
import { useLanguage } from '@/contexts/LanguageContext';

// Tech stack brand colors
const techColors: Record<string, string> = {
  laravel: '#F53002',
  react: '#57C4DC',
  golang: '#79D4FD',
  mysql: '#F29111',
  postgresql: '#336791',
  postman: '#FF6C37',
  flutter: '#17B9FD',
  nextjs: '#000000',
};

interface Work {
  id: string;
  title: string;
  category: string;
  description: string;
  image: string;
  tech: string[];
}

interface WorksProps {
  works: Work[];
}

/**
 * Selected works section with overlapping cards
 *
 * Features:
 * - Alternating layout
 * - Scale animations on scroll
 * - Large imagery with editorial typography
 * - Hover interactions
 */
export function Works({ works }: WorksProps) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const { t } = useLanguage();

  return (
    <section id="project" ref={ref} className="py-32 md:py-48">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section heading */}
        <FadeIn>
          <h2 className="text-[8vw] md:text-[5vw] lg:text-[4vw] font-sans leading-[1.1] tracking-tight text-[var(--foreground)] mb-16 md:mb-24">
            {t('works.heading')}
          </h2>
        </FadeIn>

        {/* Works grid */}
        <div className="space-y-24 md:space-y-32">
          {works.map((work, index) => (
            <WorkItem key={work.id} work={work} index={index} />
          ))}
        </div>

        {/* See all project button */}
        <FadeIn delay={0.3}>
          <div className="mt-16 md:mt-24 text-center">
            <motion.a
              href="/project"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.3, ease: [0.25, 0.4, 0.25, 1] }}
              className="inline-flex items-center gap-3 px-8 py-4 border border-[var(--foreground)] text-[var(--foreground)] text-sm uppercase tracking-[0.15em] hover:bg-[var(--foreground)] hover:text-[var(--background)] transition-all duration-300"
            >
              {t('works.seeAll')}
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="transition-transform duration-300 group-hover:translate-x-1"
              >
                <path
                  d="M4 10H16M16 10L10 4M16 10L10 16"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </motion.a>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

function WorkItem({ work, index }: { work: Work; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isEven = index % 2 === 0;

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1, 0.95]);
  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);

  return (
    <ScaleIn delay={index * 0.1}>
      <motion.div
        ref={ref}
        style={{ scale, y }}
        className={`group relative ${
          isEven ? '' : 'md:flex md:flex-row-reverse'
        } flex flex-col md:flex-row gap-8 md:gap-16 items-center`}
      >
        {/* Image */}
        <div className="relative w-full md:w-2/3 aspect-[4/3] overflow-hidden bg-[var(--muted)]/10">
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.6, ease: [0.25, 0.4, 0.25, 1] }}
            className="relative w-full h-full"
          >
            <Image
              src={work.image}
              alt={work.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 66vw"
            />
          </motion.div>

          {/* Overlay on hover */}
          <div className="absolute inset-0 bg-[var(--foreground)]/0 group-hover:bg-[var(--foreground)]/5 transition-colors duration-500" />
        </div>

        {/* Content */}
        <div
          className={`w-full md:w-1/3 ${
            isEven ? 'md:text-left' : 'md:text-right'
          }`}
        >
          <span className="inline-block text-sm uppercase tracking-[0.2em] text-[var(--accent)] mb-4">
            {work.category}
          </span>
          <h3 className="text-3xl md:text-4xl lg:text-5xl font-sans text-[var(--foreground)] mb-4">
            {work.title}
          </h3>
          <p className="text-[var(--muted)] text-lg mb-6">{work.description}</p>
          {/* Tech logos */}
          <div className={`flex gap-4 ${isEven ? 'md:justify-start' : 'md:justify-end'}`}>
            {work.tech.map((tech) => (
              <div key={tech} className="w-8 h-8 relative flex items-center justify-center group" style={{"--tech-color": techColors[tech.toLowerCase()]} as React.CSSProperties}>
                {/* Background color circle on hover */}
                <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 scale-90 group-hover:scale-100" style={{backgroundColor: "var(--tech-color)"}} />
                {/* Logo */}
                <Image
                  src={`/logos/${tech.toLowerCase()}.svg`}
                  alt={tech}
                  fill
                  className="object-contain brightness-0 invert opacity-60 group-hover:opacity-100 relative z-10 transition-all duration-300"
                />
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </ScaleIn>
  );
}
