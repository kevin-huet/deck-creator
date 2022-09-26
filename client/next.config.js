/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    formats: ["image/webp"],

  },
  experimental: {
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: '**.cloudfront.net',
        }
      ]
    }
  }
}

module.exports = nextConfig
