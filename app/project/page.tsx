'use client';

import { useState, Suspense } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { WhatsAppButton } from '@/components/WhatsAppButton';
import { FadeIn, ScaleIn } from '@/components/motion';
import { useLenis } from '@/hooks/useLenis';
import { useLanguage } from '@/contexts/LanguageContext';
import { PROJECTS } from '@/lib/projects';

const techColors: Record<string, string> = {
  laravel: '#F53002',
  react: '#57C4DC',
  golang: '#79D4FD',
  mysql: '#F29111',
  postgresql: '#336791',
  postman: '#FF6C37',
  flutter: '#17B9FD',
  nextjs: '#000000',
  python: '#F7CA3F',
};

const CONTACT_DATA = {
  email: 'jimmywiraarbaa03@gmail.com',
  socialLinks: [
    { name: 'Instagram', url: 'https://www.instagram.com/wiraarbaa_' },
    { name: 'LinkedIn', url: 'https://www.linkedin.com/in/jimmy-wira-arbaa/' },
    { name: 'Github', url: 'https://github.com/jimmywiraarbaa' },
  ],
};

export default function ProjectPage() {
  const { t } = useLanguage();
  useLenis({ duration: 1.5 });

  return (
    <>
      <Navbar />
      <main>
        {/* Page Header */}
        <section className="min-h-[50vh] flex flex-col items-center justify-center pt-32 pb-16 px-6 md:px-12">
          <FadeIn>
            <h1 className="text-[10vw] md:text-[6vw] lg:text-[5vw] font-sans leading-[1.1] tracking-tighter text-[var(--foreground)] text-center mb-6">
              {t('project.title')}
            </h1>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="text-base md:text-lg text-[var(--muted)] text-center max-w-2xl">
              {t('project.subtitle')}
            </p>
          </FadeIn>
          <FadeIn delay={0.3}>
            <Link
              href="/"
              className="mt-10 inline-flex items-center gap-3 px-6 py-3 text-sm uppercase tracking-[0.15em] text-[var(--muted)] hover:text-[var(--foreground)] transition-colors duration-300"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M16 10H4M4 10L10 16M4 10L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              {t('project.back')}
            </Link>
          </FadeIn>
        </section>

        {/* Projects List */}
        <section className="pb-32 md:pb-48">
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            <div className="space-y-20 md:space-y-32">
              {PROJECTS.map((project, index) => (
                <ProjectCard key={project.id} project={project} index={index} />
              ))}
            </div>
          </div>
        </section>

        <Suspense fallback={null}>
          <Footer name="JIMMY" />
        </Suspense>
      </main>

      <WhatsAppButton />
    </>
  );
}

function ProjectCard({ project, index }: { project: typeof PROJECTS[0]; index: number }) {
  const { t } = useLanguage();
  const isEven = index % 2 === 0;

  return (
    <ScaleIn delay={index * 0.05}>
      <div
        className={`flex flex-col md:flex-row gap-8 md:gap-16 items-center ${
          isEven ? '' : 'md:flex-row-reverse'
        }`}
      >
        {/* Image or Dummy */}
        <div className="relative w-full md:w-3/5 aspect-[4/3] overflow-hidden bg-[var(--muted)]/10 rounded-lg">
          {project.image ? (
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 60vw"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-[var(--foreground)]/10 to-[var(--foreground)]/5 flex items-center justify-center">
              <span className="text-[15vw] md:text-[8vw] text-[var(--muted)]/20 font-sans tracking-tighter">
                {project.title.charAt(0)}
              </span>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
        </div>

        {/* Content */}
        <div className={`w-full md:w-2/5 ${isEven ? 'md:text-left' : 'md:text-right'}`}>
          <span className="inline-block text-sm uppercase tracking-[0.2em] text-[var(--accent)] mb-4">
            {t(project.category)}
          </span>
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-sans text-[var(--foreground)] mb-4 leading-tight">
            {project.title}
          </h2>
          <p className="text-base md:text-lg text-[var(--muted)] mb-6 leading-relaxed">
            {t(project.description)}
          </p>

          {/* Tech icons */}
          <div className={`flex flex-wrap gap-4 mb-6 ${isEven ? 'md:justify-start' : 'md:justify-end'}`}>
            {project.tech.map((tech) => (
              <div
                key={tech}
                className="w-8 h-8 relative flex items-center justify-center group"
                style={{ '--tech-color': techColors[tech.toLowerCase()] } as React.CSSProperties}
              >
                <div
                  className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 scale-90 group-hover:scale-100"
                  style={{ backgroundColor: 'var(--tech-color)' }}
                />
                <Image
                  src={`/logos/${tech.toLowerCase()}.svg`}
                  alt={tech}
                  fill
                  className="object-contain brightness-0 dark:invert group-hover:invert opacity-60 group-hover:opacity-100 relative z-10 transition-all duration-300"
                />
              </div>
            ))}
          </div>

          {/* Link or Status */}
          {project.url && (
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center gap-2 text-sm text-[var(--accent)] hover:text-[var(--foreground)] transition-colors ${
                isEven ? '' : 'md:flex-row-reverse'
              }`}
            >
              <span className="underline">{project.url.replace(/^https?:\/\//, '')}</span>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 3H11V11M11 3L4 10M11 3H6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          )}
          {project.urlLabel && !project.url && (
            <span className="inline-block text-sm text-[var(--muted)] px-4 py-2 border border-[var(--muted)]/20 rounded-full">
              {project.urlLabel}
            </span>
          )}
        </div>
      </div>
    </ScaleIn>
  );
}
