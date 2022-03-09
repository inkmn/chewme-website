import Category from '@/interfaces/category'
import Unit from '@/interfaces/unit'

export interface InitData {
  categories: Category[]
  s3: string
  unit: Unit[]
}

const init = (data: InitData) => {
  const { categories = [], s3 = '', unit = [] } = data

  return {
    s3,
    categories,
    categories_indexed: categories.reduce(
      (accumilator: any, iterator: Category) => {
        return {
          ...accumilator,
          [iterator.id]: iterator,
        }
      },
      {}
    ),
    unit,
    unit_indexed: unit.reduce((accumilator: any, iterator: Unit) => {
      return {
        ...accumilator,
        [iterator.code]: iterator,
      }
    }, {}),
  }
}

export default init
