import Layout from '@/components/layout'
import PageHeader from '@/components/pageHeader/cover'
import styled from 'styled-components'
import { Col, Row } from 'antd'

const DogeChew = () => {
  return (
    <Layout>
      <PageHeader title={`Dogechew coin`} image={`/cover5.jpeg`} />
      <StyledDogeChew>
        <div className="container">
          <h2>Loyalty Program</h2>
          <h4>SHOP & GET REWARDED</h4>
          <p>Earn more and redeem your free Dogechew Pet Supply products.</p>
          <p>
            As a loyal Dogechew Pet Supply customer, you’ll earn points on every
            purchase you make that can be redeemed for your favorite products!
            Once you’ve accumulated enough points, unlock your rewards on your
            next purchase!
          </p>
          <h2>Here’s How It Works</h2>
          <Row>
            <Col xs={24} sm={24} md={24} lg={8} xl={8} xxl={8}>
              <div className="center">
                <div className="card">
                  <div className="number">1</div>
                  <div className="number-title">Create An Account</div>
                  <p>
                    Get access to a full range of rewards and exclusive offers.
                  </p>
                </div>
              </div>
            </Col>
            <Col xs={24} sm={24} md={24} lg={8} xl={8} xxl={8}>
              <div className="center">
                <div className="card">
                  <div className="number">2</div>
                  <div className="number-title">
                    Earn Points On Every Purchase
                  </div>
                  <p>
                    Your account will track all of your purchases and points.
                  </p>
                </div>
              </div>
            </Col>
            <Col xs={24} sm={24} md={24} lg={8} xl={8} xxl={8}>
              <div className="center">
                <div className="card">
                  <div className="number">3</div>
                  <div className="number-title">Redeem Points For Treats</div>
                  <p>
                    For every $2 dollars you spend, you’ll get 1 point towards
                    redeemable rewards.
                  </p>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </StyledDogeChew>
    </Layout>
  )
}

const StyledDogeChew = styled.div`
  height: 500px;

  .center {
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: center;
  }
  .card {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    max-width: 300px;
    margin-top: 30px;
    .number-title {
      font-weight: 700;
      font-size: 1.5rem;
      line-height: 1.5rem;
      margin-top: 3rem;
      margin-bottom: 0.5rem;
      color: var(--primary);
      text-align: center;
    }
    .number {
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 24px;
      font-weight: 700;
      border: 1px solid var(--primary);
      color: var(--primary);
      height: 50px;
      width: 50px;
      border-radius: 100%;
    }
  }
  h2 {
    font-weight: 700;
    color: var(--primary);
    font-size: 2rem;
    line-height: 2rem;
    text-align: center;
    margin-bottom: 0;
    margin-top: 3rem;
  }

  h4 {
    font-weight: 400;
    color: var(--primary);
    font-size: 1.5rem;
    text-align: center;
  }
  p {
    font-size: 1rem;
    text-align: center;
    max-width: 760px;
    margin: 0 auto;
    margin-bottom: 0.9rem;
  }
`

export default DogeChew
