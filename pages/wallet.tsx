import Layout from '@/components/layout'
import PageHeader from '@/components/pageHeader/cover'
import styled from 'styled-components'
import Image from 'next/Image'
import useUser from '@/hooks/useUser'
import {
  CaretUpOutlined,
  CopyOutlined,
  ShoppingOutlined,
} from '@ant-design/icons'
import { Col, message, notification, Row } from 'antd'
import WalletIcon from '../assets/wallet1.svg'
import useSWR from 'swr'
import privatefetcher from '@/lib/privateFetch'
import WalletType from '@/interfaces/walletType'

const MyWallet = () => {
  const { user } = useUser()
  const { data: walletData } = useSWR(
    '/app/wallet/account',
    async (input: string, args: RequestInit) => {
      const res = await privatefetcher<WalletType[]>(input, args)

      const returnData = {
        addressList: res,
        addressIndexed: res.reduce((acc: any, cur) => {
          acc[cur.currency] = cur
          return acc
        }, {}),
        dcAddress: res.find((item) => item.currency === 'DC'),
      }

      return returnData
    }
  )
  return (
    <Layout>
      <PageHeader title={`My wallet`} image={`/cover5.jpeg`} />
      <StyledMyWallet>
        <div className="container">
          <Row gutter={[32, 16]}>
            <Col span={24}>
              <h1>My Wallet</h1>
            </Col>
            <Col xs={24} sm={24} md={12} lg={10} xl={10} xxl={10}>
              <VisaCard>
                <div className="card-header">
                  <div className="wallet">
                    <WalletIcon />
                    Wallet
                  </div>
                  <span>DC {walletData?.dcAddress?.balance_amount}</span>
                </div>
                <div className="card-footer">
                  <div className="card-column">
                    <div className="crypto">Wallet address</div>
                    <div className="crypto-id">
                      <span className="walletDcAddress">
                        {walletData?.dcAddress?.number}
                      </span>
                      <span
                        onClick={() => {
                          navigator.clipboard.writeText(
                            walletData?.dcAddress?.number || ''
                          )
                          message.info('Copied wallet address!')
                        }}
                      >
                        <CopyOutlined />
                      </span>
                    </div>
                  </div>
                  <div className="card-column"></div>
                </div>
              </VisaCard>
            </Col>
            <Col xs={24} sm={24} md={12} lg={14} xl={14} xxl={14}>
              <div className="flex-end">
                {(walletData?.addressList || []).map((item, index) => {
                  return (
                    <Item key={index}>
                      <div>
                        <Image
                          className="image"
                          height={40}
                          width={40}
                          src="/image 1.png"
                          alt=""
                        />
                      </div>
                      <div className="item-column">
                        <div className="balance">balance: </div>
                        <div className="balance-total">
                          {item.currency} {item.balance_amount}
                        </div>
                      </div>
                    </Item>
                  )
                })}
              </div>
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
                  <div className="icon success">
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
                  <div className="icon success">
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

    &.success {
      background-color: #1bbc1b;
    }
  }
  .item-column {
    display: flex;
    flex-direction: column;
  }
`

const Item = styled.div`
  margin-bottom: 10px;
  width: 100%;
  max-width: 550px;
  height: 75px;
  padding: 15px 20px;
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  border-radius: 50px;
  border: 1px solid var(--primary);
  align-items: center;

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

  @media only screen and (max-width: 767px) {
    max-width: 100%;
  }
`

const VisaCard = styled.div`
  padding: 20px;
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

  .walletDcAddress {
    width: 320px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    display: block;
  }

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .card-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    color: #fff;

    .crypto {
      font-size: 1rem;
    }
    .crypto-id {
      font-size: 1.5em;
      display: flex;
      span {
        cursor: pointer;
        font-size: 1em;
      }
    }
    .stonk-precent {
      font-size: 1rem;
      color: #1bbc1b;
      text-align: end;
    }
    .stonk-value {
      font-size: 1.5em;
      text-align: end;
    }
  }
  .card-header {
    width: 100%;
    display: flex;
    justify-content: space-between;
    color: #fff;
    font-size: 24px;
    line-height: 24px;
    span {
      display: flex;
      align-items: center;
    }
    .wallet {
      display: flex;
      align-items: center;
      & > svg {
        height: 35px;
        width: auto;
        margin-right: 10px;
      }
    }
  }

  @media only screen and (max-width: 767px) {
    margin-left: auto;
    margin-right: auto;
  }
`

const StyledMyWallet = styled.div`
  min-height: 500px;
  margin-top: 40px;

  .flex-end {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
  }
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
