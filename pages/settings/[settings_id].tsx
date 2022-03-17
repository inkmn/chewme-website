import Layout from '@/components/layout'
import PageHeader from '@/components/pageHeader/cover'
import styled from 'styled-components'
import { Col, Row, Tabs } from 'antd'
import ShippingAddress from '@/components/forms/shippingAddress'
import UserPassword from '@/components/forms/userPassword'
import UserEmail from '@/components/forms/userEmail'
import classnames from 'classnames'
import { CloseOutlined } from '@ant-design/icons'
import Link from 'next/link'
import { useRouter } from 'next/router'
import useUser from '@/hooks/useUser'

const { TabPane } = Tabs
const Settings = () => {
  const router = useRouter()
  let currentPath: any = router
  let selected = currentPath.asPath.split('/')[2]

  return (
    <Layout>
      <PageHeader title={`Settings`} image={`/cover5.jpeg`} />
      <StyledSettings>
        <div className="container">
          <Row gutter={[24, 24]}>
            <Col xs={24} sm={24} md={24} lg={6} xl={6} xxl={6}>
              <StyledNav>
                <h2>Settings</h2>
                <Link href="password">
                  <a
                    className={classnames([
                      'item',
                      selected === 'password' ? 'selected' : '',
                    ])}
                  >
                    <span>Password</span>
                    <CloseOutlined />
                  </a>
                </Link>
                <Link href="email">
                  <a
                    className={classnames([
                      'item',
                      selected === 'email' ? 'selected' : '',
                    ])}
                  >
                    <span>Email</span>
                    <CloseOutlined />
                  </a>
                </Link>
                <Link href="address">
                  <a
                    className={classnames([
                      'item',
                      selected === 'address' ? 'selected' : '',
                    ])}
                  >
                    <span>Shipping Address</span>
                    <CloseOutlined />
                  </a>
                </Link>
              </StyledNav>
            </Col>
            <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}>
              <Tabs activeKey={selected}>
                <TabPane key="password">
                  <h1>Password</h1>
                  <UserPassword />
                </TabPane>
                <TabPane key="address">
                  <h1>Shipping address</h1>
                  <ShippingAddress />
                </TabPane>
                <TabPane key="email">
                  <h1>Email</h1>
                  <UserEmail />
                </TabPane>
              </Tabs>
            </Col>
            <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}></Col>
          </Row>

          {/* <Row gutter={[24, 24]}>
            <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}>
              <h1>Shipping Address</h1>
              <ShippingAddress />
            </Col>
            <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}>
              <h1>Password changes</h1>
              <UserPassword />
            </Col>
            <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}>
              <h1>Email changes</h1>
              <UserEmail />
            </Col>
          </Row> */}
          {/* This is Settings view
          <pre>{JSON.stringify(user, null, 2)}</pre> */}
        </div>
      </StyledSettings>
    </Layout>
  )
}

const StyledNav = styled.div`
  display: flex;
  flex-direction: column;
  .item {
    margin-bottom: 0.5rem;
    color: #333;
    font-weight: 400;
    line-height: 1.5;
    display: flex;
    justify-content: space-between;
    padding: 0 12px;
    border-radius: 6px;
    color: #4e4e4e;
    font-size: 1rem;
    align-items: center;
    :hover {
      color: var(--primary);
    }
    .anticon {
      display: none;
    }
    &.selected {
      cursor: pointer;
      color: var(--primary);
      font-weight: 700;
      background-color: #eee;
      .anticon {
        font-size: 0.8rem;
      }
    }
  }
`

const StyledSettings = styled.div`
  min-height: 500px;
  margin-top: 40px;

  .ant-tabs-nav {
    display: none;
  }
  h1 {
    font-weight: 700;
    color: var(--primary);
    font-size: 2rem;
  }
  .border {
    padding: 24px;
    border: 1px solid #dadada;
    border-radius: 10px;
    width: 100%;
    margin-bottom: 24px;
  }
`

export default Settings
