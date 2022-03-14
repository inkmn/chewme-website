import styled from 'styled-components'
import Item from '@/components/order/item'
import OrderType from '@/interfaces/orderItem'

const OrderList = ({
  data = [],
  mutate,
}: {
  data?: OrderType[]
  mutate?: any
}): JSX.Element => {
  return (
    <StyledWrapper>
      {data.map((item: any) => (
        <div className="item" key={item.id}>
          <Item mutate={mutate} item={item} />
        </div>
      ))}
    </StyledWrapper>
  )
}

const StyledWrapper = styled.div``
export default OrderList
