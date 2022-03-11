import styled from 'styled-components'
import BottomShape from '../../assets/divider-shape.svg'
import PawIcon from '../../assets/pawIcon.svg'

const HeroCover = ({
  image,
  title,
  position,
}: {
  image?: string
  title: string
  position?: string
}) => {
  return (
    <StyledWrapper>
      <div className="bottom-shape">
        <BottomShape />
      </div>
      <StyledHeader>
        <div
          className="slide-image"
          style={{
            backgroundImage: `url(${image})`,
            backgroundPosition: `0 ${position || 'center'}`,
          }}
        />
        <div className="slide-image-filter" />
        <div className="content-wrapper">
          <div className="content">
            <h1>
              {title} <PawIcon />
            </h1>
          </div>
        </div>
      </StyledHeader>
    </StyledWrapper>
  )
}

const StyledHeader = styled.div`
  background: #fff;
  width: 100%;
  height: 400px;
  transition-duration: calc(10000ms * 1.2);
  flex-shrink: 0;
  position: relative;

  .slide-image {
    background-size: cover;
    background-position: 50%;
    background-repeat: no-repeat;
    min-width: 100%;
    min-height: 100%;
  }

  .slide-image-filter {
    background-color: rgba(0, 0, 0, 0.5);
    height: 100%;
    width: 100%;
    top: 0;
    left: 0;
    position: absolute;
  }

  .content-wrapper {
    text-align: left;
    justify-content: flex-start;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    background-repeat: no-repeat;
    background-position: 50%;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    margin: auto;
    .content {
      display: flex;
      flex-direction: column;
      align-items: end;
      & > h1 {
        color: #fff;
        font-size: 2.5rem;
        margin-bottom: 0;
        text-transform: uppercase;
      }
      & > p {
        font-size: 17px;
        line-height: 1.4;
      }
    }
  }
`
const StyledWrapper = styled.div`
  background: #313132;
  height: 400px;
  width: 100%;
  position: relative;
  .bottom-shape {
    color: #fff;
    overflow: hidden;
    position: absolute;
    left: 0;
    width: 100%;
    line-height: 0;
    direction: ltr;
    bottom: -1px;
    z-index: 2;
    pointer-events: none;
    svg {
      display: block;
      width: calc(100% + 1.3px);
      position: relative;
      left: 50%;
      transform: translateX(-50%);
      width: calc(100% + 1.3px);
      height: 50px;
      .elementor-shape-fill {
        fill: #fff;
        transform-origin: center;
        transform: rotateY(0deg);
      }
    }
  }
`
export default HeroCover
