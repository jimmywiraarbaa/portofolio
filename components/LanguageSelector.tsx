'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';

export function LanguageSelector() {
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0, width: 0 });

  const languages = [
    { code: 'id', label: 'ID', flag: '🇮🇩' },
    { code: 'en', label: 'EN', flag: '🇬🇧' },
  ];

  // Update dropdown position when opened
  useEffect(() => {
    if (isOpen && triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      setDropdownPosition({
        top: rect.bottom + 8,
        left: rect.right - 120, // Align to right
        width: 120,
      });
    }
  }, [isOpen]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // Close dropdown on scroll
  useEffect(() => {
    const handleScroll = () => setIsOpen(false);
    if (isOpen) {
      window.addEventListener('scroll', handleScroll, true);
      return () => window.removeEventListener('scroll', handleScroll, true);
    }
  }, [isOpen]);

  const handleLanguageChange = (langCode: 'id' | 'en') => {
    setLanguage(langCode);
    setIsOpen(false);
  };

  const currentLanguage = languages.find((l) => l.code === language);

  const dropdownContent = (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={dropdownRef}
          initial={{ opacity: 0, y: -10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.95 }}
          transition={{ duration: 0.2, ease: [0.25, 0.4, 0.25, 1] }}
          className="fixed z-[9999]"
          style={{
            top: `${dropdownPosition.top}px`,
            left: `${dropdownPosition.left}px`,
            width: `${dropdownPosition.width}px`,
          }}
        >
          <div
            className="bg-[var(--background)] border border-[var(--foreground)]/20 rounded-lg overflow-hidden shadow-2xl"
            style={{ backdropFilter: 'blur(20px)' }}
          >
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => handleLanguageChange(lang.code as 'id' | 'en')}
                className={`flex items-center gap-2 px-4 py-2.5 text-sm transition-all duration-200 w-full text-left ${
                  language === lang.code
                    ? 'text-[var(--foreground)] bg-[var(--foreground)]/10'
                    : 'text-[var(--muted)] hover:text-[var(--foreground)] hover:bg-[var(--foreground)]/5'
                }`}
              >
                <span className="text-base">{lang.flag}</span>
                <span className="font-medium">{lang.label}</span>
                {language === lang.code && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="ml-auto"
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M4 8L6.5 10.5L12 5"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </motion.span>
                )}
              </button>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <div className="relative">
      {/* Trigger Button */}
      <button
        ref={triggerRef}
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-1.5 text-sm text-[var(--muted)] hover:text-[var(--foreground)] transition-colors duration-300"
        aria-label="Select language"
        aria-expanded={isOpen}
      >
        <span>{currentLanguage?.flag}</span>
        <span>{currentLanguage?.label}</span>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="ml-1"
        >
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M3 4.5L6 7.5L9 4.5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </motion.span>
      </button>

      {/* Dropdown Portal - renders outside navbar container */}
      {typeof window !== 'undefined' && createPortal(dropdownContent, document.body)}
    </div>
  );
}
