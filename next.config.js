/** @type {import('next').NextConfig} */
const nextConfig = {
  // Image optimization settings
  images: {
    domains: [
      "photopromptshub.in",
      "images.unsplash.com",
      "images.pexels.com",
      "cdn.openai.com",
    ],
    formats: ["image/avif", "image/webp"],
  },

  // Trailing slash configuration
  trailingSlash: false,

  // Enable compression
  compress: true,

  // React strict mode
  reactStrictMode: true,

  // ESLint
  eslint: {
    dirs: ["app", "components", "lib", "utils"],
  },

  // Cache headers
  async headers() {
    return [
      {
        source: "/images/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/sitemap.xml",
        headers: [
          {
            key: "Content-Type",
            value: "application/xml",
          },
          {
            key: "Cache-Control",
            value: "public, max-age=3600",
          },
        ],
      },
    ];
  },

  // Experimental features
  experimental: {
    optimizePackageImports: ["react-icons"],
  },
};

module.exports = nextConfig;
