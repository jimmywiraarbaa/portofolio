"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import Link from "next/link";
import { cn } from "@/lib/cn";

interface NavItem {
  label: string;
  href: string;
}

const navItems: NavItem[] = [
  { label: "Project", href: "#project" },
  { label: "Education", href: "#education" },
  { label: "Contact", href: "#contact" },
];

/**
 * Sticky transparent navbar that adapts on scroll
 *
 * Features:
 * - Hidden on hero section
 * - Shows after scrolling past hero
 * - Transparent at top, subtle background on scroll
 * - Smooth transition between states
 * - Active link highlighting
 * - Minimal design
 * - Burger menu on mobile
 */
export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isPastHero, setIsPastHero] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      setIsPastHero(window.scrollY > window.innerHeight);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Check initial state

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Track active section for highlight
  useEffect(() => {
    const sections = navItems.map((item) => item.href.substring(1));

    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 2; // Middle of viewport

      // Find which section is currently in view
      for (const id of sections) {
        const element = document.getElementById(id);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Check initial state

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when clicking a link
  const handleNavClick = (href: string) => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <motion.nav
        initial={{ y: 0, opacity: 1 }}
        animate={{
          y: mounted && isPastHero ? 0 : -100,
          opacity: mounted && isPastHero ? 1 : 0,
        }}
        transition={{ duration: 0.5, ease: [0.25, 0.4, 0.25, 1] }}
        className="fixed top-0 left-0 right-0 z-40 bg-black/20 backdrop-blur-md"
        style={{
          boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
          maskImage: "linear-gradient(to bottom, black 90%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to bottom, black 90%, transparent 100%)"
        }}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex items-center justify-between h-14 md:h-16">
            {/* Logo */}
            <Link
              href="/"
              className="text-lg md:text-xl font-sans tracking-tight text-[var(--foreground)] hover:opacity-60 transition-opacity"
            >
              JIMMY
            </Link>

            {/* Desktop Navigation Links */}
            <ul className="hidden md:flex items-center gap-8 md:gap-12">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={cn(
                      "relative text-sm uppercase tracking-[0.15em] text-[var(--muted)]",
                      "hover:text-[var(--foreground)] transition-colors duration-300",
                      activeSection === item.href.substring(1) &&
                        "text-[var(--foreground)]"
                    )}
                  >
                    {item.label}
                    {/* Active indicator */}
                    {activeSection === item.href.substring(1) && (
                      <motion.span
                        layoutId="activeNav"
                        className="absolute -bottom-1 left-0 right-0 h-px bg-[var(--foreground)]"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Mobile Burger Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden flex flex-col items-center justify-center w-8 h-8 gap-1.5 text-[var(--foreground)]"
              aria-label="Toggle menu"
            >
              <motion.span
                animate={isMobileMenuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
                className="w-6 h-0.5 bg-current"
              />
              <motion.span
                animate={isMobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
                className="w-6 h-0.5 bg-current"
              />
              <motion.span
                animate={isMobileMenuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
                className="w-6 h-0.5 bg-current"
              />
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu - Separate overlay with highest z-index */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.25, 0.4, 0.25, 1] }}
            className="md:hidden fixed inset-0 w-screen h-screen bg-black/95 backdrop-blur-xl z-[60]"
          >
            <ul className="flex flex-col h-full">
              {navItems.map((item, index) => (
                <motion.li
                  key={item.href}
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex-1 flex items-center justify-center border-b border-[var(--muted)]/10 last:border-0"
                >
                  <Link
                    href={item.href}
                    onClick={() => handleNavClick(item.href)}
                    className={cn(
                      "relative text-4xl uppercase tracking-[0.15em] text-[var(--muted)]",
                      "hover:text-[var(--foreground)] transition-colors duration-300",
                      activeSection === item.href.substring(1) &&
                        "text-[var(--foreground)]"
                    )}
                  >
                    {item.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
