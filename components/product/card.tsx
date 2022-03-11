import { ProductListItem } from '@/interfaces/product'
import Image from 'next/image'
import styled from 'styled-components'

const ProductCard = ({ item }: { item: ProductListItem }): JSX.Element => {
  return (
    <StyledWrapper>
      <div className="image">
        <div className="img">
          <Image
            className="image"
            width={170}
            height={170}
            src={`http://dev-dc-s3.goodtech.mn${item.image}`}
            alt=""
          />
        </div>
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

  .img {
    display: flex;
    flex-direction: column;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
  }
  .image {
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
    padding-bottom: 5px;
    object-fit: cover;
  }
`

export default ProductCard
