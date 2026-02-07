'use client';

import Link from 'next/link';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body>
        <div className="min-h-screen flex flex-col items-center justify-center px-6 bg-black text-white">
          <div className="text-center">
            <h1 className="text-[20vw] md:text-[15vw] lg:text-[10vw] font-sans leading-none tracking-tighter text-white opacity-20">
              500
            </h1>
            <div className="mt-8">
              <h2 className="text-2xl md:text-3xl font-light text-white mb-4">
                Critical Error
              </h2>
              <p className="text-white/60 mb-8 max-w-md mx-auto">
                A critical error occurred. Please refresh the page or contact support if the problem persists.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <button
                  onClick={reset}
                  className="inline-flex items-center gap-3 px-8 py-4 border border-white text-white text-sm uppercase tracking-[0.15em] hover:bg-white hover:text-black transition-all duration-300"
                >
                  Reload
                </button>
                <Link
                  href="/"
                  className="inline-flex items-center gap-3 px-8 py-4 text-white/60 text-sm uppercase tracking-[0.15em] hover:text-white transition-all duration-300"
                >
                  Back to Home
                </Link>
              </div>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
