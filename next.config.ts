import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Note: Removed "output: export" to enable Server Actions for the CMS admin panel.
  // The admin panel requires server-side functionality to create/update/delete content.
  // For static hosting, you can:
  // 1. Run `npm run dev` locally to use the CMS admin
  // 2. Deploy to a platform that supports Next.js server rendering (Vercel, Railway, etc.)
  // 3. After editing content, rebuild and redeploy the static site
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;
