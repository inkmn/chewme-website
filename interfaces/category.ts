enum Category_type {
  PRODUCT = 'PRODUCT',
  OTHER = 'OTHER',
}

interface Category {
  id: string
  parent_id?: string
  name: string
  type: Category_type
  sort: number
  created_by: string
  created_at: string
  updated_by: string
  updated_at: string
  status: boolean
}

export default Category
