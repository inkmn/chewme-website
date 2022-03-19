enum OrderType {
  NEW = 'NEW',
  PENDING = 'PENDING',
  PAID = 'PAID',
  COMPLETED = 'COMPLETED',
  CANCELED = 'CANCELED',
}

interface OrderItemType {
  account_amount: string
  archive_id: string | null
  card_amount: string
  cash_amount: string
  code: string
  coupon_code: string | null
  created_at: string
  created_by: string
  discount_amount: string
  distribute_user_id: string | null
  finance_user_id: string | null
  id: string
  inout_id: string | null
  is_sale_price: false
  note: string | null
  order_shipping: any
  order_status: OrderType
  order_status_date: string
  order_user_id: string
  paid_amount: string
  parent_id: string | null
  pay_amount: string
  payment_method: string | null
  products: any[]
  quantity: number
  retailer_id: string
  shipment_amount: string | null
  shipment_quantity: number
  shipping_additional_fee: string
  shipping_address: string
  shipping_amount: string
  shipping_date: string | null
  shipping_phone: string
  shipping_phone_second: string | null
  status: true
  surcharge_amount: string
  total_amount: string
  updated_at: string
  updated_by: string
  user: any
  user_id: string
}

export default OrderItemType
