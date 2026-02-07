'use client';

import { useState, useEffect, useMemo, lazy, Suspense } from 'react';
import { useLenis } from '@/hooks/useLenis';
import { usePreloadMedia, useFontPreload } from '@/hooks/usePreloadMedia';
import { LoadingScreen } from '@/components/LoadingScreen';
import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { Intro } from '@/components/Intro';
import dynamic from 'next/dynamic';

// Lazy load components below the fold for better performance
const Works = dynamic(() => import('@/components/Works').then(mod => ({ default: mod.Works })), {
  loading: () => <div className="min-h-[50vh] bg-[var(--background)]" />,
});

const About = dynamic(() => import('@/components/About').then(mod => ({ default: mod.About })), {
  loading: () => <div className="min-h-[50vh] bg-[var(--background)]" />,
});

const Contact = dynamic(() => import('@/components/Contact').then(mod => ({ default: mod.Contact })), {
  loading: () => <div className="min-h-[50vh] bg-[var(--background)]" />,
});

const Footer = dynamic(() => import('@/components/Footer').then(mod => ({ default: mod.Footer })), {
  loading: () => <div className="min-h-[20vh] bg-[var(--background)]" />,
});

const WhatsAppButton = dynamic(() => import('@/components/WhatsAppButton').then(mod => ({ default: mod.WhatsAppButton })));
const CustomCursor = dynamic(() => import('@/components/CustomCursor').then(mod => ({ default: mod.CustomCursor })));

// Sample data - replace with your own content
const WORKS_DATA = [
  {
    id: '1',
    title: 'TP-PKK Kota Padang',
    category: 'works.tppkk.category',
    description: 'works.tppkk.description',
    image: '/images/mockup-tppkk.png',
    tech: ['Laravel', 'React', 'MySQL'],
  },
  {
    id: '2',
    title: 'R5M Panel',
    category: 'works.r5m.category',
    description: 'works.r5m.description',
    image: '/images/r5m-panel.png',
    tech: ['Laravel', 'React', 'MySQL'],
  },
  {
    id: '3',
    title: 'Tracking App',
    category: 'works.tracking.category',
    description: 'works.tracking.description',
    image: '/images/mockup-trackingapp.png',
    tech: ['Flutter', 'Nextjs', 'PostgreSQL', 'Golang'],
  },
];

const INTRO_DATA = {
  heading: 'Available for Remote Work',
  subHeading: 'Tech Stack',
  techStack: [
    { name: 'Laravel', icon: 'laravel' },
    { name: 'React', icon: 'react' },
    { name: 'Next.js', icon: 'nextjs' },
    { name: 'Golang', icon: 'golang' },
    { name: 'MySQL', icon: 'mysql' },
    { name: 'PostgreSQL', icon: 'postgresql' },
    { name: 'Postman', icon: 'postman' },
    { name: 'Flutter', icon: 'flutter' },
  ],
};

const EDUCATION_DATA = {
  heading: 'Education',
  tabs: [
    {
      id: 'formal',
      label: 'education.formal',
      shortDescription:
        'Academic background and formal training in computer science and design.',
      description: 'education.formal.description',
      institution: 'education.formal.institution',
      year: 'education.formal.year',
      gpa: 'education.formal.gpa',
      details: [
        'education.formal.detail1',
        'education.formal.detail2',
        'education.formal.detail3',
      ],
      image: '/images/edu-formal.jpg',
    },
    {
      id: 'non-formal',
      label: 'education.nonFormal',
      image: '/images/panda-sleepy.png',
      message: 'Admin malas flexing, sekian terimakasih',
    },
    {
      id: 'courses',
      label: 'education.courses',
      image: 'https://media.tenor.com/I52W87bM7K8AAAAi/anime-aaaa.gif',
      message: 'Udah dibilang admin malas flexing, KIMAK!!!!',
    },
  ],
};

const CONTACT_DATA = {
  email: 'jimmywiraarbaa03@gmail.com',
  socialLinks: [
    { name: 'Instagram', url: 'https://www.instagram.com/wiraarbaa_' },
    { name: 'LinkedIn', url: 'https://www.linkedin.com/in/jimmy-wira-arbaa/' },
    { name: 'Github', url: 'https://github.com/jimmywiraarbaa' },
  ],
};

