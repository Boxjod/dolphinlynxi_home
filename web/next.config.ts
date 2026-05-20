import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  reactStrictMode: true,
  devIndicators: false,
  images: { unoptimized: true },
  allowedDevOrigins: ["www.dolphinlynxi.com", "192.168.31.52", "localhost"],
};

export default nextConfig;