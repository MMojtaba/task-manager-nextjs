/** @type {import('next').NextConfig} */

const cspHeader = `
    default-src 'self';
    script-src 'self' 'unsafe-eval' 'unsafe-inline';
    style-src 'self' 'unsafe-inline';
    img-src 'self' blob: data:;
    font-src 'self';
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    frame-ancestors 'none';
`;

const nextConfig = {
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value: cspHeader.replace(/\n/g, ""),
          },
        ],
      },
    ];
  },
  experimental: {
    instrumentationHook: true,
    // appDir: true,
    // serverComponentsExternalPackages: ["mongoose"],
  },
  // TODO: fix errors and remove this
  typescript: {
    ignoreBuildErrors: true,
  },
  webpack: (config) => {
    // TODO: fix this so I can import bcrypt normally
    config.externals = [...config.externals, "bcrypt"];
    return config;
  },
};

export default nextConfig;
