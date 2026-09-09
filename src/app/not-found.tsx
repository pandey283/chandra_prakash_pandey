import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center min-h-dvh px-6 text-center">
      <p className="text-sm font-medium tracking-[0.2em] uppercase text-neutral-500 mb-4">
        404
      </p>
      <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-none mb-4">
        Page not found
      </h1>
      <p className="text-neutral-500 mb-8 max-w-sm">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-sm font-medium text-brand-primary hover:underline underline-offset-4"
      >
        ← Back to home
      </Link>
    </main>
  );
}
