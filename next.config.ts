import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  sassOptions: {
    // Sass compiler: use the default 'sass' package (dart-sass).
    // Partials explicitly @use '../abstracts' as * — this is the correct
    // Sass Module System pattern. No additionalData injection needed.
  },
};

export default nextConfig;
