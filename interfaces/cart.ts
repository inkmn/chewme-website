enum InputType {
  OUT = 'OUT',
  IN = 'IN',
}

interface CartType {
  id: string
  retailer_id: string | null
  product_id: string
  inout_type: InputType
  price: number
  quantity: number
  unit: string
  coupon_code: string | null
  name: string
  code: string
  object_id: string
  object_type: string
  image: string
  language: string
  is_main: boolean
  user: {
    username: string
    language: string
    first_name: string
    last_name: string
    email: string
    phone: string
  }
}

export default CartType
