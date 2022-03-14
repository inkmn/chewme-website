import useUser from '@/hooks/useUser'
import { Cookies } from 'react-cookie'
import {
  CloseOutlined,
  FacebookOutlined,
  InstagramOutlined,
  YoutubeOutlined,
} from '@ant-design/icons'
import { Drawer } from 'antd'
import Link from 'next/link'
import { useState } from 'react'
import styled from 'styled-components'

const cookies = new Cookies()

const SideMenu = ({
  drawer = false,
  setDrawer,
  setLoginModal,
}: {
  drawer: boolean
  setDrawer: (visible: boolean) => void
  setLoginModal: (visible: boolean) => void
}): JSX.Element => {
  const { user, error, isValidating, mutate } = useUser()
  const logout = async () => {
    cookies.remove('token')
    mutate()
  }
  return (
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
          <a target="_blank" href="https://www.instagram.com" rel="noreferrer">
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
  )
}

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

export default SideMenu
