import { ReactNode, useEffect, useState } from 'react'
import Image from 'next/image'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Affix, Button, Col, Drawer, Input, Row } from 'antd'
import styled from 'styled-components'
import { MenuOutlined } from '@ant-design/icons'
import profilePic from '@/assets/logo.png'
import ActiveLink from '@/components/activeLink'

const Layout = ({
  children,
  cover,
}: {
  children: ReactNode
  cover?: string
}): JSX.Element => {
  const [scroll, setScroll] = useState(false)
  const [drawer, setDrawer] = useState(false)
  const router = useRouter()
  useEffect(() => {
    const scroll = () => {
      if (window.scrollY > 0) {
        setScroll(true)
      } else setScroll(false)
    }
    window.addEventListener('scroll', scroll, false)
    return () => window.removeEventListener('scroll', scroll, false)
  }, [])

  return (
    <StyledWrapper>
      <Head>
        <title>Doge-Chew Shop</title>
        <meta name="description" content="Doge-Chew Shop" />
      </Head>
      <Affix offsetTop={0} onChange={(affixed) => console.log(affixed)}>
        <SiteHeader className={scroll ? 'sticky' : ''}>
          <div className="nav-header container">
            <div className="nav-section">
              <div className="logo-wrapper">
                <Link href="/">
                  <a>DOGECHEW</a>
                </Link>
              </div>
              <div className="header-links">
                <div className="nav-item">
                  <Link href="/">
                    <a>Home</a>
                  </Link>
                </div>
                <div className="nav-item">
                  <ActiveLink href="/origin">
                    <a>Origin</a>
                  </ActiveLink>
                </div>
                <div className="nav-item">
                  <ActiveLink href="/shop">
                    <a>Products</a>
                  </ActiveLink>
                </div>
                <div className="nav-item">
                  <ActiveLink href="/dogechew">
                    <a>DC Coin</a>
                  </ActiveLink>
                </div>
              </div>
            </div>
            <div className="nav-section">
              <div className="nav-item">
                <Button type="link" icon={<MenuOutlined />} />
              </div>
            </div>
          </div>
        </SiteHeader>
      </Affix>
      <StyledLayout>
        <main>{children}</main>
      </StyledLayout>
      <SiteFooter></SiteFooter>
      <StyledMenu
        title={
          <div className="logo-wrapper">
            <Link href="/">
              <a>
                <Image width="35" height="35" src={profilePic} alt="" />
                DOGECHEW
              </a>
            </Link>
          </div>
        }
        placement="left"
        width={'80%'}
        onClose={() => setDrawer(false)}
        visible={drawer}
      >
        <div className="menu">
          <div
            onClick={() => {
              router.push('/product')
              setDrawer(false)
            }}
            className="menu-item"
          >
            Products
          </div>
          <div
            onClick={() => {
              router.push('/cart')
              setDrawer(false)
            }}
            className="menu-item"
          >
            Cart
          </div>
          <div
            onClick={() => {
              router.push('/profile')
              setDrawer(false)
            }}
            className="menu-item"
          >
            Profile
          </div>
          <div
            onClick={() => {
              router.push('/contact-us')
              setDrawer(false)
            }}
            className="menu-item"
          >
            Contact us
          </div>
        </div>
      </StyledMenu>
    </StyledWrapper>
  )
}

const StyledMenu = styled(Drawer)`
  .logo-wrapper {
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: center;
    font-weight: 500;
    font-size: 20px;
    line-height: 20px;
    img {
      width: auto;
      height: 30px;
    }
  }
  .menu {
    display: flex;
    flex-direction: column;
  }
  .menu-item {
    height: 30px;
    cursor: pointer;
    color: #313132;

    :hover {
      color: #0000ff;
    }
  }
`

const BtnStore = styled.div`
  cursor: pointer;
  background-color: #000;
  border-radius: 5px;
  width: max-content;
  color: #fff;
  line-height: 12px;
  font-size: 12px;
  display: flex;
  justify-content: space-around;
  flex-direction: row;
  gap: 5px;
  padding: 6px 8px;
  width: 170px;
  border: 1px solid transparent;
  :hover {
    border: 1px solid #8e8e8e;
  }
  .logo-wrapper {
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: center;
    img {
      width: auto;
      height: 30px;
    }
  }
  .btn-title {
    font-weight: 500;
    font-size: 20px;
    line-height: 20px;
  }
`

const SiteFooter = styled.div`
  margin-top: 10px;

  .flex-end {
    display: flex;
    justify-content: flex-end;
  }

  .footer-bottom {
    display: flex;
    justify-content: center;
    padding: 2rem;

    .footer-content {
      max-width: 800px;
    }
    .footer-text {
      padding: 30px 0;
      max-width: 800px;
      text-align: center;
      font-size: 16px;
      line-height: 20px;
    }
  }
  .footer-top {
    color: #fff;
    background: #313132;
    min-height: 10px;
    padding: 24px 0;

    .my-grid {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      width: 100%;
      flex-wrap: wrap;
      align-items: center;
      gap: 8px;
      font-weight: 500;

      .footer-item {
        display: flex;
        align-items: center;
        gap: 8px;
        cursor: pointer;
      }
      .footer-btn {
        font-weight: 700;
        border: none;
        color: #313132;
        :hover {
          color: #313132;
        }
      }
    }
    @media only screen and (max-width: 600px) {
      .my-grid {
        flex-direction: column;
        gap: 15px;
      }
    }
  }
`

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
`
const SiteHeader = styled.div`
  width: 100%;
  position: fixed;
  z-index: 10;
  transition: all 0.4s ease-in-out;
  user-select: none;
  &.sticky {
    background-color: rgba(97, 126, 16, 0.8);
    backdrop-filter: saturate(180%) blur(20px);
  }

  .nav-header {
    padding: 2em 1em 1em 1em;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .nav-section {
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .header-links {
      display: flex;
      flex-wrap: wrap;
      margin-left: 160px;
    }

    .nav-item {
      color: #fff;
      a,
      button {
        color: #fff;
        text-transform: uppercase;
        font-size: 1.2rem;
        font-weight: 400;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 4px 10px;
        margin-right: 10px;
        border-radius: 5px;
        .anticon {
          font-size: inherit;
        }

        &:hover {
          background-color: rgba(97, 126, 16, 0.8);
        }

        &.selected {
          background-color: rgba(0, 0, 0, 0.4);
        }
      }

      .icon {
        font-size: 20px;
      }
    }
    .search-input {
      max-width: 494px;
      border-radius: 10px;
      font-size: 18px;
      height: 32px;
      .suffix-icon {
        cursor: pointer;
      }
    }
    .logo-wrapper {
      margin-right: 2rem;
      a {
        display: flex;
        align-items: center;
        color: #fff;
        font-size: 2.7rem;
        font-weight: 600;
      }
    }
  }

  @media (max-width: 1024px) {
    .nav-header {
      .header-links {
        display: none;
      }
    }
  }
`

const StyledLayout = styled.div`
  height: 100%;

  main {
    height: 100%;
  }
`

export default Layout
