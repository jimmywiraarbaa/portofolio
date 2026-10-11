import type { Metadata, Viewport } from "next";
import { DM_Sans } from "next/font/google";
import "../styles/globals.css";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { ThemeProvider } from "@/contexts/ThemeContext";

// Font configuration
const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  display: "swap",
  preload: true,
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const BASE_URL = "https://jimmywiraarbaa.netlify.app";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: "Jimmy Wira Arbaa — Full-Stack & AI Engineer",
  description:
    "Portofolio Jimmy Wira Arbaa, Full-Stack & AI Engineer dari Padang. Laravel, Go, React, Next.js, Flutter — Smart Surau, Padang Mobile, TP-PKK, dan proyek lainnya.",
  keywords: [
    "Jimmy Wira Arbaa",
    "portofolio",
    "full-stack developer",
    "software engineer",
    "Laravel",
    "Golang",
    "React",
    "Next.js",
    "Flutter",
    "Padang",
  ],
  authors: [{ name: "Jimmy Wira Arbaa", url: "https://www.linkedin.com/in/jimmy-wira-arbaa/" }],
  creator: "Jimmy Wira Arbaa",
  alternates: { canonical: '/' },
  openGraph: {
    title: "Jimmy Wira Arbaa — Full-Stack & AI Engineer",
    description:
      "Portofolio Jimmy Wira Arbaa: Smart Surau, Padang Mobile, TP-PKK, dan proyek full-stack lainnya.",
    type: "website",
    url: BASE_URL,
    siteName: "Jimmy Wira Arbaa — Portofolio",
    locale: "id_ID",
    images: [{ url: "/images/og-image.jpg", width: 1200, height: 630, alt: "Jimmy Wira Arbaa" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Jimmy Wira Arbaa — Full-Stack & AI Engineer",
    description:
      "Portofolio Jimmy Wira Arbaa: Smart Surau, Padang Mobile, TP-PKK, dan proyek full-stack lainnya.",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#0a0a0a",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={dmSans.variable} suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Person',
              name: 'Jimmy Wira Arbaa',
              jobTitle: 'Full-Stack & AI Engineer',
              url: BASE_URL,
              email: 'mailto:jimmywiraarbaa03@gmail.com',
              address: { '@type': 'PostalAddress', addressLocality: 'Padang', addressCountry: 'ID' },
              sameAs: [
                'https://www.linkedin.com/in/jimmy-wira-arbaa/',
                'https://github.com/jimmywiraarbaa',
                'https://www.instagram.com/wiraarbaa_',
              ],
            }),
          }}
        />
        {/* Anti-FOUC: apply dark class before paint */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                var t = localStorage.getItem('theme');
                if (t !== 'light') {
                  document.documentElement.classList.add('dark');
                }
              })();
            `,
          }}
        />
        {/* Preconnect to font domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        {/* Preload critical LCP image */}
        <link rel="preload" href="/images/edu-formal.jpg" as="image" />
        {/* Load Material Symbols with display=swap for non-blocking */}
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap" />
        <link rel="icon" type="image/png" href="/images/cool-duck.png" />
      </head>
      <ThemeProvider>
        <LanguageProvider>
          <body className="font-dm-sans antialiased" suppressHydrationWarning>
            {children}
          </body>
        </LanguageProvider>
      </ThemeProvider>
    </html>
  );
}
