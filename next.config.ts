import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  devIndicators: { position: 'bottom-right' },
  experimental: {
    dynamicIO: true,
  },
};

export default nextConfig;
