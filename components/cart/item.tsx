import Image from '@/components/s3Image'
import styled from 'styled-components'
import Link from 'next/link'
import CartType from '@/interfaces/cart'
import RemoveIcon from '../../assets/remove.svg'

const CartItem = ({ item }: { item: CartType }): JSX.Element => {
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
          <a>
            <RemoveIcon />
          </a>
        </div>
        <div className="if-bottom">
          <div className="ifb-quantity">{item.quantity}</div>
          <div className="ifb-price">{item.price}</div>
        </div>
      </div>
    </StyledWrapper>
  )
}

const StyledWrapper = styled.div`
  padding: 20px 30px;
  display: flex;
  padding: 20px;
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
