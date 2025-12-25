import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';
import withPWA from "next-pwa";
const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  /* experimental: {
    serverActions: {
      bodySizeLimit: '10mb'
    }
  }, */
  /* images: {
    remotePatterns: [
       
      {
        protocol:"https",
        hostname:"res.cloudinary.com",
        
      },
       
    ]
  } */
};


const nextIntl = createNextIntlPlugin();

const pwa = withPWA({
  dest: "public",
  register: true,
  skipWaiting: true,
  //disable: process.env.NODE_ENV === "development", // Temporarily set to false for testing PWA in development
});

const config = nextIntl(pwa(nextConfig as any) as any);
export default config;

