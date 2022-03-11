import { ProductListItem } from '@/interfaces/product'
import Image from '@/components/s3Image'
import styled from 'styled-components'
import Link from 'next/link'

const ProductCard = ({ item }: { item: ProductListItem }): JSX.Element => {
  return (
    <StyledWrapper>
      <div className="image">
        <Image
          className="image"
          width={316}
          height={316}
          objectFit="contain"
          src={item.image}
          alt=""
        />
      </div>
      <div className="card-title">
        <Link href={`/product/${item.id}`}>
          <a>{item.name}</a>
        </Link>
      </div>
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
  border: 1px solid #5d7129;
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
    font-family: tahoma;
    .last-child {
      font-weight: 700;
    }
  }

  .image {
    padding: 40px;
  }
`

export default ProductCard
