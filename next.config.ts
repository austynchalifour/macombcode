import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/services/websites",
        destination: "/services/web-design",
        permanent: true,
      },
      {
        source: "/services/software",
        destination: "/services/software-development",
        permanent: true,
      },
      {
        source: "/services/websites/:city",
        destination: "/web-design/:city",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
