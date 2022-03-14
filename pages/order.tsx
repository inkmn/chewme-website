import { useEffect } from 'react'
import { useRouter } from 'next/router'
import useSWR from 'swr'
import styled from 'styled-components'
import qs from 'qs'

import useUser from '@/hooks/useUser'
import OrderItemType from '@/interfaces/orderItem'
import privatefetcher from '@/lib/privateFetch'

import Layout from '@/components/layout'
import PageHeader from '@/components/pageHeader/cover'
import { Empty, Pagination, Row } from 'antd'
import Spinner from '@/components/spinner'
import { CloseOutlined } from '@ant-design/icons'

const MyOrder = () => {
  const router = useRouter()
  const { user, error, isValidating } = useUser()

  useEffect(() => {
    if (error?.status === 401) {
      router.push('/')
    }
  }, [error, router])

  const apiUrl = '/app/order'
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

  const { data: orderData } = useSWR<{
    rows: OrderItemType[]
    count: number
  }>(`${apiUrl}${queryToString}`, privatefetcher)

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
      `/order${qs.stringify(qsData, { encode: false, addQueryPrefix: true })}`
    )
  }

  if (isValidating) {
    return <p>Loading...</p>
  }
  return (
    <Layout>
      <PageHeader title={`My Order`} image={`/cover5.jpeg`} height={400} />
      <StyledMyOrder>
        <div className="container">
          <h1>Order list</h1>
          {orderData ? (
            orderData.count ? (
              <StyledList>
                {orderData.rows.map((item) => {
                  return (
                    <div className="order-item" key={item.id}>
                      <div className="image">
                        <img src="" alt="" srcSet="" />
                      </div>
                      <div className="item-info">
                        <div className="title">
                          <div>Chew Golden </div>
                          <div className="extra">
                            <CloseOutlined />
                          </div>
                        </div>
                        <div className="bottom">
                          <div className="total">212</div>
                          <div className="amount">
                            <span>3,000</span> $
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })}
                {orderData?.count > limit ? (
                  <Row justify="end">
                    <Pagination
                      pageSize={parseInt(limit, 10)}
                      current={parseInt(page, 10)}
                      total={orderData?.count}
                      onChange={handlePageChange}
                    />
                  </Row>
                ) : null}
              </StyledList>
            ) : (
              <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
            )
          ) : (
            <Spinner text="Loading..." minHeight={300} />
          )}
        </div>
      </StyledMyOrder>
    </Layout>
  )
}

const StyledList = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  .order-item {
    padding: 20px 0;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    display: flex;
    min-width: 100%;

    .bottom {
      display: flex;
      width: 100%;
      justify-content: space-between;
      flex-direction: row;

      .total {
        font-size: 1.2em;
      }
      .amount {
        font-size: 1.2em;
        span {
          color: var(--primary-red);
          font-weight: 700;
        }
      }
    }
    .title {
      display: flex;
      justify-content: space-between;
      min-width: 100%;
      font-size: 1.2em;
      margin-bottom: 15px;
      align-items: center;
      .extra {
        font-size: 1em;
        cursor: pointer;
        :hover {
          color: var(--primary);
        }
      }
    }
    .item-info {
      display: flex;
      flex-direction: column;
      width: 100%;
    }
    .image {
      margin-right: 20px;
      img {
        height: 70px;
        width: 70px;
        object-fit: cover;
      }
    }
  }
`

const StyledMyOrder = styled.div`
  min-height: 500px;

  h1 {
    font-weight: 700;
    color: var(--primary);
  }
`

export default MyOrder
