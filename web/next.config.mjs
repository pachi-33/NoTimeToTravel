/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'timelord.cn',
          },
        ],
      },
};

export default nextConfig;
