import { ProductListItem } from '@/interfaces/product'
import Image from '@/components/s3Image'
import styled from 'styled-components'
import Link from 'next/link'

const ProductCard = ({ item }: { item: ProductListItem }): JSX.Element => {
  return (
    <StyledWrapper>
      <div className="image">
        <Link href={`/product/${item.id}`}>
          <a>
            <Image
              className="image"
              width={316}
              height={316}
              objectFit="contain"
              src={item.image}
              alt=""
            />
          </a>
        </Link>
      </div>
      <div className="card-title">
        <Link href={`/product/${item.id}`}>
          <a>{item.name}</a>
        </Link>
      </div>
      {!item.stock_avialable ? (
        <div className="outofstock">Out of Stock</div>
      ) : (
        <div className="instock">{item.stock_avialable} In Stock</div>
      )}
      <div className="card-footer">
        <span>${item.price} /</span>
        <span className="last-child"> {item.dc_price} DC</span>
      </div>
    </StyledWrapper>
  )
}

const StyledWrapper = styled.div`
  background-color: rgba(135, 149, 150, 0.024);
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  align-items: center;

  .outofstock {
    color: #ff4d4f;
  }
  .instock {
    color: var(--primary);
  }

  .card-title {
    padding: 0 1rem;
    a {
      width: 100%;
      text-align: center;
      font-size: 20px;
      color: #5d7129;
      font-weight: 600;
      overflow: hidden;
      display: block;
      height: 68px;
      line-height: 22px;
    }
  }
  .card-footer {
    font-size: 16px;
    padding: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    font-family: Helvetica Neue;
    .last-child {
      font-weight: 700;
    }
  }

  .img {
    display: flex;
    flex-direction: column;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
    padding: 10px;
  }
  .image {
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
    padding-bottom: 5px;
    object-fit: cover;
  }
`

export default ProductCard
