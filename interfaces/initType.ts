import Category from './category'

interface InitType {
  s3: string
  categories: Category[]
  categories_indexed: { [key: string]: Category }
}

export default InitType
