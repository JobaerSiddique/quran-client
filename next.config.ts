/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },

  typescript: {
    // ⚠️ Ignore TypeScript errors during build
    ignoreBuildErrors: true,
  },
  transpilePackages: ["framer-motion"],
  compiler: {
    styledComponents: true,
  },
};

module.exports = nextConfig;
