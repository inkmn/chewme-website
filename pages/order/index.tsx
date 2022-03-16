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
import ListWithPagination from '@/components/listWithPagination'
import OrderList from '@/components/order/list'

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
    limit = 12,
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

  const { data: orderData, error: orderError } = useSWR<{
    rows: OrderItemType[]
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
        title={`My Orderqe qw `}
        image={`/cover5.jpeg`}
        height={400}
      />
      <StyledMyOrder>
        <div className="container">
          <h2 className="pageTitle">My Orders</h2>
          <ListWithPagination
            emptyText="No order has been made yet."
            data={orderData}
            error={orderError}
            limit={parseInt(limit, 10)}
            page={parseInt(page, 10)}
            onPageChange={handlePageChange}
          >
            <OrderList data={orderData?.rows} />
          </ListWithPagination>
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
  margin-top: 2rem;
  .pageTitle {
    margin-bottom: 2rem;
  }
`

export default MyOrder
