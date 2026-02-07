"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { FadeIn } from "./motion";
import Image from "next/image";
import { useLanguage } from "@/contexts/LanguageContext";

interface Tab {
  id: string;
  label: string;
  shortDescription: string;
  description: string;
  institution: string;
  year: string;
  gpa: string;
  details: string[];
  image: string;
}

interface AboutProps {
  heading: string;
  tabs: Tab[];
}

/**
 * Education section with tabbed interface
 *
 * Features:
 * - 4 tabs with glass blur effect for inactive tabs
 * - Smooth transitions between tabs
 * - Content with description and image cards
 * - Fade-in animations
 */
export function About({ heading, tabs }: AboutProps) {
  const [activeTab, setActiveTab] = useState(tabs[0].id);
  const { t } = useLanguage();

  const currentTab = tabs.find((tab) => tab.id === activeTab) || tabs[0];

  return (
    <section id="education" className="py-32 md:py-48 bg-[var(--background)]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Centered Title with Section Line */}
        <FadeIn>
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-[8vw] md:text-[5vw] lg:text-[4vw] font-sans leading-[1.1] tracking-tight text-[var(--foreground)] mb-4">
              {t('education.heading')}
            </h2>
            <p className="text-sm md:text-base text-[var(--muted)] italic mb-8">
              &quot;alam takambang manjadi guru&quot;
            </p>
            <div className="w-full h-px bg-gradient-to-r from-transparent via-white/50 to-transparent backdrop-blur-sm" />
          </div>
        </FadeIn>

        {/* Tabs */}
        <FadeIn delay={0.2}>
          <div className="flex flex-wrap justify-center md:justify-start gap-8 md:gap-24 lg:gap-40 mb-6 md:mb-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative pb-2 text-xl md:text-3xl lg:text-4xl font-medium transition-all duration-300 ${
                  activeTab === tab.id
                    ? "text-white"
                    : "text-[var(--muted)] hover:text-[var(--foreground)] blur-[2.5px] hover:blur-0"
                }`}
              >
                {t(tab.label)}
                {/* Active indicator - no underline, just color change */}
                {activeTab === tab.id && (
                  <motion.span
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 right-0 h-0"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </div>
        </FadeIn>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: [0.25, 0.4, 0.25, 1] }}
            className="grid md:grid-cols-2 gap-12 md:gap-16 items-start"
          >
            {/* Left: Image Card */}
            <div className="order-2 md:order-1">
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, ease: [0.25, 0.4, 0.25, 1] }}
                className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-[var(--muted)]/10 shadow-2xl"
              >
                <Image
                  src={currentTab.image}
                  alt={currentTab.label}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              </motion.div>
            </div>

            {/* Right: Content */}
            <div className="order-1 md:order-2 space-y-6">
              {/* Short Description */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1, duration: 0.4 }}
                className="text-lg md:text-xl text-[var(--muted)] leading-relaxed"
              >
                {currentTab.shortDescription}
              </motion.p>

              {/* Main Info Card */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.4 }}
                className="bg-[var(--muted)]/5 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-[var(--muted)]/10"
              >
                <h3 className="text-2xl md:text-3xl font-sans text-[var(--foreground)] mb-3">
                  {t(currentTab.description)}
                </h3>
                <p className="text-[var(--accent)] font-medium mb-1">
                  {t(currentTab.institution)}
                </p>
                <p className="text-[var(--muted)] text-sm mb-4">
                  {t(currentTab.year)}
                </p>
                {currentTab.gpa && (
                  <p className="text-[var(--foreground)] font-semibold text-sm mb-6">
                    {t(currentTab.gpa)}
                  </p>
                )}

                {/* Details List */}
                <ul className="space-y-3">
                  {currentTab.details.map((detail, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + index * 0.1, duration: 0.3 }}
                      className="flex items-start gap-3"
                    >
                      <span className="w-2 h-2 rounded-full bg-[var(--foreground)] mt-2 flex-shrink-0" />
                      <span className="text-[var(--muted)] text-base leading-relaxed">
                        {t(detail)}
                      </span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
