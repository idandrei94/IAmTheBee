import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: `${process.env.UPLOADTHING_APPID}.ufs.sh`
      }
    ]
  }
};

export default nextConfig;
