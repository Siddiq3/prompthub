/** @type {import('next').NextConfig} */
const nextConfig = {
  // Image optimization settings
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "photopromptshub.in",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.pexels.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "cdn.openai.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "cdn.jsdelivr.net",
        pathname: "/gh/**",
      },
      {
        protocol: "https",
        hostname: "raw.githubusercontent.com",
        pathname: "/**",
      },
    ],
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 31536000, // 1 year for immutable images
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

  // Security and cache headers (C-04: Add CSP and security headers)
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Content-Security-Policy",
            value: process.env.NODE_ENV === "production"
              ? "default-src 'self'; img-src * data:; media-src 'self' https: blob:; script-src 'self' 'unsafe-inline' cdn.jsdelivr.net pagead2.googlesyndication.com; style-src 'self' 'unsafe-inline'; font-src 'self'; connect-src 'self' https:; frame-src 'self' googleads.g.doubleclick.net tpc.googlesyndication.com"
              : "default-src 'self'; img-src * data: blob:; media-src 'self' https: blob:; script-src 'self' 'unsafe-inline' 'unsafe-eval' cdn.jsdelivr.net pagead2.googlesyndication.com localhost:*; style-src 'self' 'unsafe-inline'; font-src 'self'; connect-src 'self' https: http: ws: wss:; frame-src 'self' googleads.g.doubleclick.net tpc.googlesyndication.com",
          },
        ],
      },
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

  // Domain redirects for SEO (C-02: Enforce canonical domain)
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: "prompthub-eta-ruby.vercel.app",
          },
        ],
        destination: "https://photopromptshub.in/:path*",
        permanent: true,
      },
    ];
  },

  // Experimental features
  experimental: {
    optimizePackageImports: ["react-icons"],
  },
};

module.exports = nextConfig;
