import type { Metadata, Viewport } from "next";
import { DM_Sans } from "next/font/google";
import "../styles/globals.css";
import { LanguageProvider } from "@/contexts/LanguageContext";

// Font configuration
const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  display: "swap",
  preload: true,
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "JIMMY | Digital Experiences",
  description:
    "Crafting thoughtful, user-centric digital products with attention to detail and smooth interactions.",
  openGraph: {
    title: "JIMMY | Digital Experiences",
    description:
      "Crafting thoughtful, user-centric digital products with attention to detail.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "JIMMY | Digital Experiences",
    description:
      "Crafting thoughtful, user-centric digital products with attention to detail.",
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
    <html lang="en" className={dmSans.variable}>
      <head>
        {/* Preconnect to font domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* Load Material Symbols with display=swap for non-blocking */}
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap" />
        <link rel="icon" type="image/png" href="/images/cool-duck.png" />
      </head>
      <LanguageProvider>
        <body className="font-dm-sans antialiased" suppressHydrationWarning>
          {children}
        </body>
      </LanguageProvider>
    </html>
  );
}
