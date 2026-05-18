import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "i.pravatar.cc",
      },
      {
        protocol: "https",
        hostname: "www.100honar.com",
      },
      {
        protocol: "https",
        hostname: "media.licdn.com",
      },
    {
protocol:"https",
hostname:"api.boometo.com"
    },
    ],
  },
};

export default nextConfig;