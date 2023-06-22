/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['antd'],
  swcMinify: true,
  output: 'standalone'
}

module.exports = nextConfig
