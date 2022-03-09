import { useRouter } from 'next/router'
import styled from 'styled-components'
import useSWR from 'swr'
import Layout from '@/components/layout'
import HeroCarousel from '@/components/carousel/hero'
import qs from 'qs'

const Shop = () => {
  const apiUrl = '/pub/product'
  const router = useRouter()
  const {
    page = 1,
    limit = 10,
    query = '',
    category_id = '',
    start_date = '',
    end_date = '',
  } = router.query as any

  const queryToString = qs.stringify(
    {
      offset: {
        page,
        limit,
      },
      filter: {
        query,
        category_id,
        start_date,
        end_date,
      },
    },
    {
      encode: false,
      addQueryPrefix: true,
    }
  )

  const { data: productList } = useSWR(`${apiUrl}${queryToString}`)
  return (
    <Layout>
      <HeroCarousel />
      <StyledShop>
        <div className="container">
          <div>This is Shop view</div>
          <pre>{JSON.stringify(productList, null, 2)}</pre>
        </div>
      </StyledShop>
    </Layout>
  )
}

const StyledShop = styled.div`
  height: 500px;
`

export default Shop
