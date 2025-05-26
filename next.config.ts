import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true, // ✅ allows deploy even if ESLint has errors
  },
  // other config options if you have them
}

export default nextConfig
