/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  // Recommended for static export
  reactStrictMode: true,

  // Optional: Configure base path if deploying to a subdirectory
  // basePath: '/your-project-name',

  // Optional: Configure asset prefix for CDN or custom domain
  assetPrefix:
    process.env.NODE_ENV === 'production'
      ? 'https://cdn.soundsystemsofmelbourne.com.au'
      : '',

  // Optional: Disable server-side features not compatible with static export
  serverRuntimeConfig: {},
  publicRuntimeConfig: {},
}

module.exports = nextConfig
