import { useRouter } from 'next/router'
import styled from 'styled-components'
import useSWR from 'swr'
import Layout from '@/components/layout'
import FilterNavbar from '@/components/filterNavbar'
import PageHeader from '@/components/pageHeader/cover'
import qs from 'qs'
import PublicFetcher from '@/lib/publicFetch'
import ProductList from '@/components/product/list'
import { ProductListItem } from '@/interfaces/product'
import { Col, Pagination, Row } from 'antd'
import SwrRender from '@/components/swrRender'
import useInit from '@/hooks/useInit'

const Shop = () => {
  const apiUrl = '/pub/product'
  const router = useRouter()
  const {
    page = 1,
    limit = 4,
    query = '',
    category_id = '',
    start_date = '',
    end_date = '',
  } = router.query as any

  const {
    data: { categories_indexed },
  } = useInit()

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

  const {
    data: productList,
    error,
    isValidating,
  } = useSWR<{
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
      `${router.pathname}${qs.stringify(qsData, {
        encode: false,
        addQueryPrefix: true,
      })}`
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
              <FilterNavbar pathname={router.pathname} />
            </Col>
            <Col xs={24} sm={24} md={24} lg={18} xl={18} xxl={18}>
              <Row>
                <div>
                  <h2>
                    {category_id
                      ? (categories_indexed[category_id] || {}).name
                      : 'All products'}
                  </h2>
                </div>
              </Row>
              <Row justify="space-between">
                <div>
                  {productList
                    ? `Showing ${limit * page - limit + 1}–${limit * page} of ${
                        productList?.count
                      } results`
                    : 'no results'}
                </div>
                <div>Default sorting</div>
              </Row>

              <SwrRender data={productList} error={error}>
                <ProductList productData={productList} />
                {productList?.count || 0 > limit ? (
                  <Row justify="end">
                    <Pagination
                      pageSize={parseInt(limit, 10)}
                      current={parseInt(page, 10)}
                      total={productList?.count}
                      onChange={handlePageChange}
                    />
                  </Row>
                ) : null}
              </SwrRender>
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
