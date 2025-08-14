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
  },
  // サーバーランタイムでのみ使用するネイティブバイナリ（@resvg/resvg-js）をバンドル対象から外す
  // これにより webpack が .node を解釈しようとして失敗するのを回避する
  webpack: (config, { isServer }) => {
    if (isServer) {
      const externals = [
        '@resvg/resvg-js',
        '@resvg/resvg-js-linux-x64-gnu',
        '@resvg/resvg-js-linux-x64-musl',
        '@resvg/resvg-js-win32-x64-msvc',
        '@resvg/resvg-js-darwin-arm64',
        '@resvg/resvg-js-darwin-x64'
      ];
      config.externals = Array.isArray(config.externals)
        ? [...config.externals, ...externals]
        : [...(config.externals ?? []), ...externals];
    }
    return config;
  }
};

export default nextConfig;
