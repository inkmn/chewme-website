import Layout from '@/components/layout'
import PageHeader from '@/components/pageHeader/cover'
import styled from 'styled-components'
import { useRouter } from 'next/router'
import useSWR, { MutatorOptions } from 'swr'
import { Col, Empty, Row, Space } from 'antd'
import privatefetcher from '@/lib/privateFetch'
import OrderItemType from '@/interfaces/orderItem'
import { datetimeFormat } from '@/utils/index'
import Image from 'next/image'
import CustomCyrrency from '@/components/currencyFormat'
import { useState } from 'react'
import RenderStatus from '@/components/orderStatus'
import ButtonStyled from '@/components/buttonStyled'

const OrderDetail = () => {
  const router = useRouter()
  const { order_id } = router.query
  const [loading, setLoading] = useState(false)

  const {
    data: orderData,
    error,
    mutate,
  } = useSWR<OrderItemType>(
    order_id ? `/app/order/${order_id}/get` : null,
    privatefetcher
  )

  if (error && error) {
    return (
      <Layout>
        <PageHeader title={`My Order`} image={`/cover5.jpeg`} height={400} />
        <StyledOrderDetail>
          <div className="container">
            <div>
              <Empty
                description={error?.data?.message}
                image={Empty.PRESENTED_IMAGE_SIMPLE}
              />
            </div>
          </div>
        </StyledOrderDetail>
      </Layout>
    )
  }

  const payForThisOrder = async () => {
    setLoading(true)
    try {
      console.log('it works')
      await privatefetcher(`/app/order/${order_id}/payment`, {
        method: 'GET',
      })
      await mutate()
      setLoading(false)
    } catch (error) {
      mutate()
      setLoading(false)
    }
  }

  return (
    <Layout>
      <PageHeader title={`My Order`} image={`/cover5.jpeg`} height={400} />
      <StyledOrderDetail>
        <div className="container">
          <h1>Order details</h1>
          <StyledPadan>
            <div className="head">
              <div className="headCol">
                <h3>Shipping addres</h3>
                <div className="shipping-box">
                  <Space>
                    <span>{orderData?.order_shipping?.last_name}</span>
                    <span>{orderData?.order_shipping?.first_name}</span>
                  </Space>
                  <span>
                    {orderData?.order_shipping?.country_code || '1010'}
                    <span className="desc">(country code)</span>
                  </span>
                  <span>
                    {orderData?.order_shipping?.state_code}
                    <span className="desc">(state)</span>
                  </span>
                  <span>
                    {orderData?.order_shipping?.city_code}
                    <span className="desc">(city code)</span>
                  </span>
                  <span>{orderData?.order_shipping?.phone}</span>
                  <span>{orderData?.order_shipping?.address}</span>
                </div>
              </div>
              <div className="headCol">
                <h3 className="text-end">Order info</h3>
                <div className="shipping-box">
                  <div className="orderStatus text-end">
                    <Space>
                      <RenderStatus status={orderData?.order_status} />
                      <span>{orderData?.code}</span>
                    </Space>
                  </div>
                  <span className="text-end">
                    {datetimeFormat(orderData?.created_at)}
                  </span>
                </div>
              </div>
            </div>
          </StyledPadan>

          <MobilePadan>
            <div className="shipping-box-mobile">
              <div className="mobile-row">
                <div className="label order-code">Status:</div>
                <span className="value order-code-value">
                  <RenderStatus status={orderData?.order_status} />
                </span>
              </div>
              <div className="mobile-row">
                <div className="label order-code">Order code:</div>
                <span className="value order-code-value">
                  {orderData?.code}
                </span>
              </div>
              <div className="mobile-row">
                <div className="label">Name:</div>
                <Space>
                  <span className="value">
                    {orderData?.order_shipping?.last_name}
                  </span>
                  <span className="value">
                    {orderData?.order_shipping?.first_name}
                  </span>
                </Space>
              </div>
              <div className="mobile-row">
                <div className="label">Country code:</div>
                <div className="value">
                  {orderData?.order_shipping?.country_code || '1010'}
                </div>
              </div>
              <div className="mobile-row">
                <div className="label">State code:</div>
                <div className="value">
                  {orderData?.order_shipping?.state_code}
                </div>
              </div>
              <div className="mobile-row">
                <div className="label">City code:</div>
                <div className="value">
                  {orderData?.order_shipping?.city_code}
                </div>
              </div>
              <div className="mobile-row">
                <div className="label">Order shipping phone:</div>
                <div className="value">{orderData?.order_shipping?.phone}</div>
              </div>
              <div className="mobile-row">
                <div className="label">Order shipping address:</div>
                <div className="value">
                  {orderData?.order_shipping?.address}
                </div>
              </div>
            </div>
          </MobilePadan>

          <MobilePadanList>
            {orderData?.products?.map((item, index) => {
              return (
                <div className="list-item" key={index}>
                  <div className="item-left">
                    <div className="item-image">
                      <Image
                        height={70}
                        width={70}
                        src={'/banner2.jpeg'}
                        alt=""
                      />
                    </div>
                    <div className="column">
                      <div className="item-title">{item?.name}</div>
                      <div className="item-price">
                        <CustomCyrrency value={item?.price} suffix="DC" />
                      </div>
                    </div>
                  </div>
                  <div className="quantity">{item.quantity}</div>
                </div>
              )
            })}
          </MobilePadanList>

          <StyledPadanList>
            <table>
              <tbody>
                <tr className="list-header">
                  <td>Description</td>
                  <td>Unit Cost</td>
                  <td>Quantity</td>
                  <td>Amount</td>
                </tr>

                {orderData?.products?.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td>
                        <div className="title">{item?.name}</div>
                        <p className="description">{item.code}</p>
                      </td>
                      <td>
                        <CustomCyrrency value={item?.price} suffix="DC" />
                      </td>
                      <td>{item.quantity}</td>
                      <td>
                        <CustomCyrrency
                          value={item?.price * item.quantity}
                          suffix="DC"
                        />
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </StyledPadanList>

          <StyledPadanTotal>
            <table>
              <tbody>
                <tr className="amount">
                  <td></td>
                  <td></td>
                  <td>Total Quantity</td>
                  <td>{orderData?.quantity}</td>
                </tr>
                <tr className="amount">
                  <td></td>
                  <td></td>
                  <td className="amount total">Total Amount</td>
                  <td className="amount total">
                    <CustomCyrrency
                      value={orderData?.total_amount}
                      suffix="DC"
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </StyledPadanTotal>
          <div style={{ marginTop: '2rem' }}>
            {orderData?.order_status !== 'PAID' ? (
              <ButtonStyled
                block
                type="primary"
                loading={loading}
                size="large"
                onClick={payForThisOrder}
              >
                <Space>
                  <span>
                    <CustomCyrrency
                      value={orderData?.total_amount}
                      suffix="DC"
                    />
                  </span>
                  <span>pay</span>
                </Space>
              </ButtonStyled>
            ) : null}
          </div>
        </div>
      </StyledOrderDetail>
    </Layout>
  )
}

const MobilePadanList = styled.div`
  width: 100%;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;

  .text-primary {
    color: var(--primary);
  }

  .list-item {
    margin-top: 10px;
    display: flex;
    justify-content: space-between;
    flex-direction: row;
    width: 100%;
    align-items: center;
    border-radius: 10px;
    padding: 10px;
    box-shadow: 0px 3px 5px 0px rgba(0, 0, 0, 0.15) !important;
    .item-left {
      display: flex;
      gap: 8px;

      .column {
        min-height: 100%;
        justify-content: space-between;
        display: flex;
        flex-direction: column;
      }
    }
    .item-image {
      display: flex;
      border-radius: 5px;
      img {
        border-radius: 5px;
      }
    }
    .item-price {
      font-size: 1rem;
    }
    .item-title {
      font-size: 1.2rem;
      font-weight: 700;
    }
    .quantity {
      background-color: var(--primary);
      width: 50px;
      height: 50px;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 1.5rem;
      color: #fff;
    }
  }

  @media only screen and (min-width: 790px) {
    display: none;
  }
`

const MobilePadan = styled.div`
  color: #333;
  font-size: 1rem;

  .value {
    font-weight: 700;
  }
  .shipping-box-mobile {
    flex-direction: column;
    display: flex;
    width: 100%;
    .mobile-row {
      display: flex;
      flex-direction: row;
      width: 100%;
      justify-content: space-between;
      align-items: center;
    }
  }

  .order-code-value {
    font-size: 1.8rem;
    font-weight: 500;
    color: var(--primary);
    .ant-tag {
      font-size: 1.8rem;
      padding: 5px;
      min-width: 110px;
      text-align: center;
      margin: 0;
    }
  }

  @media only screen and (min-width: 790px) {
    display: none;
  }
`

const StyledPadanTotal = styled.div`
  width: 100%;
  display: flex;
  justify-content: end;
  table {
    width: 100%;
    color: #333;
    max-width: 500px;
    .amount {
      border: none;
      padding: 0;
      .total {
        font-size: 2rem;
        font-weight: 600;
        color: var(--primary);
      }
      td {
        padding: 0;
        font-size: 1.2rem;
        text-align: end;
      }
    }
  }

  @media only screen and (max-width: 790px) {
  }
`

const StyledPadanList = styled.div`
  width: 100%;
  overflow: auto;
  padding-bottom: 24px;
  margin-top: 20px;

  table {
    width: 100%;
    border-top: 2px solid var(--primary);
    color: #333;

    .color-primary {
      color: var(--primary);
    }
    .color-red {
      color: #e8213a;
    }
    .bold {
      font-weight: 600;
    }

    tr {
      border-bottom: 1px solid #dadada;
    }
    td {
      font-size: 1.2rem;
      padding: 15px 0;
      width: max-content;
      min-width: 100px;
      p {
        margin: 0;
        font-size: 1rem;
        width: 300px;
        span {
          color: #8e8e8e;
          margin-left: 8px;
          font-size: 1rem;
        }
      }
      text-align: end;
      :first-child {
        text-align: start;
      }
    }
    .list-header {
      color: var(--primary);
    }

    @media only screen and (max-width: 790px) {
      display: none;
    }
  }
`

const StyledPadan = styled.div`
  font-size: 1.1rem;
  color: #333;
  margin-bottom: 10px;

  .desc {
    font-size: 1rem;
    font-weight: 400;
    margin-left: 8px;
    color: #8e8e8e;
  }
  .text-end {
    text-align: end;
  }
  h3 {
    color: #8e8e8e;
    font-weight: 600;
  }
  .ant-tag {
    font-size: 2rem;
    padding: 5px;
  }
  .shipping-box {
    display: flex;
    flex-direction: column;
    &.paidAmount {
      font-size: 3rem;
      color: var(--primary);
    }
    .orderStatus {
      font-size: 2rem;
    }
  }
  .head {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 10px;
  }

  @media only screen and (max-width: 790px) {
    display: none;
  }
`

const StyledOrderDetail = styled.div`
  margin-top: 2rem;
  .header-title {
    display: flex;
    justify-content: space-between;
    width: 100%;
    .ant-tag {
      font-size: 2rem;
      height: min-content;
      padding: 5px 10px;
    }
  }
  .container {
    max-width: 900px;
  }
  h1 {
    font-size: 2rem;
    font-weight: 700;
    color: var(--primary);
  }
  .pageTitle {
    margin-bottom: 2rem;
  }
`

export default OrderDetail
