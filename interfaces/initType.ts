import Category from './category'
import { OptionalItem } from './optionalType'

interface InitType {
  s3: string
  categories: Category[]
  categories_indexed: { [key: string]: Category }
  categories_tree: Category[]
  OPTIONS_TYPE: OptionalItem[]
  OPTIONS_FLAVOR: OptionalItem[]
  OPTIONS_CHEWMETER: OptionalItem[]
  OPTIONS_BREED_SIZE: OptionalItem[]
}

export default InitType
