import { Button, ButtonProps } from 'antd'
import styled from 'styled-components'

const ButtonStyled = ({ children, ...props }: ButtonProps): JSX.Element => {
  return <StyledButton {...props}>{children}</StyledButton>
}

const StyledButton = styled(Button)`
  &.ant-btn-primary :not([disabled]) {
    background: var(--primary);
    border: var(--primary);
    :focus {
      background-color: #7a9439;
    }
    :hover {
      background-color: #7a9439;
    }
  }
  &.ant-btn-default :not([disabled]),
  &.ant-btn-ghost :not([disabled]),
  &.ant-btn-dashed :not([disabled]) {
    :focus {
      color: #7a9439;
      border-color: #7a9439;
    }
    :hover {
      color: var(--primary);
      border-color: var(--primary);
    }
  }

  &.ant-btn-link {
    color: var(--primary);
    :focus {
      color: #7a9439;
    }
    :hover {
      color: #9fc04c;
    }
  }
`

export default ButtonStyled
