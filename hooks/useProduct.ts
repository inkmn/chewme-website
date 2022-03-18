import useSWR from 'swr'
import publicFetcher from '@/lib/publicFetch'
import qs from 'qs'
import OptionalInterface from '@/interfaces/optionalType'
import { ProductListItem } from '@/interfaces/product'
import { useRouter } from 'next/router'

const useProduct = () => {
  const apiUrl = '/pub/product'
  const router = useRouter()
  const {
    page = 1,
    limit = 12,
    query = '',
    category_id = '',
    start_date = '',
    end_date = '',
    optional = '',
    optional_type = '',
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
        optional,
        optional_type,
      },
    },
    {
      encode: false,
      addQueryPrefix: true,
    }
  )
  const { data, error, isValidating, mutate } = useSWR<{
    rows: ProductListItem[]
    count: number
    filter_bars: OptionalInterface[]
  }>(`${apiUrl}${queryToString}`, publicFetcher)

  return {
    data,
    error,
    isValidating,
    mutate,
  }
}

export default useProduct
