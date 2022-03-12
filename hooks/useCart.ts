import useSWR from 'swr'
import CartType from '@/interfaces/cart'
import Privatefetcher from '@/lib/privateFetch'

interface CartListType {
  rows: CartType[]
  count: number
}

const useCart = ({
  queryToString = '?filter[query]=&filter[category_id]=&offset[page]=1&offset[limit]=10&filter[start_date]=&filter[end_date]=',
}: {
  queryToString?: string
}): {
  data: CartListType
  error:
    | {
        status: number
        data: any
      }
    | undefined
  isValidating: boolean
  mutate: () => void
} => {
  const {
    data: result = {
      rows: [],
      count: 0,
    },
    error,
    isValidating,
    mutate,
  } = useSWR<CartListType>(
    `/app/order/carts${queryToString}`,
    async (input) => {
      const initRes = await Privatefetcher<CartListType>(input, {
        method: 'GET',
      })
      const gahai = initRes

      return gahai
    }
  )

  return { data: result, error, isValidating, mutate }
}

export default useCart
