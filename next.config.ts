import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "images.amazon.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.amazon.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
