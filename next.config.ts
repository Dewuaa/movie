/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    // Ignores TypeScript errors during build
    ignoreBuildErrors: true,
  },
  eslint: {
    // Ignores ESLint errors during build
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "via.placeholder.com",
      },
      {
        protocol: "https",
        hostname: "image.tmdb.org",
      },
    ],
  },
};

export default nextConfig;
