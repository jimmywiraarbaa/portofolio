export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  image: string | null;
  tech: string[];
  url?: string;
  urlLabel?: string;
}

export const PROJECTS: Project[] = [
  {
    id: '1',
    title: 'Padang Mobile',
    category: 'works.padangMobile.category',
    description: 'works.padangMobile.description',
    image: null,
    tech: ['Flutter', 'Golang', 'Laravel', 'MySQL'],
    urlLabel: 'Play Store / App Store',
  },
  {
    id: '2',
    title: 'Smart Surau — Presensi Wajah',
    category: 'works.smartSurau.category',
    description: 'works.smartSurau.description',
    image: null,
    tech: ['Golang', 'Python', 'Flutter', 'PostgreSQL', 'pgvector'],
    urlLabel: 'Add-on Padang Mobile',
  },
  {
    id: '3',
    title: 'Rembug — Video Conference',
    category: 'works.rembug.category',
    description: 'works.rembug.description',
    image: null,
    tech: ['Next.js', 'React', 'Golang', 'Redis', 'LiveKit', 'Docker'],
    urlLabel: 'Website Internal Pemerintah',
  },
  {
    id: '4',
    title: 'R5M Panel — Erlimaem',
    category: 'works.r5m.category',
    description: 'works.r5m.description',
    image: '/images/r5m-panel.png',
    tech: ['Laravel', 'Inertia', 'React', 'TypeScript', 'MySQL'],
    url: 'https://panel.erlimaem.com/',
  },
  {
    id: '5',
    title: 'LBS Panel — Lestari Buana Sakti',
    category: 'works.lbs.category',
    description: 'works.lbs.description',
    image: null,
    tech: ['Laravel', 'Inertia', 'React', 'TypeScript', 'MySQL'],
    url: 'https://lestaribuanasakti.com/',
  },
  {
    id: '6',
    title: 'Simpeg Pemko Padang',
    category: 'works.simpeg.category',
    description: 'works.simpeg.description',
    image: null,
    tech: ['Laravel', 'Livewire', 'MySQL', 'Keycloak'],
    urlLabel: 'Website Internal',
  },
  {
    id: '7',
    title: 'TP-PKK Kota Padang',
    category: 'works.tppkk.category',
    description: 'works.tppkk.description',
    image: '/images/mockup-tppkk.png',
    tech: ['Laravel', 'React', 'MySQL'],
    url: 'https://tp-pkk.padang.go.id/',
  },
  {
    id: '8',
    title: 'Tracking App Satpol PP',
    category: 'works.tracking.category',
    description: 'works.tracking.description',
    image: '/images/mockup-trackingapp.png',
    tech: ['Flutter', 'Next.js', 'Golang', 'PostgreSQL'],
    urlLabel: 'Website Internal Pemerintah',
  },
];
