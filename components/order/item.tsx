import styled from 'styled-components'
import Link from 'next/link'
import OrderType from '@/interfaces/orderItem'
import privatefetcher from '@/lib/privateFetch'
import { Space, Tag } from 'antd'
import { dateFormat } from '@/utils/index'

const OrderItem = ({
  item,
  mutate,
}: {
  item: OrderType
  mutate: any
}): JSX.Element => {
  return (
    <Link href={`/order/${item.id}`} passHref>
      <StyledWrapper>
        <div className="item-info">
          <div className="if-top">
            <div className="item-name">
              <h2>
                <Space>
                  <span>Order no:</span>
                  <span>{item.code}</span>
                </Space>
              </h2>
            </div>
            <div>
              <Space>
                <span>Order date:</span>
                <span>{dateFormat(item.created_at)}</span>
              </Space>
            </div>
          </div>
          <div className="if-bottom">
            <div className="ifb-quantity">
              <Space>
                <span>Order status:</span>
                <Tag>
                  {item.order_status} -{' '}
                  <span>{dateFormat(item.order_status_date)}</span>
                </Tag>
              </Space>
            </div>
            <div className="ifb-price">
              <Space>
                <h2>Paid amount:</h2>
                <h2>${item.paid_amount}</h2>
              </Space>
            </div>
          </div>
        </div>
      </StyledWrapper>
    </Link>
  )
}

const StyledWrapper = styled.a`
  border-radius: 4px;
  padding: 1rem;
  display: flex;
  border: 1px solid rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
  color: #333;

  &:hover {
    color: #333;
    border: 1px solid var(--primary);
  }

  .item-info {
    flex: 1;
    display: flex;
    flex-direction: column;
    h2 {
      margin-bottom: 0;
    }
    .if-top {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      margin-bottom: 15px;
      .item-name {
        margin-right: 20px;
        & a {
          color: #221906;
          font-weight: 500;
        }
      }
    }
    .if-bottom {
      margin-top: auto;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    @media (max-width: 1024px) {
      .if-top {
        margin-bottom: 0;
      }
      .if-top,
      .if-bottom {
        flex-wrap: wrap;
        .ifb-price {
          display: flex;
          justify-content: flex-end;
          width: 100%;
          border-top: 1px solid #eee;
          margin-top: 1rem;
          padding-top: 1rem;
        }
        & > div {
          width: 100%;
          &.item-name {
            margin-right: 0;
          }
          .ant-space {
            width: 100%;
            justify-content: space-between;
          }
        }
      }
    }
  }
`

export default OrderItem
