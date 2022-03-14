import { ReactNode, useEffect, useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import {
  Affix,
  Badge,
  Button,
  Col,
  Divider,
  Drawer,
  Input,
  Modal,
  Row,
  Space,
} from 'antd'
import { Cookies } from 'react-cookie'
import { useRouter } from 'next/router'
import styled from 'styled-components'
import {
  AmazonOutlined,
  CloseOutlined,
  EnvironmentFilled,
  FacebookOutlined,
  HeatMapOutlined,
  InstagramOutlined,
  MenuOutlined,
  PhoneFilled,
  SendOutlined,
  ShoppingCartOutlined,
  UserOutlined,
  YoutubeOutlined,
} from '@ant-design/icons'
import ActiveLink from '@/components/activeLink'
import ShoppingCart from '@/components/shoppingCart'
import LoginForm from './forms/login'
import useUser from '@/hooks/useUser'
import Image from 'next/image'
import CardsViz from '../assets/play.png'

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
      <SiteFooter>
        <div className="container">
          <div className="ig-head">
            <div className="ig-image-btn">
              <img
                className="ig-image"
                src="/ig/1.jpeg"
                alt=""
                style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                srcSet=""
              />
            </div>
            <div>
              <h2>Dogechew</h2>
              <p>follow to our Instagram</p>
            </div>
          </div>
          <div className="footer-head">
            {[1, 2, 3, 4, 5, 6, 7, 9].map((item, index) => {
              return (
                <div key={index} className="footer-image">
                  <img src={`/ig/${item}.jpeg`} alt="" />
                </div>
              )
            })}
          </div>
          <div className="nav-items">
            If you have any question, please contact us at
            <a href=""> doge-chew-mn@eshop.com </a>
          </div>
          <div className="nav-items">
            <Space>
              <EnvironmentFilled
                style={{ fontSize: '22px', color: 'var(--primary)' }}
              />
              <p>4480 Chennault Beach Road Mukilteo, WA 98275</p>
            </Space>
          </div>
          <div className="nav-items">
            <Space>
              <PhoneFilled
                style={{ fontSize: '22px', color: 'var(--primary)' }}
              />
              <p>(+976) 8885-2346</p>
            </Space>
          </div>
          <div className="nav-items">
            <Space>
              <a
                className="icon"
                target="_blank"
                href="https://www.facebook.com"
                rel="noreferrer"
              >
                <FacebookOutlined style={{ color: '#3b5998' }} />
              </a>
              <div className="drawer-icon-spacer" />
              <a
                className="icon"
                target="_blank"
                href="https://www.instagram.com"
                rel="noreferrer"
              >
                <InstagramOutlined style={{ color: '#262626' }} />
              </a>
              <div className="drawer-icon-spacer" />
              <a
                className="icon"
                target="_blank"
                href="https://www.youtube.com"
                rel="noreferrer"
              >
                <YoutubeOutlined style={{ color: '#cd201f' }} />
              </a>
            </Space>
          </div>
          <div className="space-between">
            <p className="nav-items">
              ©2021 DOGECHEW CORPORATION. ALL RIGHTS RESERVED | POWERED BY
              GOODTECH TECHNOLOGY
            </p>
            <img
              src={'https://www.himalayan.pet/wp-content/uploads/paymet-1.png'}
              alt=""
            />
          </div>
        </div>
      </SiteFooter>
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
          <div className="drawer-menu-spacer" />
          {!error ? (
            <>
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
          ) : null}
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
  .drawer-menu-spacer {
    margin: 1rem 0;
    border-bottom: 1px solid #fff;
  }

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

const SiteFooter = styled.div`
  margin-top: 60px;

  .ig-head {
    display: flex;
    flex-direction: row;
    gap: 8px;
    align-items: center;
    margin-bottom: 10px;
    cursor: pointer;
    :hover {
      .ig-image-btn {
      }
    }
    h2 {
      margin: 0;
    }
    .ig-image-btn {
      border-radius: 5px;
      display: flex;
      .ig-image {
        border-radius: 5px;
        width: 50px;
        height: 50px;
      }
    }
  }
  .more {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 10px 0;
    .btn-more {
      background-color: var(--primary);
      border-color: var(--primary);
    }
  }
  .footer-image {
    margin: 12px;
    img {
      width: 170px;
      height: 170px;
      object-fit: cover;
    }
  }
  .footer-head {
    display: flex;
    flex-wrap: wrap;
    margin-right: -12px;
    margin-left: -12px;
  }
  .space-between {
    display: flex;
    justify-content: space-between;
    width: 100%;
    align-items: center;
  }
  .nav-items {
    .icon {
      font-size: 32px;
    }
  }
  .nav-items {
    max-width: 300px;
    margin-top: 10px;
  }

  @media only screen and (max-width: 1000px) {
    .footer-head {
      justify-content: center;
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
