import qs from 'qs'
import styled from 'styled-components'
import useSWR from 'swr'
import privatefetcher from '@/lib/privateFetch'
import CartList from '@/components/cart/list'
import ListWithPagination from '@/components/listWithPagination'
import { useState } from 'react'
import { Button, Space } from 'antd'
import { useRouter } from 'next/router'

const ShoppingCart = () => {
  const router = useRouter()
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
  }: any = useSWR(`${apiUrl}${queryString}`, privatefetcher)

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
        emptyText="No products in the cart."
        data={cartData}
        error={error}
        limit={offset.limit}
        page={offset.page}
        onPageChange={handlePageChange}
      >
        <CartList mutate={mutate} data={cartData?.rows} />
      </ListWithPagination>

      <div className="cart-summary">
        <div className="sub-total">
          <div className="cart-total-quantity">
            <Space>
              <span>{(cartData?.cart_sum || {}).total_count}</span>
              <span>Item</span>
            </Space>
          </div>
          <div className="cart-total-amount">
            <Space>
              <span>Subtotal:</span>
              <span>${(cartData?.cart_sum || {}).total_amount}</span>
            </Space>
          </div>
        </div>
        <Button
          onClick={() => {
            router.push('/checkout')
          }}
          disabled={!cartData?.count}
          type="primary"
          block
          size="large"
        >
          Checkout
        </Button>
      </div>
    </StyledShoppingCart>
  )
}

const StyledShoppingCart = styled.div`
  position: relative;
  height: 100%;
  .cart-summary {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    background: #fff;
    padding: 20px;
    .sub-total {
      display: flex;
      justify-content: space-between;
      margin-bottom: 20px;
      font-size: 1.6rem;
      .cart-total-quantity {
        font-weight: bold;
        margin-right: 20px;
      }
      .cart-total-amount {
        font-weight: bold;
      }
    }
  }
`

export default ShoppingCart
