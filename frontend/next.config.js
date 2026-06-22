const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.aivencloud.com',
      },
      {
        protocol: 'https',
        hostname: '*.vercel.app',
      },
      {
        protocol: 'https',
        hostname: '*.ngrok.io',
      },
      {
        protocol: 'https',
        hostname: '*.ngrok-free.app',
      },
    ],
  },
};

module.exports = nextConfig;
