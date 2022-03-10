import { ReactNode } from 'react'
import styled from 'styled-components'
import BoneHead from '../assets/bone-head.svg'

const BoneButtonFlat = ({ children }: { children: ReactNode }) => {
  return (
    <StyledBoneButtonFlat>
      <BoneHead className="first" />
      <span className="btnBody">{children}</span>
      <BoneHead />
    </StyledBoneButtonFlat>
  )
}

const StyledBoneButtonFlat = styled.button`
  position: relative;
  color: var(--primary);
  display: inline-flex;
  align-items: center;
  cursor: pointer;
  transition: all 0.1s ease-in-out;
  background: transparent;
  border: none;
  .btnBody {
    transition: all 0.1s ease-in-out;
    line-height: 31px;
    position: relative;
    display: inline-block;
    font-weight: 400;
    white-space: nowrap;
    text-align: center;
    cursor: pointer;
    user-select: none;
    touch-action: manipulation;
    height: 37px;
    padding: 4px 15px;
    font-size: 1rem;
    color: #fff;
    border-color: #ffffff;
    background: #5d712c;
    letter-spacing: 1.5px;
    &:before {
      content: '';
      position: absolute;
      left: 0;
      right: 0;
      top: 2px;
      bottom: 2px;
      border: solid #fff;
      border-width: 2px 0;
    }
  }

  &:hover {
    .btnBody {
      background-color: #6d8a25;
      color: #fff;
    }
    color: #6d8a25;
  }

  &:active {
    box-shadow: 0 2px 0 rgb(0 0 0 / 2%);
    .btnBody {
      background-color: #4c5c25;
      color: #fff;
    }
    color: #4c5c25;
  }

  svg {
    width: 42px;
    &.first {
      transform: rotate(180deg);
    }
  }
`

export default BoneButtonFlat
