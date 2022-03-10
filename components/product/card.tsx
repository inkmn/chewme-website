import Image from 'next/image'
import styled from 'styled-components'
import imgTest from '../assets/product/product (1).png'

const ProductCard = (): JSX.Element => {
  return (
    <StyledWrapper>
      <div className="image">
        <div className="img">
          <Image src={imgTest} alt="" />
        </div>
      </div>
      <div className="card-title">DOGECHEW L</div>
      <div className="card-footer">
        <span>$10 /</span>
        <span className="last-child"> 50000</span>
      </div>
    </StyledWrapper>
  )
}

const StyledWrapper = styled.div`
  border: 1px solid #5d7129;
  margin-top: 1px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: max-content;

  .card-title {
    width: 100%;
    text-align: center;
    background: #edebec;
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
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
    padding: 40px;
    padding-bottom: 5px;
    background: #edebec;

    .img {
      display: flex;
      flex-direction: column;
      width: 140px;
      border-top-left-radius: 8px;
      border-top-right-radius: 8px;
    }
  }
`

export default ProductCard
