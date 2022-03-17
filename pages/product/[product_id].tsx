import { useState } from 'react'
import Layout from '@/components/layout'
import PageHeader from '@/components/pageHeader/cover'
import styled from 'styled-components'
import { useRouter } from 'next/router'
import publicFetcher from '@/lib/publicFetch'
import useSWR from 'swr'
import ProductItem from '@/interfaces/product'
import { Col, Empty, Row, Tag, Typography } from 'antd'
import { HeartFilled, HeartOutlined, StarFilled } from '@ant-design/icons'
import CarouselThumb from '@/components/product/thumbs'
import useInit from '@/hooks/useInit'
import AddToCartForm from '@/components/forms/addToCart'
import privatefetcher from '@/lib/privateFetch'
import Item from 'antd/lib/list/Item'

const { Paragraph, Link } = Typography

const ProductDetail = () => {
  const {
    data: { categories_indexed },
  } = useInit()

  const router = useRouter()
  const [isFav, setIsFav] = useState(true)
  const { product_id } = router.query
  const {
    data: productData,
    error,
    mutate,
  } = useSWR<ProductItem>(
    product_id ? `/pub/product/${product_id}` : null,
    publicFetcher
  )

  if (error && error) {
    return (
      <Layout>
        <PageHeader image={`/paws-bg.png`} position="top" />
        <StyledProductDetail>
          <div className="container">
            <div>
              <Empty
                description={error.data.message}
                image={Empty.PRESENTED_IMAGE_SIMPLE}
              />
            </div>
          </div>
        </StyledProductDetail>
      </Layout>
    )
  }

  const setFavorite = async () => {
    await privatefetcher(`/app/favorite`, {
      method: 'POST',
      body: JSON.stringify({ product_id }),
    })
    // await privatefetcher(`/app/favorite/${product_id}`, {
    //   method: 'DELETE',
    // })
    mutate()
  }

  return (
    <Layout>
      <PageHeader image={`/paws-bg.png`} position="top" />
      <StyledProductDetail>
        <div className="container">
          <Row gutter={[24, 24]}>
            <Col xs={24} sm={24} md={24} lg={24} xl={12} xxl={12}>
              <CarouselThumb images={productData?.images} />
            </Col>
            <Col xs={24} sm={24} md={24} lg={24} xl={12} xxl={12}>
              <Details>
                <Tag>
                  {
                    (categories_indexed[productData?.category_id || ''] || {})
                      .name
                  }
                </Tag>
                <div className="head-title">
                  <h1>{productData?.name}</h1>

                  <div onClick={setFavorite} className="favorite">
                    {isFav ? <HeartFilled /> : <HeartOutlined />}
                  </div>
                </div>
                <div className="space-between">
                  <div className="rate">
                    <StarFilled />
                    <StarFilled />
                    <StarFilled />
                    <StarFilled />
                  </div>
                  <div className="txt">{productData?.code}</div>
                </div>

                <div className="price-box">
                  <div className="price">
                    <div className="inner-price usd-price">
                      <span className="price-value">{productData?.price}</span>
                      <span>USD</span>
                    </div>
                    <div className="inner-price dc-price">
                      <span className="price-value">
                        {productData?.dc_price}
                      </span>
                      <span>DC</span>
                    </div>
                  </div>
                  <div className="addingcart">
                    {productData ? (
                      <AddToCartForm
                        onSuccess={() => {}}
                        productId={productData.id}
                        stock={productData?.stock_available}
                      />
                    ) : null}
                  </div>
                </div>

                <Paragraph style={{ maxWidth: '580px', width: '100%' }}>
                  <h5>Key Benefits :</h5>
                  {productData?.short_description}
                </Paragraph>

                <p>{productData?.description}</p>
              </Details>
            </Col>
          </Row>
        </div>
      </StyledProductDetail>
    </Layout>
  )
}

const Details = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  align-items: flex-start;

  .head-title {
    display: flex;
    justify-content: space-between;
    flex-direction: row;
    width: 100%;
    h1 {
      color: var(--primary);
    }
    .favorite {
      font-size: 26px;
      cursor: pointer;
      color: #ff4d4f;
    }
  }
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

  .price-box {
    display: flex;
    justify-content: space-between;
    padding: 2rem 0;
    width: 100%;
  }

  .addingcart {
    display: flex;
    justify-content: flex-end;
  }

  .price {
    display: flex;
    justify-content: flex-end;
    font-size: 2em;
    font-weight: 700;
    color: var(--primary);

    .usd-price {
      color: #8e8e8e;
      font-weight: 400;
    }
    .dc-price {
      color: var(--primary-red);
    }

    .inner-price {
      padding: 0 1rem;
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      .price-value {
        font-size: 1.5em;
        margin-right: 0.5rem;
      }
    }
  }
  h1 {
    font-size: 2.5em;
    font-weight: 700;
    text-transform: uppercase;
  }
  @media (max-width: 1024px) {
    .price-box {
      flex-direction: column;
    }
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
`

export default ProductDetail
