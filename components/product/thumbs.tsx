import { Pagination } from 'swiper'
import { Swiper, SwiperSlide, SwiperProps } from 'swiper/react'
import { Thumbs, Navigation } from 'swiper'
import styled from 'styled-components'
import { ProductImage } from '@/interfaces/product'
import { useState } from 'react'
import Image from '@/components/s3Image'
import classnames from 'classnames'

const CarouselThumb = ({
  images = [],
}: {
  images: ProductImage[] | undefined
}): JSX.Element => {
  const [thumbsSwiper, setThumbsSwiper] = useState<any>()
  return (
    <StyledWrapper>
      {/* Main Swiper -> pass thumbs swiper instance */}
      <div className="mainSwiperBox">
        <Swiper modules={[Thumbs]} thumbs={{ swiper: thumbsSwiper }}>
          {images.map((item, index) => {
            return (
              <SwiperSlide key={index}>
                <div className="swiperItem">
                  <Image
                    className="image"
                    width={640}
                    height={480}
                    objectFit="contain"
                    src={item.url}
                    alt=""
                  />
                </div>
              </SwiperSlide>
            )
          })}
        </Swiper>
      </div>

      {/* Thumbs Swiper -> store swiper instance */}
      {/* It is also required to set watchSlidesProgress prop */}
      <div className="thumbSwiperBox">
        <Swiper
          slidesPerView={5}
          navigation={true}
          modules={[Thumbs, Navigation]}
          watchSlidesProgress
          onSwiper={setThumbsSwiper}
        >
          {images.map((item, index) => {
            return (
              <SwiperSlide key={index}>
                {({ isActive }) => (
                  <div className={classnames(['swiperThumbItem'])}>
                    <Image
                      className="image"
                      width={640}
                      height={480}
                      objectFit="contain"
                      layout="responsive"
                      src={item.url}
                      alt=""
                    />
                  </div>
                )}
              </SwiperSlide>
            )
          })}
        </Swiper>
      </div>
    </StyledWrapper>
  )
}

const StyledWrapper = styled.div`
  width: 100%;
  .mainSwiperBox {
    border: 1px solid #eee;
    border-radius: 4px;
  }
  .thumbSwiperBox {
    margin-top: 3rem;

    .swiperThumbItem {
      border: 2px solid transparent;
      cursor: pointer;
      border-radius: 4px;
    }

    .swiper-slide-thumb-active {
      .swiperThumbItem {
        border-color: var(--primary);
      }
    }
  }

  .swiperItem {
    border-radius: 10px;
    width: 100%;
  }
`
export default CarouselThumb
