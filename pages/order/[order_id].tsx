import Layout from '@/components/layout'
import PageHeader from '@/components/pageHeader/cover'
import styled from 'styled-components'
import { useRouter } from 'next/router'
import useSWR from 'swr'
import ProductItem from '@/interfaces/product'
import { Card, Descriptions, Empty, Typography } from 'antd'
import privatefetcher from '@/lib/privateFetch'

const OrderDetail = () => {
  const router = useRouter()
  const { order_id } = router.query
  const { data: orderData, error } = useSWR<ProductItem>(
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
          <Card>
            <h2 className="pageTitle">Order no: {orderData?.code}</h2>

            <Descriptions title="User Info">
              <Descriptions.Item label="UserName">
                Zhou Maomao
              </Descriptions.Item>
              <Descriptions.Item label="Telephone">
                1810000000
              </Descriptions.Item>
              <Descriptions.Item label="Live">
                Hangzhou, Zhejiang
              </Descriptions.Item>
              <Descriptions.Item label="Remark">empty</Descriptions.Item>
              <Descriptions.Item label="Address">
                No. 18, Wantang Road, Xihu District, Hangzhou, Zhejiang, China
              </Descriptions.Item>
            </Descriptions>
          </Card>

          <pre>{JSON.stringify(orderData, null, 2)}</pre>
        </div>
      </StyledOrderDetail>
    </Layout>
  )
}

const StyledOrderDetail = styled.div`
  margin-top: 2rem;
  .pageTitle {
    margin-bottom: 2rem;
  }
`

export default OrderDetail
