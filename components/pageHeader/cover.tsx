import styled from 'styled-components'
import BottomCircleShape from '@/components/bottomCircleShape'
import { ReactNode } from 'react'

const HeroCover = ({
  children,
  image,
  title,
  position,
  height = title ? 400 : undefined,
}: {
  children?: ReactNode
  image?: string
  title?: string
  position?: string
  height?: number
}) => {
  return (
    <StyledWrapper height={height}>
      <BottomCircleShape height={height ? 20 : undefined} />
      <StyledHeader height={height}>
        <div
          className="slide-image"
          style={{
            backgroundImage: `url(${image})`,
            backgroundPosition: `0 ${position || 'center'}`,
          }}
        />
        <div className="slide-image-filter" />

        <div className="content-wrapper">
          {title ? (
            <div className="content">
              <h1>{title}</h1>
            </div>
          ) : null}
          {children}
        </div>
      </StyledHeader>
    </StyledWrapper>
  )
}

const StyledHeader = styled.div<{ height?: number }>`
  background: #fff;
  width: 100%;
  height: ${(props) => (props.height ? `${props.height}px` : '130px')};
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
    flex-direction: column;
    text-align: left;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    background-repeat: no-repeat;
    background-position: 50%;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 50px;
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
  .header-product-search {
    width: 600px;
    padding: 0 2rem;
  }
  @media (max-width: 1024px) {
    .header-product-search {
      width: 100%;
    }
  }
`
const StyledWrapper = styled.div<{ height?: number }>`
  background: var(--primary);
  height: ${(props) => props.height || '130px'};
  width: 100%;
  position: relative;
`
export default HeroCover
