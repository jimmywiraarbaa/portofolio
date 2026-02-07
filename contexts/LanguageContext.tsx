'use client';

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';

type Language = 'id' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined,
);

// Translations
const translations = {
  id: {
    // Navbar
    'nav.project': 'Project',
    'nav.education': 'Pendidikan',
    'nav.contact': 'Kontak',

    // Hero
    'hero.title': 'Jimmy',
    'hero.tagline':
      'Full Stack Developer | Crafting digital experiences with code and creativity',

    // Intro
    'intro.heading': 'Tersedia untuk Remote Work',
    'intro.subHeading': 'Tech Stack',

    // Works
    'works.heading': 'Pengalaman Project',
    'works.seeAll': 'Lihat semua project',

    // Education
    'education.heading': 'Pendidikan',
    'education.formal': 'Formal',
    'education.nonFormal': 'Non-Formal',
    'education.courses': 'Kursus',

    // Contact
    'contact.heading': 'Hubungi',
    'contact.letsConnect': 'Mari Terhubung',
    'contact.email': 'Email',
    'contact.socials': 'Media Sosial',
    'contact.sendMessage': 'Kirim Pesan',

    // Footer
    'footer.copyright': '© 2025 Jimmy. Dibuat dengan Next.js',

    // Error pages
    'error.404.title': 'Halaman Tidak Ditemukan',
    'error.404.message':
      'Halaman yang Anda cari tidak ada atau telah dipindahkan.',
    'error.500.title': 'Terjadi Kesalahan',
    'error.500.message':
      'Terjadi kesalahan yang tidak terduga. Silakan coba lagi nanti.',
    'error.back': 'Kembali ke Beranda',
    'error.retry': 'Coba lagi',
  },
  en: {
    // Navbar
    'nav.project': 'Project',
    'nav.education': 'Education',
    'nav.contact': 'Contact',

    // Hero
    'hero.title': 'Jimmy',
    'hero.tagline':
      'Full Stack Developer | Crafting digital experiences with code and creativity',

    // Intro
    'intro.heading': 'Available for Remote Work',
    'intro.subHeading': 'Tech Stack',

    // Works
    'works.heading': 'Project Experience',
    'works.seeAll': 'See all project',

    // Education
    'education.heading': 'Education',
    'education.formal': 'Formal',
    'education.nonFormal': 'Non-Formal',
    'education.courses': 'Courses',

    // Contact
    'contact.heading': 'Contact',
    'contact.letsConnect': "Let's Connect",
    'contact.email': 'Email',
    'contact.socials': 'Socials',
    'contact.sendMessage': 'Send Message',

    // Footer
    'footer.copyright': '© 2025 Jimmy. Made with Next.js',

    // Error pages
    'error.404.title': 'Page Not Found',
    'error.404.message':
      'The page you are looking for does not exist or has been moved.',
    'error.500.title': 'Something went wrong',
    'error.500.message':
      'An unexpected error occurred. Please try again later.',
    'error.back': 'Back to Home',
    'error.retry': 'Try again',
  },
};

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>('en');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Load saved language preference
    const savedLang = localStorage.getItem('language') as Language;
    if (savedLang && (savedLang === 'id' || savedLang === 'en')) {
      setLanguageState(savedLang);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('language', lang);
  };

  const t = (key: string) => {
    return translations[language][key as keyof typeof translations.en] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
