import Image from 'next/image'
import styled from 'styled-components'
import imgTest from '../assets/product/product (1).png'

const Card = (): JSX.Element => {
  return (
    <StyledWrapper>
      <div className="image">
        <div className="img">
          <Image src={imgTest} alt="" />
        </div>
        <div className="card-title">DOGECHEW L</div>
      </div>
      <div className="card-footer">
        <span>$10 /</span>
        <span>50000</span>
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

  .card-footer {
    padding: 10px;
  }
  .image {
    padding: 20px;
    background: #edebec;

    .card-title {
      font-size: 20px;
      color: #5d7129;
      font-weight: 600;
    }
    .img {
      display: flex;
      flex-direction: column;
      width: 140px;
      border-top-left-radius: 8px;
      border-top-right-radius: 8px;
    }
  }
`

export default Card
