import {
  EnvironmentFilled,
  FacebookFilled,
  FacebookOutlined,
  InstagramFilled,
  InstagramOutlined,
  PhoneFilled,
  QqOutlined,
  SendOutlined,
  TwitterOutlined,
  YoutubeFilled,
  YoutubeOutlined,
} from '@ant-design/icons'
import { Col, Row, Space } from 'antd'
import Link from 'next/link'
import styled from 'styled-components'
import Divider from './devider'
import Telegram from './../assets/telegram.svg'

const Footer = (): JSX.Element => {
  return (
    <StyledWrapper>
      <div className="container">
        <Divider />
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
            <p>follow to our Instagram      </p>
          </div>
        </div>
        <div className="row">
          {[1, 2, 3, 4, 5, 6, 7, 9].map((item, index) => {
            return (
              <div key={index} className="footer-image">
                <img src={`/ig/${item}.jpeg`} alt="" />
              </div>
            )
          })}
        </div>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={24} md={24} lg={24} xl={6} xxl={6}>
            <div className="logo-text">Dogechew</div>
          </Col>
          <Col xs={24} sm={24} md={12} lg={8} xl={6} xxl={6}>
            <div className="nav-item">
              <Link href="/about">
                <a>About us</a>
              </Link>
            </div>
            <div className="nav-item">
              <Link href="/contact">
                <a>Contact us</a>
              </Link>
            </div>
            <div className="nav-item">FOLLOW US</div>
            <div className="icons">
              <div className="icon">
                <a href="https://www.facebook.com/dogechewcoin">
                  <FacebookFilled />
                </a>
              </div>
              <div className="icon">
                <a href="https://www.youtube.com/watch?v=Y39QwuM6tGM">
                  <YoutubeFilled />
                </a>
              </div>
              <div className="icon">
                <a href="https://twitter.com/?lang=en">
                  <TwitterOutlined />
                </a>
              </div>
              <div className="icon">
                <a href="https://www.instagram.com/">
                  <InstagramFilled />
                </a>
              </div>
              <div className="icon">
                <a href="https://en.mail.qq.com/">
                  <QqOutlined />
                </a>
              </div>
              <div className="icon">
                <a href="https://t.me/DCcoinmn">
                  <Telegram />
                </a>
              </div>
            </div>
          </Col>
          <Col xs={24} sm={24} md={12} lg={8} xl={6} xxl={6}>
            <h3 className="item-title">Partnership</h3>
            <div className="nav-item">
              <Link href="/retailer">
                <a>Retailer</a>
              </Link>
            </div>
            <div className="nav-item">
              <Link href="/representatives">
                <a>Representatives</a>
              </Link>
            </div>
            <div className="nav-item">
              <Link href="/supplier">
                <a>Become Supplier</a>
              </Link>
            </div>
            <div className="nav-item">
              <Link href="/fags">
                <a>FAQ</a>
              </Link>
            </div>
          </Col>
          <Col xs={24} sm={24} md={12} lg={8} xl={6} xxl={6}>
            <h3 className="item-title">Imported Links</h3>
            <div className="nav-item">
              <Link href="/privacy-policy">
                <a>Privacy Policy</a>
              </Link>
            </div>
            <div className="nav-item">
              <Link href="/return-policy">
                <a>Return and Refund policy</a>
              </Link>
            </div>
            <div className="nav-item">
              <Link href="/term">
                <a>Terms & Conditions</a>
              </Link>
            </div>
          </Col>
          <Col span={24}>
            <div className="powered-by">
              &copy;2022 DOGECHEW.ALL RIGHT RESERVED | POWERED BY{' '}
              <a
                href="http://goodtech-soft.mn"
                target="_blank"
                rel="noreferrer"
              >
                GOODTECH SOFT
              </a>
            </div>
          </Col>
        </Row>
      </div>
    </StyledWrapper>
  )
}

const StyledWrapper = styled.div`
  margin-top: 60px;

  .icons {
    display: flex;
    margin: auto -8px;
    flex-wrap: wrap;
    width: 150px;
  }
  .icon {
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 40px;
    height: 40px;
    border: 1px solid var(--primary);
    border-radius: 50%;
    color: var(--primary);
    font-size: 1.3rem;
    margin: 4px;
    a {
      color: var(--primary);
      display: flex;
    }
  }
  .item-title {
    font-size: 1.3rem;
    font-weight: 700;
    color: var(--primary);
  }
  .nav-item {
    font-size: 1rem;
    a {
      color: #000;
      :hover {
        color: var(--primary);
      }
    }
  }
  .powered-by {
    text-align: center;
    font-size: 1rem;
    text-transform: uppercase;
    margin: 20px 0;
  }
  .logo-text {
    text-transform: uppercase;
    font-size: 2.7rem;
    line-height: 2.7rem;
    font-weight: 700;
    color: var(--primary);
    margin-bottom: 20px;
  }
  .ig-head {
    display: flex;
    flex-direction: row;
    gap: 8px;
    align-items: center;
    margin-bottom: 5px;
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
  .space-between {
    display: flex;
    justify-content: space-between;
    width: 100%;
    align-items: center;
  }

  @media only screen and (max-width: 1000px) {
    .row {
      justify-content: center;
    }
  }
  @media only screen and (max-width: 767px) {
    h3,
    .nav-item,
    .logo-text {
      text-align: center;
    }
    .icons {
      text-align: center;
      width: 100%;
      display: flex;
      justify-content: center;
      margin: 0;
    }
  }
`

export default Footer
