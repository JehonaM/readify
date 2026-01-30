/** @type {import('next').NextConfig} */
const nextConfig = {
  devIndicators: {
    appIsrStatus: true,
    buildActivity: true,
    buildActivityPosition: "bottom-right",
  },

  allowedDevOrigins: ["192.168.0.72"],
  experimental: {
    turbopack: {

      root: ".",
    },
  },
};

export default nextConfig;
