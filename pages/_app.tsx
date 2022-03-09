import type { AppProps } from 'next/app'
import { SWRConfig } from 'swr'
import 'antd/dist/antd.css'
import 'swiper/css/pagination'
import 'swiper/css'
import '../styles/globals.css'
import http from '@/lib/request'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SWRConfig
      value={{
        // fallback: pageProps.fallback,
        fetcher: http,
        onError: (error) => {
          if (error.status !== 403 && error.status !== 404) {
            // console.log('App error: ', error)
            // We can send the error to Sentry,
            // or show a notification UI.
          }
        },
      }}
    >
      <Component {...pageProps} />
    </SWRConfig>
  )
}

export default MyApp
