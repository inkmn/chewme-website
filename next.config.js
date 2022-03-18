/** @type {import('next').NextConfig} */
// const proxyHost = 'http://dev-dc-app.goodtech.mn'
const proxyHost = 'http://192.168.1.210:30527'
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: ['dev-dc-s3.goodtech.mn', '192.168.1.157'],
  },
  async rewrites() {
    return [
      {
        source: '/pub/:path*',
        destination: proxyHost + '/pub/:path*', // Proxy to pub Backend
      },
      {
        source: '/app/:path*',
        destination: proxyHost + '/app/:path*', // Proxy to app Backend
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
