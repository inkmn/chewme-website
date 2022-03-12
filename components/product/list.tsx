import styled from 'styled-components'
import Card from './card'
import { ProductListItem } from '@/interfaces/product'
import { Empty } from 'antd'

const ProductList = ({
  productData = { rows: [], count: 0 },
}: {
  productData?: { rows: ProductListItem[]; count: number }
}): JSX.Element => {
  return (
    <StyledWrapper>
      {productData?.count ? (
        productData.rows.map((item: any) => (
          <div className="productListItem" key={item.id}>
            <Card item={item} />
          </div>
        ))
      ) : (
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
      )}
    </StyledWrapper>
  )
}

const StyledWrapper = styled.div`
  position: relative;
  display: flex;
  flex-wrap: wrap;
  margin: 0 -1rem;
  .productListItem {
    width: calc(100% / 4);
    padding: 1rem;
  }

  @media screen and (max-width: 1024px) {
    .productListItem {
      width: calc(100% / 3);
    }
  }

  @media screen and (max-width: 767px) {
    .productListItem {
      width: 100%;
    }
  }
`
export default ProductList
