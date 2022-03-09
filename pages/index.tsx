import HeroCarousel from '@/components/carousel/hero'
import Layout from '@/components/layout'
import type { NextPage } from 'next'
import styled from 'styled-components'
import Card from '@/components/Card'

const Home: NextPage = () => {
  return (
    <Layout cover={'/cover1.jpg'}>
      <HeroCarousel />
      <StyledHome>
        <div className="container">
          <Card />
        </div>
      </StyledHome>

      <StyledHome>
        <div className="container">
          <div>Home</div>
          <img src="/test.png" alt="" />
        </div>
      </StyledHome>
      <StyledHome>
        <div className="container">
          <div>Home</div>
          <img src="/test.png" alt="" />
        </div>
      </StyledHome>
      <StyledHome>
        <div className="container">
          <div>Home</div>
          <img src="/test.png" alt="" />
        </div>
      </StyledHome>
      <StyledHome>
        <div className="container">
          <div>Home</div>
          <img src="/test.png" alt="" />
        </div>
      </StyledHome>
    </Layout>
  )
}

const StyledHome = styled.div`
  height: 500px;
`

export default Home
