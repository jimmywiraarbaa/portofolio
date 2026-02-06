import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        "material-symbols": ["'Material Symbols Outlined'", "system-ui", "sans-serif"],
        "dm-sans": ["var(--font-dm-sans)", "system-ui", "sans-serif"],
        sans: ["var(--font-dm-sans)", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        editorial: "0.02em",
      },
    },
  },
  plugins: [],
};

export default config;
