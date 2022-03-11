import { Pagination } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import heroData from '@/constants/heroData.json'
import styled from 'styled-components'
import BottomShape from '../../assets/bottom-shape.svg'
import BoneButtonFlat from '@/components/boneButtonFlat'
import Link from 'next/link'
import Card from '../itemcard'
import Divider from '../devider'

const ProductList = ({ perview }: { perview: number }): JSX.Element => {
  return (
    <StyledWrapper>
      <Swiper
        modules={[Pagination]}
        pagination={{ clickable: true }}
        spaceBetween={50}
        slidesPerView={perview || 5}
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

const StyledSlideItem = styled.div`
  background: #fff;
`
const StyledWrapper = styled.div`
  background: #fff;
  height: max-content;
`
export default ProductList
