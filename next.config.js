/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  transpilePackages: ["antd"],
  swcMinify: true,
  output: "standalone",
};

module.exports = nextConfig;
