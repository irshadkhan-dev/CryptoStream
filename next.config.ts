import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "resources.cryptocompare.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
