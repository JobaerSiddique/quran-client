/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["localhost"],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    // ⚠️ Ignore TypeScript errors during build
    ignoreBuildErrors: true,
  },
};

module.exports = nextConfig;
