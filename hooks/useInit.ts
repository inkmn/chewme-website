import useSWR from 'swr'
import InitType from '@/interfaces/initType'
import PublicFetcher from '@/lib/publicFetch'

const useInit = (): {
  data: InitType
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
    data: result,
    error,
    isValidating,
    mutate,
  } = useSWR<InitType>('/pub/general/init', PublicFetcher, {
    revalidateOnFocus: false,
  })

  let data: InitType = {
    s3: '',
    categories: [],
    categories_indexed: {},
  }

  if (result) {
    data = {
      s3: result.s3,
      categories: result.categories,
      categories_indexed: result.categories.reduce(
        (accumilator: any, iterator: any) => {
          return {
            ...accumilator,
            [iterator.id]: iterator,
          }
        },
        {}
      ),
    }
  }

  return { data, error, isValidating, mutate }
}

export default useInit
