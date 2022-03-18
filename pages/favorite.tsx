import { useRouter } from 'next/router'
import styled from 'styled-components'
import useSWR from 'swr'
import Layout from '@/components/layout'
import PageHeader from '@/components/pageHeader/cover'
import qs from 'qs'
import ProductList from '@/components/product/list'
import { ProductListItem } from '@/interfaces/product'
import { Col, Row } from 'antd'
import useInit from '@/hooks/useInit'
import ListWithPagination from '@/components/listWithPagination'
import privatefetcher from '@/lib/privateFetch'

const Favorite = () => {
  const apiUrl = '/app/favorite'
  const {
    data: { categories_indexed },
  } = useInit()
  const router = useRouter()
  const {
    page = 1,
    limit = 12,
    query = '',
    category_id = '',
    start_date = '',
    end_date = '',
    optional = '',
    optional_type = '',
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
        optional,
        optional_type,
      },
    },
    {
      encode: false,
      addQueryPrefix: true,
    }
  )
  const { data: productList, error } = useSWR<{
    rows: ProductListItem[]
    count: number
  }>(`${apiUrl}${queryToString}`, privatefetcher)

  const handlePageChange = (query: any) => {
    router.push(
      `${router.pathname}${qs.stringify(query, {
        encode: false,
        addQueryPrefix: true,
      })}`
    )
  }

  return (
    <Layout>
      <PageHeader
        title={`Favorite`}
        image={`/cover6.jpeg`}
        position="76%"
        height={300}
      >
        <div></div>
      </PageHeader>
      <StyledShop>
        <div className="container">
          <Row gutter={24}>
            <Col span={24}>
              <Row>
                <div>
                  <h2>Favorite</h2>
                </div>
              </Row>
              <ListWithPagination
                data={productList}
                error={error}
                limit={parseInt(limit, 10)}
                page={parseInt(page, 10)}
                onPageChange={handlePageChange}
              >
                <ProductList data={productList?.rows} />
              </ListWithPagination>
            </Col>
          </Row>
        </div>
      </StyledShop>
    </Layout>
  )
}

const StyledShop = styled.div`
  margin-top: 3rem;
`

export default Favorite
