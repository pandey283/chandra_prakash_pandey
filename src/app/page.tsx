export default function Home() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center min-h-dvh px-6 text-center">
      <div className="animate-[slide-up_0.5s_cubic-bezier(0.16,1,0.3,1)_both]">
        <p className="text-sm font-medium tracking-[0.2em] uppercase text-neutral-500 mb-4">
          Next.js 16 · Tailwind v4 · SCSS
        </p>
        <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-none mb-6 text-gradient-brand">
          Chandra Prakash<br />Pandey
        </h1>
        <p className="text-lg text-neutral-500 max-w-md mx-auto leading-relaxed">
          Creative Technologist · Frontend Engineer · UI/UX Designer
        </p>
      </div>
    </main>
  );
}
