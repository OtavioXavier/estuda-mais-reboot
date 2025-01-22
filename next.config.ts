import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.output.publicPath = "";
    }
    return config;
  }
};

export default nextConfig;
