import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Include private/products PDFs in serverless function bundles
  // so the download API can serve them even without Supabase Storage
  outputFileTracingIncludes: {
    "/api/download": ["./private/products/**/*"],
  },
};

export default nextConfig;
