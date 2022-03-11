import Layout from '@/components/layout'
import PageHeader from '@/components/cover/pageHeader'
import styled from 'styled-components'
import BoneButton from '@/components/boneButton'
import BoneButtonFlat from '@/components/boneButtonFlat'
import { Button, Col, Divider, Radio, Row, Space } from 'antd'
import { useState } from 'react'
import ProductList from '@/components/product/list'

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
          <Row>
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
                <ProductList />
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
`

export default Products
