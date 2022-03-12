import useSWR from 'swr'
import InitType from '@/interfaces/initType'
import PublicFetcher from '@/lib/publicFetch'
import arrayToTree from 'array-to-tree'

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
    data: result = {
      s3: '',
      categories: [],
      categories_indexed: {},
      categories_tree: [],
    },
    error,
    isValidating,
    mutate,
  } = useSWR<InitType>(
    '/pub/general/init',
    async (input) => {
      const initRes = await PublicFetcher<InitType>(input, {
        method: 'GET',
      })
      const gahai = {
        s3: initRes.s3,
        categories: initRes.categories,
        categories_indexed: initRes.categories.reduce(
          (accumilator: any, iterator: any) => {
            return {
              ...accumilator,
              [iterator.id]: iterator,
            }
          },
          {}
        ),
        categories_tree: arrayToTree(initRes.categories, {
          parentProperty: 'parent_id',
        }),
      }

      return gahai
    },
    {
      revalidateOnFocus: false,
    }
  )

  return { data: result, error, isValidating, mutate }
}

export default useInit
