/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/pub/:path*',
        destination: 'http://dev-dc-app.goodtech.mn/pub/:path*', // Proxy to pub Backend
      },
      {
        source: '/app/:path*',
        destination: 'http://dev-dc-app.goodtech.mn/app/:path*', // Proxy to app Backend
      },
    ]
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    })

    return config
  },
}

module.exports = nextConfig
