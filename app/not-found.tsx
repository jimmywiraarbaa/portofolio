import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 bg-[var(--background)]">
      <div className="text-center">
        <h1 className="text-[20vw] md:text-[15vw] lg:text-[10vw] font-sans leading-none tracking-tighter text-[var(--foreground)] opacity-20">
          404
        </h1>
        <div className="mt-8">
          <h2 className="text-2xl md:text-3xl font-light text-[var(--foreground)] mb-4">
            Page Not Found
          </h2>
          <p className="text-[var(--muted)] mb-8 max-w-md mx-auto">
            The page you are looking for does not exist or has been moved.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-3 px-8 py-4 border border-[var(--foreground)] text-[var(--foreground)] text-sm uppercase tracking-[0.15em] hover:bg-[var(--foreground)] hover:text-[var(--background)] transition-all duration-300"
          >
            Back to Home
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4 10H16M16 10L10 4M16 10L10 16"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}
