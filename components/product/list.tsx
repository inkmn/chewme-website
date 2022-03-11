import { Pagination } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import heroData from '@/constants/heroData.json'
import styled from 'styled-components'
import BottomShape from '../../assets/bottom-shape.svg'
import BoneButtonFlat from '@/components/boneButtonFlat'
import Link from 'next/link'
import Card from '../itemcard'
import Divider from '../devider'

const ProductList = () => {
  return (
    <StyledWrapper>
      <Header>Most Popular</Header>
      <Swiper
        modules={[Pagination]}
        pagination={{ clickable: true }}
        spaceBetween={50}
        slidesPerView={5}
        // onSlideChange={() => console.log('slide change')}
        // onSwiper={(swiper) => console.log(swiper)}
      >
        {heroData.map((item, index) => (
          <SwiperSlide key={index}>
            <StyledSlideItem>
              <Card />
            </StyledSlideItem>
          </SwiperSlide>
        ))}
      </Swiper>
    </StyledWrapper>
  )
}

const Header = styled.div`
  width: 100%;
  align-items: center;
  justify-content: center;
  display: flex;
  padding: 15px 0;
  color: rgba(97, 126, 16, 0.8);
  font-size: 40px;
  text-transform: uppercase;
  font-weight: 600;
`

const StyledSlideItem = styled.div`
  background: #fff;
`
const StyledWrapper = styled.div`
  background: #fff;
  height: max-content;
`
export default ProductList
