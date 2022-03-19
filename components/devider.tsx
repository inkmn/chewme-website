import { Divider as DividerAnt } from 'antd'
import styled from 'styled-components'
import Paw from '../assets/pawicon.svg'

const Divider = (): JSX.Element => {
  return (
    <StyledWrapper>
      <DividerAnt>
        <div className="svg">
          <Paw />
        </div>
      </DividerAnt>
    </StyledWrapper>
  )
}

const StyledWrapper = styled.div`
  height: 150px;
  display: flex;
  align-items: center;
  .ant-divider {
    &.ant-divider-horizontal {
      &.ant-divider-with-text {
        &.ant-divider-with-text-center {
          max-width: 200px !important;
        }
      }
    }
  }
  .svg {
    color: var(--primary);
    font-size: 24px;
    height: 50px;
    width: 50px;
  }
`

export default Divider
