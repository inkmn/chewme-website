import { Divider as DividerAnt } from 'antd'
import Image from 'next/image'
import styled from 'styled-components'
import imgTest from '../assets/product/product (1).png'
import Paw from '../assets/pawprint.svg'

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
    color: green;
    font-size: 24px;
    height: 50px;
    width: 50px;
  }
`

export default Divider
