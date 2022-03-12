import { useState } from 'react'
import Layout from '@/components/layout'
import PageHeader from '@/components/pageHeader/cover'
import styled from 'styled-components'
import { useRouter } from 'next/router'
import PublicFetcher from '@/lib/publicFetch'
import useSWR from 'swr'
import ProductItem from '@/interfaces/product'
import { Alert, Button, Col, Divider, Image, Row, Tag, Typography } from 'antd'
import { Pagination } from 'swiper'
import Test from '../../assets/product/dogs (1).jpg'
import { Swiper, SwiperSlide } from 'swiper/react'
import { FreeMode, Navigation, Thumbs } from 'swiper'
import BottomShape from '@/components/bottomShape'
import BoneButtonFlat from '@/components/boneButtonFlat'
import { StarFilled } from '@ant-design/icons'

const { Title, Paragraph, Text, Link } = Typography
const ProductDetail = () => {
  const router = useRouter()
  const [thumbsSwiper, setThumbsSwiper] = useState(null)
  const { product_id } = router.query
  const { data: productData } = useSWR<ProductItem>(
    product_id ? `/pub/product/${product_id}` : null,
    PublicFetcher
  )
  return (
    <Layout>
      <PageHeader image={`/paws-bg.png`} position="top" />
      <StyledProductDetail>
        <div className="container">
          <pre style={{ display: '' }}>
            {JSON.stringify(productData, null, 2)}
          </pre>

          <Row gutter={[16, 16]}>
            <Col xs={24} sm={24} md={24} lg={10} xl={10} xxl={10}>
              <StyledSwiper>
                <Swiper
                  loop={true}
                  spaceBetween={2}
                  navigation={true}
                  thumbs={{ swiper: thumbsSwiper }}
                  modules={[FreeMode, Navigation, Thumbs]}
                  className="mySwiper2"
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((item, index) => {
                    return (
                      <SwiperSlide key={index}>
                        <ImageFull>
                          <Image
                            src={`https://swiperjs.com/demos/images/nature-${
                              index + 1
                            }.jpg`}
                          />
                        </ImageFull>
                      </SwiperSlide>
                    )
                  })}
                </Swiper>
                <Swiper
                  onSwiper={(e) => setThumbsSwiper(e)}
                  loop={false}
                  spaceBetween={30}
                  slidesPerView={4}
                  freeMode={true}
                  watchSlidesProgress={true}
                  modules={[FreeMode, Navigation, Thumbs]}
                  className="mySwiper"
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((item, index) => {
                    return (
                      <SwiperSlide key={index}>
                        <Items>
                          <img
                            src={`https://swiperjs.com/demos/images/nature-${
                              index + 1
                            }.jpg`}
                          />
                        </Items>
                      </SwiperSlide>
                    )
                  })}
                </Swiper>
              </StyledSwiper>
            </Col>
            <Col xs={24} sm={24} md={24} lg={24} xl={12} xxl={10}>
              <Details>
                <h1>{productData?.name}</h1>
                <div className="space-between">
                  <div className="rate">
                    <StarFilled />
                    <StarFilled />
                    <StarFilled />
                    <StarFilled />
                  </div>
                  <div className="txt">DC2020230</div>
                </div>
                <hr style={{ minWidth: '300px', margin: '30px 0' }} />
                <div className="price">
                  PRICE: ${productData?.price}{' '}
                  <span style={{ color: '#8e8e8e' }}>/</span> DC
                  {productData?.dc_price}
                </div>
                <hr style={{ minWidth: '300px', margin: '30px 0' }} />

                <Alert
                  message={
                    <Paragraph style={{ maxWidth: '580px', width: '100%' }}>
                      <h5>Key Benefits :</h5>
                      <ul>
                        <li>
                          <Link href="/docs/spec/proximity">
                            All-natural and easily digestible
                          </Link>
                        </li>
                        <li>
                          <Link href="/docs/spec/overview">
                            Great source of protein, heart-healthy fats, and
                            niacin
                          </Link>
                        </li>
                        <li>
                          <Link href="/docs/resources">
                            Portable, quick, convenient training treat
                          </Link>
                        </li>
                        <li>
                          <Link href="/docs/resources">
                            Lactose, grain, and gluten-free
                          </Link>
                        </li>
                      </ul>
                    </Paragraph>
                  }
                  type="info"
                />

                <Button>dddd</Button>
                <p>
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Dolorum reiciendis culpa eos atque at qui laudantium,
                  inventore pariatur sunt, deleniti magnam laboriosam hic
                  placeat! Neque ipsa modi sequi aspernatur minima?
                </p>
              </Details>
            </Col>
          </Row>
        </div>
      </StyledProductDetail>
    </Layout>
  )
}

const Details = styled.div`
  height: 10px;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  align-items: flex-start;

  .space-between {
    display: flex;
    justify-content: space-between;
    width: 100%;
    align-items: center;
  }

  .txt {
    font-size: 18px;
    color: #8e8e8e;
    font-weight: 600;
    align-self: flex-end;
  }
  .rate {
    gap: 8px;
    max-width: 580px;
    display: flex;
    flex-direction: row;
    color: #ffc80c;
    font-size: 22px;
    align-items: center;
  }
  .price {
    font-size: 2em;
    font-weight: 700;
    color: var(--primary);
  }
  h1 {
    font-size: 2.5em;
    font-weight: 700;
    text-transform: uppercase;
  }
  p {
    width: 100%;
    text-align: center;
    max-width: 580px;
    margin-top: 30px;
    text-align: justify;
  }
`

const ImageFull = styled.div`
  border-radius: 10px;
  width: 100%;

  .ant-image-mask {
    border-radius: 10px;
  }
  img {
    border-radius: 10px;
    width: 100%;
    height: 500px;
    border: 1px solid #dadada;
  }
`

const Items = styled.div`
  height: 102px;
  width: 102px;

  img {
    width: 100%;
    object-fit: cover;
    border-radius: 10px;
    border: 1px solid #dadada;
  }
`

const StyledSwiper = styled.div`
  .mySwiper2 {
    max-height: 500px;
  }

  .mySwiper {
    padding-right: 0px;
    max-width: 500px;
    margin: 0;
    .swiper-wrapper {
      margin-top: 10px;
      width: 500px;
      margin-bottom: 5px;
    }
  }
`

const StyledProductDetail = styled.div`
  margin-top: 50px;
  height: 500px;
`

export default ProductDetail
