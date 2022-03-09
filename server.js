const express = require('express')
const next = require('next')
const dotenv = require('dotenv')
const { createProxyMiddleware } = require('http-proxy-middleware')
const port = parseInt(process.env.PORT, 10) || 3001
const env = process.env.NODE_ENV
const dev = env !== 'production'

dotenv.config()

const app = next({
  dir: '.', // base directory where everything is, could move to src later
  dev,
})

const devProxy = {
  '/app': {
    target: process.env.NEXT_PUBLIC_ENV_API_HOST || 'http://localhost',
    changeOrigin: true,
  },

  [process.env.NEXT_PUBLIC_API_PREFIX]: {
    target: process.env.NEXT_PUBLIC_ENV_API_HOST || 'http://localhost',
    changeOrigin: true,
  },
}

const handle = app.getRequestHandler()

let server
app
  .prepare()
  .then(() => {
    server = express()

    // Set up the proxy.
    if (dev && devProxy) {
      Object.keys(devProxy).forEach(function (context) {
        server.use(context, createProxyMiddleware(context, devProxy[context]))
      })
    }

    // Default catch-all handler to allow Next.js to handle all other routes
    server.all('*', (req, res) => handle(req, res))

    server.listen(port, (err) => {
      if (err) {
        throw err
      }
      console.log(`> Ready on port ${port} [${env}]`)
    })
  })
  .catch((err) => {
    console.log('An error occurred, unable to start the server')
    console.log(err)
  })
