"use client";

import { motion } from "framer-motion";
import { FadeIn } from "./motion";
import { useLanguage } from "@/contexts/LanguageContext";

interface ContactProps {
  email: string;
  socialLinks?: {
    name: string;
    url: string;
  }[];
}

/**
 * Contact section with minimal CTA
 *
 * Features:
 * - Large email link
 * - Optional social links
 * - Hover animations
 */
export function Contact({ email, socialLinks }: ContactProps) {
  const { t } = useLanguage();

  return (
    <section id="contact" className="py-32 md:py-48">
      <div className="max-w-4xl mx-auto px-6 md:px-12 text-center">
        <FadeIn>
          <h2 className="text-[8vw] md:text-[5vw] lg:text-[4vw] font-sans leading-[1.1] tracking-tight text-[var(--foreground)] mb-12">
            {t('contact.letsConnect')}
          </h2>
        </FadeIn>

        <FadeIn delay={0.2}>
          <motion.a
            href={`mailto:${email}`}
            className="inline-block text-2xl md:text-4xl lg:text-5xl text-[var(--foreground)] hover:text-[var(--accent)] transition-colors duration-300 mb-16"
            whileHover={{ y: -5 }}
            transition={{ duration: 0.3, ease: [0.25, 0.4, 0.25, 1] }}
          >
            {email}
          </motion.a>
        </FadeIn>

        {socialLinks && socialLinks.length > 0 && (
          <FadeIn delay={0.4}>
            <div className="flex justify-center gap-8 md:gap-12">
              {socialLinks.map((link) => (
                <motion.a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm uppercase tracking-[0.15em] text-[var(--muted)] hover:text-[var(--foreground)] transition-colors"
                  whileHover={{ y: -2 }}
                  transition={{ duration: 0.2 }}
                >
                  {link.name}
                </motion.a>
              ))}
            </div>
          </FadeIn>
        )}
      </div>
    </section>
  );
}
