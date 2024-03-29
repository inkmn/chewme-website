import useSWR from 'swr'
import privatefetcher from '@/lib/privateFetch'
import CartType from '@/interfaces/cart'
import { useState } from 'react'
import qs from 'qs'

const useCart = (): {
  data: {
    rows: CartType[]
    count: number
    cart_sum: {
      total_amount: number
      total_count: number
    }
  }
  error: {
    status: number
    data: any
  }
  isValidating: boolean
  mutate: () => void
  handlePageChange: (page: number) => void
  offset: {
    page: number
    limit: number
  }
} => {
  const apiUrl = '/app/order/carts'
  const [offset, setOffset] = useState({
    page: 1,
    limit: 12,
  })
  const queryObj = {
    offset,
    filter: {
      query: '',
      category_id: '',
      start_date: '',
      end_date: '',
    },
  }
  const [queryString, setQueryString] = useState(
    qs.stringify(queryObj, {
      encode: false,
      addQueryPrefix: true,
    })
  )

  const handlePageChange = (offset: any) => {
    setOffset(offset)
    setQueryString(
      qs.stringify(
        {
          ...queryObj,
          offset,
        },
        {
          encode: false,
          addQueryPrefix: true,
        }
      )
    )
  }

  const {
    data: cartData = [],
    error,
    isValidating,
    mutate,
  } = useSWR<CartType[]>(`${apiUrl}${queryString}`, privatefetcher)

  return {
    data: {
      rows: cartData,
      count: cartData.length,
      cart_sum: {
        total_amount: cartData.reduce(
          (acc, cur) => acc + cur.price * cur.quantity,
          0
        ),
        total_count: cartData.reduce((acc, cur) => acc + cur.quantity, 0),
      },
    },
    error,
    isValidating,
    mutate,
    handlePageChange,
    offset,
  }
}

export default useCart
