/** @type {import('next').NextConfig} */
const nextConfig = {
 images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.ibb.co", // or whatever domain you're using for images
      },
    ],
  },
};
export default nextConfig;
