import { ReactNode, useEffect, useState } from 'react'
import Head from 'next/head'
import { Affix, Badge, Button, Divider, Drawer, Modal } from 'antd'
import { Cookies } from 'react-cookie'
import styled from 'styled-components'
import {
  CloseOutlined,
  FacebookOutlined,
  GooglePlusOutlined,
} from '@ant-design/icons'
import ShoppingCart from '@/components/shoppingCart'
import LoginForm from './forms/login'
import useUser from '@/hooks/useUser'
import Footer from '@/components/footer'
import SideMenu from '@/components/sideMenu'
import Header from '@/components/header'
import RegisterForm from './forms/register'

const cookies = new Cookies()

const Layout = ({ children }: { children: ReactNode }): JSX.Element => {
  const { mutate } = useUser()
  const [isRegister, setIsRegister] = useState(false)
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
  return (
    <StyledWrapper>
      <Head>
        <title>Doge-Chew Shop</title>
        <meta name="description" content="Doge-Chew Shop" />
      </Head>
      <Affix offsetTop={0}>
        <Header
          scroll={scroll}
          setDrawer={setDrawer}
          setCartDrawer={setCartDrawer}
        />
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
      <SideMenu
        drawer={drawer}
        setDrawer={setDrawer}
        setLoginModal={setLoginModal}
      />

      <StyledModal
        width={480}
        visible={loginModal}
        onCancel={() => setLoginModal(false)}
        footer={false}
        title={false}
        destroyOnClose
      >
        <h2 className="login-modal-header">Login or Signup</h2>
        {isRegister ? (
          <RegisterForm onSuccess={() => setLoginModal(false)} />
        ) : (
          <LoginForm onSuccess={() => setLoginModal(false)} />
        )}

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
            <a
              className="login-text"
              onClick={() => setIsRegister(!isRegister)}
            >
              {!isRegister ? 'Register' : 'login'}
            </a>
            <Divider style={{ borderColor: '#fff' }} type="vertical" />
            <a className="login-text">Forget Password ?</a>
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
      text-transform: uppercase;
      font-weight: 600;
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
