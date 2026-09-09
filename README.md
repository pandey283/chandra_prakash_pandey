# Chandra Prakash Pandey — Project Handoff

> **Stack:** Next.js 16 · React 19 · Tailwind CSS v4 · SCSS (Sass) · TypeScript 5

---

## Table of Contents

1. [Project Overview](#project-overview)
2. [Tech Stack & Versions](#tech-stack--versions)
3. [Folder Structure](#folder-structure)
4. [SCSS Architecture](#scss-architecture)
5. [Tailwind v4 Setup](#tailwind-v4-setup)
6. [Getting Started](#getting-started)
7. [Development Workflow](#development-workflow)
8. [Naming Conventions](#naming-conventions)
9. [Extending the System](#extending-the-system)

---

## Project Overview

This is the **main parent project** — a production-grade Next.js application scaffold built for a premium portfolio / digital product experience. All work happens directly on the `main` branch unless a feature requires isolation.

Architecture goals:
- **Scalable** — SCSS 7-1 inspired partials, Tailwind v4 custom theme tokens, component-ready
- **Performant** — Static-first (App Router), optimised fonts via `next/font`, no runtime CSS-in-JS
- **Accessible** — SR-only utilities, focus-visible rings, semantic HTML
- **Maintainable** — single source of truth for design tokens (SCSS variables mirror Tailwind `@theme`)

---

## Tech Stack & Versions

| Package | Version | Role |
|---|---|---|
| `next` | 16.3.4 | Framework (App Router, Turbopack) |
| `react` / `react-dom` | 19.2.8 | UI runtime |
| `typescript` | ^5 | Type safety |
| `tailwindcss` | ^4 | Utility-first CSS |
| `@tailwindcss/postcss` | ^4 | PostCSS integration for Tailwind v4 |
| `sass` | ^1.104 | SCSS compiler |
| `eslint` / `eslint-config-next` | ^9 / 16.3.4 | Linting |

---

## Folder Structure

```
chandra_prakash_pandey/
├── src/
│   ├── app/
│   │   ├── globals.css        # Tailwind v4 @import + CSS custom properties + keyframes
│   │   ├── layout.tsx         # Root layout — fonts, metadata, SCSS import
│   │   └── page.tsx           # Home page
│   └── styles/
│       ├── main.scss          # SCSS entry point (imported in layout.tsx)
│       ├── abstracts/
│       │   ├── _index.scss    # Barrel — @forward all abstracts
│       │   ├── _variables.scss# Design tokens: colors, spacing, type, radii, z-index
│       │   ├── _mixins.scss   # Reusable mixins: respond-to, fluid-type, glass, etc.
│       │   └── _functions.scss# Pure SCSS functions: rem(), em(), shade(), tint()
│       ├── base/
│       │   ├── _index.scss    # Barrel
│       │   ├── _reset.scss    # Minimal modern CSS reset
│       │   └── _typography.scss# Global type scale + fluid-type headings
│       ├── layout/
│       │   ├── _index.scss    # Barrel
│       │   └── _grid.scss     # .container, .section, .auto-grid
│       ├── components/        # (empty — add per-component SCSS here)
│       └── utilities/
│           └── _index.scss    # .sr-only, .text-gradient-*, .glass, .transition-smooth
├── public/
├── package.json
├── tsconfig.json
├── next.config.ts
└── postcss.config.mjs         # @tailwindcss/postcss plugin
```

---

## SCSS Architecture

Follows a **7-1–inspired modular pattern** with `@use`/`@forward` (Sass Module System — no `@import`).

### Layer Responsibilities

| Layer | Files | Purpose |
|---|---|---|
| `abstracts/` | `_variables.scss`, `_mixins.scss`, `_functions.scss` | No CSS output. Pure design tokens and helpers. |
| `base/` | `_reset.scss`, `_typography.scss` | Global resets and type scale. |
| `layout/` | `_grid.scss` | Container, section wrappers, auto-grid. |
| `components/` | *(per-component)* | Scoped BEM component styles. |
| `utilities/` | `_index.scss` | One-off utility classes supplementing Tailwind. |

### Key Mixins

```scss
// Responsive breakpoint
@include respond-to(lg) { ... }

// Fluid typography (clamp-based, no JS)
@include fluid-type(1rem, 3rem);

// Glassmorphism
@include glass(rgba(255,255,255,0.08), 12px);

// Gradient text
@include gradient-text(linear-gradient(135deg, #0070f3, #7928ca));

// Accessible focus ring
@include focus-ring($color-brand-primary);
```

### Using Abstracts in a New SCSS File

```scss
// In any new partial:
@use '../abstracts' as *;

.my-component {
  padding: $space-6;
  border-radius: $radius-xl;
  @include respond-to(md) { padding: $space-12; }
}
```

---

## Tailwind v4 Setup

Tailwind v4 uses a **CSS-first config** — no `tailwind.config.js`.

All customization lives in `src/app/globals.css` inside `@theme inline { }`:

```css
@theme inline {
  --color-brand-primary:   #0070f3;
  --color-brand-secondary: #7928ca;
  --color-brand-accent:    #ff0080;
  --font-sans: 'Inter', system-ui, sans-serif;
  --animate-slide-up: slide-up 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}
```

This makes `bg-brand-primary`, `text-brand-secondary`, `font-sans`, `animate-slide-up` etc. available as Tailwind utilities automatically.

### Keyframes

Custom animations are defined as regular `@keyframes` blocks in `globals.css` and registered in `@theme`. Use them via `animate-[slide-up_...]` or by adding `--animate-*` tokens.

---

## Getting Started

```bash
# Install dependencies
npm install

# Dev server (localhost:3000)
npm run dev

# Production build
npm run build

# Start production server
npm start

# Lint
npm run lint
```

---

## Development Workflow

1. **All work on `main`** — this is the parent project root.
2. Feature branches (`feat/xyz`) are used when a standalone feature needs isolation, then merged back to `main`.
3. Commit messages follow conventional commits: `feat:`, `fix:`, `chore:`, `style:`, `docs:`.
4. Before committing: `npm run build` must pass with zero warnings.

### Adding a New Page

```
src/app/
└── about/
    └── page.tsx
```

Next.js App Router auto-creates the `/about` route.

### Adding a New Component with SCSS

```
src/
├── components/
│   └── ui/
│       ├── Button.tsx
│       └── Button.module.scss   # CSS Modules for component-scoped styles
```

Or add a partial to `src/styles/components/` and `@forward` it.

---

## Naming Conventions

| Type | Convention | Example |
|---|---|---|
| Components | PascalCase | `HeroSection.tsx` |
| SCSS partials | `_kebab-case.scss` | `_card-grid.scss` |
| CSS classes (SCSS) | BEM `.block__element--modifier` | `.card__title--featured` |
| Tailwind classes | Utility-first inline | `className="flex gap-4 p-6"` |
| CSS custom properties | `--kebab-case` | `--color-brand-primary` |
| SCSS variables | `$kebab-case` | `$color-brand-primary` |
| TypeScript | camelCase vars, PascalCase types | `const heroTitle`, `type HeroProps` |

---

## Extending the System

### Add a New Color Token

**1. In `globals.css` (Tailwind v4):**
```css
@theme inline {
  --color-emerald: #10b981;
}
```

**2. In `_variables.scss` (SCSS mirror):**
```scss
$color-emerald: #10b981;
```

Now `bg-emerald`, `text-emerald`, and `$color-emerald` are both available.

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

Usage: `className="animate-pop-in"` or `animation: var(--animate-pop-in)` in SCSS.

### Add a New Mixin

```scss
// src/styles/abstracts/_mixins.scss
@mixin card-hover {
  transition: transform $transition-base, box-shadow $transition-base;
  &:hover {
    transform: translateY(-4px);
    box-shadow: $shadow-xl;
  }
}
```

---

*Scaffolded: September 2026 · Next.js 16.3.4 · Tailwind v4 · SCSS Sass Module System*
