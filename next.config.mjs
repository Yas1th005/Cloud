/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  // Allow builds to succeed even when ESLint reports errors/warnings.
  // This prevents ESLint from blocking deployment/builds.
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ucarecdn.com',
      },
      {
        protocol: 'https',
        hostname: 'wordpress-1269066-4577871.cloudwaysapps.com',
      },
    ],
  },
}

export default nextConfig
