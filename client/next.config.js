/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        return [
            {
                source: '/auth/social/google',
                destination: 'http://localhost:3000/auth/google' // Proxy to Backend
            },
            {
                source: '/discord',
                destination: 'http://localhost:3000/auth/discord' // Proxy to Backend
            },
            {
                source: '/api/:path*',
                destination: 'http://localhost:3000/:path*' // Proxy to Backend
            }
        ]
    },
    reactStrictMode: true,
    swcMinify: true,

    env: {
        GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID
    },
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
    },
}

module.exports = nextConfig
