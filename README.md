# Cinematic Portfolio - Sienna Style

A minimal, elegant, and highly performant scroll-driven portfolio landing page inspired by the Sienna style from the Lenis showcase.

## Tech Stack

- **Next.js 15** - App Router with React 19
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Framer Motion** - Smooth animations
- **Lenis** - Smooth scrolling with RAF sync
- **Next.js Font Optimization** - Inter + Playfair Display

## Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Add your media files to `/public`:**
   - `/public/videos/hero.webm` - Primary hero video
   - `/public/videos/hero.mp4` - Fallback hero video
   - `/public/images/hero-poster.jpg` - Poster image
   - `/public/images/work*.jpg` - Project images

3. **Run development server:**
   ```bash
   npm run dev
   ```

4. **Open [http://localhost:3000](http://localhost:3000)**

## Project Structure

```
portfolio/
├── app/
│   ├── layout.tsx          # Root layout with fonts
│   ├── page.tsx            # Main page component
│   └── globals.css         # Global styles + Tailwind
├── components/
│   ├── LoadingScreen.tsx   # Loading screen with percentage
│   ├── Navbar.tsx          # Sticky adaptive navbar
│   ├── Hero.tsx            # Video hero section
│   ├── Intro.tsx           # Intro text section
│   ├── Works.tsx           # Selected works grid
│   ├── About.tsx           # About section
│   ├── Contact.tsx         # Contact CTA
│   ├── Footer.tsx          # Minimal footer
│   └── motion/             # Reusable motion components
│       ├── FadeIn.tsx
│       ├── ScaleIn.tsx
│       ├── ParallaxText.tsx
│       └── StaggerChildren.tsx
├── hooks/
│   ├── useLenis.ts         # Lenis smooth scroll hook
│   ├── useScrollProgress.ts # Scroll tracking hooks
│   └── usePreloadMedia.ts  # Media preloading with progress
├── lib/
│   └── cn.ts               # Class name utility
├── styles/
│   └── globals.css         # Additional global styles
└── public/
    ├── videos/             # Video assets
    └── images/             # Image assets
```

## Features

### Scroll Experience
- **Lenis smooth scrolling** with RAF sync to Framer Motion
- **Scroll-triggered animations** using Intersection Observer
- **Parallax effects** on text and images
- **Section transitions** with soft fades

### Performance
- **Lazy loading** for non-critical images
- **Video optimization** with WebM + MP4 fallback
- **Font preloading** with `next/font`
- **RAF cleanup** on unmount
- **Reduced-motion support** for accessibility

### Loading
- **Percentage progress** tracking
- **Video ready state** detection
- **Font load completion**
- **Minimum delay** for smooth animation

### Visual Design
- **Editorial typography** with Playfair Display
- **Generous whitespace** and calm pacing
- **Soft fades** instead of aggressive motion
- **Subtle grain overlay** (optional)
- **Neutral palette** with accent color

## Customization

### Update Content

Edit the data in `app/page.tsx`:
- `WORKS_DATA` - Your portfolio projects
- `INTRO_DATA` - Introduction text
- `ABOUT_DATA` - About section content
- `CONTACT_DATA` - Email and social links

### Adjust Animations

Modify animation values in component files:
- `duration` - Animation length (seconds)
- `delay` - Start delay (seconds)
- `y`, `x` - Movement distance (pixels)
- `scale` - Scale values

### Change Colors

Update CSS variables in `app/globals.css`:
```css
:root {
  --background: #faf9f7;
  --foreground: #1a1a1a;
  --accent: #8b7355;
  --muted: #6b6b6b;
}
```

### Tune Scroll Speed

Adjust in `app/page.tsx`:
```tsx
useLenis({ duration: 1.5 }) // Increase for slower, decrease for faster
```

## Production Build

```bash
npm run build
npm start
```

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari 14+, Chrome Android)

## Credits

Inspired by the [Sienna style](https://lenis.locomotive.dev/) from the Lenis showcase.

## License

MIT
