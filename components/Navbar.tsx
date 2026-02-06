"use client";

import { motion } from "framer-motion";
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
 */
export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isPastHero, setIsPastHero] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [activeSection, setActiveSection] = useState("");

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

  return (
    <motion.nav
      initial={{ y: 0, opacity: 1 }}
      animate={{
        y: mounted && isPastHero ? 0 : -100,
        opacity: mounted && isPastHero ? 1 : 0,
      }}
      transition={{ duration: 0.5, ease: [0.25, 0.4, 0.25, 1] }}
      className={cn(
        "fixed top-0 left-0 right-0 z-40 transition-all duration-500",
        "border-b border-transparent",
        isScrolled
          ? "bg-black/80 backdrop-blur-md border-white/10"
          : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link
            href="/"
            className="text-lg md:text-xl font-sans tracking-tight text-[var(--foreground)] hover:opacity-60 transition-opacity"
          >
            JIMMY
          </Link>

          {/* Navigation Links */}
          <ul className="flex items-center gap-8 md:gap-12">
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
        </div>
      </div>
    </motion.nav>
  );
}
