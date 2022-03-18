import Convert from '@/components/forms/convert'
import Layout from '@/components/layout'
import PageHeader from '@/components/pageHeader/cover'
import { Col, Row } from 'antd'
import styled from 'styled-components'

const Term = () => {
  return (
    <Layout>
      <PageHeader title={`Convert`} image={`/cover5.jpeg`} />
      <StyledContactUs>
        <div className="container">
          <h1 className="page-title">Convert</h1>
          <Row gutter={[24, 24]} justify="center">
            <Col span={24}>
              <Convert />
            </Col>
          </Row>
        </div>
      </StyledContactUs>
    </Layout>
  )
}

const StyledContactUs = styled.div``

export default Term
