import qs from 'qs'
import styled from 'styled-components'
import useSWR from 'swr'
import Privatefetcher from '@/lib/privateFetch'
import CartList from '@/components/cart/list'
import ListWithPagination from '@/components/listWithPagination'
import { useState } from 'react'

const ShoppingCart = () => {
  const apiUrl = '/app/order/carts'
  const [offset, setOffset] = useState({
    page: 1,
    limit: 12,
  })
  const queryObj = {
    offset,
    filter: {
      query: '',
      category_id: '',
      start_date: '',
      end_date: '',
    },
  }
  const [queryString, setQueryString] = useState(
    qs.stringify(queryObj, {
      encode: false,
      addQueryPrefix: true,
    })
  )
  const {
    data: cartData,
    error,
    mutate,
  }: any = useSWR(`${apiUrl}${queryString}`, Privatefetcher)

  const handlePageChange = (offset: any) => {
    setOffset(offset)
    setQueryString(
      qs.stringify(
        {
          ...queryObj,
          offset,
        },
        {
          encode: false,
          addQueryPrefix: true,
        }
      )
    )
  }

  return (
    <StyledShoppingCart>
      <ListWithPagination
        data={cartData}
        error={error}
        limit={offset.limit}
        page={offset.page}
        onPageChange={handlePageChange}
      >
        <CartList data={cartData?.rows} />
      </ListWithPagination>
    </StyledShoppingCart>
  )
}

const StyledShoppingCart = styled.div`
  .items {
    .item {
      padding: 20px 30px;
      display: flex;
      padding: 20px;
      border-bottom: 1px solid rgba(0, 0, 0, 0.1);
      .item-info {
        flex: 1;
        margin-left: 20px;
        display: flex;
        flex-direction: column;
        .if-top {
          display: flex;
          align-items: flex-start;
          margin-bottom: 15px;
          .item-name {
            flex: 1;
            margin-right: 20px;
            & a {
              font-size: 16px;
              color: #221906;
              font-weight: 500;
            }
          }
        }
        .if-bottom {
          margin-top: auto;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
      }
    }
  }
`

export default ShoppingCart
