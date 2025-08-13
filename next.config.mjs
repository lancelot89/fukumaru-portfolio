/**
 * Next.js 設定（App Router + 将来のMDX拡張前提）
 */
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ['image/avif', 'image/webp']
  },
  output: 'standalone',
  experimental: {
    optimizePackageImports: ['lucide-react']
  }
};

export default nextConfig;
