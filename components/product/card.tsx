import { ProductListItem } from '@/interfaces/product'
import Image from 'next/image'
import styled from 'styled-components'

const ProductCard = ({ item }: { item: ProductListItem }): JSX.Element => {
  return (
    <StyledWrapper>
      <div className="image">
        <Image
          className="image"
          width={316}
          height={316}
          objectFit="cover"
          src={`http://dev-dc-s3.goodtech.mn${item.image}`}
          alt=""
        />
      </div>
      <div className="card-title">{item.name}</div>
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
    width: 100%;
    text-align: center;
    font-size: 20px;
    color: #5d7129;
    font-weight: 600;
  }
  .card-footer {
    font-size: 16px;
    padding: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    .last-child {
      font-weight: 700;
    }
  }

  .image {
    padding: 40px;
  }
`

export default ProductCard
