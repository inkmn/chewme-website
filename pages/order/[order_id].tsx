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
  Tag,
} from 'antd'
import privatefetcher from '@/lib/privateFetch'
import { FileImageOutlined } from '@ant-design/icons'
import useInit from '@/hooks/useInit'

const OrderDetail = () => {
  const router = useRouter()
  const { data } = useInit()
  const { order_id } = router.query
  const { data: orderData, error } = useSWR<ProductItem>(
    order_id ? `/app/order/${order_id}/get` : null,
    privatefetcher
  )

  const renderStatus = ({ e }: { e: string }) => {
    if (e === 'COMPLETED') return <Tag color={'green'}>COMPLETED</Tag>
    if (e === 'NEW') return <Tag>NEW</Tag>
    if (e === 'CANCEL') return <Tag color="red">CANCEL</Tag>
    if (e === 'PAID') return <Tag color="green">PAID</Tag>
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
            <Col xs={24} sm={24} md={24} lg={12} xl={14} xxl={14}>
              <Card>
                <Descriptions
                  column={2}
                  title={<h2 style={{ margin: 0 }}>Customer information</h2>}
                >
                  <Descriptions.Item label="Order no">
                    {orderData?.code}
                  </Descriptions.Item>
                  <Descriptions.Item label="Retailer code">
                    {orderData?.code}
                  </Descriptions.Item>
                  <Descriptions.Item label="Live">
                    Hangzhou, Zhejiang
                  </Descriptions.Item>
                  <Descriptions.Item label="Live">
                    Hangzhou, Zhejiang
                  </Descriptions.Item>
                  <Descriptions.Item label="Live">
                    Hangzhou, Zhejiang
                  </Descriptions.Item>
                  <Descriptions.Item label="Live">
                    Hangzhou, Zhejiang
                  </Descriptions.Item>
                </Descriptions>
              </Card>
              <br />
              <Card>
                <Descriptions
                  column={2}
                  title={<h2 style={{ margin: 0 }}>Delivery information</h2>}
                >
                  <Descriptions.Item label="Delivery information">
                    {orderData?.code}
                  </Descriptions.Item>
                  <Descriptions.Item label="Retailer code">
                    {orderData?.code}
                  </Descriptions.Item>
                  <Descriptions.Item label="Live">
                    Hangzhou, Zhejiang
                  </Descriptions.Item>
                  <Descriptions.Item label="Live">
                    Hangzhou, Zhejiang
                  </Descriptions.Item>
                  <Descriptions.Item label="Live">
                    Hangzhou, Zhejiang
                  </Descriptions.Item>
                  <Descriptions.Item label="Live">
                    Hangzhou, Zhejiang
                  </Descriptions.Item>
                </Descriptions>
              </Card>
            </Col>
            <Col xs={24} sm={24} md={24} lg={12} xl={10} xxl={10}>
              <Card>
                <List
                  header={
                    <div
                      style={{
                        width: '100%',
                        fontSize: '16px',
                        fontWeight: '500',
                        justifyContent: 'space-between',
                        display: 'flex',
                      }}
                    >
                      <div>Order products</div>
                      <div style={{ fontSize: '14px' }}>
                        Status: {renderStatus({ e: orderData?.order_status })}
                      </div>
                    </div>
                  }
                  dataSource={[1, 2, 3]}
                  // dataSource={orderData?.products || [1, 2, 3]}
                  renderItem={(item) => (
                    <List.Item>
                      <Skeleton avatar title={false} loading={!item} active>
                        <List.Item.Meta
                          avatar={
                            <Avatar
                              size={'large'}
                              icon={<FileImageOutlined />}
                              src={`${data?.s3}${orderData?.image}`}
                            />
                          }
                          // title={}
                          description={
                            <p style={{ fontWeight: '400', color: '#000' }}>
                              Product code:{' '}
                              <span
                                style={{ color: '#000', fontWeight: '500' }}
                              >
                                {' '}
                                PR10000041
                              </span>{' '}
                              <br />
                              Product name:{' '}
                              <span
                                style={{ color: '#000', fontWeight: '500' }}
                              >
                                {' '}
                                {item?.name}{' '}
                              </span>{' '}
                              <br />
                              Quantity:{' '}
                              <span style={{ color: 'red', fontWeight: '500' }}>
                                ( {item?.quantity} )
                              </span>
                            </p>
                          }
                        />
                        <h2> 34,00 $</h2>
                      </Skeleton>
                    </List.Item>
                  )}
                />
              </Card>
              <br />
              <Total>
                <div>
                  Total count: <b>{10}</b>
                </div>
                <div>
                  Shipping amount : <b>12</b>
                </div>
                <div>
                  Total amount: <b>12</b>
                </div>
              </Total>
            </Col>
          </Row>
          <pre>{JSON.stringify(orderData, null, 2)}</pre>
        </div>
      </StyledOrderDetail>
    </Layout>
  )
}

const Total = styled.div`
  border: 1px solid #dadada;
  padding: 20px 24px;
  width: 100%;
  border-radius: 2px;
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  div {
    line-height: 24px;
    display: flex;
    justify-content: space-between;
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
