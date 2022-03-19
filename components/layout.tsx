import { ReactNode, useEffect, useState } from 'react'
import Head from 'next/head'
import { Affix, Divider, Drawer, Modal } from 'antd'
import styled from 'styled-components'
import {
  CloseOutlined,
  FacebookOutlined,
  GooglePlusOutlined,
} from '@ant-design/icons'
import ShoppingCart from '@/components/shoppingCart'
import LoginForm from './forms/login'
import Footer from '@/components/footer'
import SideMenu from '@/components/sideMenu'
import Header from '@/components/header'
import RegisterForm from './forms/register'

import { useAppContext } from '@/context/state'
import ForgotPasswordForm from './forms/forgot'

const Layout = ({ children }: { children: ReactNode }): JSX.Element => {
  const { loginModal, setLoginModal, cartDrawer, setCartDrawer } =
    useAppContext()
  const [authType, setAuthType] = useState('')
  const [scroll, setScroll] = useState(false)
  useEffect(() => {
    const scroll = () => {
      if (window.scrollY > 0) {
        setScroll(true)
      } else setScroll(false)
    }
    window.addEventListener('scroll', scroll, false)
    return () => window.removeEventListener('scroll', scroll, false)
  }, [])

  const resetAuthType = () => {
    setAuthType('')
    setLoginModal(false)
  }

  return (
    <StyledWrapper>
      <Head>
        <title>Doge-Chew Shop</title>
        <meta name="description" content="Doge-Chew Shop" />
      </Head>
      <Affix offsetTop={0}>
        <Header scroll={scroll} />
      </Affix>
      <StyledLayout>
        <main>{children}</main>
      </StyledLayout>
      <Footer />
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
      <SideMenu />

      <StyledModal
        width={480}
        visible={loginModal}
        onCancel={resetAuthType}
        footer={false}
        title={false}
        destroyOnClose
      >
        {{
          register: <RegisterForm onSuccess={resetAuthType} />,
          forgot: <ForgotPasswordForm onSuccess={resetAuthType} />,
        }[authType] || <LoginForm onSuccess={resetAuthType} />}
        <div className="login-links">
          <div className="fg">
            <div>
              <FacebookOutlined />
            </div>
            <div className="line"></div>
            <div>
              <GooglePlusOutlined />
            </div>
          </div>
          <div className="ll-others">
            {authType === 'register' ? (
              <a className="login-text" onClick={() => setAuthType('login')}>
                Already have an account?
              </a>
            ) : (
              <a className="login-text" onClick={() => setAuthType('register')}>
                Register
              </a>
            )}

            {authType !== 'forgot' ? (
              <>
                <Divider style={{ borderColor: '#fff' }} type="vertical" />
                <a className="login-text" onClick={() => setAuthType('forgot')}>
                  Forget Password ?
                </a>
              </>
            ) : (
              <>
                <Divider style={{ borderColor: '#fff' }} type="vertical" />
                <a className="login-text" onClick={() => setAuthType('login')}>
                  Already have an account?
                </a>
              </>
            )}
          </div>
        </div>
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
  .login-links {
    display: flex;
    flex-direction: column;
    justify-content: center;

    .ll-others {
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .login-text {
      color: #fff;
      margin-bottom: 0;
      font-size: 16px;
    }
  }

  .fg {
    margin: 20px 0;
    width: 100%;
    font-size: 40px;
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    .line {
      border-right: 1px solid #fff;
      height: 50px;
      margin: 0 1rem;
    }
  }
`

const StyledCartDrawer = styled(Drawer)`
  @media only screen and (max-width: 480px) {
    .ant-drawer-content-wrapper {
      max-width: 100%;
      width: 100%;
      min-width: 100%;
    }
  }
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

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
`

const StyledLayout = styled.div`
  height: 100%;

  main {
    height: 100%;
  }
`

export default Layout
