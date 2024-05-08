/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  distDir: "build",
  images: {
    domains: ['mememaza.test'], 
  },
};

module.exports = nextConfig;
