/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
  images: {
    domains: ["firebasestorage.googleapis.com"],
    loader: "static",
  
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};


module.exports = nextConfig;
