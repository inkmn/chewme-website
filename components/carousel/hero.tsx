import { Pagination } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import heroData from '@/constants/heroData.json'
import styled from 'styled-components'
import BottomCircleShape from '@/components/bottomCircleShape'
import BoneButtonFlat from '@/components/boneButtonFlat'
import Link from 'next/link'

const HeroCover = () => {
  return (
    <StyledWrapper>
      <BottomCircleShape height={60} />
      <Swiper
        modules={[Pagination]}
        pagination={{ clickable: true }}
        spaceBetween={50}
        slidesPerView={1}
        // onSlideChange={() => console.log('slide change')}
        // onSwiper={(swiper) => console.log(swiper)}
      >
        {heroData.map((item, index) => (
          <SwiperSlide key={index}>
            <StyledSlideItem>
              <div
                className="slide-image"
                style={{ backgroundImage: `url(${item.image})` }}
              />
              <div className="slide-image-filter" />
              <div className="content-wrapper">
                <div className="container">
                  <div className="content">
                    <h1>{item.title}</h1>
                    <p>{item.description}</p>
                    <Link href={`/shop`}>
                      <a>
                        <BoneButtonFlat>MORE</BoneButtonFlat>
                      </a>
                    </Link>
                  </div>
                </div>
              </div>
            </StyledSlideItem>
          </SwiperSlide>
        ))}
      </Swiper>
    </StyledWrapper>
  )
}

const StyledSlideItem = styled.div`
  background: #fff;
  width: 100%;
  height: 600px;
  transition-duration: calc(10000ms * 1.2);
  flex-shrink: 0;
  position: relative;

  .slide-image {
    background-size: cover;
    background-position: 50%;
    background-repeat: no-repeat;
    min-width: 100%;
    min-height: 100%;
  }

  .slide-image-filter {
    background-color: rgba(0, 0, 0, 0.5);
    height: 100%;
    width: 100%;
    top: 0;
    left: 0;
    position: absolute;
  }

  .content-wrapper {
    text-align: left;
    justify-content: flex-start;
    color: #fff;
    display: flex;
    align-items: center;
    background-repeat: no-repeat;
    background-position: 50%;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    margin: auto;
    .content {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      & > h1 {
        color: #fff;
        font-size: 2.5rem;
        margin-bottom: 0;
        line-height: 38px;
      }
      & > p {
        font-size: 17px;
        line-height: 1.4;
      }
      @media (max-width: 1450px) and (min-width: 768px) {
        padding: 0 6rem;
      }
    }
  }
`
const StyledWrapper = styled.div`
  background: #313132;
  height: 600px;
  width: 100%;
  position: relative;
`
export default HeroCover
