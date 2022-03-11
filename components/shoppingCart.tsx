import CardItem from '@/interfaces/cardItem'
import Spinner from '@/components/spinner'
import { Button, Empty, Pagination, Row } from 'antd'
import { useRouter } from 'next/router'
import qs from 'qs'
import styled from 'styled-components'
import useSWR from 'swr'
import Image from 'next/image'
import Privatefetcher from '@/lib/privateFetch'
import RemoveIcon from '../assets/remove.svg'
import Link from 'next/link'

const ShoppingCart = () => {
  const apiUrl = '/app/order/carts'
  const router = useRouter()
  const {
    page = 1,
    limit = 10,
    query = '',
    category_id = '',
    start_date = '',
    end_date = '',
  } = router.query as any

  const queryToString = qs.stringify(
    {
      offset: {
        page,
        limit,
      },
      filter: {
        query,
        category_id,
        start_date,
        end_date,
      },
    },
    {
      encode: false,
      addQueryPrefix: true,
    }
  )

  const { data: cardData } = useSWR<{
    rows: CardItem[]
    count: number
  }>(`${apiUrl}${queryToString}`, Privatefetcher)

  const handlePageChange = (currentPage: number) => {
    const qsData = {
      page: currentPage,
      limit,
      query,
      category_id,
      start_date,
      end_date,
    }
    router.push(
      `/cart${qs.stringify(qsData, { encode: false, addQueryPrefix: true })}`
    )
  }

  return (
    <StyledShoppingCart>
      {cardData ? (
        cardData.count ? (
          <div className="items">
            {cardData.rows.map((item) => {
              return (
                <div className="item" key={item.id}>
                  <Image
                    src={`http://dev-dc-s3.goodtech.mn${item.image}`}
                    width={70}
                    height={70}
                    objectFit="cover"
                    className="image"
                    alt=""
                  />
                  <div className="item-info">
                    <div className="if-top">
                      <div className="item-name">
                        <Link href="/">
                          <a>{item.name}</a>
                        </Link>
                      </div>
                      <a>
                        <RemoveIcon />
                      </a>
                    </div>
                    <div className="if-bottom">
                      <div className="ifb-quantity">{item.quantity}</div>
                      <div className="ifb-price">{item.price}</div>
                    </div>
                  </div>
                </div>
              )
            })}
            {cardData?.count > limit ? (
              <Row justify="end">
                <Pagination
                  pageSize={parseInt(limit, 10)}
                  current={parseInt(page, 10)}
                  total={cardData?.count}
                  onChange={handlePageChange}
                />
              </Row>
            ) : null}
          </div>
        ) : (
          <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
        )
      ) : (
        <Spinner text="Loading..." minHeight={300} />
      )}
    </StyledShoppingCart>
  )
}

const StyledShoppingCart = styled.div`
  .items {
    .item {
      padding: 20px 30px;
      display: flex;
      padding: 20px;
      border-bottom: 1px solid rgba(0, 0, 0, 0.1);
      .item-info {
        flex: 1;
        margin-left: 20px;
        display: flex;
        flex-direction: column;
        .if-top {
          display: flex;
          align-items: flex-start;
          margin-bottom: 15px;
          .item-name {
            flex: 1;
            margin-right: 20px;
            & a {
              font-size: 16px;
              color: #221906;
              font-weight: 500;
            }
          }
        }
        .if-bottom {
          margin-top: auto;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
      }
    }
  }
`

export default ShoppingCart
