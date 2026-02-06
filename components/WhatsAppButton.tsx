"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { IoLogoWhatsapp } from "react-icons/io5";

/**
 * Sticky WhatsApp floating button
 *
 * Features:
 * - Always visible
 * - Fixed position at bottom right
 * - On hero: white icon, no background
 * - Past hero: black icon with white background
 * - Direct link to WhatsApp
 */
export function WhatsAppButton() {
  const [pastHero, setPastHero] = useState(false);
  const [mounted, setMounted] = useState(false);
  const whatsappUrl = "https://wa.me/6285363298884";

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      // Check if scrolled past hero section (one viewport height)
      setPastHero(window.scrollY > window.innerHeight);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Check initial state after mount

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.25, 0.4, 0.25, 1], delay: 1 }}
      className={cn(
        "fixed bottom-8 right-8 z-50 w-14 h-14 md:w-16 md:h-16 flex items-center justify-center hover:scale-110 transition-all duration-300",
        mounted && pastHero
          ? "bg-white text-black rounded-full shadow-lg"
          : "text-white bg-transparent"
      )}
      aria-label="Chat on WhatsApp"
    >
      <IoLogoWhatsapp className="w-7 h-7 md:w-8 md:h-8" />
    </motion.a>
  );
}

function cn(...classes: (string | boolean | undefined | null)[]) {
  return classes.filter(Boolean).join(" ");
}
