"use client";
// global-error.tsx — catches errors thrown inside the root layout itself.
// Must include its own <html> and <body> tags per Next.js 16 docs.

import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="en">
      <body className="min-h-dvh flex flex-col items-center justify-center bg-neutral-950 text-neutral-50 px-6 text-center">
        <p className="text-sm font-medium tracking-[0.2em] uppercase text-neutral-500 mb-4">
          Critical Error
        </p>
        <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-none mb-4">
          Something broke
        </h1>
        <p className="text-neutral-400 mb-8 max-w-sm text-sm leading-relaxed">
          A critical error occurred. Refreshing may resolve the issue.
        </p>
        <button
          onClick={reset}
          className="inline-flex items-center gap-2 text-sm font-medium text-white border border-white/20 rounded-full px-6 py-2.5 hover:bg-white/10 transition-colors"
        >
          Try again
        </button>
      </body>
    </html>
  );
}
