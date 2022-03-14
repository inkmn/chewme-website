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
    <StyledWrapper>
      <div className="item-info">
        <div className="if-top">
          <div className="item-name">
            <h2>
              <Space>
                <span>Order no:</span>
                <Link href={`/order/${item.id}`}>
                  <a>{item.code}</a>
                </Link>
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
  )
}

const StyledWrapper = styled.div`
  border-radius: 4px;
  padding: 1rem;
  display: flex;
  border: 1px solid rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
  .item-info {
    flex: 1;
    display: flex;
    flex-direction: column;
    .if-top {
      display: flex;
      align-items: flex-start;
      margin-bottom: 15px;
      .item-name {
        flex: 1;
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
  }
`

export default OrderItem
