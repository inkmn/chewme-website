import type { AppProps } from 'next/app'
import AppProvider from '@/context/state'
import 'antd/dist/antd.css'
import 'swiper/css/pagination'
import 'swiper/css'
import '../styles/globals.css'

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <AppProvider>
      <Component {...pageProps} />
    </AppProvider>
  )
}

export default MyApp
