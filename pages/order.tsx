import { useEffect } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'
import useSWR from 'swr'
import styled from 'styled-components'
import qs from 'qs'

import useUser from '@/hooks/useUser'
import OrderItemType from '@/interfaces/orderItem'
import Privatefetcher from '@/lib/privateFetch'

import Layout from '@/components/layout'
import PageHeader from '@/components/cover/pageHeader'
import { Empty, Pagination, Row } from 'antd'
import Spinner from '@/components/spinner'

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
  }>(`${apiUrl}${queryToString}`, Privatefetcher)

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
      <PageHeader title={`My Order`} image={`/cover5.jpeg`} />
      <StyledMyOrder>
        <div className="container">
          {orderData ? (
            orderData.count ? (
              <div>
                {orderData.rows.map((item) => {
                  return <div key={item.id}>{item.code}</div>
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
              </div>
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

const StyledMyOrder = styled.div`
  height: 500px;
`

export default MyOrder
