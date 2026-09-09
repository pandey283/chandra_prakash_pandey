// ============================================================
// GLOBAL TYPE DEFINITIONS
// Single source of truth for shared TypeScript interfaces.
// Import via: import type { NavLink, Project } from "@/types"
// ============================================================

// --- Navigation ---
export interface NavLink {
  label: string;
  href: string;
  external?: boolean;
}

// --- Social ---
export interface SocialLink {
  platform: string;
  href: string;
  label: string; // a11y aria-label
}

// --- Projects / Work ---
export type ProjectStatus = "live" | "wip" | "archived";
export type ProjectTag =
  | "React"
  | "Next.js"
  | "TypeScript"
  | "Tailwind CSS"
  | "GSAP"
  | "Framer Motion"
  | "Three.js"
  | "SCSS"
  | "Node.js"
  | "Design System"
  | "UI/UX"
  | string;

export interface Project {
  id: string;
  title: string;
  description: string;
  tags: ProjectTag[];
  href?: string;
  repo?: string;
  image?: string;
  status: ProjectStatus;
  year: number;
  featured?: boolean;
}

// --- Skills / Tech ---
export interface TechSkill {
  name: string;
  category: "frontend" | "design" | "tools" | "animation" | "3d";
}

// --- Common Component Props ---
export interface WithClassName {
  className?: string;
}

export interface WithChildren {
  children: React.ReactNode;
}

export interface WithChildrenAndClassName extends WithChildren, WithClassName {}

// --- Metadata helpers ---
export interface PageMeta {
  title: string;
  description: string;
  slug?: string;
}
