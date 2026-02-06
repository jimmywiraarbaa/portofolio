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
import { CustomCursor } from '@/components/CustomCursor';

// Sample data - replace with your own content
const WORKS_DATA = [
  {
    id: '1',
    title: 'TP-PKK Kota Padang',
    category: 'Web Publikasi',
    description:
      'A clean information platform for managing news and activities of TP PKK Kota Padang.',
    image: '/images/mockup-tppkk.png',
    year: '2025',
  },
  {
    id: '2',
    title: 'R5M Panel',
    category: 'Web Internal',
    description: 'Dashboard for managing internal operations of R5M company.',
    image: '/images/r5m-panel.png',
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
  heading: 'Available for Remote Work',
  subHeading: 'Tech Stack',
  techStack: [
    { name: 'Laravel', icon: 'laravel' },
    { name: 'React', icon: 'react' },
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
      label: 'Formal',
      shortDescription:
        'Academic background and formal training in computer science and design.',
      description: 'Bachelor of Computer Science',
      institution: 'University of Technology',
      year: '2018 - 2022',
      gpa: 'GPA: 3.8/4.0',
      details: [
        'Specialized in Software Engineering and Human-Computer Interaction',
        "Dean's List for 6 consecutive semesters",
        'Capstone project: AI-powered design system generator',
      ],
      image: '/images/edu-formal.jpg',
    },
    {
      id: 'non-formal',
      label: 'Non-Formal',
      shortDescription:
        'Professional certifications, workshops, and intensive bootcamps.',
      description: 'Professional Development',
      institution: 'Various Platforms',
      year: '2020 - Present',
      gpa: '',
      details: [
        'AWS Certified Solutions Architect',
        'Google UX Design Certificate',
        'Meta Frontend Developer Certificate',
        'Adobe Certified Expert',
        'Advanced React Patterns Workshop',
        'UI/UX Design Sprint Bootcamp',
        'Motion Design with Framer Motion',
        'Full-stack Development Immersive',
      ],
      image: '/images/edu-non-formal.jpg',
    },
    {
      id: 'courses',
      label: 'Courses',
      shortDescription: 'Self-paced learning from top educational platforms.',
      description: 'Continuous Learning',
      institution: 'Online Platforms',
      year: '2019 - Present',
      gpa: '',
      details: [
        'Coursera: Machine Learning Specialization',
        'Udemy: Complete Web Development Bootcamp',
        'Pluralsight: Advanced JavaScript Patterns',
        'LinkedIn Learning: Design Leadership',
      ],
      image: '/images/edu-courses.jpg',
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
        <Intro
          heading={INTRO_DATA.heading}
          subHeading={INTRO_DATA.subHeading}
          techStack={INTRO_DATA.techStack}
        />

        {/* Works Section */}
        <Works works={WORKS_DATA} />

        {/* Education Section */}
        <About heading={EDUCATION_DATA.heading} tabs={EDUCATION_DATA.tabs} />

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

      {/* Custom Cursor */}
      <CustomCursor />
    </>
  );
}
