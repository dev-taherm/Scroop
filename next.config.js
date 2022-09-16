/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
  optimizedImages: {
    domains: ["firebasestorage.googleapis.com"],
    loader: "akamai",
    path: "",
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};



module.exports = nextConfig;
