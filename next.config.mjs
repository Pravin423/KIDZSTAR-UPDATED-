/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true,
  reactStrictMode: true,

  allowedDevOrigins: [
    "http://192.168.5.176:3000",
    "http://localhost:3000",
  ],

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "placehold.co",
      },
    ],
  },

  // ── HTTP Security Headers ────────────────────────────────────────────────
  // Applied to every response the server sends.
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          // Prevent the browser from guessing content-types (MIME sniffing)
          { key: "X-Content-Type-Options", value: "nosniff" },

          // Block clickjacking — don't allow this site to be embedded in iframes
          { key: "X-Frame-Options", value: "DENY" },

          // Control what info is sent in the Referer header
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },

          // Only allow requests from the same origin to use browser features
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },

          // Restrict which resources the browser can load (Content Security Policy)
          // Allows: same-origin scripts, Google Fonts, Cloudinary images, Google Maps iframes
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval'", // unsafe-eval needed by Next.js dev
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              "font-src 'self' https://fonts.gstatic.com",
              "img-src 'self' data: blob: https://res.cloudinary.com https://placehold.co",
              "frame-src https://www.google.com https://maps.google.com", // Google Maps iframes
              "connect-src 'self'",
              "media-src 'self'",
            ].join("; "),
          },

          // Tell browsers to always use HTTPS (in production)
          // Remove this header in dev to avoid issues
          ...(process.env.NODE_ENV === "production"
            ? [{ key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" }]
            : []),
        ],
      },

      // ── Admin routes: extra no-cache header ─────────────────────────────
      {
        source: "/admin/:path*",
        headers: [
          { key: "Cache-Control", value: "no-store, no-cache, must-revalidate, proxy-revalidate" },
          { key: "Pragma", value: "no-cache" },
        ],
      },

      // ── Admin API routes: block from being embedded / cached ─────────────
      {
        source: "/api/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
        ],
      },
    ];
  },
};

export default nextConfig;
