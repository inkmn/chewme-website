import Layout from '@/components/layout'
import PageHeader from '@/components/pageHeader/cover'
import styled from 'styled-components'
import { useRouter } from 'next/router'
import useSWR from 'swr'
import ProductItem from '@/interfaces/product'
import {
  Avatar,
  Card,
  Col,
  Descriptions,
  Empty,
  List,
  Row,
  Skeleton,
  Space,
  Tag,
} from 'antd'
import privatefetcher from '@/lib/privateFetch'
import { FileImageOutlined } from '@ant-design/icons'
import useInit from '@/hooks/useInit'
import moment from 'moment'
import OrderItemType from '@/interfaces/orderItem'
import { dateFormat, datetimeFormat, formatterUSD } from '@/utils/index'
import Item from 'antd/lib/list/Item'

const OrderDetail = () => {
  const router = useRouter()
  const { data } = useInit()
  const { order_id } = router.query

  const { data: orderData, error } = useSWR<OrderItemType>(
    order_id ? `/app/order/${order_id}/get` : null,
    privatefetcher
  )

  const renderStatus = (status: string | undefined) => {
    if (status === 'COMPLETED') return <Tag color={'green'}>COMPLETED</Tag>
    if (status === 'NEW') return <Tag>NEW</Tag>
    if (status === 'CANCEL') return <Tag color="red">CANCEL</Tag>
    if (status === 'PAID') return <Tag color="green">PAID</Tag>
    return <Tag color="">-</Tag>
  }

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

  return (
    <Layout>
      <PageHeader title={`My Order`} image={`/cover5.jpeg`} height={400} />
      <StyledOrderDetail>
        <div className="container">
          <h1>Order details</h1>
          <TotalStyled>
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
                      {renderStatus(orderData?.order_status)}
                      <span>{orderData?.code}</span>
                    </Space>
                  </div>
                  <span className="text-end">
                    {datetimeFormat(orderData?.created_at)}
                  </span>
                </div>
              </div>

              {/* <div className="headCol">
                <h3 className="text-end">Total</h3>

                <div className="shipping-box paidAmount text-end">
                  {formatterUSD(orderData?.total_amount)}
                </div>
              </div> */}
            </div>
          </TotalStyled>

          <ProductsTable>
            <table>
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
                    <td>{formatterUSD(item?.price)}</td>
                    <td>{item.quantity}</td>
                    <td>{formatterUSD(item?.total_amount)}</td>
                  </tr>
                )
              })}
            </table>
            <table style={{ borderTop: 'none', marginTop: '30px' }}>
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
                  {formatterUSD(orderData?.total_amount)}
                </td>
              </tr>
            </table>
          </ProductsTable>

          {/* <pre>{JSON.stringify(orderData, null, 2)}</pre> */}
        </div>
      </StyledOrderDetail>
    </Layout>
  )
}

const ProductsTable = styled.div`
  width: 100%;
  overflow: auto;
  padding-bottom: 24px;
  margin-top: 20px;

  table {
    width: 100%;
    border-top: 2px solid var(--primary);
    color: #333;

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
      }
    }
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
  }
`

const TotalStyled = styled.div`
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
    .headCol {
      min-width: 100%;
      border-top: 1px solid #dadada;
      padding: 20px 0;
    }
  }
`

const StyledOrderDetail = styled.div`
  margin-top: 2rem;

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
