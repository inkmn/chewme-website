import Image from 'next/image'
import profilePic from '@/assets/logo.png'
import { ReactNode } from 'react'
import styled from 'styled-components'

const Spinner = ({
  children,
  minHeight,
  text,
}: {
  children?: ReactNode
  minHeight?: string | number
  text: string
}) => {
  return (
    <StyledSpinner style={{ minHeight }}>
      <Image
        className="logo-spinner"
        width="55"
        height="55"
        src={profilePic}
        alt=""
      />
      <div className="spinner-text">{text}</div>
      <div>{children}</div>
    </StyledSpinner>
  )
}

const StyledSpinner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .logo-spinner {
    animation: App-logo-spin infinite 3s linear;
  }
  .spinner-text {
    margin-top: 1rem;
    font-size: 20px;
    font-weight: 600;
  }

  @keyframes App-logo-spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`

export default Spinner
