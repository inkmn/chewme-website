import { useRouter } from 'next/router'
import styled from 'styled-components'
import useSWR from 'swr'
import Layout from '@/components/layout'
import PageHeader from '@/components/cover/pageHeader'
import qs from 'qs'
import PublicFetcher from '@/lib/publicFetch'

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

  const { data: productList } = useSWR(
    `${apiUrl}${queryToString}`,
    PublicFetcher
  )
  return (
    <Layout>
      <PageHeader title={`Products`} image={`/cover6.jpeg`} position="80%" />
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
