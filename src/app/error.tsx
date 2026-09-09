"use client"; // Error boundaries must be Client Components per Next.js 16

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log to error reporting service in production
    console.error(error);
  }, [error]);

  return (
    <main className="flex flex-1 flex-col items-center justify-center min-h-dvh px-6 text-center">
      <p className="text-sm font-medium tracking-[0.2em] uppercase text-neutral-500 mb-4">
        Error
      </p>
      <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-none mb-4">
        Something went wrong
      </h1>
      <p className="text-neutral-500 mb-8 max-w-sm">
        An unexpected error occurred. Try again or return home.
      </p>
      <button
        onClick={reset}
        className="inline-flex items-center gap-2 text-sm font-medium text-brand-primary hover:underline underline-offset-4"
      >
        Try again
      </button>
    </main>
  );
}
