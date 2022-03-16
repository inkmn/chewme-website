import Link from 'next/link'
import styled from 'styled-components'
import ActiveLink from '@/components/activeLink'
import { Badge, Button, Drawer } from 'antd'
import {
  MenuOutlined,
  ShoppingCartOutlined,
  UserOutlined,
} from '@ant-design/icons'
import useUser from '@/hooks/useUser'
import { useState } from 'react'
import { useAppContext } from '@/context/state'

const Header = ({ scroll }: { scroll: boolean }): JSX.Element => {
  const { setCartDrawer, setMenuDrawer } = useAppContext()
  const { user, error } = useUser()
  return (
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
                  onClick={() => setMenuDrawer(true)}
                  type="link"
                />
              </div>
            </>
          ) : (
            <>
              <div className="nav-item">
                <Button
                  icon={<MenuOutlined />}
                  onClick={() => setMenuDrawer(true)}
                  type="link"
                />
              </div>
            </>
          )}
        </div>
      </div>
    </SiteHeader>
  )
}
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
      display: flex;
      align-items: center;
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
    .siteBurger {
      display: block;
    }
  }
`

export default Header
