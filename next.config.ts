import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  pageExtensions: ["ts", "tsx", "mdx"],
  experimental: {
    // Removed mdxRs to prevent CommonJS bundling issues with gray-matter
  },
  serverExternalPackages: ["gray-matter"],
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [],
  },
};

export default nextConfig;
