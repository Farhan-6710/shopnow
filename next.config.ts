import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false,
  experimental: {
    optimizePackageImports: ["@fortawesome/react-fontawesome"],
  },
  /* config options here */
};

export default nextConfig;
