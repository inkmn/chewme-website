import { Pagination } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import heroData from '@/constants/heroData.json'
import styled from 'styled-components'
import Card from '../itemcard'

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
