/** @type {import('next').NextConfig} */


const withOptimizedImages = require("next-optimized-images");

module.exports = withOptimizedImages({
  /* config for next-optimized-images */ domains: [
    "firebasestorage.googleapis.com",
  ],
  // your config for other plugins or the general next.js here...reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
 
  eslint: {
    ignoreDuringBuilds: true,
  },
});



