/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['photo-restorer.s3.eu-north-1.amazonaws.com'],
  }
}

module.exports = nextConfig
