import {
  EnvironmentFilled,
  FacebookOutlined,
  InstagramOutlined,
  PhoneFilled,
  YoutubeOutlined,
} from '@ant-design/icons'
import { Space } from 'antd'
import styled from 'styled-components'
import Divider from './devider'

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
            <p>follow to our Instagram</p>
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
          {/* <img
            src={'https://www.himalayan.pet/wp-content/uploads/paymet-1.png'}
            alt=""
          /> */}
        </div>
      </div>
    </StyledWrapper>
  )
}

const StyledWrapper = styled.div`
  margin-top: 60px;

  .ig-head {
    display: flex;
    flex-direction: row;
    gap: 8px;
    align-items: center;
    margin-bottom: 10px;
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
    .row {
      justify-content: center;
    }
  }
`

export default Footer
