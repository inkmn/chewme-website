import Image from '@/components/s3Image'
import styled from 'styled-components'
import Link from 'next/link'
import CartType from '@/interfaces/cart'
import RemoveIcon from '../../assets/remove.svg'
import privatefetcher from '@/lib/privateFetch'
import { Button, notification, Space } from 'antd'
import { MinusCircleOutlined, PlusCircleOutlined } from '@ant-design/icons'
import CustomCyrrency from '../currencyFormat'

const CartItem = ({
  item,
  mutate,
}: {
  item: CartType
  mutate: any
}): JSX.Element => {
  const removeItemFromCart = async (): Promise<void> => {
    await privatefetcher(`/app/order/${item.id}/remove_cart`, {
      method: 'DELETE',
    })
    mutate()
  }

  const updateQuantity = async (quantity: number): Promise<void> => {
    try {
      await privatefetcher(`/app/order/${item.id}/update_cart`, {
        method: 'PUT',
        body: JSON.stringify({
          quantity: quantity,
        }),
      })
    } catch (error: any) {
      notification.error(error.data.message)
    }
    mutate()
  }

  return (
    <StyledWrapper>
      <Image
        src={item.image}
        width={70}
        height={70}
        objectFit="cover"
        className="image"
        alt=""
      />
      <div className="item-info">
        <div className="if-top">
          <div className="item-name">
            <Link href="/">
              <a>{item.name}</a>
            </Link>
          </div>
          <a onClick={removeItemFromCart}>
            <RemoveIcon />
          </a>
        </div>
        <div className="if-bottom">
          <div className="ifb-quantity">
            <Space>
              <Button
                disabled={item.quantity <= 1}
                onClick={() => updateQuantity(item.quantity - 1)}
                type="link"
                icon={<MinusCircleOutlined />}
              />
              <span>{item.quantity}</span>
              <Button
                onClick={() => updateQuantity(item.quantity + 1)}
                type="link"
                icon={<PlusCircleOutlined />}
              />
            </Space>
          </div>
          <div className="ifb-price">
            <Space>
              <span>
                <CustomCyrrency value={item.price} suffix="DC" />
              </span>
              <span>x</span>
              <span>{item.quantity}</span>
              <span>=</span>
              <span>
                <CustomCyrrency
                  value={item.price * item.quantity}
                  suffix="DC"
                />
              </span>
            </Space>
          </div>
        </div>
      </div>
    </StyledWrapper>
  )
}

const StyledWrapper = styled.div`
  padding: 20px 0;
  display: flex;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  .item-info {
    flex: 1;
    margin-left: 20px;
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
          font-size: 16px;
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

export default CartItem
