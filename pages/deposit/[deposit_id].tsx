import DepositView from '@/components/forms/depositView'
import Layout from '@/components/layout'
import PageHeader from '@/components/pageHeader/cover'
import { Col, Row } from 'antd'
import styled from 'styled-components'

const Term = () => {
  return (
    <Layout>
      <PageHeader title={`Deposit`} image={`/cover5.jpeg`} />
      <StyledContactUs>
        <div className="container">
          <h1 className="page-title">Deposit</h1>
          <Row gutter={[24, 24]} justify="space-between">
            <Col xs={24} sm={24} md={24} lg={12} xl={16} xxl={14}>
              <div className="content">
                <DepositView />
              </div>
            </Col>
            <Col xs={24} sm={24} md={24} lg={12} xl={8} xxl={8}>
              <div className="content">
                <div className="title">Deposit hasn’t arrived ? </div>
                <p>
                  If you encounter the following problems during the deposit
                  process, you can go to Deposit Status Query to search for your
                  current deposit status or retrieve your assets via
                  self-service application.
                  <ul>
                    <li>Deposit has not arrived after a long while.</li>
                    <li>Didn’t enter MEMO/Tag correctly</li>
                    <li>Deposited unlisted coins</li>
                  </ul>
                </p>
              </div>
            </Col>
          </Row>
        </div>
      </StyledContactUs>
    </Layout>
  )
}

const StyledContactUs = styled.div`
  .title {
    color: var(--primary);
    font-size: 1.2rem;
    margin-bottom: 1rem;
  }
`

export default Term
