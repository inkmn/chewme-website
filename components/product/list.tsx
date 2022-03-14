import styled from 'styled-components'
import Card from './card'
import { ProductListItem } from '@/interfaces/product'

const ProductList = ({
  data = [],
}: {
  data?: ProductListItem[]
}): JSX.Element => {
  return (
    <StyledWrapper>
      {data.map((item, index) => (
        <div className="productListItem" key={`${item.id}_${index}`}>
          <Card item={item} />
        </div>
      ))}
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
