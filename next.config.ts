import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    dangerouslyAllowSVG: true,
    unoptimized: true,
  },
  // async rewrites() {
  //   return [
  //     {
  //       source: "/admin/tinacms",
  //       destination: "/admin/index.html",
  //     },
  //     // Keep the original admin route for our custom admin panel
  //   ];
  // },
  output: "export",
};

export default nextConfig;
