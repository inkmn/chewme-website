import qs from 'qs'
import styled from 'styled-components'
import useSWR from 'swr'
import privatefetcher from '@/lib/privateFetch'
import CartList from '@/components/cart/list'
import ListWithPagination from '@/components/listWithPagination'
import { useState } from 'react'
import { Button, Col, Row, Space } from 'antd'
import { useRouter } from 'next/router'
import useCart from '@/hooks/useCart'
import CustomCyrrency from './currencyFormat'
import ButtonStyled from './buttonStyled'

const ShoppingCart = () => {
  const router = useRouter()
  const {
    data: cartData,
    error,
    mutate,
    handlePageChange,
    offset,
  }: any = useCart()

  const clearCart = async () => {
    await privatefetcher(`/app/order/clear_cart`, {
      method: 'GET',
    })
    mutate()
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
              <span>
                <CustomCyrrency
                  value={(cartData?.cart_sum || {}).total_amount}
                  suffix="DC"
                />
              </span>
            </Space>
          </div>
        </div>
        <Row gutter={24}>
          <Col span={12}>
            <ButtonStyled
              block
              onClick={clearCart}
              disabled={!cartData?.count}
              shape="round"
              size="large"
            >
              Clear cart
            </ButtonStyled>
          </Col>
          <Col span={12}>
            <ButtonStyled
              block
              onClick={() => {
                router.push('/checkout')
              }}
              disabled={!cartData?.count}
              type="primary"
              shape="round"
              size="large"
            >
              Checkout
            </ButtonStyled>
          </Col>
        </Row>
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
