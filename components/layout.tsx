import { ReactNode, useEffect, useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { Affix, Badge, Button, Drawer, Modal } from 'antd'
import { Cookies } from 'react-cookie'
import { useRouter } from 'next/router'
import styled from 'styled-components'
import {
  CloseOutlined,
  FacebookOutlined,
  InstagramOutlined,
  MenuOutlined,
  ShoppingCartOutlined,
  UserOutlined,
  YoutubeOutlined,
} from '@ant-design/icons'
import ActiveLink from '@/components/activeLink'
import ShoppingCart from '@/components/shoppingCart'
import LoginForm from './forms/login'
import useUser from '@/hooks/useUser'

const cookies = new Cookies()

const Layout = ({ children }: { children: ReactNode }): JSX.Element => {
  const router = useRouter()
  const { user, error, isValidating, mutate } = useUser()
  const [scroll, setScroll] = useState(false)
  const [drawer, setDrawer] = useState(false)
  const [cartDrawer, setCartDrawer] = useState(false)
  const [loginModal, setLoginModal] = useState(false)
  useEffect(() => {
    const scroll = () => {
      if (window.scrollY > 0) {
        setScroll(true)
      } else setScroll(false)
    }
    window.addEventListener('scroll', scroll, false)
    return () => window.removeEventListener('scroll', scroll, false)
  }, [])

  const logout = async () => {
    cookies.remove('token')
    mutate()
  }
  return (
    <StyledWrapper>
      <Head>
        <title>Doge-Chew Shop</title>
        <meta name="description" content="Doge-Chew Shop" />
      </Head>
      <Affix offsetTop={0}>
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
              {!error ? (
                <>
                  <div className="nav-item">
                    <Badge count={user.cart_count} size="small">
                      <Button
                        icon={<ShoppingCartOutlined />}
                        onClick={() => setCartDrawer(true)}
                        type="link"
                      />
                    </Badge>
                  </div>
                  <div className="nav-item">
                    <Button
                      icon={<UserOutlined />}
                      onClick={() => setDrawer(true)}
                      type="link"
                    />
                  </div>
                </>
              ) : (
                <>
                  <div className="nav-item">
                    <Button
                      icon={<MenuOutlined />}
                      onClick={() => setDrawer(true)}
                      type="link"
                    />
                  </div>
                </>
              )}
            </div>
          </div>
        </SiteHeader>
      </Affix>
      <StyledLayout>
        <main>{children}</main>
      </StyledLayout>
      <SiteFooter></SiteFooter>
      <StyledCartDrawer
        title={<div className="cart-header">My Cart</div>}
        placement="right"
        width={480}
        onClose={() => setCartDrawer(false)}
        visible={cartDrawer}
        closeIcon={<CloseOutlined className="drawerClose" />}
      >
        <ShoppingCart />
      </StyledCartDrawer>
      <StyledMenu
        title={false}
        placement="right"
        width={400}
        onClose={() => setDrawer(false)}
        visible={drawer}
        closeIcon={<CloseOutlined className="drawerClose" />}
        footer={
          <div className="drawer-footer">
            <a target="_blank" href="https://www.facebook.com" rel="noreferrer">
              <FacebookOutlined />
            </a>
            <div className="drawer-icon-spacer" />
            <a
              target="_blank"
              href="https://www.instagram.com"
              rel="noreferrer"
            >
              <InstagramOutlined />
            </a>
            <div className="drawer-icon-spacer" />
            <a target="_blank" href="https://www.youtube.com" rel="noreferrer">
              <YoutubeOutlined />
            </a>
          </div>
        }
      >
        <div className="menu">
          {!error ? (
            <>
              <Link href="/wallet">
                <a className="menu-item">My wallet</a>
              </Link>
              <Link href="/order">
                <a className="menu-item">My order</a>
              </Link>
              <Link href="/settings">
                <a className="menu-item">Settings</a>
              </Link>
              <a
                className="menu-item"
                onClick={() => {
                  logout()
                  setDrawer(false)
                }}
              >
                Sign out
              </a>
            </>
          ) : (
            <>
              <a
                className="menu-item"
                onClick={() => {
                  setLoginModal(true)
                  setDrawer(false)
                }}
              >
                Sign in
              </a>
            </>
          )}

          <Link href="/contact-us">
            <a className="menu-item">Contact us</a>
          </Link>
        </div>
      </StyledMenu>

      <StyledModal
        width={480}
        visible={loginModal}
        onCancel={() => setLoginModal(false)}
        footer={false}
        title={false}
      >
        <h2 className="login-modal-header">Login or Signup</h2>
        <LoginForm onSuccess={() => setLoginModal(false)} />
      </StyledModal>
    </StyledWrapper>
  )
}

const StyledModal = styled(Modal)`
  .ant-modal-content {
    background-color: rgba(97, 126, 16, 0.8);
    border-radius: 15px;
    color: #fff;
    padding: 30px;
  }
  .ant-modal-close {
    color: #fff;
    font-size: 24px;
  }
  .login-modal-header {
    color: #fff;
    text-align: center;
    text-transform: uppercase;
    font-size: 1.5rem;
  }
`

const StyledCartDrawer = styled(Drawer)`
  .cart-header {
    font-size: 2rem;
  }
  .drawerClose {
    color: #fff;
  }
  .ant-drawer-content {
    // background-color: rgba(97, 126, 16, 0.8);
  }
  .ant-drawer-header {
    background: transparent;
  }
  .ant-drawer-header-title {
    justify-content: flex-end;
    .ant-drawer-close {
      font-size: 1.3rem;
      background: #00000096;
      border-radius: 50%;
      height: 2.5rem;
      width: 2.5rem;
      margin-right: 3.8rem;

      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
`
const StyledMenu = styled(Drawer)`
  .drawerClose {
    color: #fff;
  }
  .ant-drawer-footer {
    border: none;
    .drawer-footer {
      display: flex;
      justify-content: space-between;
      padding: 2rem;
      .drawer-icon-spacer {
        border-right: 1px solid #fff;
        margin: 0 1rem;
      }
      .anticon {
        font-size: 60px;
        color: #fff;
      }
    }
  }
  .ant-drawer-content {
    background-color: rgba(97, 126, 16, 0.8);
  }
  .ant-drawer-header {
    background: transparent;
  }
  .ant-drawer-header-title {
    justify-content: flex-end;
    .ant-drawer-close {
      font-size: 1.3rem;
      background: #00000096;
      border-radius: 50%;
      height: 2.5rem;
      width: 2.5rem;
      margin-right: 3.8rem;
      margin-top: 1.7rem;

      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
  .menu {
    display: flex;
    flex-direction: column;
    padding: 3rem 0;
  }
  .divider {
    margin: 1rem 0;
    border-bottom: 1px solid rgba(255, 255, 255, 0.5);
  }
  .menu-item {
    color: #fff;
    font-size: 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    text-transform: uppercase;
    position: relative;
    &:hover::before,
    &:hover::after,
    &:focus::before,
    &:focus::after {
      opacity: 1;
      transform: translateX(0px);
    }
    &::before {
      margin-right: 10px;
      content: '[';
      transform: translateX(20px);
    }
    &::after {
      margin-left: 10px;
      content: ']';
      transform: translateX(-20px);
    }

    &::before,
    &::after {
      display: inline-block;
      opacity: 0;
      transition: transform 0.3s, opacity 0.2s;
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

      .ant-badge-count {
        top: 6px;
        right: 20px;
      }

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

      button {
        font-size: 1.6rem;
        width: 38px;
        height: 38px;
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
