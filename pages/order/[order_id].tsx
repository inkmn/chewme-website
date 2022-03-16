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
import { dateFormat, datetimeFormat } from '@/utils/index'

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
                description={error.data.message}
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
          <h1>Order no: {orderData?.code}</h1>
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
              <TotalStyled>
                <div className="head">
                  <div className="headCol">
                    <h3>Shipping addres</h3>
                    <div className="shipping-box">
                      <div>
                        <span>{orderData?.order_shipping?.last_name}</span>
                        <span>{orderData?.order_shipping?.first_name}</span>
                      </div>
                      <span>{orderData?.order_shipping?.country_code}</span>
                      <span>{orderData?.order_shipping?.state_code}</span>
                      <span>{orderData?.order_shipping?.city_code}</span>
                      <span>{orderData?.order_shipping?.phone}</span>
                      <span>{orderData?.order_shipping?.address}</span>
                    </div>
                  </div>

                  <div className="headCol">
                    <h3>Order info</h3>

                    <div className="shipping-box">
                      <div className="orderStatus">
                        <Space>
                          <span>{orderData?.code}</span>
                          {renderStatus(orderData?.order_status)}
                        </Space>
                      </div>
                      <span>{datetimeFormat(orderData?.created_at)}</span>
                    </div>
                  </div>

                  <div className="headCol">
                    <h3>Total</h3>

                    <div className="shipping-box paidAmount">
                      <span>{orderData?.paid_amount}</span>
                    </div>
                  </div>
                </div>
              </TotalStyled>
            </Col>
            <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
              <ProductsTable>
                <tr className="header">
                  <td>Description</td>
                  <td>Unit Cost</td>
                  <td>Quantity</td>
                  <td>Amount</td>
                </tr>
                <tr>
                  <td>
                    <div className="title">Item name</div>
                    <p className="description">
                      Item descriotion ggoes here ....
                    </p>
                  </td>
                  <td>$ 9.99</td>
                  <td>9</td>
                  <td>$ 89.91</td>
                </tr>
                <tr>
                  <td>
                    <div className="title">Item name</div>
                    <p className="description">
                      Item descriotion ggoes here ....
                    </p>
                  </td>
                  <td>$ 9.99</td>
                  <td>9</td>
                  <td>$ 89.91</td>
                </tr>
                <tr>
                  <td>
                    <div className="title">Item name</div>
                    <p className="description">
                      Item descriotion ggoes here ....
                    </p>
                  </td>
                  <td>$ 9.99</td>
                  <td>9</td>
                  <td>$ 89.91</td>
                </tr>
                <tr>
                  <td>
                    <div className="title">Item name</div>
                    <p className="description">
                      Item descriotion ggoes here ....
                    </p>
                  </td>
                  <td>$ 9.99</td>
                  <td>9</td>
                  <td>$ 89.91</td>
                </tr>
              </ProductsTable>
            </Col>
          </Row>
          <pre>{JSON.stringify(orderData, null, 2)}</pre>
        </div>
      </StyledOrderDetail>
    </Layout>
  )
}

const ProductsTable = styled.table`
  width: 100%;
  border-top: 2px solid var(--primary);
  color: #333;
  td {
    font-size: 1.2rem;
    padding: 15px 0;
    border-bottom: 1px solid #dadada;
    p {
      margin: 0;
      color: #8e8e8e;
      font-size: 1rem;
      width: 300px;
    }
    :last-child {
      text-align: end;
    }
  }
  .header {
    color: var(--primary);
  }
`

const StyledList = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  gap: 20px;
  border-bottom: 1px solid #dadada;
  padding: 20px 0;

  .productsCol {
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    max-width: 300px;

    .productDescription {
      font-size: 1rem;
      color: #8e8e8e;
    }
    span {
      font-size: 1.2rem;
    }

    .productName {
      font-weight: 600;
    }
  }
`

const TotalStyled = styled.div`
  height: 300px;
  font-size: 1.1rem;
  color: #333;

  .ant-tag {
    font-size: 2rem;
    padding: 5px;
  }
  .shipping-box {
    display: flex;
    flex-direction: column;
    &.paidAmount {
      font-size: 3rem;
    }
    .orderStatus {
      font-size: 2rem;
    }
  }

  .head {
    display: flex;
    justify-content: space-between;
    .label {
      font-size: 1.1em;
      font-weight: 700;
      color: #8e8e8e;
    }
  }
`

const StyledOrderDetail = styled.div`
  margin-top: 2rem;

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
