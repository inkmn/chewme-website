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
import { Col, message, notification, Row, Space } from 'antd'
import WalletIcon from '../assets/wallet1.svg'
import useSWR from 'swr'
import privatefetcher from '@/lib/privateFetch'
import WalletType from '@/interfaces/walletType'
import Link from 'next/link'

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
              <h1>Deposit</h1>
              {(walletData?.addressList || []).map((item, index) => {
                return (
                  <Item key={index}>
                    <div className="wallet-image">
                      <Image
                        className="image"
                        height={45}
                        width={45}
                        src="/image 1.png"
                        alt=""
                      />
                      <div className="title">USD Thether</div>
                    </div>
                    <div className="item-column">
                      <div className="balance">balance: </div>
                      <div className="balance-total">
                        {item.currency} {item.balance_amount}
                      </div>
                    </div>
                    <div className="item-column">
                      <div className="balance">Crypto address: </div>
                      <div className="balance-total">
                        0x9928b2F4d3287e021e7C08cC9Ff3dDbDE6b661e0
                      </div>
                    </div>
                    <div className="item-column">
                      <Space size={24}>
                        <Link href="deposit">
                          <a className="action">Deposit</a>
                        </Link>
                        <Link href="deposit">
                          <a className="action">Convert</a>
                        </Link>
                      </Space>
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
  height: 75px;
  padding: 15px 20px;
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  border-radius: 5px;
  border: 1px solid var(--primary);
  align-items: center;

  .action {
    font-size: 1.2rem;
    color: var(--primary);
    :hover {
      color: #1bbc1b;
    }
  }
  .wallet-image {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 1.2rem;
  }
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
