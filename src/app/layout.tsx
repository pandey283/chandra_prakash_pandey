import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "@/styles/main.scss";

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
  robots: "index, follow",
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
    <html lang="en" className={`${inter.variable} h-full`} suppressHydrationWarning>
      <body className="min-h-full flex flex-col antialiased">{children}</body>
    </html>
  );
}
