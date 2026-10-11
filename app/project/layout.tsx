import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Project Experience — Jimmy Wira Arbaa',
  description:
    'Proyek pilihan Jimmy Wira Arbaa: Smart Surau, Padang Mobile, TP-PKK, R5M Panel, dan aplikasi full-stack Laravel, Go, React, Flutter.',
  alternates: { canonical: '/project' },
  openGraph: {
    title: 'Project Experience — Jimmy Wira Arbaa',
    description:
      'Proyek pilihan Jimmy Wira Arbaa: Smart Surau, Padang Mobile, TP-PKK, dan lainnya.',
    url: 'https://jimmywiraarbaa.netlify.app/project',
  },
};

export default function ProjectLayout({ children }: { children: React.ReactNode }) {
  return children;
}
