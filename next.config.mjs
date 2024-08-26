/** @type {import('next').NextConfig} */
const nextConfig = {
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
