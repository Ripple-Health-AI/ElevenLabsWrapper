import type { NextConfig } from "next";


const nextConfig: NextConfig = {
 output: "standalone",
 experimental: {
   serverComponentsExternalPackages: ['firebase-admin']
 }
 devIndicators: false,
 eslint: {
   ignoreDuringBuilds: true,
 },
 typescript: {
   ignoreBuildErrors: true,
 },
};


export default nextConfig;