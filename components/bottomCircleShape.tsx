import styled from 'styled-components'
import BottomShapePattern from '../assets/divider-shape1.svg'

const BottomCircleShape = ({ height }: { height?: number }): JSX.Element => {
  return (
    <StyledWrapper height={height}>
      <BottomShapePattern />
    </StyledWrapper>
  )
}

const StyledWrapper = styled.div<{ height?: number }>`
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
    height: ${(props) => (props.height ? `${props.height}px` : '20px')};
  }
`

export default BottomCircleShape
