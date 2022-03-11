import Layout from '@/components/layout'
import PageHeader from '@/components/cover/pageHeader'
import styled from 'styled-components'
import { Button, Col, Divider, Input, Radio, Row, Space } from 'antd'
import { useState } from 'react'
import ProductList from '@/components/product/list'
import { SearchOutlined } from '@ant-design/icons'

const Products = () => {
  const [value, setValue] = useState(1)

  const onChange = (e: number) => {
    console.log('radio checked', e)
    setValue(e)
  }
  return (
    <Layout>
      <PageHeader title={`Products`} image={`/cover5.jpeg`} />
      <StyledOrigin>
        <div className="container">
          <Row gutter={[32, 32]}>
            <Col span={24}>
              <div className="search-ant">
                <Input
                  placeholder="SEARCH PRODUCTS.."
                  addonAfter={<SearchOutlined />}
                  style={{ maxWidth: '300px' }}
                />
              </div>
            </Col>
            <Col xs={5} sm={5} md={5} lg={5} xl={5} xxl={5}>
              <Sider>
                <Radio.Group
                  onChange={(e) => onChange(e.target.value)}
                  value={value}
                >
                  <Radio value={1}>ALL</Radio> <br />
                  <Radio value={2}>CHEWS</Radio> <br />
                  <Radio value={3}>TOYS</Radio> <br />
                  <Radio value={3}>GEAR</Radio> <br />
                  <Radio value={4}>TREATS</Radio>
                </Radio.Group>
              </Sider>
            </Col>
            <Col xs={19} sm={19} md={19} lg={19} xl={19} xxl={19}>
              <Content>
                <ProductList perview={4} />
              </Content>
            </Col>
          </Row>
        </div>
      </StyledOrigin>
    </Layout>
  )
}

const Content = styled.div``
const Sider = styled.div``

const StyledOrigin = styled.div`
  height: 500px;
  padding-top: 10px;
  .search-ant {
    display: flex;
    align-items: center;
    justify-content: end;
    .ant-input {
      border-color: var(--primary);
      border-top-left-radius: 5px;
      border-bottom-left-radius: 5px;
    }
    .ant-input-group-wrapper {
      .ant-input-group-addon {
        border-top-right-radius: 5px;
        border-bottom-right-radius: 5px;
        border-color: var(--primary);
        background: var(--primary);
        color: #fff;
        font-size: 18px;
      }
    }
  }
`

export default Products
