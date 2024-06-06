/** @type {import('next').NextConfig} */
const nextConfig = {
  // reactStrictMode: true,
  reactStrictMode: false,
  // output: "standalone",
  env: {
    NEXTAUTH_SECRET: "nx!^devB@&Nk%",
    // NEXTAUTH_URL: "http://localhost:3000",
    // BASE_API_URL: "http://localhost:60601",
    NEXTAUTH_URL: "https://web.avati.me",
    // BASE_API_URL: "https://api-dev.avati.me",
    BASE_API_URL: "https://bankdevapi.techscape.app",
    NEXT_PUBLIC_GOOGLE_MAPS_API_KEY: "AIzaSyD7Eod1PyWrG8UaJLQFV42dc5OobZqw46E",
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  transpilePackages: ['three'],
  // experimental: {
  //   outputStandalone: true,
  // },
};

const withNextIntl = require("next-intl/plugin")();

module.exports = withNextIntl(nextConfig);
