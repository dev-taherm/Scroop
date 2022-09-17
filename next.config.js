/** @type {import('next').NextConfig} */

 NextConfig = {
   reactStrictMode: true,
   compiler: {
     styledComponents: true,
   },
   images: {
     domains: ["firebasestorage.googleapis.com"],
     /* config for next-optimized-images */
   },

   eslint: {
     ignoreDuringBuilds: true,
   },
 };



module.exports = NextConfig;
