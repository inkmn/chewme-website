import { Pagination } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import styled from 'styled-components'
import Card from './card'
import useSWR from 'swr'
import PublicFetcher from '@/lib/publicFetch'
import { ProductListItem } from '@/interfaces/product'

const ProductList = ({ perview }: { perview: number }): JSX.Element => {
  const { data } = useSWR<{
    rows: ProductListItem[]
    count: number
  }>(
    '/pub/product/?filter[query]=&filter[category_id]=&offset[page]=1&offset[limit]=10&filter[start_date]=&filter[end_date]=',
    PublicFetcher
  )
  return (
    <StyledWrapper>
      <Swiper
        className="product-list-swiper"
        modules={[Pagination]}
        pagination={{ clickable: true }}
        spaceBetween={50}
        slidesPerView={perview || 4}
        breakpoints={{
          320: {
            slidesPerView: 1,
          },
          768: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 3,
          },
          1440: {
            slidesPerView: perview || 4,
          },
        }}
        // onSlideChange={() => console.log('slide change')}
        // onSwiper={(swiper) => console.log(swiper)}
      >
        {data?.rows.map((item: any) => (
          <SwiperSlide key={item.id}>
            <Card item={item} />
          </SwiperSlide>
        ))}
      </Swiper>
    </StyledWrapper>
  )
}

const StyledWrapper = styled.div`
  .product-list-swiper {
    padding-bottom: 3rem;
  }
`
export default ProductList
