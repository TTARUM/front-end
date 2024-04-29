/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: true,
  compiler: {
    styledComponents: true,
  },
  images: {
    domains: ['ttarum-bucket.s3.ap-northeast-2.amazonaws.com'],
  },
  reactStrictMode: true,
};

module.exports = nextConfig;
