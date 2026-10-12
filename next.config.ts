import type { NextConfig } from "next";

/**
 * Static export for cPanel (Apache) hosting: `next build` writes plain HTML,
 * CSS and JS to ./out, which is uploaded to public_html. Trailing slashes keep
 * every URL identical to the existing site (e.g. /services/biv/).
 * Security and caching headers live in public/.htaccess because a static
 * export cannot set response headers itself.
 */
const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  poweredByHeader: false,
  reactStrictMode: true,
  images: {
    loader: "custom",
    loaderFile: "./src/lib/image-loader.ts",
    deviceSizes: [640, 828, 1080, 1280, 1920],
    imageSizes: [384],
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
