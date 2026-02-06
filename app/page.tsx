'use client';

import { useState, useEffect, useMemo } from 'react';
import { useLenis } from '@/hooks/useLenis';
import { usePreloadMedia, useFontPreload } from '@/hooks/usePreloadMedia';
import { LoadingScreen } from '@/components/LoadingScreen';
import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { Intro } from '@/components/Intro';
import { Works } from '@/components/Works';
import { About } from '@/components/About';
import { Contact } from '@/components/Contact';
import { Footer } from '@/components/Footer';
import { WhatsAppButton } from '@/components/WhatsAppButton';

// Sample data - replace with your own content
const WORKS_DATA = [
  {
    id: '1',
    title: 'Tracking Petugas',
    category: 'Web Internal',
    description:
      'A minimalist e-commerce experience focused on typography and whitespace.',
    image: '/images/work1.jpg',
    year: '2024',
  },
  {
    id: '2',
    title: 'Noir Studio',
    category: 'Brand Identity',
    description:
      'Brand identity for a luxury fashion house featuring editorial photography.',
    image: '/images/work2.jpg',
    year: '2024',
  },
  {
    id: '3',
    title: 'Silent Spaces',
    category: 'Art Direction',
    description: 'Visual direction for architectural photography monograph.',
    image: '/images/work3.jpg',
    year: '2023',
  },
];

const INTRO_DATA = {
  heading: 'Creating digital experiences that leave a lasting impression.',
  text: [
    'I craft thoughtful, user-centric digital products with attention to detail and a passion for smooth interactions.',
    'My work sits at the intersection of design and technology—where aesthetics meet functionality to create memorable experiences.',
  ],
};

const EDUCATION_DATA = {
  heading: 'Education',
  description: [
    "With over 8 years of experience in digital design and development, I've had the privilege of working with brands that value craftsmanship and attention to detail.",
    'I believe in the power of restraint—knowing what to leave out is just as important as what to include. Every element should serve a purpose.',
  ],
  skills: [
    'Creative Direction',
    'UI/UX Design',
    'Frontend Development',
    'Motion Design',
    'Brand Strategy',
    'Art Direction',
  ],
  stats: [
    { label: 'Years Experience', value: '8+' },
    { label: 'Projects Completed', value: '50+' },
    { label: 'Happy Clients', value: '30+' },
  ],
};

const CONTACT_DATA = {
  email: 'hello@portfolio.com',
  socialLinks: [
    { name: 'Twitter', url: 'https://twitter.com' },
    { name: 'LinkedIn', url: 'https://linkedin.com' },
    { name: 'Dribbble', url: 'https://dribbble.com' },
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

  // Preload all hero videos
  const { progress, isLoaded } = usePreloadMedia(
    HERO_VIDEOS.map((video) => ({
      type: 'video' as const,
      src: video.webm,
      fallback: video.mp4,
      poster: video.poster,
    })),
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

      {/* Grain Overlay - optional visual texture */}
      <div className="grain-overlay" />

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
        <Intro heading={INTRO_DATA.heading} text={INTRO_DATA.text} />

        {/* Works Section */}
        <Works works={WORKS_DATA} />

        {/* Education Section */}
        <About
          heading={EDUCATION_DATA.heading}
          description={EDUCATION_DATA.description}
          skills={EDUCATION_DATA.skills}
          stats={EDUCATION_DATA.stats}
        />

        {/* Contact Section */}
        <Contact
          email={CONTACT_DATA.email}
          socialLinks={CONTACT_DATA.socialLinks}
        />

        {/* Footer */}
        <Footer name="JIMMY" />
      </main>

      {/* WhatsApp Floating Button */}
      <WhatsAppButton />
    </>
  );
}
