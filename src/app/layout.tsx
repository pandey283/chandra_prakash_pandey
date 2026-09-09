import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "@/styles/main.scss";

// Next.js 16: use .className directly on the element for clean application.
// .variable mode is for when you need the CSS custom property in Tailwind @theme —
// we expose it as --font-inter in globals.css @theme so we use variable mode here.
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Chandra Prakash Pandey",
    template: "%s | Chandra Prakash Pandey",
  },
  description: "Creative Technologist · Frontend Engineer · UI/UX Designer",
  authors: [{ name: "Chandra Prakash Pandey" }],
  keywords: ["frontend", "ui/ux", "nextjs", "react", "design systems"],
  // Use typed object form per Next.js 16 Metadata API
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
  openGraph: {
    type: "website",
    locale: "en_US",
    title: "Chandra Prakash Pandey",
    description: "Creative Technologist · Frontend Engineer · UI/UX Designer",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // inter.variable injects --font-inter CSS var; used in globals.css @theme
    <html lang="en" className={`${inter.variable} h-full`} suppressHydrationWarning>
      <body className="min-h-full flex flex-col antialiased">{children}</body>
    </html>
  );
}
