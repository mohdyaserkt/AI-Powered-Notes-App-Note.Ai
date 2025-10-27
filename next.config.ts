import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: "standalone",
  telemetry: false,
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
