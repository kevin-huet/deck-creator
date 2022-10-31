/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/auth/social/google",
        destination: "http://localhost:3000/auth/google", // Proxy to Backend
      },
      {
        source: "/api/:path*",
        destination: "http://localhost:3000/:path*", // Proxy to Backend
      },
    ];
  },
  reactStrictMode: true,
  swcMinify: true,

  env: {
    DECK_API_BASE_URL: process.env.DECK_API_BASE_URL,
    USER_API_BASE_URL: process.env.USER_API_BASE_URL,
    STORAGE_API_BASE_URL: process.env.STORAGE_API_BASE_URL,
  },
  images: {
    formats: ["image/webp"],
  },
  experimental: {
    images: {
      remotePatterns: [
        {
          protocol: "https",
          hostname: "**.cloudfront.net",
        },
      ],
    },
  },
};

module.exports = nextConfig;
