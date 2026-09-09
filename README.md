# Chandra Prakash Pandey — Project Handoff

> **Stack:** Next.js 16 · React 19 · Tailwind CSS v4 · SCSS (Sass) · TypeScript 5  
> **Last audited:** September 2026 — verified against `node_modules/next/dist/docs/` (Next.js 16.3.4 official docs)

---

## Table of Contents

1. [Project Overview](#project-overview)
2. [Tech Stack & Versions](#tech-stack--versions)
3. [Folder Structure](#folder-structure)
4. [SCSS Architecture](#scss-architecture)
5. [Tailwind v4 Setup](#tailwind-v4-setup)
6. [Font Setup](#font-setup)
7. [Next.js 16 Specifics](#nextjs-16-specifics)
8. [Getting Started](#getting-started)
9. [Development Workflow](#development-workflow)
10. [Naming Conventions](#naming-conventions)
11. [Extending the System](#extending-the-system)
12. [Architecture Audit Log](#architecture-audit-log)

---

## Project Overview

This is the **main parent project** — a production-grade Next.js 16 scaffold built for a premium portfolio / digital product experience. All work happens directly on the `main` branch unless a feature requires isolation.

Architecture goals:
- **Scalable** — SCSS 7-1 inspired partials, Tailwind v4 custom theme tokens, component-ready
- **Performant** — Static-first (App Router), optimised fonts via `next/font`, no runtime CSS-in-JS
- **Accessible** — SR-only utilities, focus-visible rings, semantic HTML
- **Maintainable** — single source of truth for design tokens (SCSS variables mirror Tailwind `@theme`)
- **Correct** — every file verified against the Next.js 16 official documentation

---

## Tech Stack & Versions

| Package | Version | Role |
|---|---|---|
| `next` | 16.3.4 | Framework (App Router, Turbopack) |
| `react` / `react-dom` | 19.2.8 | UI runtime |
| `typescript` | ^5 | Type safety |
| `tailwindcss` | ^4 | Utility-first CSS |
| `@tailwindcss/postcss` | ^4 | PostCSS integration for Tailwind v4 |
| `sass` | ^1.104 | SCSS compiler (dart-sass, Sass Module System) |
| `eslint` / `eslint-config-next` | ^9 / 16.3.4 | Linting |

**Dev-only (devDependencies):**

| Package | Version | Role |
|---|---|---|
| `@types/sass` | ^1.43 | TypeScript types for Sass — dev only, never shipped |
| `@types/node` | ^20 | Node types |
| `@types/react` | ^19 | React types |
| `@types/react-dom` | ^19 | React DOM types |

---

## Folder Structure

```
chandra_prakash_pandey/
├── src/
│   ├── app/                         # Next.js App Router
│   │   ├── globals.css              # Tailwind v4 @import + @theme + CSS vars + keyframes
│   │   ├── layout.tsx               # Root layout — Inter font, metadata, SCSS import
│   │   └── page.tsx                 # Home page (Server Component, static)
│   └── styles/
│       ├── main.scss                # SCSS entry point — imported once in layout.tsx
│       ├── abstracts/               # No CSS output — design tokens only
│       │   ├── _index.scss          # Barrel: @forward functions, variables, mixins
│       │   ├── _variables.scss      # All design tokens (colors, spacing, type, shadows, z-index)
│       │   ├── _mixins.scss         # Mixins: respond-to, fluid-type, glass, gradient-text, etc.
│       │   └── _functions.scss      # Pure SCSS functions: rem(), em(), shade(), tint()
│       ├── base/
│       │   ├── _index.scss          # Barrel
│       │   ├── _reset.scss          # Modern CSS reset (on top of Tailwind preflight)
│       │   └── _typography.scss     # Fluid type scale — h1–h6 use clamp() via fluid-type mixin
│       ├── layout/
│       │   ├── _index.scss          # Barrel
│       │   └── _grid.scss           # .container, .section, .auto-grid
│       ├── components/              # Empty — add per-component SCSS partials here
│       └── utilities/
│           └── _index.scss          # .sr-only, .text-gradient-brand/warm, .glass, .transition-smooth
├── public/                          # Static assets (SVGs, images)
├── package.json
├── tsconfig.json
├── next.config.ts                   # sassOptions configured per Next.js 16 Sass guide
└── postcss.config.mjs               # @tailwindcss/postcss plugin (Tailwind v4)
```

---

## SCSS Architecture

Follows a **7-1–inspired modular pattern** using the **Sass Module System** (`@use`/`@forward`). The legacy `@import` is never used.

### Layer Responsibilities

| Layer | Files | CSS Output | Purpose |
|---|---|---|---|
| `abstracts/` | `_variables.scss`, `_mixins.scss`, `_functions.scss` | ❌ None | Design tokens + helpers. Consumers `@use '../abstracts' as *` |
| `base/` | `_reset.scss`, `_typography.scss` | ✅ Yes | Global resets + fluid type scale |
| `layout/` | `_grid.scss` | ✅ Yes | Container, section padding, auto-grid |
| `components/` | *(per-component partials)* | ✅ Yes | BEM-scoped component styles |
| `utilities/` | `_index.scss` | ✅ Yes | One-off classes that supplement Tailwind |

### How to @use Abstracts in a New Partial

```scss
// Every partial that needs design tokens follows this pattern:
@use '../abstracts' as *;

.my-component {
  padding: $space-6;
  border-radius: $radius-xl;
  @include transition(transform);

  @include respond-to(md) {
    padding: $space-12;
  }
}
```

### Key Mixins Reference

```scss
// Responsive breakpoint (sm / md / lg / xl / 2xl)
@include respond-to(lg) { ... }

// Fluid typography — clamp() based, no JS
@include fluid-type(1rem, 3rem);
// Outputs: font-size: clamp(1rem, Xvw + Y, 3rem)

// Glassmorphism
@include glass(rgba(255,255,255,0.08), 12px);

// Gradient text (webkit + standard)
@include gradient-text(linear-gradient(135deg, #0070f3, #7928ca));

// Accessible focus ring
@include focus-ring($color-brand-primary, 3px);

// Line clamp
@include truncate(3);  // 3-line ellipsis

// Visually hidden (a11y)
@include sr-only;

// Flex shortcuts
@include flex-center;
@include flex-between;
@include flex-col;
```

### Key Variables Reference

```scss
// Colors
$color-brand-primary    // #0070f3
$color-brand-secondary  // #7928ca
$color-brand-accent     // #ff0080

// Spacing (4px base)
$space-4   // 1rem / 16px
$space-6   // 1.5rem / 24px
$space-8   // 2rem / 32px
$space-12  // 3rem / 48px
$space-16  // 4rem / 64px

// Radii
$radius-sm / $radius-md / $radius-lg / $radius-xl / $radius-2xl / $radius-full

// Transitions
$transition-fast    // 150ms ease
$transition-base    // 250ms ease
$transition-slow    // 400ms ease
$transition-spring  // 600ms cubic-bezier(0.34, 1.56, 0.64, 1)

// Z-index scale
$z-dropdown / $z-sticky / $z-overlay / $z-modal / $z-toast
```

---

## Tailwind v4 Setup

Tailwind v4 is **CSS-first** — no `tailwind.config.js` exists or is needed.

All customisation lives in `src/app/globals.css` inside `@theme inline { }`:

```css
/* globals.css */
@import "tailwindcss";

@theme inline {
  --color-brand-primary:    #0070f3;   /* → bg-brand-primary, text-brand-primary */
  --color-brand-secondary:  #7928ca;   /* → bg-brand-secondary etc. */
  --color-brand-accent:     #ff0080;

  --font-sans:  'Inter', -apple-system, sans-serif;
  --font-mono:  'JetBrains Mono', monospace;
  --font-serif: 'Playfair Display', Georgia, serif;

  --font-inter: var(--font-inter);     /* wired to next/font CSS variable */

  --animate-fade-in:  fade-in 0.3s ease;
  --animate-slide-up: slide-up 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  --animate-scale-in: scale-in 0.25s ease;
}
```

Tokens registered in `@theme` auto-generate Tailwind utility classes:

| Token | Generated class |
|---|---|
| `--color-brand-primary` | `bg-brand-primary`, `text-brand-primary`, `border-brand-primary` |
| `--font-sans` | `font-sans` |
| `--animate-slide-up` | `animate-slide-up` |
| `--spacing-18` | `p-18`, `m-18`, `gap-18` |

### CSS Custom Properties (runtime theming)

```css
:root {
  --background: #ffffff;
  --foreground: #0a0a0a;
  --surface:    #f5f5f5;
  --border:     #e5e5e5;
}

@media (prefers-color-scheme: dark) {
  :root {
    --background: #0a0a0a;
    --foreground: #ededed;
    --surface:    #171717;
    --border:     #262626;
  }
}
```

---

## Font Setup

**Source:** `next/font/google` → `Inter`

**Pattern used:** `.variable` mode — injects `--font-inter` as a CSS custom property on `<html>`, which is then consumed by Tailwind `@theme`.

```tsx
// layout.tsx
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",  // ← creates CSS var on <html>
  display: "swap",
});

// Applied to <html> — exposes --font-inter to all descendants
<html className={`${inter.variable} h-full`}>
```

```css
/* globals.css @theme picks it up */
@theme inline {
  --font-sans: 'Inter', system-ui, sans-serif;
}
```

> **Why `.variable` not `.className`?**  
> `.className` directly applies the font to one element. `.variable` mode exposes a CSS custom property (`--font-inter`) that Tailwind's `@theme` can reference. Since we want `font-sans` to resolve through the Tailwind token system (and be overridable per component), `.variable` is the correct choice. This is verified against the Next.js 16 `next/font` docs.

---

## Next.js 16 Specifics

### App Router — Default Server Components

All `layout.tsx` and `page.tsx` files are **React Server Components** by default. Only add `"use client"` when the component requires:
- `useState` / `useEffect` or other React hooks
- Browser APIs (`window`, `localStorage`, `navigator`)
- Event handlers (`onClick`, `onChange`)

```tsx
// Client Component — add directive at top of file
"use client";

import { useState } from "react";

export default function Counter() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(c => c + 1)}>{count}</button>;
}
```

### Metadata API (Next.js 16)

Use the typed `robots` object — not a plain string:

```tsx
// layout.tsx — correct for Next.js 16
export const metadata: Metadata = {
  title: {
    default: "Page Title",
    template: "%s | Site Name",   // ← sub-pages use this template
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};
```

### Sass Configuration (`next.config.ts`)

```ts
// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  sassOptions: {
    // Default implementation: 'sass' (dart-sass).
    // Each .scss partial explicitly @use '../abstracts' as * — correct Sass Module System pattern.
  },
};

export default nextConfig;
```

> **Note from AGENTS.md:** Next.js 16 has breaking changes from prior versions. Always read `node_modules/next/dist/docs/` before modifying Next.js-specific APIs. This project has been verified against those docs.

---

## Getting Started

```bash
# 1. Clone
git clone https://github.com/pandey283/chandra_prakash_pandey.git
cd chandra_prakash_pandey

# 2. Install dependencies
npm install

# 3. Dev server → http://localhost:3000
npm run dev

# 4. Production build (must pass with zero warnings)
npm run build

# 5. Start production server
npm start

# 6. Lint
npm run lint
```

---

## Development Workflow

1. **Branch:** All work on `main`. Feature branches (`feat/xyz`) only when isolating large features.
2. **Commits:** Conventional commits — `feat:`, `fix:`, `chore:`, `style:`, `docs:`, `refactor:`.
3. **Build gate:** `npm run build` must pass with **zero errors and zero warnings** before pushing.
4. **Server vs Client:** Default to Server Components. Add `"use client"` only when proven necessary.

### Adding a New Page

```
src/app/
└── about/
    └── page.tsx       ← auto-creates /about route (Server Component by default)
```

### Adding a New Component

```
src/
└── components/
    └── ui/
        ├── Card.tsx             ← Server or Client Component
        └── Card.module.scss     ← CSS Modules for component-scoped styles
```

Inside `Card.module.scss`:
```scss
@use '../../styles/abstracts' as *;

.card {
  padding: $space-6;
  border-radius: $radius-xl;
  @include transition(box-shadow);

  @include respond-to(md) {
    padding: $space-8;
  }
}
```

### Adding a New SCSS Partial

1. Create `src/styles/components/_card.scss`
2. Add `@use '../abstracts' as *;` at the top
3. Write BEM styles
4. `@forward 'card'` inside a `src/styles/components/_index.scss`
5. `@use 'components'` in `src/styles/main.scss`

---

## Naming Conventions

| Type | Convention | Example |
|---|---|---|
| Components | PascalCase | `HeroSection.tsx`, `NavBar.tsx` |
| SCSS partials | `_kebab-case.scss` | `_hero-section.scss` |
| CSS Modules | `ComponentName.module.scss` | `Card.module.scss` |
| CSS classes (SCSS/BEM) | `.block__element--modifier` | `.card__title--featured` |
| Tailwind classes | Utility-first inline | `className="flex gap-4 p-6"` |
| CSS custom properties | `--kebab-case` | `--color-brand-primary` |
| SCSS variables | `$kebab-case` | `$color-brand-primary` |
| TypeScript vars | `camelCase` | `const heroTitle` |
| TypeScript types/interfaces | `PascalCase` | `type HeroProps`, `interface CardData` |
| Next.js route folders | `kebab-case` | `app/about-me/page.tsx` |
| Next.js route groups | `(group-name)` | `app/(marketing)/page.tsx` |

---

## Extending the System

### Add a New Brand Color

**Step 1 — `globals.css` (Tailwind v4 token):**
```css
@theme inline {
  --color-teal: #0d9488;
}
```

**Step 2 — `_variables.scss` (SCSS mirror):**
```scss
$color-teal: #0d9488;
```

Both are now available: `bg-teal`, `text-teal` (Tailwind) and `$color-teal` (SCSS).

---

### Add a New Animation

```css
/* globals.css */
@keyframes pop-in {
  from { opacity: 0; transform: scale(0.8); }
  to   { opacity: 1; transform: scale(1); }
}

@theme inline {
  --animate-pop-in: pop-in 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}
```

Usage in JSX: `className="animate-pop-in"`  
Usage in SCSS: `animation: var(--animate-pop-in);`

---

### Add a New SCSS Mixin

```scss
// src/styles/abstracts/_mixins.scss
@mixin card-hover {
  @include transition(transform box-shadow);
  &:hover {
    transform: translateY(-4px);
    box-shadow: $shadow-xl;
  }
}
```

---

### Add a New Route Group (no URL impact)

```
src/app/
├── (marketing)/
│   ├── layout.tsx      ← shared layout for marketing pages
│   └── about/
│       └── page.tsx    ← /about
└── (product)/
    └── dashboard/
        └── page.tsx    ← /dashboard
```

---

## Architecture Audit Log

| Date | Audited Against | Findings | Status |
|---|---|---|---|
| Sep 2026 | `node_modules/next/dist/docs/` (Next.js 16.3.4) | `@types/sass` was in `dependencies` → moved to `devDependencies` | ✅ Fixed |
| Sep 2026 | Next.js 16 Metadata API docs | `metadata.robots` was a plain string → changed to typed object with `googleBot` directives | ✅ Fixed |
| Sep 2026 | Next.js 16 `next/font` docs | Confirmed `.variable` mode is correct when font is consumed via Tailwind `@theme` | ✅ Verified |
| Sep 2026 | Next.js 16 CSS / Sass docs | `sassOptions` scaffold added to `next.config.ts`; explicit `@use` in each partial confirmed correct Sass Module System pattern | ✅ Verified |
| Sep 2026 | Full production build | Zero errors, zero warnings | ✅ Confirmed |

---

*Scaffolded & audited: September 2026 · Next.js 16.3.4 · React 19 · Tailwind v4 · SCSS Sass Module System*
