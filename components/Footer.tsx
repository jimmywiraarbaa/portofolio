'use client';

import { FadeIn } from './motion';
import { useLanguage } from '@/contexts/LanguageContext';

interface FooterProps {
  name: string;
  year?: number;
}

/**
 * Minimal footer component
 */
export function Footer({ name, year }: FooterProps) {
  const currentYear = year || new Date().getFullYear();
  const { t } = useLanguage();

  return (
    <footer className="py-12 border-t border-[var(--muted)]/10">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <FadeIn>
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-[var(--muted)]">
              © {currentYear} {name}. All rights reserved.
            </p>
            <p className="text-sm text-[var(--muted)]/60">
              Makan man makan, MAKANNNNNN!!
            </p>
          </div>
        </FadeIn>
      </div>
    </footer>
  );
}
