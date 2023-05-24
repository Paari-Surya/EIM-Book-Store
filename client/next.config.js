/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/static/:path*',
        destination: 'http://localhost:8000/:path*',
      },
    ];
  },
  // async rewrites() {
  //   return [
  //     {
  //       source: '/api/:path*',
  //       destination: 'http://localhost:3000/api/:path*',
  //     },
  //     {
  //       source: '/static/:path*',
  //       destination: 'http://localhost:8000/static/:path*',
  //     },
  //   ];
  // },
};

module.exports = nextConfig;
