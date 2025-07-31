/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.ibb.co",
      },
    ],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: '10mb', // Set higher as needed (e.g., 10mb)
    },
  },
};

export default nextConfig;