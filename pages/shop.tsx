import { useRouter } from 'next/router'
import styled from 'styled-components'
import useSWR from 'swr'
import Layout from '@/components/layout'
import FilterNavbar from '@/components/filterNavbar'
import PageHeader from '@/components/pageHeader/cover'
import qs from 'qs'
import publicFetcher from '@/lib/publicFetch'
import ProductList from '@/components/product/list'
import { ProductListItem } from '@/interfaces/product'
import { Col, Row } from 'antd'
import useInit from '@/hooks/useInit'
import ListWithPagination from '@/components/listWithPagination'

const Shop = () => {
  const apiUrl = '/pub/product'
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
    filter_bars: any
  }>(`${apiUrl}${queryToString}`, publicFetcher)

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
        title={`Products`}
        image={`/cover6.jpeg`}
        position="76%"
        height={300}
      >
        <div></div>
      </PageHeader>
      <StyledShop>
        <div className="container">
          <Row gutter={24}>
            <Col xs={24} sm={24} md={24} lg={6} xl={6} xxl={6}>
              <FilterNavbar
                options={productList?.filter_bars}
                pathname={router.pathname}
              />
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

export default Shop