// Hero videos - will rotate automatically
const HERO_VIDEOS = [
  {
    webm: '/videos/hero.webm',
    mp4: '/videos/hero.mp4',
    poster: '/images/hero-poster.jpg',
  },
  {
    webm: '/videos/hero2.webm',
    mp4: '/videos/hero2.mp4',
    poster: '/images/hero-poster-2.jpg',
  },
];

/**
 * Main portfolio page
 *
 * Features:
 * - Video hero with loading state
 * - Lenis smooth scrolling
 * - Scroll-triggered animations
 * - Loading screen with percentage
 */
export default function HomePage() {
  const [isLoadingComplete, setIsLoadingComplete] = useState(false);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

  // Initialize Lenis smooth scrolling
  useLenis({ duration: 1.5 });

  // Preload only the first video initially for faster load time
  const { progress, isLoaded } = usePreloadMedia(
    [{
      type: 'video' as const,
      src: HERO_VIDEOS[0].webm,
      fallback: HERO_VIDEOS[0].mp4,
      poster: HERO_VIDEOS[0].poster,
    }],
    1000 // Reduced minimum delay
  );

  // Auto-rotate videos every 6 seconds
  useEffect(() => {
    if (!isLoadingComplete) return;

    const interval = setInterval(() => {
      setCurrentVideoIndex((prev) => (prev + 1) % HERO_VIDEOS.length);
    }, 6000); // Change video every 6 seconds

    return () => clearInterval(interval);
  }, [isLoadingComplete]);

  // Preload fonts
  const fontsLoaded = useFontPreload(['DM Sans']);

  // All assets loaded when video and fonts are ready
  const allAssetsLoaded = isLoaded && fontsLoaded;

  // Handle loading complete
  const handleLoadingComplete = () => {
    setIsLoadingComplete(true);
    // Enable scrolling after loading
    document.body.style.overflow = '';
  };

  // Prevent scroll during loading
  useEffect(() => {
    if (!isLoadingComplete) {
      document.body.style.overflow = 'hidden';
    }
  }, [isLoadingComplete]);

  return (
    <>
      {/* Loading Screen */}
      <LoadingScreen
        progress={progress}
        isLoaded={allAssetsLoaded}
        onComplete={handleLoadingComplete}
      />

      {/* Navbar */}
      <Navbar />

      {/* Main Content - only visible after loading */}
      <main
        className={`transition-opacity duration-1000 ${
          isLoadingComplete ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {/* Hero Section */}
        <Hero
          videos={HERO_VIDEOS}
          currentIndex={currentVideoIndex}
          title="JIMMY"
          tagline="Smart Digital Solutions for Modern Business"
        />

        {/* Intro Section */}
        <Intro
          heading={INTRO_DATA.heading}
          subHeading={INTRO_DATA.subHeading}
          techStack={INTRO_DATA.techStack}
        />

        {/* Works Section - Lazy loaded */}
        <Suspense fallback={<div className="min-h-[50vh] bg-[var(--background)]" />}>
          <Works works={WORKS_DATA} />
        </Suspense>

        {/* Education Section - Lazy loaded */}
        <Suspense fallback={<div className="min-h-[50vh] bg-[var(--background)]" />}>
          <About heading={EDUCATION_DATA.heading} tabs={EDUCATION_DATA.tabs} />
        </Suspense>

        {/* Contact Section - Lazy loaded */}
        <Suspense fallback={<div className="min-h-[50vh] bg-[var(--background)]" />}>
          <Contact
            email={CONTACT_DATA.email}
            socialLinks={CONTACT_DATA.socialLinks}
          />
        </Suspense>

        {/* Footer - Lazy loaded */}
        <Suspense fallback={<div className="min-h-[20vh] bg-[var(--background)]" />}>
          <Footer name="JIMMY" />
        </Suspense>
      </main>

      {/* WhatsApp Floating Button */}
      <WhatsAppButton />

      {/* Custom Cursor */}
      <CustomCursor />
    </>
  );
}
