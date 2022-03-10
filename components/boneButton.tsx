import { ReactNode } from 'react'
import styled from 'styled-components'
import BoneHead from '../assets/bone-head.svg'

const BoneButton = ({ children }: { children: ReactNode }) => {
  return (
    <StyledBoneButton>
      <BoneHead className="first" />
      <span className="btnBody">{children}</span>
      <BoneHead />
    </StyledBoneButton>
  )
}

const StyledBoneButton = styled.div`
  position: relative;
  color: var(--primary);
  display: inline-flex;
  align-items: center;
  cursor: pointer;
  transition: all 0.4s ease-in-out;
  .btnBody {
    border: solid #fff;
    border-width: 1px 0;
    outline: 2px solid var(--primary);
    line-height: 1.5715;
    position: relative;
    display: inline-block;
    font-weight: 400;
    white-space: nowrap;
    text-align: center;
    background-image: none;
    border: 1px solid transparent;
    box-shadow: 0 2px 0 rgb(0 0 0 / 2%);
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
    user-select: none;
    touch-action: manipulation;
    height: 32px;
    padding: 4px 15px;
    font-size: 14px;
    border-radius: 2px;
    color: rgba(0, 0, 0, 0.85);
    border-color: #d9d9d9;
    background: #fff;
  }

  &:hover {
    .btnBody {
      background-color: var(--primary);
      color: #fff;
    }
    color: #425b00;
  }

  svg {
    width: 30px;
    &.first {
      transform: rotate(180deg);
    }
  }
`

export default BoneButton
