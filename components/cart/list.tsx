import styled from 'styled-components'
import Item from '@/components/cart/item'
import CartType from '@/interfaces/cart'

const CartList = ({ data = [] }: { data?: CartType[] }): JSX.Element => {
  return (
    <StyledWrapper>
      {data.map((item: any) => (
        <div className="item" key={item.id}>
          <Item item={item} />
        </div>
      ))}
    </StyledWrapper>
  )
}

const StyledWrapper = styled.div``
export default CartList
