interface ProductImage {
  isMain: boolean
  url: string
}

interface Product {
  barcode: string
  category_id: string
  code: string
  id: string
  image: string
  images: [ProductImage]
  name: string
  price: string
  dc_price: string
  description: string
  is_main: boolean
  language: string
  stock_available: number
  unit: string
}

export default Product
