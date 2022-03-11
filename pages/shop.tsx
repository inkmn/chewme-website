import { useRouter } from 'next/router'
import styled from 'styled-components'
import useSWR from 'swr'
import Layout from '@/components/layout'
import PageHeader from '@/components/pageHeader/cover'
import qs from 'qs'
import PublicFetcher from '@/lib/publicFetch'
import ProductList from '@/components/product/list'
import { ProductListItem } from '@/interfaces/product'
import Spinner from '@/components/spinner'
import { Col, Empty, Pagination, Row } from 'antd'
import useInit from '@/hooks/useInit'

const Shop = () => {
  const apiUrl = '/pub/product'
  const router = useRouter()

  const { data } = useInit()

  const {
    page = 1,
    limit = 4,
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

  const { data: productList } = useSWR<{
    rows: ProductListItem[]
    count: number
  }>(`${apiUrl}${queryToString}`, PublicFetcher)

  const handlePageChange = (currentPage: number) => {
    const qsData = {
      page: currentPage,
      limit,
      query,
      category_id,
      start_date,
      end_date,
    }
    router.push(
      `/shop${qs.stringify(qsData, { encode: false, addQueryPrefix: true })}`
    )
  }

  return (
    <Layout>
      <PageHeader
        title={`Products`}
        image={`/cover6.jpeg`}
        position="76%"
        height={300}
      />
      <StyledShop>
        <div className="container">
          <Row gutter={24}>
            <Col xs={24} sm={24} md={24} lg={6} xl={6} xxl={6}>
              {data.categories.map((item) => (
                <div key={item.id}>{item.name}</div>
              ))}
            </Col>
            <Col xs={24} sm={24} md={24} lg={18} xl={18} xxl={18}>
              <Row justify="space-between">
                <div>{`Showing ${limit * page - limit + 1}–${limit * page} of ${
                  productList?.count
                } results`}</div>
                <div>Default sorting</div>
              </Row>
              {productList ? (
                <>
                  <ProductList productData={productList} />
                  {productList?.count > limit ? (
                    <Row justify="end">
                      <Pagination
                        pageSize={parseInt(limit, 10)}
                        current={parseInt(page, 10)}
                        total={productList?.count}
                        onChange={handlePageChange}
                      />
                    </Row>
                  ) : null}
                </>
              ) : (
                <Spinner text="Loading..." minHeight={300} />
              )}
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

export default Shop
