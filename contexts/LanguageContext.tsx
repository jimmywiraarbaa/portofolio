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
    'works.tppkk.description':
      'Platform informasi yang bersih untuk mengelola berita dan aktivitas TP PKK Kota Padang.',
    'works.tppkk.category': 'Web Publikasi',
    'works.r5m.description':
      'Dashboard manajemen armada & logistik PT Erlimaem — delivery order, kontrak, gudang, maintenance, laporan keuangan. Production & digunakan harian.',
    'works.r5m.category': 'Web Production',
    'works.lbs.description':
      'Sistem manajemen logistik & delivery order Lestari Buana Sakti — kontrak masuk, gudang, karyawan, kwitansi/invoice PDF. Production & online.',
    'works.lbs.category': 'Web Production',
    'works.tracking.description':
      'Website & aplikasi mobile internal Satpol PP Kota Padang untuk pelacakan aktivitas petugas lapangan.',
    'works.tracking.category': 'Web & Mobile Pemerintah',

    // New projects
    'works.padangMobile.category': 'Mobile App Publik',
    'works.padangMobile.description':
      'Padang Mobile — superapp resmi Pemerintah Kota Padang di Play Store & App Store: layanan publik, berita, dan integrasi sistem pemerintah.',
    'works.smartSurau.category': 'IoT + Mobile AI',
    'works.smartSurau.description':
      'Smart Surau — web IoT presensi wajah surau + fitur presensi sholat siswa berbasis AI di mobile (add-on Padang Mobile), memakai InsightFace & pgvector.',
    'works.rembug.category': 'Video Conference',
    'works.rembug.description':
      'Platform video conference internal Pemerintah Kota Padang — room/meeting, chat, recording, virtual background; lulus VAPT security audit.',
    'works.simpeg.category': 'Website Internal',
    'works.simpeg.description':
      'Sistem Informasi Manajemen Pegawai Pemko Padang — terintegrasi SIASN BKN & e-Sign BSrE dengan service engine workflow.',

    // Project page
    'project.title': 'Project Experience',
    'project.subtitle': 'Kumpulan project yang pernah saya kerjakan',
    'project.back': 'Kembali ke Beranda',

    // Education
    'education.heading': 'Pendidikan',
    'education.formal': 'Formal',
    'education.formal.description': 'Sarjana Teknik Informatika',
    'education.formal.institution': 'UPI YPTK Padang',
    'education.formal.year': '2021 - 2025',
    'education.formal.gpa': 'IPK: 3.67/4.0',
    'education.formal.detail1': 'Peminatan: Technopreneur',
    'education.formal.detail2': 'Lulus dalam 3.5 tahun',
    'education.formal.detail3': 'Fokus pada pengembangan bisnis berbasis teknologi',
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
    'works.tppkk.description':
      'A clean information platform for managing news and activities of TP PKK Kota Padang.',
    'works.tppkk.category': 'Web Publication',
    'works.r5m.description':
      'Fleet & logistics management dashboard for PT Erlimaem — delivery orders, contracts, warehouse, maintenance, financial reports. In production, used daily.',
    'works.r5m.category': 'Production Web',
    'works.lbs.description':
      'Logistics & delivery order system for Lestari Buana Sakti — inbound contracts, warehouse, employees, receipt/invoice PDF. Production & online.',
    'works.lbs.category': 'Production Web',
    'works.tracking.description':
      'Internal web & mobile app for Satpol PP Kota Padang to track field officer activity.',
    'works.tracking.category': 'Government Web & Mobile',

    // New projects
    'works.padangMobile.category': 'Public Mobile App',
    'works.padangMobile.description':
      'Padang Mobile — the official superapp of the Padang City Government on Play Store & App Store: public services, news, and government system integrations.',
    'works.smartSurau.category': 'IoT + Mobile AI',
    'works.smartSurau.description':
      'Smart Surau — IoT web for mosque face-recognition attendance plus an AI-powered student prayer attendance mobile feature (Padang Mobile add-on), built with InsightFace & pgvector.',
    'works.rembug.category': 'Video Conference',
    'works.rembug.description':
      'Internal video conference platform for the Padang City Government — rooms/meetings, chat, recording, virtual background; passed an official VAPT security audit.',
    'works.simpeg.category': 'Internal Website',
    'works.simpeg.description':
      'Civil servant management system for Padang City Government — SIASN BKN & e-Sign BSrE integration with a workflow service engine.',

    // Project page
    'project.title': 'Project Experience',
    'project.subtitle': 'A collection of projects I have worked on',
    'project.back': 'Back to Home',

    // Education
    'education.heading': 'Education',
    'education.formal': 'Formal',
    'education.formal.description': 'Bachelor of Computer Science',
    'education.formal.institution': 'UPI YPTK Padang',
    'education.formal.year': '2021 - 2025',
    'education.formal.gpa': 'GPA: 3.67/4.0',
    'education.formal.detail1': 'Specialization: Technopreneur',
    'education.formal.detail2': 'Graduated in 3.5 years',
    'education.formal.detail3': 'Focus on technology-based business development',
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
  }, []);

  useEffect(() => {
    // Only load from localStorage after mount to prevent hydration mismatch
    if (mounted) {
      const savedLang = localStorage.getItem('language') as Language;
      if (savedLang && (savedLang === 'id' || savedLang === 'en')) {
        setLanguageState(savedLang);
      }
    }
  }, [mounted]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('language', lang);
  };

  const t = (key: string) => {
    return translations[language][key as keyof typeof translations.en] || key;
  };

  // Always provide context to prevent hydration mismatch
  // Language preference updates after mount
  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);

  // Fallback for when used outside LanguageProvider (e.g., error pages)
  if (context === undefined) {
    // Return default English translations as fallback
    return {
      language: 'en',
      setLanguage: () => {},
      t: (key: string) => {
        const fallbackTranslations: Record<string, string> = {
          'error.500.title': 'Something went wrong',
          'error.500.message': 'An unexpected error occurred. Please try again later.',
          'error.404.title': 'Page Not Found',
          'error.404.message': 'The page you are looking for does not exist or has been moved.',
          'error.back': 'Back to Home',
          'error.retry': 'Try again',
        };
        return fallbackTranslations[key] || key;
      },
    };
  }

  return context;
}
