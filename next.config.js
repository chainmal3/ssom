/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  // Your other config options...
  // If you have images, you might need:
  images: {
    unoptimized: true,
  },
}

module.exports = nextConfig
