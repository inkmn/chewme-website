import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import classnames from 'classnames'
import styled from 'styled-components'

const ActiveLink = ({
  href,
  children,
  exact,
}: {
  href: string
  children: JSX.Element
  exact?: boolean
}): JSX.Element => {
  const router = useRouter()
  let className = children.props.className || ''
  if (exact) {
    if (router.asPath === href) {
      className = classnames([className, 'selected'])
    }
  } else {
    if (router.asPath.startsWith(href)) {
      className = classnames([className, 'selected'])
    }
  }

  return (
    <StyledLink href={href}>
      {React.cloneElement(children, { className })}
    </StyledLink>
  )
}

const StyledLink = styled(Link)`
  color: #000;
  .selected {
    color: red;
  }
`

export default ActiveLink
