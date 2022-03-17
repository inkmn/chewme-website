import Convert from '@/components/forms/convert'
import DepositView from '@/components/forms/depositView'
import Layout from '@/components/layout'
import PageHeader from '@/components/pageHeader/cover'
import { Col, Row } from 'antd'
import Link from 'next/link'
import styled from 'styled-components'

const Term = () => {
  return (
    <Layout>
      <PageHeader title={`Deposit`} image={`/cover5.jpeg`} />
      <StyledContactUs>
        <div className="container">
          <h1 className="page-title">Deposit</h1>
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
