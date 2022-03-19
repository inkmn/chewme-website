import useSWR from 'swr'
import InitType from '@/interfaces/initType'
import publicFetcher from '@/lib/publicFetch'
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
      OPTIONS_TYPE: [],
      OPTIONS_FLAVOR: [],
      OPTIONS_CHEWMETER: [],
      OPTIONS_BREED_SIZE: [],
    },
    error,
    isValidating,
    mutate,
  } = useSWR<InitType>(
    '/pub/general/init',
    async (input) => {
      const initRes = await publicFetcher<InitType>(input, {
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
        OPTIONS_TYPE: initRes.OPTIONS_TYPE,
        OPTIONS_FLAVOR: initRes.OPTIONS_FLAVOR,
        OPTIONS_CHEWMETER: initRes.OPTIONS_CHEWMETER,
        OPTIONS_BREED_SIZE: initRes.OPTIONS_BREED_SIZE,
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
