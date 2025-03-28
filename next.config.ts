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
      {
        protocol: "http",
        hostname: "example.com",
        pathname: "/**",
      },{
        protocol: "http",
        hostname: "www.example.com", 
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
