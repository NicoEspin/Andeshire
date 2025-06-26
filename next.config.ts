// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/mock/job_detail/:path*",
        destination: "https://api.andeshire.com/mock/job_detail/:path*", // 🔁 proxy a la API real
      },
    ];
  },
};

module.exports = nextConfig;
