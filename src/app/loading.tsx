// Root-level loading UI — Suspense boundary for all routes.
// Next.js 16: automatically wraps page.tsx in a <Suspense> boundary.
// This renders instantly while the route is streaming.

export default function Loading() {
  return (
    <div
      className="flex flex-1 items-center justify-center min-h-dvh"
      aria-label="Loading"
      role="status"
    >
      <div className="flex gap-1.5" aria-hidden="true">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="block w-1.5 h-1.5 rounded-full bg-neutral-400"
            style={{
              animation: `pulse 1.2s ease-in-out ${i * 0.2}s infinite`,
            }}
          />
        ))}
      </div>
      <span className="sr-only">Loading…</span>
    </div>
  );
}
