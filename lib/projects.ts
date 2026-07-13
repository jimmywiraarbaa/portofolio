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
    title: 'TP-PKK Kota Padang',
    category: 'works.tppkk.category',
    description: 'works.tppkk.description',
    image: '/images/mockup-tppkk.png',
    tech: ['Laravel', 'React', 'MySQL'],
    url: 'https://tp-pkk.padang.go.id/',
  },
  {
    id: '2',
    title: 'R5M Panel',
    category: 'works.r5m.category',
    description: 'works.r5m.description',
    image: '/images/r5m-panel.png',
    tech: ['Laravel', 'React', 'MySQL'],
    url: 'https://panel.erlimaem.com/',
  },
  {
    id: '3',
    title: 'Tracking App',
    category: 'works.tracking.category',
    description: 'works.tracking.description',
    image: '/images/mockup-trackingapp.png',
    tech: ['Flutter', 'Nextjs', 'PostgreSQL', 'Golang'],
  },
  {
    id: '4',
    title: 'Face Recognition - Smart Surau',
    category: 'works.smartSurau.category',
    description: 'works.smartSurau.description',
    image: null,
    tech: ['Golang', 'Python', 'Flutter', 'MySQL', 'PostgreSQL'],
    urlLabel: 'Padang Mobile — Play Store / App Store',
  },
  {
    id: '5',
    title: 'Rembug',
    category: 'works.rembug.category',
    description: 'works.rembug.description',
    image: null,
    tech: ['React', 'Golang', 'MySQL'],
    urlLabel: 'Dalam Pengembangan',
  },
  {
    id: '6',
    title: 'Simpeg',
    category: 'works.simpeg.category',
    description: 'works.simpeg.description',
    image: null,
    tech: ['Laravel'],
    urlLabel: 'Website Internal',
  },
];
