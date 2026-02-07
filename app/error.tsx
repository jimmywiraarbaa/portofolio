'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 bg-[var(--background)]">
      <div className="text-center">
        <h1 className="text-[20vw] md:text-[15vw] lg:text-[10vw] font-sans leading-none tracking-tighter text-[var(--foreground)] opacity-20">
          500
        </h1>
        <div className="mt-8">
          <h2 className="text-2xl md:text-3xl font-light text-[var(--foreground)] mb-4">
            Something went wrong
          </h2>
          <p className="text-[var(--muted)] mb-8 max-w-md mx-auto">
            An unexpected error occurred. Please try again later.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={reset}
              className="inline-flex items-center gap-3 px-8 py-4 border border-[var(--foreground)] text-[var(--foreground)] text-sm uppercase tracking-[0.15em] hover:bg-[var(--foreground)] hover:text-[var(--background)] transition-all duration-300"
            >
              Try again
            </button>
            <Link
              href="/"
              className="inline-flex items-center gap-3 px-8 py-4 text-[var(--muted)] text-sm uppercase tracking-[0.15em] hover:text-[var(--foreground)] transition-all duration-300"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
