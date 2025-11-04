import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export', // ✅ enables static export (replaces "next export")
  images: {
    unoptimized: true, // optional: disables Next.js Image Optimization
  },
};

export default nextConfig;
