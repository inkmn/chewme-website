import Layout from '@/components/layout'
import PageHeader from '@/components/pageHeader/cover'
import styled from 'styled-components'
import useUser from '@/hooks/useUser'
import { CaretUpOutlined, ShoppingOutlined } from '@ant-design/icons'
import { Col, Row } from 'antd'

const MyWallet = () => {
  const { user } = useUser()
  return (
    <Layout>
      <PageHeader title={`My wallet`} image={`/cover5.jpeg`} />
      <StyledMyWallet>
        <div className="container">
          {/* This is MyWallet view
          <pre>{JSON.stringify(user, null, 2)}</pre> */}
          <Row gutter={[32, 16]}>
            <Col span={24}>
              <h1>My Cards</h1>
              <p>
                Excellent financial assistant, which enables to control your
                income and expenses. One base for all devices. List reports on
                different parameters. This is our in-house Digital Pass (Wallet)
                application supporting all Apple Wallet-based digital cards.
              </p>
            </Col>
            <Col xs={24} sm={24} md={24} lg={10} xl={10} xxl={10}>
              <VisaCard />
            </Col>
            <Col xs={24} sm={24} md={24} lg={14} xl={14} xxl={14}>
              {[1, 2, 3].map((item, index) => {
                return (
                  <Item key={index}>
                    <div>
                      <img
                        className="image"
                        src="/image 1.png"
                        alt=""
                        srcSet=""
                      />
                    </div>
                    <div className="item-column">
                      <div className="balance">balance: </div>
                      <div className="balance-total">USDT 4900.0 </div>
                    </div>
                    <div className="item-column">
                      <div className="stonk">
                        <div className="icon">
                          <CaretUpOutlined />
                        </div>
                        <div className="precent">1.45%</div>
                      </div>
                      <div className="precent-total">23.32</div>
                    </div>
                  </Item>
                )
              })}
            </Col>
            <Col span={24}>
              <h1>Transaction history</h1>
              <HistoryList>
                <div className="step-1">
                  <div className="icon">
                    <ShoppingOutlined />
                  </div>
                  <div className="item-column">
                    <div className="title">Purchase</div>
                    <div>Dogchew 280gr, Dogchew </div>
                  </div>
                </div>
                <div className="item-column">
                  <div className="value">DC 80.00</div>
                  <div className="date">12:30 </div>
                </div>
              </HistoryList>
              <HistoryList>
                <div className="step-1">
                  <div className="icon">
                    <ShoppingOutlined />
                  </div>
                  <div className="item-column">
                    <div className="title">Purchase</div>
                    <div>Dogchew 280gr, Dogchew </div>
                  </div>
                </div>
                <div className="item-column">
                  <div className="value">DC 80.00</div>
                  <div className="date">12:30 </div>
                </div>
              </HistoryList>
              <HistoryList>
                <div className="step-1">
                  <div className="icon">
                    <ShoppingOutlined />
                  </div>
                  <div className="item-column">
                    <div className="title">Purchase</div>
                    <div>Dogchew 280gr, Dogchew </div>
                  </div>
                </div>
                <div className="item-column">
                  <div className="value">DC 80.00</div>
                  <div className="date">12:30 </div>
                </div>
              </HistoryList>
            </Col>
          </Row>
        </div>
      </StyledMyWallet>
    </Layout>
  )
}

const HistoryList = styled.div`
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
  width: 100%;

  .date {
    font-size: 1rem;
    text-align: end;
  }
  .value {
    font-size: 1.2rem;
    color: var(--primary-red);
    text-align: end;
  }
  .step-1 {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  .title {
    font-size: 1.2rem;
  }

  .bottom {
    font-size: 1.1rem;
  }
  .icon {
    background-color: var(--primary-red);
    color: #fff;
    font-size: 25px;
    border-radius: 50%;
    height: 50px;
    width: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 20px;
  }
  .item-column {
    display: flex;
    flex-direction: column;
  }
`

const Item = styled.div`
  margin-bottom: 10px;
  width: 100%;
  padding: 15px 20px;
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  border-radius: 50px;
  box-shadow: 0px 2px 10px -8px rgb(0 0 0 / 75%);
  align-items: center;
  height: 75px;

  .precent-total {
    font-size: 1.2rem;
    text-align: end;
  }
  .stonk {
    font-size: 1.2em;
    display: flex;
    align-items: center;
    color: #1bbc1b;
    text-align: end;
    .icon {
      font-size: 1rem;
    }
  }
  .balance-total {
    font-size: 1.2rem;
  }
  .balance {
    color: #707070;
    font-size: 1em;
  }
  .image {
    height: 40px;
    width: 40px;
  }
  .item-column {
    display: flex;
    flex-direction: column;
    margin-right: 10px;
  }
`

const VisaCard = styled.div`
  max-height: 245px;
  min-height: 245px;
  height: 100%;
  width: 100%;
  max-width: 450px;
  min-width: 350px;
  background: red;
  border-radius: 15px;
  background: rgb(110, 115, 255);
  background: linear-gradient(
    0deg,
    rgba(110, 115, 255, 1) 0%,
    rgba(52, 83, 255, 1) 100%
  );
`

const StyledMyWallet = styled.div`
  min-height: 500px;
  margin-top: 40px;
  p {
    font-size: 1.2em;
    max-width: 670px;
  }
  h1 {
    font-weight: 700;
    color: var(--primary);
    font-size: 2rem;
  }
`

export default MyWallet
