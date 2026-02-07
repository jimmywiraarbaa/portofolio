/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  experimental: {
    optimizePackageImports: ["framer-motion"],
  },
  // Additional optimizations
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  // Optimize CSS
  modularizeImports: {
    'framer-motion': {
      transform: 'framer-motion/{{member}}',
    },
  },
};

module.exports = nextConfig;
