export interface ProductImage {
  isMain: boolean
  url: string
}

export interface ProductListItem {
  id: string
  category_id: string
  category_name: string
  name: string
  code: string
  barcode: string
  price: number
  dc_price: number
  unit: string
  object_id: string
  object_type: string
  is_main: boolean
  parent_id: string | null
  language: string
  is_active: boolean
  created_at: string
  image: string
  images: string[]
  view_count: number
  cart_count: number
  favorite_count: number
  order_count: {
    paid: number
    unpaid: number
    cancel: number
  }
  stock_avialable: number
}

interface ProductItem {
  id: string
  category_id: string
  name: string
  code: string
  barcode: string
  price: number
  dc_price: number
  unit: string
  description: string
  language: string
  childrens: ProductListItem[]
  object_id: string
  object_type: string
  is_main: boolean
  parent_id: string | null
  created_at: string
  images: ProductImage[]
  stock_available: number
}

export default ProductItem
