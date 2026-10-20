import type { NextConfig } from "next";

const config: NextConfig = {
  poweredByHeader: false,
  allowedDevOrigins: ["127.0.0.1"],
  images: {
    remotePatterns: [{ protocol: "https", hostname: "images.unsplash.com", port: "", pathname: "/photo-*" }],
  },
};

export default config;
