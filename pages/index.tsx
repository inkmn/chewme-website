import HeroCarousel from '@/components/carousel/hero'
import Layout from '@/components/layout'
import type { NextPage } from 'next'
import styled from 'styled-components'
import ProductList from '@/components/product/carousel'
import Divider from '@/components/devider'
import { Col, Row } from 'antd'
import Image from 'next/image'

const Home: NextPage = () => {
  return (
    <Layout>
      <HeroCarousel />
      <StyledHome>
        <div className="container">
          <PageHeader>Most Popular</PageHeader>
          <ProductList perview={5} />
        </div>
      </StyledHome>
      <StyledHome>
        <div className="container">
          <Divider />
          <Row gutter={[32, 32]}>
            <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}>
              <BannerCard>
                <Image
                  className="image"
                  layout="fill"
                  src="/banner2.jpeg"
                  alt=""
                />
              </BannerCard>
            </Col>
            <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}>
              <BannerCard>
                <Image
                  className="image"
                  layout="fill"
                  src="/banner1.jpeg"
                  alt=""
                />
              </BannerCard>
            </Col>
          </Row>
        </div>
      </StyledHome>
      <StyledHome>
        <div className="container">
          <PageHeader>Hand crafted</PageHeader>
          <ProductList perview={5} />
          <Divider />
        </div>
      </StyledHome>
    </Layout>
  )
}

const BannerCard = styled.div`
  border-radius: 20px;
  position: relative;
  height: 300px;

  .image {
    height: 300px;
    width: 100%;
    object-fit: cover;
    border-radius: 20px;
  }
`

const StyledHome = styled.div``

const PageHeader = styled.div`
  width: 100%;
  align-items: center;
  justify-content: center;
  display: flex;
  padding: 3rem 0;
  color: rgba(97, 126, 16, 0.8);
  font-size: 40px;
  text-transform: uppercase;
  font-weight: 600;
`

export default Home
