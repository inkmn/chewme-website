import type { AppProps } from 'next/app'
import 'antd/dist/antd.css'
import 'swiper/css/pagination'
import 'swiper/css'
import '../styles/globals.css'

const MyApp = ({ Component, pageProps }: AppProps) => {
  return <Component {...pageProps} />
}

export default MyApp
