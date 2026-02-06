# Assets

Place your media files in the corresponding directories:

## Videos (`/public/videos/`)

- `hero.webm` - Primary hero video (WebM format, recommended for web)
- `hero.mp4` - Fallback hero video (MP4 format for broader compatibility)

Recommended video specs:
- Resolution: 1920x1080 or higher
- Codec: H.264 for MP4, VP9 for WebM
- Bitrate: 2-5 Mbps for 1080p
- Duration: 10-30 seconds loop
- File size: Keep under 10MB for optimal loading

## Images (`/public/images/`)

Required images:
- `hero-poster.jpg` - Hero video poster image (1920x1080)
- `work1.jpg`, `work2.jpg`, `work3.jpg` - Project showcase images (min 1200px width)

Image recommendations:
- Format: WebP with JPEG fallback
- Quality: 80-90%
- Optimize using: `squoosh.app` or `imageoptim.com`

## Font Optimization

The project uses Next.js font optimization with:
- Inter (body text)
- Playfair Display (editorial headings)

Fonts are automatically optimized and served with proper `font-display: swap`.
